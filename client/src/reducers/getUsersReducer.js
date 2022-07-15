import {GET_USERS, GET_USERS_FAIL} from "../constants/taskConstants"

export const getUsersReducer = (state = { getusers: {}}, action)=>{
    switch(action.type){
        case GET_USERS:
            return{
                ...state,
                getusers: action.payload.results.data
            }
        case GET_USERS_FAIL:{
            return{
                ...state,
                error: action.payload
            }   
        }

        
        default: return state
    }
}