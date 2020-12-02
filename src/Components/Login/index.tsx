import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { key } from "../../config";
import { githubLogin } from "../../api/githubLogin";

const Login = () => {
    const history = useHistory();

    useEffect(() => {
        const url =
            "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token";
        const data = {
            code: window.location.search.split("=")[1],
            client_id: key.CLIENT_ID,
            client_secret: key.CLIENT_SECRET,
        };

        if (data.code) {
            githubLogin(url, data)
                .then((res) => {
                    localStorage.setItem("token", res.data.access_token);
                    history.push("/");
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <div className="text-center">
            <a href="https://github.com/login/oauth/authorize?client_id=504c566c0230964f360d&redirect_uri=http://localhost:3000&scope=repo">
                Github Login
            </a>
        </div>
    );
};

export default Login;
