const bcrypt = require("bcryptjs");
const User = require("../../Model/User");
const { AppErr, appErr } = require("../../Utils/appErr");
const generateToken = require("../../Utils/generateToken");
//const verifyToken = require("../../Utils/verifyToken");

//Register
const registerUserCtrl = async (req, res, next) => {
    const { fullname, password, email } = req.body;
    try {
        //check if email already exists
        const userFound = await User.findOne({ email });
        if (userFound) {
            return next(new AppErr("User Already Exists", 400));
        };
        //if fields are empty
        if (!email || !password || !fullname) {
            return next(new AppErr("Please provide all fields", 400));
        }
        //hash password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        res.json({
            status: "success",
            fullname: user.fullname,
            email: user.email,
            id: user._id,
        });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

//Login
const userLoginCtrl = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        //check if email exists\connst 
        const userFound = await User.findOne({ email });
        if (!userFound) return next(new AppErr("Invalid login credentials", 400));
        //check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
        if (!isPasswordMatch)
            return next(new AppErr("Invalid login credentials", 400));

        res.json({
            status: "success",
            fullname: userFound.fullname,
            id: userFound._id,
            token: generateToken(userFound._id)
        });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

//Profile
const userProfileCtrl = async (req, res, next) => {
    console.log(req.user);

    // const result = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDAwYmI4ODk3YTVjMDFmMGE0MWIyMSIsImlhdCI6MTcxMTI4MTAyMSwiZXhwIjoxNzExNzEzMDIxfQ.DlvnCzDv0gBu-iNFPq5Oqkhxcb2O9s76IHOZIcnyGMk");
    // console.log(result);
    try {
        const user = await User.findById(req.user).populate({
            path: "accounts",
            populate: {
                path: "transactions",
                model: "Transaction"
            },
        });
        res.json(user);
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

//Delete
const deleteUserCtrl = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.user);
        return res.status(200).json({
            status: "success",
            data:null
        })
        res.json({ msg: "Delete route" });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

//Update
const updateUserCtrl = async (req, res, next) => {
    try {
        //Check if email exists
        if (req.body.email) {
            const userFound = await User.findOne({ email: req.body.email });
            if (!userFound) {
                return next(new AppErr("Email is taken or you already have this email", 400));
            }
        }
        //Check if user is updating the password
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);
            //update the user
            const user = await User.findByIdAndUpdate(req.user, {
                password: hashedPassword,
            }, {
                new: true,
                runValidators: true
            });
            //send response 
            return res.status(200).json({
                status: "success",
                data: user
            });
        }

        const user = await User.findByIdAndUpdate(req.user, req.body, {
            new: true,
            runValidators: true
        });
        //send response 
        res.status(200).json({
            status: "success",
            data: user
        });
    } catch (error) {
        next(new AppErr(error.message, 500));
    }
};

module.exports = {
    registerUserCtrl,
    userLoginCtrl,
    userProfileCtrl,
    deleteUserCtrl,
    updateUserCtrl
};