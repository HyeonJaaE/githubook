import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/authAction";
import Githubook from "../Githubook";
import "./home.scss";

const Home = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state: any) => state.auth);

    return (
        <>
            {auth.user ? (
                <Githubook />
            ) : (
                <div id="home-container">
                    <form
                        id="home-login"
                        onSubmit={(e: any) => {
                            e.preventDefault();
                            localStorage.setItem("token", e.target.token.value);
                            dispatch(setCurrentUser(e.target.token.value));
                        }}
                    >
                        <img
                            src="https://d2eip9sf3oo6c2.cloudfront.net/tags/images/000/000/276/square_480/github_logo.png"
                            style={{ width: "40px", height: "40px" }}
                        ></img>
                        <img
                            src="https://en.followersnet.com/wp-content/uploads/2016/02/Facebook-1.png"
                            style={{ width: "60px", height: "60px" }}
                        ></img>
                        <input
                            id="token"
                            placeholder="Github Username"
                            type="search"
                            className="form-control"
                        ></input>
                    </form>
                </div>
            )}
        </>
    );
};

export default Home;
