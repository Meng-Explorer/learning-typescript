import { useState } from "react";
import { Table, Card, Button, Tag } from "antd";
import type { Section } from "../type/Section";
import { useSections } from "../hook/useSections";
import { useAppContext } from "../hook/useAppContext";
import ActionButtons from "../components/ActionButton";
import SectionModal from "../components/SectionModal";

export default function Section() {
    const { sections, loading, saveSection, removeSection } = useSections();
    const { refreshLookups } = useAppContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSection, setEditingSection] = useState<Section | null>(null);

    const handleOpenCreate = () => {
        setEditingSection(null);
        setModalOpen(true);
    };

    const handleOpenEdit = (record: Section) => {
        setEditingSection(record);
        setModalOpen(true);
    };

    const handleSubmit = async (values: Section) => {
        const success = await saveSection(values, editingSection?.id);
        if (success) {
            setModalOpen(false);
            refreshLookups();
        }
    };

    const handleDelete = async (id?: number) => {
        await removeSection(id);
        refreshLookups();
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id", width: 70 },
        {
            title: "Code",
            dataIndex: "code",
            key: "code",
            render: (code?: string) => <Tag color="geekblue">{code || "N/A"}</Tag>,
        },
        { title: "Section Name", dataIndex: "name", key: "name" },
        { title: "Subject", dataIndex: "subjectName", key: "subjectName" },
        { title: "Notes", dataIndex: "notes", key: "notes" },
        {
            title: "Actions",
            key: "actions",
            width: 140,
            render: (_: unknown, record: Section) => (
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
                <h1 className="text-2xl font-bold text-gray-800">Section List</h1>
                <Button type="primary" onClick={handleOpenCreate}>
                    + Add Section
                </Button>
            </div>

            <Table
                dataSource={sections}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 5 }}
            />

            <SectionModal
                open={modalOpen}
                editingSection={editingSection}
                onCancel={() => setModalOpen(false)}
                onSubmit={handleSubmit}
            />
        </Card>
    );
}