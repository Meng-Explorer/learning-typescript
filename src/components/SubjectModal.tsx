import { useEffect } from "react";
import { Modal, Form, Input } from "antd";
import type { Subject } from "../type/Subject";

interface Props {
    open: boolean;
    editingSubject: Subject | null;
    onCancel: () => void;
    onSubmit: (values: Subject) => Promise<void>;
}

export default function SubjectModal({
    open,
    editingSubject,
    onCancel,
    onSubmit,
}: Props) {
    const [form] = Form.useForm<Subject>();

    useEffect(() => {
        if (open) {
            if (editingSubject) {
                form.setFieldsValue(editingSubject);
            } else {
                form.resetFields();
            }
        }
    }, [open, editingSubject, form]);

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
            title={editingSubject ? "Edit Subject" : "Add New Subject"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="name"
                    label="Subject Name"
                    rules={[{ required: true, message: "Please enter subject name" }]}
                >
                    <Input placeholder="Enter subject name..." />
                </Form.Item>

                <Form.Item name="notes" label="Notes">
                    <Input.TextArea rows={3} placeholder="Enter notes (optional)..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}