import axios from "axios";

const getGithubFollower = (username: string| null) => {
    return axios.get<GithubFollower[]>(
        `https://api.github.com/users/${username}/followers`
    );
}

export interface GithubFollower {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    site_admin: false
}


export default getGithubFollower;