import api, { unwrapList } from "../utils/Api";
import type { Subject } from "../type/Subject";

export const getSubjects = async (): Promise<Subject[]> => {
    const response = await api.get("/Subject");
    return unwrapList<Subject>(response.data);
};

export const createSubject = async (data: Subject): Promise<Subject> => {
    const response = await api.post<Subject>("/Subject", data);
    return response.data;
};

export const updateSubject = async (data: Subject): Promise<Subject> => {
    const response = await api.put<Subject>("/Subject", data);
    return response.data;
};

export const deleteSubject = async (id: number): Promise<void> => {
    await api.delete(`/Subject/${id}`);
};