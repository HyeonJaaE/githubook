import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setCurrentUser } from "../../actions/authAction";
import { key } from "../../config";
import { githubLogin } from "../../api/githubLogin";

const Login = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const redirect_uri_dev = "http://localhost:3000";
    const redirect_uri = "https://hyeonjaae.github.io/githubook";
    const login_url =
        "https://github.com/login/oauth/authorize?" +
        "client_id=" +
        key.CLIENT_ID +
        "&redirect_uri=" +
        redirect_uri +
        "&scope=repo";

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
                    dispatch(setCurrentUser(localStorage.getItem("token")));
                    history.push("/");
                })
                .catch((err) => console.log(err));
        }
    }, []);

    return (
        <div className="text-center">
            <a href={login_url}>Github Login</a>
        </div>
    );
};

export default Login;
