import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {addTask, updatingTask, getallTask, getSingleTask, getUsers, deleteTask} from "../../actions/taskActions"
import "./home.css"
import ReactTooltip from 'react-tooltip';
import { useEffect } from 'react';
import Select from "react-select"

const returningExpectedData = (value) =>{
  const assigned_user_icon = value.assigned_user_icon
  const task_id = value.id
  const time_zone = value.time_zone
  const assigned_user = value.assigned_user
  const task_date = value.task_date
  const time = value.task_time
  const task_time = secondstoHoursMinutes(time)
  const task_msg = value.task_msg  
  const is_completed = value.is_completed
  return {time_zone, assigned_user, task_date, task_time, task_msg, is_completed, task_id, assigned_user_icon}
}

const secondstoHoursMinutes = (inSecs) =>{
  let d = Number(inSecs);
  let h = Math.floor(d / 3600).toString();
  let m = (d % 3600 * 60).toString().substring(0,2);
  h = h.length <2 ? `0${h}`: h;
  m = m.length <2 ? `0${m}`: m;
  return `${h}:${m}`; 
}

const Home = () => {
  const [content, setContent] = useState(false)
  const dispatch = useDispatch()
  const users = useSelector((state) => state.getUsers.getusers)
  const [result, setResult] = useState(users.name)
  const alltasks = useSelector((state)=> state.getallTask.getalltasks)
  const getsingletask = useSelector((state)=> state.getsingleTask.getsingletask)
  const initialvalue = {
    assigned_user: '',
    task_date: "",
    task_time: "",
    time_zone: 3600,
    task_msg:"",
    is_completed: 1
  }
  
  const expectedData = (data, result)=>{
    const time_zone = -60
    const assigned_user = result
    const task_date = data.task_date
    const timeRaw = data.task_time  
    const  timeSep= timeRaw.split(':'); 
    const hour = timeSep[0] ? +timeSep[0] : 0 
    const minute = timeSep[1] ? +timeSep[1] : 0 
    const task_time = hour * 60 * 60 + minute * 60 ; 
    const task_msg = data.task_msg  
    const is_completed = 0
    return {time_zone, assigned_user, task_date, task_time, task_msg, is_completed}
  }

  const [data, setData] = useState(initialvalue)
  const onChange = (e) =>{
    e.preventDefault()
    
      setData({
        ...data,
        [e.target.name]: e.target.value
      })
    
  }

  useEffect(()=>{
    dispatch(getUsers())
    //eslint-disable-next-line
  },[])

  useEffect(()=>{
    dispatch(getallTask())
    //eslint-disable-next-line
  },[])
  
  useEffect(()=>{
    if(getsingletask){
      const payload = returningExpectedData(getsingletask)
      console.log(payload)
      setData({...payload})
    }
    //eslint-disable-next-line
  },[getsingletask])

  
const deleteHandler= (id) =>{
  if(window.confirm("Are you sure you want to delete this Task?")){
    dispatch(deleteTask(id))
  }
}

const clearForm = () =>{
  setData(initialvalue)
}

const editHandler = (id) =>{
  dispatch(getSingleTask(id))
}
  
const submitHandler = (e) =>{
  e.preventDefault()
  if(getsingletask){
    dispatch(updatingTask(getsingletask.id, expectedData(data, result)))
    setData(initialvalue)
  }
  else{
    let payload = expectedData(data, result)
    console.log(payload)
  dispatch(addTask(payload))
  setData(initialvalue)
  setContent(false)
  }  
}

const selectHandler = (e) =>{
  setResult(e.id)
}

  return (
    <div className="home__overall__container">
    <div className="home__container">
     <div className="home__left"></div>
     <div className="home__right">
      <div className="home__navbar">
        
      </div>
      <div className="home__right-content">
      <div className="home__right-content-taskhead">
           <h1 >TASKS 0</h1> 
           <div className='home__right-content-taskhead-icon'>
           <ReactTooltip/>
           <i data-tip="New task" className="fa-solid fa-plus" onClick={()=>setContent(true)}></i>
           </div>
        </div>
        {content && (
          <div className="home__right-content-taskbody">
          <form onSubmit={submitHandler}>
          <h2>Task Description</h2> <br></br>
          <div className="home__right-content-taskbody-followup">
          <input type="text" placeholder="Follow Up" name='task_msg' onChange={onChange} value={data.task_msg}/>
          <i className="fa fa-bars"></i>
          </div>
  
          <div className="home__right-content-taskbody-date">
            <div>
          <h4 >Date</h4> 
          <input type="date"  name='task_date' onChange={onChange} value={data.task_date}/>
          </div>
  
  
          <div>
          <h4 >Time</h4>
          <input type="time"  name='task_time' onChange={onChange} value={data.task_time} />
          
          </div>
          </div>

  
          <div className="home__right-content-taskbody-assignuser">
          <h4 >Assign User</h4>

          <Select 
            options={users}
            className="select"
            onChange={selectHandler}
            getOptionLabel={(val)=>val.name}
            getOptionValue={(val)=>val.id}
            placeholder="Select User"
           />
           
          </div>
          <div className="home__right-content-taskbody-btn">
            <i data-tip="Clear Form" className="fa fa-trash" aria-hidden="true" onClick={clearForm}></i>
            <ReactTooltip/>
            <div className='whitebtn'>
            <button data-tip="Cancel" type="button" onClick={()=>setContent(false)}>Cancel</button>
            <ReactTooltip />
            </div>
            <div className='greenbtn'>
            <button data-tip="Save Task" type="submit">Save</button>
            <ReactTooltip/>
            </div>
            </div>
          
          </form>
          </div>
        )} <br></br>
      
      
     {alltasks && (alltasks.map(details => (
        <div key={details.id} className="home__right-content-taskdisplaybody">
        
        <div className='imgdiv'>
      <img src={details.assigned_user_icon} alt="" className='imageresize'/>
        </div>
        <div className='pack'>
        <p>{details.task_msg}</p>
        <p style={{color:"red"}}>{details.task_date}</p></div>
      
       <div className='rightside'>
      
        <i data-tip="Edit Task" className="fas fa-edit" onClick={()=>editHandler(details.id)}></i> 
        <ReactTooltip/>
       </div>
       <div className='leftside'>
        <i data-tip="Delete Task" className="fa fa-trash" aria-hidden="true" onClick={()=>deleteHandler(details.id)}></i>
        <ReactTooltip/>
        </div>
      
 
  </div>
)))} 
   
     
          </div>
    </div>
      </div>
     </div>
  
    
  )
}

export default Home