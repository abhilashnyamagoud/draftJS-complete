import React,{useState,useRef,useEffect} from "react";
import JoditEditor from "jodit-react";
import './App.css'
import axios from "axios";
// import { v4 as uuidv4 } from 'uuid';


const App=()=>{
  const [value,setValue]=useState('')
  const [result,setResult]=useState([])
  const editor=useRef(null)
  const [toggle,setToggle]=useState(false)
  const [val,setVal]=useState({})

  useEffect(()=>{
    axios.get('http://localhost:3001/api/data')
    .then((res)=>{
      const result=res.data
        setResult(result)
        console.log('fetched', result)
    })
    .catch((err)=>{
      alert(err.message)
    })
  },[])

  const handleEdit=(value)=>{
    setToggle(!toggle)
    setVal(value)
    // console.log("edit", value)
  }

  const handleEditor=(res)=>{
    if(value){
      setValue(val)
    }
    setValue(res)
  }

  const handleSave=async (id)=>{
    // console.log(id)
    const formValue={
      text:value
    }
    // console.log('editData',formValue)
    await axios.put(`http://localhost:3001/api/data/${id}`,formValue)
    .then((res)=>{
      const val=res.data
      console.log(val)
     const value= result.map((ele)=>{
        if(ele._id===val._id){
          return {...ele,...val}
        }else{
          return {...ele}
        }
      })    
      setResult(value)
    })
    .catch((err)=>{
      alert(err.message)
    })

    setToggle(!toggle)
  }

  const handleRequest=()=>{
    const formData={
      // id:uuidv4(),
      text:value
    }   
    console.log(formData)
    axios.post('http://localhost:3001/api/data',formData)
    .then((res)=>{
      const newResult=res.data
      // console.log(result)
      setResult([...result,newResult])
    })
    .catch((err)=>{
      alert(err.message)
    })
  }
  

  return (
    <div className="container mt-5 bg-dark text-light rounded p-5 text-center" >
      <h1>Text Editor </h1>
    <JoditEditor ref={editor}  onChange={handleEditor} />
    {/* <h4>{value} </h4> */}
    <button className="btn btn-secondary btn-lg m-2" onClick={handleRequest}>Submit</button>
    {
      result.map((ele,i)=>{
        return(<div key={i} className="d-block">
        
         <div  dangerouslySetInnerHTML={{__html:ele.text}} ></div>
         {
            toggle ?  <button className="btn btn-secondary" onClick={()=>{handleSave(ele._id)}}>Save</button> :<button className="btn btn-warning" onClick={()=>handleEdit(ele)}>Edit</button> 
         }
         
       
         </div>
        )
      })
    }
    </div>
  )
}

export default App