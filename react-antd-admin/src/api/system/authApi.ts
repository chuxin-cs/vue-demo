import apiClient from "../apiClient";

export enum DemoApi {
	TOKEN_EXPIRED = "/api/v1/auth",
}

const getCaptcha = () => apiClient.get({ url: `${DemoApi.TOKEN_EXPIRED}/captcha` });

export default {
	getCaptcha,
};
