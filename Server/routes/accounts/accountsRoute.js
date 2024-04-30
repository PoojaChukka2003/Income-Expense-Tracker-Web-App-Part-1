const express = require("express");
const {createAccountCtrl, getAccountsCtrl, getAccountCtrl, deleteAccountsCtrl, updateAccountsCtrl}=require("../../Controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountsRoute = express.Router();

//POST/api/v1/accounts
accountsRoute.post("/", isLogin, createAccountCtrl);

//GET/api/v1/accounts/:id
accountsRoute.get("/:id", getAccountCtrl);

//DELETE/api/v1/accounts/:id
accountsRoute.delete("/:id", deleteAccountsCtrl);

//PUT/api/v1/accounts/:id
accountsRoute.put("/:id", updateAccountsCtrl);

//GET/api/v1/accounts
accountsRoute.get("/", getAccountsCtrl);

module.exports = accountsRoute;