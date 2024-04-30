const express = require("express");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const PORT = 5000;

//connect to mongodb
//user: poojachukka2003
//pass: 9OmHGPZQA4DpAfiJ
// IP address: (223.187.114.174)
//mongodb URL: mongodb+srv://poojachukka2003:9OmHGPZQA4DpAfiJ@hcl.a3epai5.mongodb.net/users-database&appName=HCL
//mongodb+srv://poojachukka2003:<password>@hcl.a3epai5.mongodb.net/
//1. Create the client
const client = new MongoClient("mongodb+srv://poojachukka2003:9OmHGPZQA4DpAfiJ@hcl-cluster.a3epai5.mongodb.net/users-database&appName=HCL", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//function to connect
const connectDB = async () => {
    try {
        await client.connect();
        console.log("MongoDB Connected successfully");
    } catch (error) {
        console.log(error);
    }
}

//call the function
connectDB();

//start the server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));