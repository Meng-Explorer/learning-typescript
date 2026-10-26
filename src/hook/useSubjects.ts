import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import type { Subject } from "../type/Subject";
import {
    getSubjects,
    createSubject,
    updateSubject,
    deleteSubject,
} from "../service/SubjectService";

export function useSubjects() {
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchSubjects = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getSubjects();
            setSubjects(data);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch subjects");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        getSubjects()
            .then((data) => {
                if (active) {
                    setSubjects(data);
                }
            })
            .catch((error) => {
                if (active) {
                    console.error(error);
                    message.error("Failed to fetch subjects");
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

    const saveSubject = async (subject: Subject, id?: number) => {
        try {
            if (id) {
                await updateSubject({ ...subject, id });
                message.success("Subject updated successfully");
            } else {
                await createSubject(subject);
                message.success("Subject created successfully");
            }
            await fetchSubjects();
            return true;
        } catch (error) {
            console.error(error);
            message.error("Operation failed");
            return false;
        }
    };

    const removeSubject = async (id?: number) => {
        if (!id) return;
        try {
            await deleteSubject(id);
            message.success("Subject deleted successfully");
            await fetchSubjects();
        } catch (error) {
            console.error(error);
            message.error("Failed to delete subject");
        }
    };

    return { subjects, loading, fetchSubjects, saveSubject, removeSubject };
}

export default useSubjects;