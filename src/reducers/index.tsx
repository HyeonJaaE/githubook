import { combineReducers } from "redux";
import authReducer from "../reducers/authReducers";
import errorReducer from "../reducers/errorReducers";

const rootReducer = combineReducers({
    auth: authReducer,
    errors: errorReducer,
});
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
