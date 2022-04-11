export const API_URL = "https://typescriptcourseapi.herokuapp.com/api";

export const Fetch = (url: string, method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE" = "GET", body?: any, signal?: AbortSignal) => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");
    headers.append("authorization", "Basic cmJsOkFkbWluMTAw");
    const options = {
        method,
        headers,
        body: JSON.stringify(body),
        signal,
    };
    return fetch(API_URL+url, options);
}