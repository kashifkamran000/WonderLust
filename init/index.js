const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');

main()
    .then(() => {
        console.log('Connected!');
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust');
}

let initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj, owner: '6671b0be3b76abfa93da5b03',}));
    await Listing.insertMany(initData.data);
    console.log("Working");
}

initDB();