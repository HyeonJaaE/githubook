const loggerMiddleware = (store:any) => (next:any) => (action:any) => {
    
    console.log("current state", store.getState());
    console.log('action', action);

    //액션을 다음 미들웨어, 혹은 리듀서로 전달
    const result = next(action);
    
    console.log("next state", store.getState());
    console.log('\n');

    return result;
}

export default loggerMiddleware;