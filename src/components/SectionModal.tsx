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
            title={editingSection ? "Edit Section" : "Add New Section"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="code"
                    label="Code"
                    rules={[{ required: true, message: "Please enter section code" }]}
                >
                    <Input placeholder="Enter code (e.g. SEC01)..." />
                </Form.Item>

                <Form.Item
                    name="name"
                    label="Section Name"
                    rules={[{ required: true, message: "Please enter section name" }]}
                >
                    <Input placeholder="Enter section name..." />
                </Form.Item>

                <Form.Item
                    name="subjectId"
                    label="Subject"
                    rules={[{ required: true, message: "Please select subject" }]}
                >
                    <Select
                        placeholder="Select subject"
                        options={subjects.map((sub) => ({
                            label: sub.name,
                            value: sub.id,
                        }))}
                    />
                </Form.Item>

                <Form.Item name="notes" label="Notes">
                    <Input.TextArea rows={3} placeholder="Enter notes (optional)..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}