import React from "react";
import { useSelector } from "react-redux";
import Githubook from "../Githubook";
import Login from "../Login";
import "./home.scss";

const Home = () => {
    const auth = useSelector((state: any) => state.auth);

    return <>{auth.user ? <Githubook /> : <Login />}</>;
};

export default Home;
