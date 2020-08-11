import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

const CommentBox = (props: any) => {
    const [info, setInfo] = useState<any[]>();

    useEffect(() => {
        if (props.comment[props.idx]) {
            setInfo(props.comment[props.idx]);
        }
    });

    return (
        <div className="my-4">
            {info ? (
                info.length > 0 ? (
                    info.map((i) => (
                        <div key={i.id} className="my-2 d-flex">
                            <img
                                style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                src={i.user.avatar_url}
                            />
                            <div
                                className="mx-3 p-2"
                                style={{ borderRadius: "15px", backgroundColor: "#F0F2F5" }}
                            >
                                <h6>{i.user.login}</h6>

                                <ReactMarkdown source={i.body} />
                            </div>
                        </div>
                    ))
                ) : (
                    <div>댓글이 없습니다</div>
                )
            ) : (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CommentBox;
