import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import getGithubInfo, { GithubProfile } from "../../api/getGithubInfo";
import { getGithubFollower, getGithubFollowing, GithubFollow } from "../../api/getGithubFollow";
import { getGithubEvent, GithubEvent } from "../../api/getGithubEvent";
import printDate from "../../api/printDate";

import Nav from "../Nav";
import "./githubook.scss";

const menubox = (image: string, text: string, imgStyle: string) => {
    return (
        <div className="githubook-menubox">
            <div className="githubook-menubox-icon">
                <img className={imgStyle} src={image}></img>
            </div>
            <div className="githubook-menubox-text">
                <span>{text}</span>
            </div>
        </div>
    );
};

const infoBox = (avatar: string, name: string) => {
    return (
        <div className="githubook-card-info-box">
            <div>
                <img src={avatar} style={{ height: "60px", width: "60px" }}></img>
                {name}
            </div>
            <div className="mt-3">
                <a href={"https://github.com/" + name}>깃허브 - https://github.com/{name}</a>
            </div>
        </div>
    );
};

const card = (e: any, idx: number) => {
    let dateA = printDate(e.created_at),
        dateB = [dateA[0][1], dateA[0][2], dateA[0][4], dateA[0][5], dateA[0][6], dateA[0][7]];

    console.log(e.payload.issue);
    return (
        <div key={idx} className="githubook-card">
            <div className="githubook-card-title">
                <div>
                    <span className="githubook-card-info">
                        <img
                            src={e.actor.avatar_url}
                            style={{ height: "40px", width: "40px" }}
                        ></img>
                        {infoBox(e.actor.avatar_url, e.actor.login)}
                    </span>
                </div>
                <div>
                    <div className="mb-0">
                        <span className="githubook-card-info">
                            {e.actor.login} &gt;&nbsp; {infoBox(e.actor.avatar_url, e.actor.login)}
                        </span>

                        <a href={"https://github.com/" + e.repo.name}>{e.repo.name}</a>
                    </div>
                    <div className="mb-0 githubook-card-date">
                        {dateA[1] ? dateA[1] : dateB}
                        <span className="githubook-card-date-tooltips">{dateA[0]}</span>
                    </div>
                </div>
            </div>
            <div className="githubook-card-main">
                - {e.type}
                <hr />
                {e.type === "PushEvent" && (
                    //<h5>{JSON.stringify(e.payload.commits[0].message).split('"')[1]}</h5>
                    <h5>{e.payload.commits[0].message}</h5>
                )}
                {e.type === "IssuesEvent" && (
                    <h5>{JSON.stringify(e.payload.issue.body).split('"')[1].split("\\r\\n")}</h5>
                )}
            </div>
        </div>
    );
};

const Githubook = () => {
    const auth = useSelector((state: any) => state.auth);

    const [sideToggle, setSideToggle] = useState(false);
    const [data, setData] = useState<GithubProfile | null>();
    const [following, setFollowing] = useState<GithubFollow[]>([]);
    const [events, setEvents] = useState<GithubEvent[]>([]);
    const [eventType, setEventType] = useState("All");

    useEffect(() => {
        getGithubInfo(auth.user).then((info) => {
            let eventList: any = [],
                idx = 0;

            setData(info.data);

            getGithubEvent(info.data.login, auth.user).then((e) => {
                eventList.push(...e.data);
            });

            getGithubFollowing(auth.user).then((following) => {
                setFollowing(following.data);

                let getFollowingEvent = () => {
                    return new Promise((res, rej) => {
                        following.data.forEach((f: any, i: number) => {
                            getGithubEvent(f.login, auth.user).then((event) => {
                                eventList.push(...event.data);
                                idx += 1;
                                if (idx === following.data.length) res(eventList);
                            });
                        });
                    });
                };

                getFollowingEvent().then((el: any) => {
                    el.sort((a: any, b: any) => {
                        var foo = new Date(a.created_at),
                            bar = new Date(b.created_at);
                        return foo > bar ? -1 : 1;
                    });
                    setEvents(el);
                });
            });
        });
    }, []);

    const handleEventType = (v: any) => {
        setEventType(v);
    };

    return (
        <div id="githubook-container">
            {data && (
                <>
                    <Nav data={data} handleEventType={handleEventType} />
                    <div id="githubook-body">
                        <div id="githubook-side-l">
                            {[
                                [data.avatar_url, data.login, "circle", "/githubook"],
                                [
                                    "https://img.icons8.com/fluent/48/000000/github.png",
                                    "깃허브",
                                    "square",
                                    data.html_url,
                                ],
                                [
                                    "https://img.icons8.com/dotty/50/000000/repository.png",
                                    "저장소",
                                    "square",
                                    data.repos_url,
                                ],
                                [
                                    "https://img.icons8.com/ios-glyphs/50/000000/pet-commands-follow.png",
                                    "팔로워",
                                    "square",
                                    data.followers_url,
                                ],
                                [
                                    "https://img.icons8.com/doodle/48/000000/follow--v1.png",
                                    "팔로잉",
                                    "square",
                                    data.following_url,
                                ],
                            ].map((md: any, i) => (
                                <a key={i} href={md[3]}>
                                    {menubox(md[0], md[1], md[2])}
                                </a>
                            ))}
                            {sideToggle ? (
                                <>
                                    {[
                                        [
                                            "https://img.icons8.com/bubbles/48/000000/list.png",
                                            "Gist",
                                            "square",
                                            data.gists_url,
                                        ],
                                        [
                                            "https://img.icons8.com/cotton/64/000000/star.png",
                                            "Star",
                                            "square",
                                            data.starred_url,
                                        ],
                                    ].map((md: any) => (
                                        <a href={md[3]}>{menubox(md[0], md[1], md[2])}</a>
                                    ))}
                                    <div onClick={() => setSideToggle(sideToggle ? false : true)}>
                                        {menubox(
                                            "https://img.icons8.com/windows/64/000000/minus.png",
                                            "간략하게 보기",
                                            "square"
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div onClick={() => setSideToggle(sideToggle ? false : true)}>
                                        {menubox(
                                            "https://img.icons8.com/windows/48/000000/plus.png",
                                            "더보기",
                                            "square"
                                        )}
                                    </div>
                                </>
                            )}
                        </div>

                        <div id="githubook-main">
                            {eventType === "All"
                                ? events.map((e, idx) => card(e, idx))
                                : events.map((e, idx) => e.type === eventType && card(e, idx))}
                        </div>
                        <div id="githubook-side-r">
                            <div className="madeinfo">
                                <h1>Made By</h1>
                                <div className="madeinfo-content">
                                    <a href="https://github.com/hyeonjaae/githubook">
                                        {menubox(
                                            "https://avatars0.githubusercontent.com/u/34333474?v=4",
                                            "HyeonJaae",
                                            "circle"
                                        )}
                                    </a>
                                </div>
                                <hr />
                            </div>
                            <div className="following">
                                <h1>Following</h1>
                                <div className="following-content">
                                    {following.map((f, i) => (
                                        <div key={i} className="">
                                            <a>{menubox(f.avatar_url, f.login, "circle")}</a>
                                            {infoBox(f.avatar_url, f.login)}
                                        </div>
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
