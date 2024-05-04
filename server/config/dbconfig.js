const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI).then((res)=>{
    console.log('Database Connected Successfully.');
}).catch((e) => {
    console.log(e);
});

module.exports = mongoose;