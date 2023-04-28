// npm i --save-dev @faker-js/faker
const { faker } = require("@faker-js/faker");
const db = require("../config/connection");
const { Thought, User } = require("../models");

db.once("open", async () => {
  await Thought.deleteMany({});
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < 5; i += 1) {
    const username = faker.internet.userName();
    const email = faker.internet.email(username);

    userData.push({ username, email });
  }

  const createdUsers = await User.insertMany(userData);

  // create friends
  for (let i = 0; i < 10; i += 1) {
    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const { _id: userId } = createdUsers[randomUserIndex];

    let friendId = userId;

    while (friendId === userId) {
      const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
      friendId = createdUsers[randomUserIndex];
    }

    await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
  }

  // create thoughts
  let createdThoughts = [];
  for (let i = 0; i < 10; i += 1) {
    const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const { username, _id: userId } = createdUsers[randomUserIndex];

    const createdThought = await Thought.create({ thoughtText, username });

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { thoughts: createdThought._id } }
    );

    createdThoughts.push(createdThought);
  }

  // create reactions
  for (let i = 0; i < 10; i += 1) {
    const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

    const randomUserIndex = Math.floor(Math.random() * createdUsers.length);
    const { username } = createdUsers[randomUserIndex];

    const randomThoughtIndex = Math.floor(
      Math.random() * createdThoughts.length
    );
    const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

    await Thought.updateOne(
      { _id: thoughtId },
      { $push: { reactions: { reactionBody, username } } },
      { runValidators: true }
    );
  }

  console.log("all done!");
  process.exit(0);
});