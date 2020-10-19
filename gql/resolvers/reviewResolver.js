const mongoose = require("mongoose");
const Review = require("../../mongooseSchema/review");
const SportObject = require("../../mongooseSchema/sportObject");
const User = require("../../mongooseSchema/user");

module.exports = {
  Query: {
    reviews: async () => await Review.find({}).populate("user").populate("sportObject"),
    reviewsByUser: async (parent, {user}) => {
      const userId = await User.findOne({loginEmail: user}, "_id");
      const userReviews = await Review.find({user: userId}).populate("user").populate("sportObject");
      return userReviews
    },
    reviewsBySportObject: async (parent, {sportObject}) => {
      const sportObjectId = await SportObject.findOne({name: sportObject}, "_id");
      const sportObjectReviews = await Review.find({sportObject: sportObjectId}).populate("user").populate("sportObject");
      return sportObjectReviews
    }
  },
  Mutation: {
    addReview: async (parent, review) => {
      const sportObjectId = await SportObject.findOne({name: review.sportObject}, "_id");
      const userId = await User.findOne({loginEmail: review.user}, "_id");
      const newReview = new Review({
        _id: new mongoose.Types.ObjectId(),
        user: userId,
        description: review.description,
        starRate: review.starRate,
        sportObject: sportObjectId,
      });
      newReview.save(err => {
        if (err) return err
      });
      await User.findByIdAndUpdate(newReview.user, {$push: {reviews: newReview._id}});
      await SportObject.findByIdAndUpdate(newReview.sportObject, {$push: {reviews: newReview._id}});
      return newReview;
    },
  },
};
