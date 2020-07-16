import { combineReducers } from "redux";
import authReducer from "../reducers/authReducers";
import errorReducer from "../reducers/errorReducers";
import countReducer from "./counterReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    counter: countReducer,
    errors: errorReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
