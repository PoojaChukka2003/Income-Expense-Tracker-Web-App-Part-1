const mongoose = require("mongoose");

//connect to db
const dbConnect = async()=>{
    try {
        await mongoose.connect("mongodb+srv://poojachukka2003:9OmHGPZQA4DpAfiJ@hcl-cluster.a3epai5.mongodb.net/users-database&appName=HCL");
        console.log("Db connected Successfully");
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

dbConnect();