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
            message.error("មិនអាចទាញយកទិន្នន័យសិស្សបានទេ");
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
                    message.error("មិនអាចទាញយកទិន្នន័យសិស្សបានទេ");
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
                message.success("កែប្រែព័ត៌មានសិស្សជោគជ័យ");
            } else {
                await createStudent(student);
                message.success("បន្ថែមសិស្សថ្មីជោគជ័យ");
            }
            await fetchStudents();
            return true;
        } catch (error) {
            console.error(error);
            message.error("ប្រតិបត្តិការបរាជ័យ");
            return false;
        }
    };

    const removeStudent = async (id?: number) => {
        if (!id) return;
        try {
            await deleteStudent(id);
            message.success("លុបទិន្នន័យជោគជ័យ");
            await fetchStudents();
        } catch (error) {
            console.error(error);
            message.error("មិនអាចលុបទិន្នន័យបានទេ");
        }
    };

    return { students, loading, fetchStudents, saveStudent, removeStudent };
}

export default useStudents;