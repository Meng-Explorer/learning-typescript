import { useState } from "react";
import { Table, Card, Button } from "antd";
import type { Subject } from "../type/Subject";
import { useSubjects } from "../hook/useSubjects";
import { useAppContext } from "../hook/useAppContext";
import ActionButtons from "../components/ActionButton";
import SubjectModal from "../components/SubjectModal";

export default function Subject() {
    const { subjects, loading, saveSubject, removeSubject } = useSubjects();
    const { refreshLookups } = useAppContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

    const handleOpenCreate = () => {
        setEditingSubject(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (record: Subject) => {
        setEditingSubject(record);
        setModalOpen(true);
    };

    const handleSubmit = async (values: Subject) => {
        const success = await saveSubject(values, editingSubject?.id);
        if (success) {
            setModalOpen(false);
            refreshLookups();
        }
    };

    const handleDelete = async (id?: number) => {
        await removeSubject(id);
        refreshLookups();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 70 },
        { title: "Subject Name", dataIndex: "name", key: "name" },
        { title: "Notes", dataIndex: "notes", key: "notes" },
        {
            title: "Actions",
            key: "actions",
            width: 140,
            render: (_: unknown, record: Subject) => (
                <ActionButtons
                    onEdit={() => handleOpenEdit(record)}
                    onDelete={() => handleDelete(record.id)}
                />
            ),
        },
    ];

    return (
        <Card className="max-w-5xl mx-auto rounded-2xl shadow-md border-none">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Subject List</h1>
                <Button type="primary" onClick={handleOpenCreate}>
                    + Add Subject
                </Button>
            </div>

            <Table
                dataSource={subjects}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <SubjectModal
                open={modalOpen}
                editingSubject={editingSubject}
                onCancel={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Card>
    );
}