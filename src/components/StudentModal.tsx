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
            title={editingStudent ? "Edit Student" : "Add New Student"}
            open={open}
            onOk={handleOk}
            onCancel={onCancel}
            okText="Save"
            cancelText="Cancel"
            destroyOnClose
        >
            <Form form={form} layout="vertical" className="mt-4">
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: "Please enter student name" }]}
                >
                    <Input placeholder="Enter full name..." />
                </Form.Item>

                <Form.Item
                    name="gender"
                    label="Gender"
                    rules={[{ required: true, message: "Please select gender" }]}
                >
                    <Select
                        placeholder="Select gender"
                        options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                        ]}
                    />
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

                <Form.Item
                    name="sectionId"
                    label="Section"
                    rules={[{ required: true, message: "Please select section" }]}
                >
                    <Select
                        placeholder="Select section"
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