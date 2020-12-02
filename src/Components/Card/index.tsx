import React, { useState, useEffect } from "react";
import printDate from "../../api/printDate";
import ReactMarkdown from "react-markdown/with-html";
import { infoBox } from "../Githubook";
import CommentBox from "../CommentBox";
import { useSelector } from "react-redux";
import { getGithubCommentURL, getGithubComment } from "../../api/getGithubComment";
import { addGithubComment } from "../../api/addGithubComment";

const Card = (props: any) => {
    const auth = useSelector((state: any) => state.auth);
    const [comment, setComment] = useState({});

    let dateA = printDate(props.e.created_at),
        dateB = [dateA[0][1], dateA[0][2], dateA[0][4], dateA[0][5], dateA[0][6], dateA[0][7]];

    const toggleComment = (idx: string) => {
        let foo = document.getElementById(idx);
        foo?.classList.toggle("active");
    };

    const handleComment = (url: string, idx: string) => {
        if (props.e.type === "PushEvent") {
            getGithubCommentURL(url, auth.user).then((res) => {
                console.log(res);
                setComment({ ...comment, [idx]: [...res.data] });
            });
        } else {
            getGithubComment(url, auth.user).then((res) =>
                setComment({ ...comment, [idx]: [...res.data] })
            );
        }
    };

    const commentForm = (
        <>
            <img
                style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "50%",
                }}
                src={props.data.avatar_url}
            />
            <div className="mx-3" style={{ width: "100%" }}>
                <textarea
                    autoFocus
                    style={{ width: "100%", resize: "none" }}
                    id="commentBody"
                    placeholder="댓글"
                ></textarea>
                <button className="btn btn-success" style={{ float: "right" }} type="submit">
                    Submit
                </button>
            </div>
        </>
    );

    return (
        <div key={props.e.id} className="githubook-card">
            <div className="githubook-card-title">
                <div>
                    <span className="githubook-card-info">
                        <img
                            src={props.e.actor.avatar_url}
                            style={{ height: "40px", width: "40px" }}
                        ></img>
                        {infoBox(props.e.actor.avatar_url, props.e.actor.login)}
                    </span>
                </div>
                <div>
                    <div className="mb-0">
                        <span className="githubook-card-info">
                            {props.e.actor.login} &gt;&nbsp;{" "}
                            {infoBox(props.e.actor.avatar_url, props.e.actor.login)}
                        </span>

                        <a href={"https://github.com/" + props.e.repo.name}>{props.e.repo.name}</a>
                    </div>
                    <div className="mb-0 githubook-card-date">
                        {dateA[1] ? dateA[1] : dateB}
                        <span className="githubook-card-date-tooltips">{dateA[0]}</span>
                    </div>
                </div>
            </div>
            <div className="githubook-card-main">
                {props.e.type === "PushEvent" && (
                    <>
                        Commits
                        <p className="lead">- {props.e.payload.ref?.split("/")[2]} branch</p>
                        <hr />
                        {props.e.payload.commits.map((c: any) => (
                            <div key={c.sha}>
                                <div className="py-3">
                                    <ReactMarkdown source={c.message} />
                                    <p className="lead">comitted by {c.author.name}</p>
                                </div>
                                <hr />
                                <div className="">
                                    <a
                                        onClick={() => {
                                            toggleComment(c.sha);
                                            handleComment(c.url, c.sha);
                                        }}
                                        style={{ fontSize: "12px" }}
                                    >
                                        댓글
                                    </a>
                                    <div className="githubook-card-comment" id={c.sha}>
                                        {comment && <CommentBox comment={comment} idx={c.sha} />}

                                        <form
                                            className="d-flex"
                                            onSubmit={(e: any) => {
                                                e.preventDefault();
                                                let comment = e.target.commentBody.value;
                                                e.target.commentBody.value = "";
                                                addGithubComment(
                                                    c.url + "/comments",
                                                    comment,
                                                    auth.user
                                                ).then((res) => {
                                                    handleComment(c.url, c.sha);
                                                    console.log(res);
                                                });
                                            }}
                                        >
                                            {commentForm}
                                        </form>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                    </>
                )}
                {props.e.type === "IssuesEvent" && (
                    <>
                        Issues - {props.e.payload.action}
                        <hr />
                        <div className="py-3">
                            <ReactMarkdown
                                source={props.e.payload.issue?.body}
                                escapeHtml={false}
                            />
                        </div>
                        <hr />
                        <div className="">
                            <a
                                onClick={() => {
                                    toggleComment(props.e.id);
                                    handleComment(props.e.payload.issue.comments_url, props.e.id);
                                }}
                                style={{ fontSize: "12px" }}
                            >
                                댓글
                            </a>
                            <div className="githubook-card-comment" id={props.e.id}>
                                {comment && <CommentBox comment={comment} idx={props.e.id} />}
                                <div className="">
                                    <form
                                        className="d-flex"
                                        onSubmit={(e: any) => {
                                            e.preventDefault();
                                            let comment = e.target.commentBody.value;
                                            e.target.commentBody.value = "";
                                            addGithubComment(
                                                props.e.payload.issue.comments_url,
                                                comment,
                                                auth.user
                                            ).then((res) => {
                                                handleComment(
                                                    props.e.payload.issue.comments_url,
                                                    props.e.id
                                                );
                                                console.log(res);
                                            });
                                        }}
                                    >
                                        {commentForm}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                )}
                {props.e.type === "PullRequestEvent" && (
                    <>
                        PullRequest - {props.e.payload.action}
                        <hr />
                        <div className="py-3">
                            {props.e.payload.pull_request.body ? (
                                <ReactMarkdown
                                    source={props.e.payload.pull_request.body}
                                    escapeHtml={false}
                                />
                            ) : (
                                <p className="lead">No description</p>
                            )}
                        </div>
                        <hr />
                        <div>
                            <a
                                onClick={() => {
                                    toggleComment(props.e.id);
                                    handleComment(
                                        props.e.payload.pull_request.comments_url,
                                        props.e.id
                                    );
                                }}
                                style={{ fontSize: "12px" }}
                            >
                                댓글
                            </a>
                            <div className="githubook-card-comment" id={props.e.id}>
                                {comment && <CommentBox comment={comment} idx={props.e.id} />}
                                <div className="">
                                    <form
                                        className="d-flex"
                                        onSubmit={(e: any) => {
                                            e.preventDefault();
                                            let comment = e.target.commentBody.value;
                                            e.target.commentBody.value = "";
                                            addGithubComment(
                                                props.e.payload.issue.comments_url,
                                                comment,
                                                auth.user
                                            ).then((res) => {
                                                handleComment(
                                                    props.e.payload.issue.comments_url,
                                                    props.e.id
                                                );
                                                console.log(res);
                                            });
                                        }}
                                    >
                                        {commentForm}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <hr />
                    </>
                )}
            </div>
        </div>
    );
};

export default Card;
