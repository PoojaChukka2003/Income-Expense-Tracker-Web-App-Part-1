const Account = require("../../Model/Account");
const User = require("../../Model/User");
const { AppErr } = require("../../Utils/appErr");

//Create
const createAccountCtrl = async (req, res, next) => {
    const { name, initialBalance, accountType, notes } = req.body;
    try {
        //1.find the logged in user
        const userFound = await User.findById(req.user);
        if (!userFound) {
            return next(new AppErr('User not Found', 404));
        }

        //2.Create the account
        const account = await Account.create({
            name,
            initialBalance,
            accountType,
            notes,
            createdBy: req.user,
        });
        //3. Push the account into users accounts field
        userFound.accounts.push(account._id);
        //4. Resave the user
        await userFound.save();
        res.json({
            status: 'success',
            data: account,
        });
    } catch (error) {
        next(error);
    }
};

//Get all accounts
const getAccountsCtrl = async (req, res) => {
    try {
        const accounts = await Account.find().populate("transactions");
        res.json(accounts);
    } catch (error) {
        res.json(error);
    }
};

//Get single accounts
const getAccountCtrl = async (req, res, next) => {
    try {
        //find the id from the params
        const { id } = req.params;
        const account = await Account.findById(id).populate("transactions");
        res.json({
            status: "success",
            data: account
        });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

//delete
const deleteAccountsCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        await Account.findByIdAndDelete(id);
        return res.status(200).json({
            status: "success",
            data: null
        });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

//update
const updateAccountsCtrl = async (req, res) => {
    try {
        const { id } = req.params;
        const account = await Account.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.json({
            status: "success",
            data: account
        });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

module.exports = {
    createAccountCtrl,
    getAccountCtrl,
    getAccountsCtrl,
    deleteAccountsCtrl,
    updateAccountsCtrl
}