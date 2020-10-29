const mongoose = require("mongoose");
const Review = require("../../mongooseSchema/review");
const Gym = require("../../mongooseSchema/gym");
const User = require("../../mongooseSchema/user");

module.exports = {
  Query: {
    reviews: async () => await Review.find({}).populate("user").populate("gym"),
    reviewsByUser: async (parent, {user}) => {
      const userId = await User.findOne({loginEmail: user}, "_id");
      const userReviews = await Review.find({user: userId}).populate("user").populate("gym");
      return userReviews
    },
    reviewsByGym: async (parent, {gym}) => {
      const gymId = await Gym.findOne({name: gym}, "_id");
      const gymReviews = await Review.find({gym: gymId}).populate("user").populate("gym");
      return gymReviews
    }
  },
  Review: {
    user: (parent) => User.findOne({review: parent._id})
  },
  Mutation: {
    addReview: async (parent, review) => {
      const newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        user: review.user,
        description: review.description,
        starRate: review.starRate,
        gym: review.gymId,
      });
      newReview.save(err => {
        if (err) return err
      });
      await User.findByIdAndUpdate(newReview.user, {$push: {reviews: newReview._id}});
      await Gym.findByIdAndUpdate(newReview.gym, {$push: {reviews: newReview._id}});
      return newReview;
    },
  },
};
