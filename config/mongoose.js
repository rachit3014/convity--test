const mongoose = require('mongoose');
// configure mongoose
mongoose.connect('mongodb://127.0.0.1:27017/convitytest')
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error to connecting'));
db.once('open',function(){
    console.log('sucessfully  connected to db')
})
module.exports=db