const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    userName: {type: String, required: true},
    text: {type: String, required: true},
    ownerTheme: {type: Types.ObjectId, ref:"Theme"},
    owner: {type: Types.ObjectId, ref:"User"},
});

module.exports = model("Comment", schema);