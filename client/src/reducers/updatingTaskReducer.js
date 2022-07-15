import { UPDATE_TASK, UPDATE_TASK_FAIL,RESET} from "../constants/taskConstants"
export const updatingTaskReducer = (state = { updatetask: null}, action)=>{
    switch(action.type){
        case UPDATE_TASK:
            return{
                ...state,
                updatetask: action.payload
            }
        case RESET:
            return{
                ...state,
                updatetask: null
        }
        case UPDATE_TASK_FAIL:{
            return{
                ...state,
                error: action.payload
            }   
        }

        
        default: return state
    }
}