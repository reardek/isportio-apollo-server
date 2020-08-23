const Review = require("../../mongooseSchema/review");

module.exports = {
  Query: { reviews: () => Review.find({}) },
  Mutation: {
    addReview: (parent, review) => {
      const newReview = new Review({
        description: review.description,
        starRate: review.starRate,
        sportObjectId: review.sportObjectId,
      });
      return newReview.save();
    },
  },
};
