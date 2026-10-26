import api, { unwrapList } from "../utils/Api";
import type { Section } from "../type/Section";

export const getSections = async (): Promise<Section[]> => {
    const response = await api.get("/Section");
    return unwrapList<Section>(response.data);
};

export const createSection = async (data: Section): Promise<Section> => {
    const response = await api.post<Section>("/Section", data);
    return response.data;
};

export const updateSection = async (data: Section): Promise<Section> => {
    const response = await api.put<Section>("/Section", data);
    return response.data;
};

export const deleteSection = async (id: number): Promise<void> => {
    await api.delete(`/Section/${id}`);
};