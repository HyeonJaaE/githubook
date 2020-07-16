import { CountTypes, INCREASE, DECREASE, INCREASE_BY } from "../actions/counterAction";

type CounterState = {
    count: number;
};

const initialState: CounterState = {
    count: 0,
};

export default (state: CounterState = initialState, action: CountTypes) => {
    switch (action.type) {
        case INCREASE:
            return {
                count: state.count + 1,
            };
        case DECREASE:
            return {
                count: state.count - 1,
            };
        case INCREASE_BY:
            return {
                count: state.count + action.payload,
            };
        default:
            return state;
    }
};
