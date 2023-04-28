const {Schema, model} = require("mongoose");
const userSchema = new Schema(
{
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Must enter a valid email address!",]
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: "Thought"
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    ]
}, 
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

// friendCount is a virtual created to retrieve length of user's friends array from query.
userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
  });

// Create model user using the userSchema
const User = model("User", userSchema);
// Export model to be able to use it for our api
module.exports = User;