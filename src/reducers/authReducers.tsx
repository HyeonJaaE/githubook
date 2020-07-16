import { AuthTypes, SET_USER } from "../actions/authAction";

type AuthState = {
    user: object;
};

const initialState: AuthState = {
    user: {},
};

export default (state = initialState, action: AuthTypes) => {
    switch (action.type) {
        case SET_USER:
            return {
                user: action.payload,
            };
        default:
            return state;
    }
};
