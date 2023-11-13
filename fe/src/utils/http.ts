import axios from "axios";
import jsCookie from "js-cookie";

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  headers: {
    Authorization: `Bearer ${jsCookie?.get("token")}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    // Allow only status codes in the range 200-599
    return status >= 200 && status < 600;
  },
});

export default http;
