import axios from "axios";

export const getGithubCommentURL = (url: string, token: string) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };

    return axios.get(url, config).then((res) => getGithubComment(res.data.comments_url, token));
};

export const getGithubComment = (url: any, token: string) => {
    const config = {
        headers: {
            Authorization: `token ${token}`,
        },
    };
    return axios.get<any[]>(url, config);
};
