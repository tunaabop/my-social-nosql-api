const { Thought, User } = require("../models");
const req = require("express/lib/request");

const userController = {
// create user
     createUser(req, res) {
        User.create(req.body).then((userData) => res.json(userData)).catch((err) => res.status(500).json(err));
    },
// find all users
    findAllUsers(req, res) {
        User.find().then((users) => res.json(users)).catch((err) => res.status(500).json(err));
    },
// find user by id
    findUserById(req, res) {
        User.findOne({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user found with corresponding id' }) : res.json(user)).catch((err) => res.status(500).json(err));
    },
// update user by id
    updateUser(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $set: req.body
        }, {
            runValidators: true,
            new: true
        }).then((user) => {
            !user ? res.status(404).json({ message: 'No user' }) : res.json(user);

        }).catch((err) => res.status(500).json(err));
    },
// delete user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id }).then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : Thought.deleteMany({
            _id: {
                $in: user.thoughts
            }
        })).then(() => res.json({ message: 'Deleted user.' })).catch((err) => res.status(500).json(err));
    },

// +/- for friend of a user

// add friend
    addFriend(req, res) {
        console.log("Try to add a friend");
        User.findOneAndUpdate(
            {
                _id: req.params.id
            }, 
            {
                $addToSet: {
                    friends: req.params.friendsId
                }
            }, 
            {
                runValidators: true,
                new: true
            }
        ).then((user) => !user ? res.status(404).json({ message: 'friend not found with id' }) : res.json(user)).catch((err) => res.status(500).json(err));
    },

// delete friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.id}, 
            {
                $pull: {
                    friends: req.params.friendsId
                }
            }, 
            {
                runValidators: true,
                new: true
            }).then((user) => !user ? res.status(404).json({ message: 'friend not found with id' }) : res.json(user)).catch((err) => res.status(500).json(err)
        );
    }
};
// end of userController const

// export userController
module.exports = userController;