import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5023/api",
    headers: {
        "Content-Type": "application/json",
    },
});

export interface ApiResponse<T> {
    value?: T[];
    Count?: number;
}

export function unwrapList<T>(data: unknown): T[] {
    if (Array.isArray(data)) {
        return data;
    }
    if (data && typeof data === "object" && "value" in data && Array.isArray((data as { value: unknown }).value)) {
        return (data as { value: T[] }).value;
    }
    return [];
}

export default api;
