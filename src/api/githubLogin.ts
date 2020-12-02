import axios from "axios";

export const githubLogin = (url: string, data: any) => {
    const headers = {
        headers: {
            accept: "application/json",
        },
    };
    return axios.post(url, data, headers);
};
