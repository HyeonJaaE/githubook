import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getGithubInfo, { GithubProfile } from "../../api/getGithubInfo";
import getGithubFollower, { GithubFollower } from "../../api/getGithubFollower";
import Nav from "../Nav";
import "./githubook.scss";

const menubox = (image: string, text: string) => {
    return (
        <div className="githubook-menubox">
            <div className="githubook-menubox-icon">
                <img src={image}></img>
            </div>
            <div className="githubook-menubox-text">
                <span>{text}</span>
            </div>
        </div>
    );
};

const card = () => {
    return (
        <div className="githubook-card">
            <div>card</div>
        </div>
    );
};

const Githubook = () => {
    const auth = useSelector((state: any) => state.auth);

    const [sideToggle, setSideToggle] = useState(false);
    const [data, setData] = useState<GithubProfile | null>();
    const [follower, setFollower] = useState<GithubFollower[]>([]);

    useEffect(() => {
        getGithubInfo(auth.user).then((info) => {
            getGithubFollower(String(info.data.login)).then((follower) => {
                setFollower(follower.data);
            });
            setData(info.data);
        });
    }, []);

    useEffect(() => {});

    return (
        <div id="githubook-container">
            {data && (
                <>
                    <Nav />
                    <div id="githubook-body">
                        <div id="githubook-side-l">
                            {[
                                [data.avatar_url, data.login, "/"],
                                [data.avatar_url, "깃허브", data.html_url],
                                [data.avatar_url, "저장소", data.repos_url],
                                [data.avatar_url, "팔로워", data.followers_url],
                                [data.avatar_url, "팔로잉", data.following_url],
                            ].map((md: any) => (
                                <a href={md[2]}>{menubox(md[0], md[1])}</a>
                            ))}
                            {sideToggle ? (
                                <>
                                    {[
                                        [data.avatar_url, "Gist", data.gists_url],
                                        [data.avatar_url, "Star", data.starred_url],
                                    ].map((md: any) => (
                                        <a href={md[2]}>{menubox(md[0], md[1])}</a>
                                    ))}
                                    <div onClick={() => setSideToggle(sideToggle ? false : true)}>
                                        {menubox(
                                            "https://en.followersnet.com/wp-content/uploads/2016/02/Facebook-1.png",
                                            "간략하게 보기"
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div onClick={() => setSideToggle(sideToggle ? false : true)}>
                                        {menubox(
                                            "https://en.followersnet.com/wp-content/uploads/2016/02/Facebook-1.png",
                                            "더보기"
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <div id="githubook-main">
                            {[1, 2, 3, 4, 5, 4, 1, 5, 135, 135, 13, 5, 135, 13, 53, 5, 3].map(() =>
                                card()
                            )}
                        </div>
                        <div id="githubook-side-r">
                            <div className="madeinfo">
                                <h1>Made By</h1>
                                <div className="madeinfo-content">
                                    <a href="https://github.com/hyeonjaae">
                                        {menubox(
                                            "https://avatars0.githubusercontent.com/u/34333474?v=4",
                                            "HyeonJaae"
                                        )}
                                    </a>
                                </div>
                                <hr />
                            </div>
                            <div className="followers">
                                {follower.map((f) => (
                                    <a
                                        onClick={() => {
                                            localStorage.setItem("token", f.login);
                                            window.location.reload();
                                        }}
                                    >
                                        {menubox(f.avatar_url, f.login)}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Githubook;
