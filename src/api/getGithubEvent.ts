import axios from "axios";

export const getGithubEvent = (username: string| undefined, token: string) => {
    /*return axios.get<GithubEvent[]>(
        `https://api.github.com/events` ,  {
            headers: {
              Authorization: `token ${username}`,
            },
          }
    )*/
    
    return axios.get<GithubEvent[]>(
        `https://api.github.com/users/${username}/events`,  {
            headers: {
              Authorization: `token ${token}`,
            },
          }
    )
}

export interface GithubEvent {
    id: string,
    type: string,
    actor: {
        id: number,
        login: string,
        display_login: string,
        gravatar_id: string,
        url: string,
        avatar_url: string
    },
    repo: {
        id: number,
        name: string,
        url: string
    },
    payload: {
        push_id: number,
        size: number,
        distinct_size: number,
        ref: string,
        head: string
        before: string
        commits: [
        {
            sha: string,
            author: {
            email: string,
            name: string
            },
            message: string,
            distinct: true,
            url: string
        }
        ]
    },
    public: true,
    created_at: string
}