import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension"
import { addTaskReducer } from "./reducers/addTaskReducer"
import { getUsersReducer } from "./reducers/getUsersReducer"
import { updatingTaskReducer } from "./reducers/updatingTaskReducer"
import { getAllTasksReducer } from "./reducers/getAllTasksReducer"
import { getSingleTaskReducer } from "./reducers/getSingleTaskReducer"




const reducer = combineReducers({
    addTask: addTaskReducer,
    getUsers: getUsersReducer,
    updateTask: updatingTaskReducer,
    getallTask: getAllTasksReducer,
    getsingleTask: getSingleTaskReducer,
})



const initialState = {}

//Redux Thunk middleware for handling asynchronous calls

const middleware = [thunk]


const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store