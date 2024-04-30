const express=require("express");
const cors=require("cors");
require("./config/dbConnect");
const usersRoute = require("./routes/users/usersRoute");
const transactionsRoute = require("./routes/transactions/transactionsRoute");
const accountsRoute = require("./routes/accounts/accountsRoute");
const globalErrHandler = require("./middlewares/globalErrHandler");

const app = express();

//middleswares
app.use(express.json());//pass incoming data
//corse middleware
app.use(cors());
//routes
//users route
app.use("/api/v1/users",usersRoute);

//user route
//POST/api/v1/users/register

//POST/api/v1/users/login

//GET/api/v1/users/profile/:id

//DELETE/api/v1/users/:id

//PUT/api/v1/users/:id

//account route
app.use("/api/v1/accounts",accountsRoute);

//POST/api/v1/accounts

//GET/api/v1/accounts/:id

//DELETE/api/v1/accounts/:id

//PUT/api/v1/accounts/:id

//transaction route
app.use("/api/v1/transactions", transactionsRoute);

//POST/api/v1/transactions

//GET/api/v1/transactions 

//GET/api/v1/transactions/:id

//DELETE/api/v1/transactions/:id

//PUT/api/v1/transactions/:id

//Error handlers
app.use(globalErrHandler);

//listen to server
const PORT = process.env.PORT || 9000;
app.listen(PORT, console.log(`Server is up and running on port ${PORT}`));