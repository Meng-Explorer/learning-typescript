import { Button } from "antd";
import { useAppContext } from "../hook/useAppContext";

export default function Navbar() {
    const { activeTab, setActiveTab } = useAppContext();

    return (
        <header className="bg-white shadow-sm px-6 py-4 mb-6">
            <div className="max-w-5xl mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold text-indigo-600">
                    School Management
                </h1>
                <div className="flex gap-2">
                    <Button
                        type={activeTab === "students" ? "primary" : "default"}
                        onClick={() => setActiveTab("students")}
                    >
                        Students
                    </Button>
                    <Button
                        type={activeTab === "subjects" ? "primary" : "default"}
                        onClick={() => setActiveTab("subjects")}
                    >
                        Subjects
                    </Button>
                    <Button
                        type={activeTab === "sections" ? "primary" : "default"}
                        onClick={() => setActiveTab("sections")}
                    >
                        Sections
                    </Button>
                </div>
            </div>
        </header>
    );
}