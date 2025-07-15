import {configureStore} from "@reduxjs/toolkit"
import tasksReducer from "./tasksSlice"
import themesReducer from "./themesSlice"
import routeReducer from "./routeSlice"
import authReducer from "./authSlice"
import accountReducer from "./accountSlice"


export const store = configureStore({
    reducer:{
        core: tasksReducer,
        themes: themesReducer,
        route: routeReducer,
        auth: authReducer,
        account: accountReducer
    }
})
