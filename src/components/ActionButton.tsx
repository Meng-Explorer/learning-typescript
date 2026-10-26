import { Button, Space, Popconfirm } from "antd";

interface Props {
    onEdit: () => void;
    onDelete: () => void;
}

export default function ActionButtons({ onEdit, onDelete }: Props) {
    return (
        <Space size="small">
            <Button size="small" onClick={onEdit}>
                Edit
            </Button>
            <Popconfirm
                title="Delete"
                description="Are you sure?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="Cancel"
            >
                <Button type="primary" danger size="small">
                    Delete
                </Button>
            </Popconfirm>
        </Space>
    );
}