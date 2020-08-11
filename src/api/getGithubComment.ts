import axios from "axios";


export const getGithubCommentURL = (url: string, token: string) => {
    return axios.get(url, {
        headers: {
            Authorization: `token ${token}`,
          },
    }).then( res => 
        getGithubComment(res.data.comments_url, token)
    )
}

export const getGithubComment = (url: any, token: string) => {
    return  axios.get<any[]>( url,  {
                headers: {
                    Authorization: `token ${token}`,
                },
            })
}
