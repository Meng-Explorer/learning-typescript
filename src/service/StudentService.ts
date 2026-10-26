import api, { unwrapList } from "../utils/Api";
import type { Student } from "../type/Student";

export const getStudents = async (): Promise<Student[]> => {
    const response = await api.get("/Student");
    return unwrapList<Student>(response.data);
};

export const createStudent = async (data: Student): Promise<Student> => {
    const response = await api.post<Student>("/Student", data);
    return response.data;
};

export const updateStudent = async (data: Student): Promise<Student> => {
    const response = await api.put<Student>("/Student", data);
    return response.data;
};

export const deleteStudent = async (id: number): Promise<void> => {
    await api.delete(`/Student/${id}`);
};