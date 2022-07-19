
const express=require('express')

const router=express.Router()
const Value=require('../app/models')



router.post('/api/data',((req,res)=>{
    // console.log(req.body)
    const body=req.body
    const value=new Value(body)
    value.save()
    .then((val)=>{
        res.json(val)
    
    })
    .catch((err)=>{
        res.json(err)
    })
}))

router.get('/api/data',((req,res)=>{
    Value.find()
    .then((val)=>{
        res.json(val)
    })
    .catch((err)=>{
        res.json(err)
    })
}))

router.put('/api/data/:id',((req,res)=>{
    const id=req.params.id
    const body=req.body
    console.log(body)
    Value.findByIdAndUpdate(id,body,{new:true,runValidators:true})
    .then((val)=>{
        res.json(val)
    })
    .catch((err)=>{
        res.json(err)
    })
}))

module.exports=router