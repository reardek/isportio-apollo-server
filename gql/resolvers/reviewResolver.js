const mongoose = require("mongoose");
const Review = require("../../mongooseSchema/review");
const Gym = require("../../mongooseSchema/gym");
const User = require("../../mongooseSchema/user");

module.exports = {
  Query: {
    reviews: async () => await Review.find({}).populate("gym"),
    reviewsByUser: async (parent, { user }) => {
      const userId = await User.findOne({ loginEmail: user }, "_id");
      const userReviews = await Review.find({ user: userId }).populate("gym");
      return userReviews;
    },
    reviewsByGym: async (parent, { gym }) => {
      const gymId = await Gym.findOne({ name: gym }, "_id");
      const gymReviews = await Review.find({ gym: gymId }).populate("gym");
      return gymReviews;
    },
  },
  Review: {
    user: (parent) => User.findOne({ reviews: parent._id }),
  },
  Mutation: {
    addReview: async (parent, review) => {
      const newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        user: review.user,
        description: review.description,
        starRate: review.starRate,
        gym: review.gym,
      });
      newReview.save((err) => {
        if (err) return err;
      });
      await User.findByIdAndUpdate(newReview.user, {
        $push: { reviews: newReview._id },
      });
      await Gym.findByIdAndUpdate(newReview.gym, {
        $push: { reviews: newReview._id },
      });
      const avgRate = await Review.aggregate([{$match: {gym: newReview.gym}}, {$group: {_id: 1, avgRate: {$avg: "$starRate"}}}]);
      await Gym.findByIdAndUpdate(newReview.gym, {$set: {"avgRate": avgRate[0].avgRate}})
      return newReview;
    },
  },
};
