import { navigate } from "raviger";

export const API_URL = "https://typescriptcourseapi.herokuapp.com/api";

export const Fetch = (url: string, method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET", body?: any, signal?: AbortSignal) => {
    const headers = new Headers();
    const token = localStorage.getItem("token");
    if (token === null) {
        alert("You are not logged in");
        window.location.href = "/login";
    }
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("authorization", `Token ${localStorage.getItem("token")}`);
    const options = {
        method,
        headers,
        body: JSON.stringify(body),
        signal,
    };
    return fetch(API_URL+url, options);
}