import { useState } from "react";
import { Table, Card, Tag, Button } from "antd";
import type { Student } from "../type/Student";
import { useStudents } from "../hook/useStudents";
import ActionButtons from "../components/ActionButton";
import StudentModal from "../components/StudentModal";

export default function Student() {
    const { students, loading, saveStudent, removeStudent } = useStudents();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const handleOpenCreate = () => {
        setEditingStudent(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (record: Student) => {
        setEditingStudent(record);
        setModalOpen(true);
    };

    const handleSubmit = async (values: Student) => {
        const success = await saveStudent(values, editingStudent?.id);
        if (success) {
            setModalOpen(false);
        }
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 70 },
        { title: "Full Name", dataIndex: "fullName", key: "fullName" },
        {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
            render: (gender?: string) => (
                <Tag color={gender?.toLowerCase() === "male" ? "blue" : "magenta"}>
                    {gender || "N/A"}
                </Tag>
            ),
        },
        { title: "Section", dataIndex: "sectionName", key: "sectionName" },
        { title: "Subject", dataIndex: "subjectName", key: "subjectName" },
        {
            title: "Actions",
            key: "actions",
            width: 140,
            render: (_: unknown, record: Student) => (
                <ActionButtons
                    onEdit={() => handleOpenEdit(record)}
                    onDelete={() => removeStudent(record.id)}
                />
            ),
        },
    ];

    return (
        <Card className="max-w-5xl mx-auto rounded-2xl shadow-md border-none">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Student Directory</h1>
                <Button type="primary" onClick={handleOpenCreate}>
                    + បន្ថែមសិស្សថ្មី
                </Button>
            </div>

            <Table
                dataSource={students}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <StudentModal
                open={modalOpen}
                editingStudent={editingStudent}
                onCancel={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Card>
    );
}