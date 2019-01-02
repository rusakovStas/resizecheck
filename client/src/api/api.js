import axios from 'axios';
import BASE_URL from "./constants"

export default {
	user: {
		login: (cred) => {
			const bt = btoa(`client-id:secret`);
			const config = {
				headers: {"Authorization": `Basic ${bt}`}
			};
			return axios.post(`http://${BASE_URL}/oauth/token?grant_type=password&username=${cred.email}&password=${cred.password}`, '', config).then(res => res.data);
		},
		getroles: () => axios.get(`http://${BASE_URL}/users/myroles`).then(res => res.data)
	},
	admin: {
		getAllUsers: () => axios.get(`http://${BASE_URL}/users/all`).then(res => res.data),
		addUser: (user) => axios.post(`http://${BASE_URL}/users/create`, user).then(response => response.data),
		deleteUser:(user) => axios.delete(`http://${BASE_URL}/users/delete/${user.username}`).then(response => response.data),
	}
}