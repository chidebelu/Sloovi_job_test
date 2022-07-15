import {ADD_TASK,ADD_TASK_FAIL, RESET} from "../constants/taskConstants"

export const addTaskReducer = (state = {tasks:null}, action)=>{
    switch(action.type){
        case ADD_TASK:
            return{
               tasks: action.payload.results
            }
        case RESET: 
        return{
            tasks: null
        }
        case ADD_TASK_FAIL:{
            return{
                error: action.payload
            }   
        }        
        default: return state
    }
}