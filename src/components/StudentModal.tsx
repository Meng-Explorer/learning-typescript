import { useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import type { Student } from "../type/Student";
import { useAppContext } from "../hook/useAppContext";

interface Props {
    open: boolean;
    editingStudent: Student | null;
    onCancel: () => void;
    onSubmit: (values: Student) => Promise<void>;
}

export default function StudentModal({
    open,
    editingStudent,
    onCancel,
    onSubmit,
}: Props) {
    const [form] = Form.useForm<Student>();
    const { subjects, sections } = useAppContext();

    useEffect(() => {
        if (open) {
            if (editingStudent) {
                form.setFieldsValue(editingStudent);
            } else {
                form.resetFields();
            }
        }
    }, [open, editingStudent, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            await onSubmit(values);
        } catch {
            // Form validation failed
        }
    };

    return (
        <Modal
            title={editingStudent ? "កែប្រែព័ត៌មានសិស្ស" : "បន្ថែមសិស្សថ្មី"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="រក្សាទុក"
            cancelText="បោះបង់"
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="fullName"
                    label="ឈ្មោះពេញ (Full Name)"
                    rules={[{ required: true, message: "សូមបញ្ចូលឈ្មោះសិស្ស" }]}
                >
                    <Input placeholder="បញ្ចូលឈ្មោះពេញ..." />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="ភេទ (Gender)"
                    rules={[{ required: true, message: "សូមជ្រើសរើសភេទ" }]}
                >
                    <Select
                        placeholder="ជ្រើសរើសភេទ"
                        options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                        ]}
                    />
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

                <Form.Item
                    name="sectionId"
                    label="ក្រុម/ថ្នាក់ (Section)"
                    rules={[{ required: true, message: "សូមជ្រើសរើសក្រុម" }]}
                >
                    <Select
                        placeholder="ជ្រើសរើសក្រុម"
                        options={sections.map((sec) => ({
                            label: sec.name,
                            value: sec.id,
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}