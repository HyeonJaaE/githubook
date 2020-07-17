
# Githubook

###### _See github information with facebook shape_
---
##  &#127942; Study GOAL

- [React.js](#React.js)
    - Hook
- [Redux](#Redux)
- [Stylesheet](#Stylesheet)
    - Scss
    - Bootstrap
- [Typescript](#Typescript)
- [GithubAPI](#GithubAPI)
    - Oauth

<br/>

## &#128197; History
 - 2020/07/18 - 깃허브 Oauth 인증 구현, 해당 유저와 팔로잉하고 있는 유저들의 Event를 날짜 순으로 출력


<br/><br/><br/><br/><hr/>

## React.js

`React Hook` 사용

---


## Redux

`useDispatch` , `useSelector`를 사용하여 구현하였다.
access Token을 전달받아 Store에 저장하였다.


```
axios.post(
    "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
    {
        code: window.location.search.split("=")[1],
        client_id: "504c566c0230964f360d",
        client_secret: "e6821d09a158291b5704634c2f49052d50a6e278",
    },
    {
        headers: {
            accept: "application/json",
        },
    }).then((res) => {
        dispatch(setCurrentUser(res.data.access_token));
        props.history.push("/");
    }).catch((err) => console.log(err));
```
`https://github.com/login/oauth/access_token`에 Oauth 정보를 POST하여 access_token을 전달받았다.

---

## Stylesheet

Scss을 사용하여 반응형 디자인 구현하였다.

```
@mixin breakpoint($breakpoint) {
    @if $breakpoint == "small" {
      @media (min-width: 700px) {
        @content;
      }
    }
  
    @else if $breakpoint == "medium" {
      @media (min-width: 900px) {
        @content;
      }
    }
  
    @else if $breakpoint == "large" {
      @media (min-width: 1024px) {
        @content;
      }
    }
}
```

---



## typescript

`Github API`를 사용했을 때 전달받는 값의 타입을 지정
```
export interface GithubProfile {
    login?: string;
    id?: number;
    node_id?: string;
    avatar_url?: string;
    gravatar_id?: string;
    url?: string;
    html_url?: string;
    followers_url?: string;
    following_url?: string;
    gists_url?: string;
    starred_url?: string;
    subscriptions_url?: string;
    organizations_url?: string;
    repos_url?: string;
    events_url?: string;
    received_events_url?: string;
    type?: string;
    site_admin?: boolean;
    name?: string;
    company?: string;
    blog?: string;
    location?: null;
    email?: null;
    hireable?: null;
    bio?: string;
    public_repos?: number;
    public_gists?: number;
    followers?: number;
    following?: number;
    created_at?: Date;
    updated_at?: Date;
}
```

---

## GithubAPI

- [getGithubInfo.ts](https://github.com/HyeonJaaE/githubook/blob/master/src/api/getGithubInfo.ts) 

Header에 access_token을 포함시켜 인증된 사용자의 정보를 가져온다.

<br/>

- [getGithubEvent.ts](https://github.com/HyeonJaaE/githubook/blob/master/src/api/getGithubEvent.ts)

해당 사용자의 username 과 access_token을 POST하여 모든 Event 정보를 가져온다.

<br/>

- [getGithubFollow.ts](https://github.com/HyeonJaaE/githubook/blob/master/src/api/getGithubFollow.ts)


사용자의 팔로잉 및 팔로워 정보를 가져온다.  `getGithubFollowing()`, `getGithubFollower()` 



---


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

