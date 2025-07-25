const mongoose = require('mongoose')


const ConnectToDb = () => {
    mongoose.connect(process.env.MONGODB_URL).then(()=> {
        console.log("Connected to DB");       
    }).catch((err)=> {
        console.log(err,"Error while connecting to db"); 
    })
}

module.exports = ConnectToDb