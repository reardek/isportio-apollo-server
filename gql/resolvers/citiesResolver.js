const Cities = require("../../mongooseSchema/cities");

module.exports = {
  Query: {
    cities: async (parent, { filter, first, skip }) => {
      let query = filter
        ? { NAZWA: { $regex: `^${filter}`, $options: "i" } }
        : {};
      const cursor = Cities.find(query);
      if (first) {
        cursor.limit(first);
      }
      if (skip) {
        cursor.skip(skip);
      }
      return cursor;
    },
  },
};
