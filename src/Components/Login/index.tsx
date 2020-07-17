import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/authAction";
import axios from "axios";

const Login = (props: any) => {
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .post(
                "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
                {
                    code: window.location.search.split("=")[1],
                    client_id: "504c566c0230964f360d",
                    client_secret: "e6821d09a158291b5704634c2f49052d50a6e278",
                },
                {
                    headers: {
                        accept: "application/json",
                    },
                }
            )
            .then((res) => {
                console.log(res);
                dispatch(setCurrentUser(res.data.access_token));
                props.history.push("/");
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className="text-center">
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default Login;
