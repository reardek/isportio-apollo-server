const Post = require("./models/post");
const User = require("./models/user");

const resolvers = {
  Query: {
    posts: () => Post.find({}),
    users: () => User.find({}),
  },

  Mutation: {
    addPost: (parent, post) => {
      const newPost = new Post({ title: post.title, content: post.content });
      return newPost.save();
    },
    addUser: (parent, user) => {
      const newUser = new User({
        name: user.name,
        password: user.password,
        age: user.age,
      });
      return newUser.save();
    },
  },
};

module.exports = resolvers;
