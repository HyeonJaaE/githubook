// set logged in user

export type AuthTypes = ReturnType<typeof setCurrentUser>;

export const SET_USER = "SET_CURRENT_USER" as const;

export const setCurrentUser = (user: any) => ({
    type: SET_USER,
    payload: user,
});
