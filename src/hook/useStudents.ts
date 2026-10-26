import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import type { Student } from "../type/Student";
import {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent,
} from "../service/StudentService";

export function useStudents() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getStudents();
            setStudents(data);
        } catch (error) {
            console.error(error);
            message.error("Failed to fetch students");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;
        getStudents()
            .then((data) => {
                if (active) {
                    setStudents(data);
                }
            })
            .catch((error) => {
                if (active) {
                    console.error(error);
                    message.error("Failed to fetch students");
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

    const saveStudent = async (student: Student, id?: number) => {
        try {
            if (id) {
                await updateStudent({ ...student, id });
                message.success("Student updated successfully");
            } else {
                await createStudent(student);
                message.success("Student created successfully");
            }
            await fetchStudents();
            return true;
        } catch (error) {
            console.error(error);
            message.error("Operation failed");
            return false;
        }
    };

    const removeStudent = async (id?: number) => {
        if (!id) return;
        try {
            await deleteStudent(id);
            message.success("Student deleted successfully");
            await fetchStudents();
        } catch (error) {
            console.error(error);
            message.error("Failed to delete student");
        }
    };

    return { students, loading, fetchStudents, saveStudent, removeStudent };
}

export default useStudents;