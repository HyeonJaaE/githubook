import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { setCurrentUser } from "../../actions/authAction";
import Githubook from "../Githubook";
import "./home.scss";

const Home = (props: any) => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    useEffect(() => {
        let client_code = window.location.search.split("=")[1];
        let data = {
            code: client_code,
            client_id: "504c566c0230964f360d",
            client_secret: "e6821d09a158291b5704634c2f49052d50a6e278",
        }
        let header = {
            "Access-Control-Allow-Origin":"*",
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS'
        }
        if (client_code) {
            axios
                .post( "https://github.com/login/oauth/access_token", data, {headers:header})
                .then((res) => {
                    console.log("res", res);
                    dispatch(setCurrentUser(res.data.access_token));
                    localStorage.setItem("token", res.data.access_token);
                    props.history.push("/");
                })
                .catch((err) => console.log("err", err));
        }
    }, []);

    return (
        <>
            {auth.user ? (
                <Githubook />
            ) : (
                <div id="home-container">
                    <a href="https://github.com/login/oauth/authorize?client_id=504c566c0230964f360d&redirect_uri=http://localhost:3000&scope=repo">
                        dev
                    </a>
                    <a href="https://github.com/login/oauth/authorize?client_id=504c566c0230964f360d&redirect_uri=https://hyeonjaae.github.io/githubook&scope=repo">
                        <img
                            src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/276/square_480/github_logo.png"
                            style={{ width: "40px", height: "40px" }}
                        ></img>
                        <img
                            src="https://en.followersnet.com/wp-content/uploads/2016/02/Facebook-1.png"
                            style={{ width: "60px", height: "60px" }}
                        ></img>
                    </a>
                </div>
            )}
        </>
    );
};

export default Home;
