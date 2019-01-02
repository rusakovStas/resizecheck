import { USER_LOGGED_IN, USER_LOGGED_OUT, USER_ROLES } from "./types";
import api from "../api/api";
import setAuthToken from "../utils/setAuthToken"

export const userLoggedIn = user => ({
	type: USER_LOGGED_IN,
	user
})

export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT
});

export const userRoles = roles => ({
	type: USER_ROLES,
	roles
})

export const login = cred => (dispatch) =>
	api.user.login(cred).then(user => {
		localStorage.tokenJWT = user.access_token;
        setAuthToken(user.access_token);
		dispatch(userLoggedIn(user))
	})
	.then(() => api.user.getroles()) // получаем роли юзера и сохраняем их
	.then(roles => {
		localStorage.roles = JSON.stringify(roles);
		dispatch(userRoles(roles))
	})

export const logout = () => dispatch => {
    localStorage.removeItem("tokenJWT");
    localStorage.removeItem("activeTabName");
    localStorage.removeItem("roles");
    setAuthToken();
    dispatch(userLoggedOut())
};

