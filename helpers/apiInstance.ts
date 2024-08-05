import axios from "axios";

export const thirdPartyApiInstance = axios.create({
  baseURL: "http://localhost:5000",
});
const myOwnApiInstance = axios.create({
  baseURL: "http://amazon.apigateway:3000",
});
