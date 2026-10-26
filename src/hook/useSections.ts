import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import type { Section } from "../type/Section";
import {
    getSections,
    createSection,
    updateSection,
    deleteSection,
} from "../service/SectionService";

export function useSections() {
    const [sections, setSections] = useState<Section[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSections = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getSections();
            setSections(data);
        } catch (error) {
            console.error(error);
            message.error("មិនអាចទាញយកទិន្នន័យក្រុម/ថ្នាក់បានទេ");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        getSections()
            .then((data) => {
                if (active) {
                    setSections(data);
                }
            })
            .catch((error) => {
                if (active) {
                    console.error(error);
                    message.error("មិនអាចទាញយកទិន្នន័យក្រុម/ថ្នាក់បានទេ");
                }
            })
            .finally(() => {
                if (active) {
                    setLoading(false);
                }
            });

        return () => {
            active = false;
        };
    }, []);

    const saveSection = async (section: Section, id?: number) => {
        try {
            if (id) {
                await updateSection({ ...section, id });
                message.success("កែប្រែក្រុម/ថ្នាក់ជោគជ័យ");
            } else {
                await createSection(section);
                message.success("បន្ថែមក្រុម/ថ្នាក់ថ្មីជោគជ័យ");
            }
            await fetchSections();
            return true;
        } catch (error) {
            console.error(error);
            message.error("ប្រតិបត្តិការបរាជ័យ");
            return false;
        }
    };

    const removeSection = async (id?: number) => {
        if (!id) return;
        try {
            await deleteSection(id);
            message.success("លុបក្រុម/ថ្នាក់ជោគជ័យ");
            await fetchSections();
        } catch (error) {
            console.error(error);
            message.error("មិនអាចលុបក្រុម/ថ្នាក់បានទេ");
        }
    };

    return { sections, loading, fetchSections, saveSection, removeSection };
}

export default useSections;