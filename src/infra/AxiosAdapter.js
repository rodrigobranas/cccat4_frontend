import axios from "axios";

export default class AxiosAdapter {

	get (url) {
		return axios({ url, method: "get" });
	}

	post (url, data) {
		return axios({ url, method: "post", data });
	}
} 