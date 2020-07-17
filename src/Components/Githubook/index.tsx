import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import getGithubInfo, { GithubProfile } from "../../api/getGithubInfo";
import { getGithubFollower, getGithubFollowing, GithubFollow } from "../../api/getGithubFollow";
import { getGithubEvent, GithubEvent } from "../../api/getGithubEvent";
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

const card = (e: any, idx: number) => {
    return (
        <div key={idx} className="githubook-card">
            <img src={e.actor.avatar_url} style={{ height: "40px", width: "40px" }}></img>
            <h2>{e.actor.login}</h2>
            <h1>{e.type}</h1>
            <h6>{e.created_at}</h6>
            <hr />
        </div>
    );
};

const Githubook = () => {
    const auth = useSelector((state: any) => state.auth);

    const [sideToggle, setSideToggle] = useState(false);
    const [data, setData] = useState<GithubProfile | null>();
    const [following, setFollowing] = useState<GithubFollow[]>([]);
    const [events, setEvents] = useState<GithubEvent[]>([]);

    useEffect(() => {
        getGithubInfo(auth.user).then((info) => {
            setData(info.data);
            getGithubEvent(info.data.login, auth.user).then((e) => {
                //console.log(e);
                setEvents((events) => [...events, ...e.data]);
            });
            getGithubFollowing(auth.user).then((following) => {
                setFollowing(following.data);

                following.data.forEach((f: any) => {
                    getGithubEvent(f.login, auth.user).then((event) => {
                        setEvents((events) => [...events, ...event.data]);
                    });
                });
            });
        });
    }, []);

    useEffect(() => {
        setEvents((events) =>
            events.sort((a, b) => {
                var foo = new Date(a.created_at),
                    bar = new Date(b.created_at);
                return foo > bar ? -1 : 1;
            })
        );
        console.log(events);
    });

    return (
        <div id="githubook-container">
            {data && (
                <>
                    <Nav />
                    <div id="githubook-body">
                        <div id="githubook-side-l">
                            {[
                                [data.avatar_url, data.login, "/githubook"],
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

                        <div id="githubook-main">{events.map((e, idx) => card(e, idx))}</div>
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
                            <div className="following">
                                <h1>Following</h1>
                                <div className="following-content">
                                    {following.map((f) => (
                                        <a>{menubox(f.avatar_url, f.login)}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Githubook;
