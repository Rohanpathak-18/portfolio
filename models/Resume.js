const mongoose =
require("mongoose");

const resumeSchema =
new mongoose.Schema({

file:String

});

module.exports =
mongoose.model(
"Resume",
resumeSchema
);