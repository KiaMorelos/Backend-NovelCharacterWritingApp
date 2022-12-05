"use strict";
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

const app = require("./app");

//the server runs on port 8000 because port 3000 will be used for the front end
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
