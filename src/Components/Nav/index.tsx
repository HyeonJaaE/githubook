import React, { useState, useEffect } from "react";
import getGithubInfo from "../../api/getGithubInfo";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/authAction";

const Nav = () => {
    const dispatch = useDispatch();

    return (
        <div id="githubook-nav">
            <div id="githubook-nav-side-l">
                <img
                    src="https://en.followersnet.com/wp-content/uploads/2016/02/Facebook-1.png"
                    style={{ width: "40px", height: "40px" }}
                ></img>
                <div id="githubook-search">
                    <label htmlFor="q">
                        <div id="q-icon"></div>
                        <input
                            id="q"
                            type="search"
                            placeholder="github Id"
                            onKeyPress={async (e: any) => {
                                if (e.key === "Enter" && e.target.value !== "") {
                                    localStorage.setItem("token", e.target.value);
                                    window.location.reload();
                                }
                            }}
                        ></input>
                    </label>
                </div>
            </div>
            <div id="githubook-nav-main">
                <ul className="githubook-nav-main-ul">
                    <li>
                        <button
                            onClick={() => {
                                localStorage.removeItem("token");
                            }}
                        >
                            버튼
                        </button>
                    </li>
                    <li>
                        <button>버튼</button>
                    </li>
                    <li>
                        <button>버튼</button>
                    </li>
                    <li>
                        <button>버튼</button>
                    </li>
                </ul>
            </div>
            <div id="githubook-nav-side-r"></div>
        </div>
    );
};

export default Nav;
