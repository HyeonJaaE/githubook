import axios from "axios";

export const addGithubComment = (url: any, commentBody:string, token: string) => {
    const data = {
        body: commentBody
    }
    const config = {
        headers: { 
            Authorization: `token ${token}`,
            accept: `application/vnd.github.v3+json`
        }
    }

    return axios.post(url, data, config);
}

