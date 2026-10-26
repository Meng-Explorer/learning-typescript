import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import type { Section } from "../type/Section";
import { useAppContext } from "../hook/useAppContext";

interface Props {
    open: boolean;
    editingSection: Section | null;
    onCancel: () => void;
    onSubmit: (values: Section) => Promise<void>;
}

export default function SectionModal({
    open,
    editingSection,
    onCancel,
    onSubmit,
}: Props) {
    const [form] = Form.useForm<Section>();
    const { subjects } = useAppContext();

    useEffect(() => {
        if (open) {
            if (editingSection) {
                form.setFieldsValue(editingSection);
            } else {
                form.resetFields();
            }
        }
    }, [open, editingSection, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await onSubmit(values);
        } catch {
            // Validation failed
        }
    };

    return (
        <Modal
            title={editingSection ? "កែប្រែក្រុម/ថ្នាក់ (Edit Section)" : "បន្ថែមក្រុម/ថ្នាក់ថ្មី (Add Section)"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="រក្សាទុក"
            cancelText="បោះបង់"
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="code"
                    label="កូដថ្នាក់ (Code)"
                    rules={[{ required: true, message: "សូមបញ្ចូលកូដថ្នាក់" }]}
                >
                    <Input placeholder="បញ្ចូលកូដ (ឧ. SEC01)..." />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="ឈ្មោះក្រុម/ថ្នាក់ (Name)"
                    rules={[{ required: true, message: "សូមបញ្ចូលឈ្មោះក្រុម" }]}
                >
                    <Input placeholder="បញ្ចូលឈ្មោះក្រុម..." />
                </Form.Item>

                <Form.Item
                    name="subjectId"
                    label="មុខវិជ្ជា (Subject)"
                    rules={[{ required: true, message: "សូមជ្រើសរើសមុខវិជ្ជា" }]}
                >
                    <Select
                        placeholder="ជ្រើសរើសមុខវិជ្ជា"
                        options={subjects.map((sub) => ({
                            label: sub.name,
                            value: sub.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item name="notes" label="កំណត់សម្គាល់ (Notes)">
                    <Input.TextArea rows={3} placeholder="បញ្ចូលកំណត់សម្គាល់ (បើមាន)..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}