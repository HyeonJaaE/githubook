import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "./actions/authAction";
import Home from "./Components/Home";

const App = () => {
    const dispatch = useDispatch();
    dispatch(setCurrentUser(localStorage.getItem("token")));
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Route exact path="/" component={Home} />
        </Router>
    );
};

export default App;
