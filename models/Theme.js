const {Schema, model, Types} = require("mongoose");

const schema = new Schema({
    label: {type: String, required: true},
    text: {type: String, required: true},
    owner: {type: Types.ObjectId, ref:"User"},
    comments: [{ userName: String, Text: String}]
});

module.exports = model("Theme", schema);