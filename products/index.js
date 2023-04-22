const express = require('express');
const app = express();

const PORT = 8002;

app.use(express.json());

app.use("/", (req, res, next) => {
     return res.status(200).json({"msg" :"Hello From Prodcuts"});
})

app.listen(PORT, () => {
  console.log(`Products is listening on PORT ${PORT}`)
})