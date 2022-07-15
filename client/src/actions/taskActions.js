import axios from "axios"
import {ADD_TASK,ADD_TASK_FAIL, REMOVE_TASK, REMOVE_TASK_FAIL, UPDATE_TASK, UPDATE_TASK_FAIL,
     GET_USERS, GET_USERS_FAIL, GET_SINGLE_TASK, GET_SINGLE_TASK_FAIL, GET_ALL_TASKS, GET_ALL_TASKS_FAIL, RESET} from "../constants/taskConstants"
import {data} from "../utils/data"
const {access_token, company_id} = data



export const getUsers = () => async (dispatch) =>{
    try {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            } 
        }
        const {data} = await axios.get(`https://stage.api.sloovi.com/team?product=outreach&company_id=${company_id}`, config)
        dispatch({
            type: GET_USERS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_USERS_FAIL,
           payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


export const addTask = (payload) => async (dispatch) =>{
    try {
        const config = {
            headers: {
                
                'Accept': 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            } 
        }
        const {data} = await axios.post(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`,payload, config)
        dispatch({
            type: ADD_TASK,
            payload: data
        })
        dispatch({
            type: RESET
        })
        dispatch(getallTask())

    } catch (error) {
        dispatch({
            type: ADD_TASK_FAIL,
           payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


export const getallTask = () => async (dispatch) =>{
    try {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            } 
        }
        const {data} = await axios.get(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691?company_id=${company_id}`, config)
        dispatch({
            type: GET_ALL_TASKS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_ALL_TASKS_FAIL,
           payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


export const getSingleTask = (id) => async (dispatch) =>{
    try {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            } 
        }
        const {data} = await axios.get(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`, config)
        dispatch({
            type: GET_SINGLE_TASK,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GET_SINGLE_TASK_FAIL,
           payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const updatingTask = (id, payload) => async (dispatch) =>{
    try {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            } 
        }
        const {data} = await axios.put(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`,payload, config)
        dispatch({
            type: UPDATE_TASK,
            payload: data
        })
            dispatch({
                type: RESET
            })
            dispatch(getallTask())
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAIL,
           payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


export const deleteTask = (id) => async (dispatch) =>{
    try {
    
        const config = {
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`
            } 
        }
        const {data} = await axios.delete(`https://stage.api.sloovi.com/task/lead_465c14d0e99e4972b6b21ffecf3dd691/${id}?company_id=${company_id}`, config)
        dispatch({
            type: REMOVE_TASK,
            payload: data
        })
        dispatch(getallTask())

    } catch (error) {
        dispatch({
            type: REMOVE_TASK_FAIL,
           payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


