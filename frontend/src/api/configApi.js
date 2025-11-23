import axiosClient from "./axiosClient";

export const fetchConfig = () => axiosClient.get("/config");
