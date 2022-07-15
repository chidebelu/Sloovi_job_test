import { GET_SINGLE_TASK, GET_SINGLE_TASK_FAIL} from "../constants/taskConstants"
export const getSingleTaskReducer = (state = { getsingletask: null}, action)=>{
    switch(action.type){
        case GET_SINGLE_TASK:
            return{
                ...state,
                getsingletask: action.payload.results
            }
        case GET_SINGLE_TASK_FAIL:{
            return{
                ...state,
                error: action.payload
            }   
        }

        
        default: return state
    }
}