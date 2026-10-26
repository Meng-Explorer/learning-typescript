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
            message.error("Failed to fetch sections");
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
                    message.error("Failed to fetch sections");
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
                message.success("Section updated successfully");
            } else {
                await createSection(section);
                message.success("Section created successfully");
            }
            await fetchSections();
            return true;
        } catch (error) {
            console.error(error);
            message.error("Operation failed");
            return false;
        }
    };

    const removeSection = async (id?: number) => {
        if (!id) return;
        try {
            await deleteSection(id);
            message.success("Section deleted successfully");
            await fetchSections();
        } catch (error) {
            console.error(error);
            message.error("Failed to delete section");
        }
    };

    return { sections, loading, fetchSections, saveSection, removeSection };
}

export default useSections;