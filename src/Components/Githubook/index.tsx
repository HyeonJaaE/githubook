import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "../Card";
import getGithubInfo, { GithubProfile } from "../../api/getGithubInfo";
import { getGithubFollower, getGithubFollowing, GithubFollow } from "../../api/getGithubFollow";
import { getGithubEvent, GithubEvent } from "../../api/getGithubEvent";

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

export const infoBox = (avatar: string, name: string) => {
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

const Githubook = (props: any) => {
    const auth = useSelector((state: any) => state.auth);

    const [sideToggle, setSideToggle] = useState(false);
    const [data, setData] = useState<GithubProfile | null>();
    const [following, setFollowing] = useState<GithubFollow[]>([]);
    const [events, setEvents] = useState<GithubEvent[]>([]);
    const [eventType, setEventType] = useState("All");
    const [idx, setIdx] = useState(10);

    useEffect(() => {
        getGithubInfo(auth.user).then((info) => {
            let eventList: any = [],
                idx = 0;

            console.log(info.data);
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
                    console.log(el);
                });
            });
        });
    }, []);

    const handleEventList = () => {
        let li = [];

        for (var i = 0; i < events.length; i++) {
            if (eventType === "All") {
                if (
                    events[i].type === "PushEvent" ||
                    events[i].type === "PullRequestEvent" ||
                    events[i].type === "IssuesEvent"
                )
                    li.push(<Card key={events[i].id} e={events[i]} data={data} />);
            } else {
                events[i].type === eventType &&
                    li.push(<Card key={events[i].id} e={events[i]} data={data} />);
            }

            if (li.length === idx) break;
        }
        return li;
    };

    const handleEventType = (v: any) => {
        setEventType(v);
        setIdx(10);
    };

    const logout = () => {
        localStorage.removeItem("token");
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
                                    data.html_url + "?tab=repositories",
                                ],
                                [
                                    "https://img.icons8.com/ios-glyphs/50/000000/pet-commands-follow.png",
                                    "팔로워",
                                    "square",
                                    data.html_url + "?tab=followers",
                                ],
                                [
                                    "https://img.icons8.com/doodle/48/000000/follow--v1.png",
                                    "팔로잉",
                                    "square",
                                    data.html_url + "?tab=followings",
                                ],
                            ].map((md: any, i) => (
                                <a key={i} href={md[3]}>
                                    {menubox(md[0], md[1], md[2])}
                                </a>
                            ))}
                            <a href="http://localhost:3000" onClick={logout}>
                                &nbsp;&nbsp;&nbsp;logout test
                            </a>
                            {sideToggle ? (
                                <>
                                    {[
                                        [
                                            "https://img.icons8.com/bubbles/48/000000/list.png",
                                            "Gist",
                                            "square",
                                            "https://gist.github.com/" + data.login,
                                        ],
                                        [
                                            "https://img.icons8.com/cotton/64/000000/star.png",
                                            "Star",
                                            "square",
                                            data.html_url + "?tab=stars",
                                        ],
                                    ].map((md: any, i) => (
                                        <a key={i + 4} href={md[3]}>
                                            {menubox(md[0], md[1], md[2])}
                                        </a>
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
                            {handleEventList()}

                            <a className="p-4" onClick={() => setIdx(idx + 10)}>
                                더 보기
                            </a>
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
                                            <a href={f.html_url}>
                                                {menubox(f.avatar_url, f.login, "circle")}
                                            </a>
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
