import axiosClient from "./axiosClient";

export const loginRequest = (payload) => {
  // payload: { email, password }
  return axiosClient.post("/user/login", payload);
};

export const signupRequest = (payload) => {
  // payload: { name, email, password }
  return axiosClient.post("/user/signup", payload);
};
