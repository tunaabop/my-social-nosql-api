const {Schema, model, Types} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

// create schema for reaction model
const reactionSchema = new Schema(
{
    reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
    },
    reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
    },
    username: {
    type: String,
    required: true,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal),
    },
},
{
    toJSON: {
    getters: true,
    },
});

// create schema for thought model
const thoughtSchema = new Schema(
{
    thoughtText: {
    type: String,
    required: true,
    maxlength: 280,
    },
    createdAt: {
    type: Date,
    default: Date.now,
    get: (createdValue) => dateFormat(createdValue),
    },
    username: {
    type: String,
    required: true,
    },
    // ref to rectionSchema here
    reactions: [reactionSchema],
},
{
    toJSON: {
    virtuals: true,
    getters: true,
    },
    id: false,
});


// reactionCount is a virtual created to retrieve length of thought's reactions array from query
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("Thought", thoughtSchema);
module.exports = Thought;