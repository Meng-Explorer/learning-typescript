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
            title={editingSubject ? "កែប្រែមុខវិជ្ជា (Edit Subject)" : "បន្ថែមមុខវិជ្ជាថ្មី (Add Subject)"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="រក្សាទុក"
            cancelText="បោះបង់"
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="name"
                    label="ឈ្មោះមុខវិជ្ជា (Name)"
                    rules={[{ required: true, message: "សូមបញ្ចូលឈ្មោះមុខវិជ្ជា" }]}
                >
                    <Input placeholder="បញ្ចូលឈ្មោះមុខវិជ្ជា..." />
                </Form.Item>

                <Form.Item name="notes" label="កំណត់សម្គាល់ (Notes)">
                    <Input.TextArea rows={3} placeholder="បញ្ចូលកំណត់សម្គាល់ (បើមាន)..." />
                </Form.Item>
            </Form>
        </Modal>
    );
}