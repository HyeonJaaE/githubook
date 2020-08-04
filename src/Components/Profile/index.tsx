import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import getGithubInfo, { GithubProfile } from "../../api/getGithubInfo";
import { getGithubFollower, getGithubFollowing, GithubFollow } from "../../api/getGithubFollow";
import { getGithubEvent, GithubEvent } from "../../api/getGithubEvent";

import Nav from "../Nav";

const Profile = () => {
    const auth = useSelector((state: any) => state.auth);
};
