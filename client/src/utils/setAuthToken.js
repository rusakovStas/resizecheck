import axios from "axios";
import jwtDecode from "jwt-decode";

export default (token = null) => {
	if (token) {
		console.log(jwtDecode(token));
		axios.defaults.headers.common.authorization = `Bearer ${token}`;
	} else {
		delete axios.defaults.headers.common.authorization;
	}
};
