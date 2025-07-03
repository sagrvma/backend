const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is now running at port ${PORT}`);
});
