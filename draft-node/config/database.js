const mongoose=require('mongoose');

const CONNECTION_URI=`mongodb://host.docker.internal:27017/newdraftjs`

const configureDB=()=>{
    mongoose.connect(CONNECTION_URI)
    .then(()=>{
        console.log('connected to DB')
    })
    .catch((err)=>{
        console.log('Error Connecting With DB',err)
    })
}

module.exports=configureDB