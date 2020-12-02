import axios from "axios";

export const getGithubFollower = (username: string | null) => {
    return axios.get<GithubFollow[]>(`https://api.github.com/users/${username}/followers`);
};

export const getGithubFollowing = (username: string | null) => {
    const config = {
        headers: {
            Authorization: `token ${username}`,
        },
    };

    return axios.get(`https://api.github.com/user/following`, config);
    /*return axios.get<GithubFollow[]>(
        `https://api.github.com/users/${username}/following`
    );*/
};

export interface GithubFollow {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: false;
}
