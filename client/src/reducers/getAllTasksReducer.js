import { GET_ALL_TASKS, GET_ALL_TASKS_FAIL, REMOVE_TASK, REMOVE_TASK_FAIL} from "../constants/taskConstants"

export const getAllTasksReducer = (state = { getalltasks: []}, action)=>{
    switch(action.type){
        case GET_ALL_TASKS:
            return{
                ...state,
                getalltasks: action.payload.results
            }
        case GET_ALL_TASKS_FAIL:{
            return{
                ...state,
                error: action.payload
            }   
        }


        case REMOVE_TASK:
            return{
                ...state,
                getalltasks: state.getalltasks.filter((x) => x.id !== action.payload)
            }

            case REMOVE_TASK_FAIL:{
                return{
                    ...state,
                    error: action.payload
                }   
            }
            default: return state
    }
        
    }
