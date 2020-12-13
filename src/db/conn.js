const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/registration", {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 useCreateIndex: true,
 useFindAndModify: false
}).then(() => {
 console.log("coonection is done");
}).catch((e) => {
 console.log("no connection");
})