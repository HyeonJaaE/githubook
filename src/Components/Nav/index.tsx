import React, { useState, useEffect } from "react";
import getGithubInfo, { GithubProfile } from "../../api/getGithubInfo";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../../actions/authAction";

const Nav = (props: any) => {
    return (
        <div id="githubook-nav">
            <div id="githubook-nav-side-l">
                <img
                    src="https://img.icons8.com/cotton/40/000000/cat--v3.png"
                    style={{ width: "35px", height: "35px" }}
                ></img>
                {/*
                
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
                */}
            </div>
            <div id="githubook-nav-main">
                <ul
                    onClick={(e: any) => {
                        if (e.target.tagName !== "UL")
                            document.getElementsByClassName("active")[0].classList.toggle("active");
                        if (e.target.tagName === "IMG") {
                            props.handleEventType(e.target.parentElement.id);
                            e.target.parentElement.classList.toggle("active");
                        }
                        if (e.target.tagName === "LI") {
                            props.handleEventType(e.target.id);
                            e.target.classList.toggle("active");
                        }
                    }}
                    id="githubook-nav-main-ul"
                    className="githubook-nav-main-ul"
                >
                    <li id="All" className="githubook-card-date active">
                        <img src="https://img.icons8.com/android/24/000000/home.png" />
                        <span className="githubook-card-date-tooltips">{"All Events"}</span>
                    </li>
                    <li id="PushEvent" className="githubook-card-date">
                        <img src="https://img.icons8.com/ios/40/000000/commit-git.png" />
                        <span className="githubook-card-date-tooltips">{"Commits"}</span>
                    </li>
                    <li id="PullRequestEvent" className="githubook-card-date">
                        <img src="https://img.icons8.com/ios/24/000000/pull-request.png" />
                        <span className="githubook-card-date-tooltips">{"Pull Requests"}</span>
                    </li>
                    <li id="IssuesEvent" className="githubook-card-date">
                        <img src="https://img.icons8.com/ios/100/000000/exclamation-mark.png" />
                        <span className="githubook-card-date-tooltips">{"Issues"}</span>
                    </li>
                </ul>
            </div>
            <div id="githubook-nav-side-r">
                <img
                    className="mr-2"
                    src={props.data.avatar_url}
                    style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                ></img>
                <span className="mr-4">{props.data.login}</span>
            </div>
        </div>
    );
};

export default Nav;
