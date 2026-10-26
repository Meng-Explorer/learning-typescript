import { AppProvider } from "./context/AppContext";
import { useAppContext } from "./hook/useAppContext";
import Navbar from "./components/Navbar";
import Student from "./app/Student";
import Subject from "./app/Subject";
import Section from "./app/Section";

function MainContent() {
    const { activeTab } = useAppContext();

    return (
        <div className="min-h-screen bg-slate-100 pb-10">
            <Navbar />
            <main className="px-6">
                {activeTab === "students" && <Student />}
                {activeTab === "subjects" && <Subject />}
                {activeTab === "sections" && <Section />}
            </main>
        </div>
    );
}

export default function App() {
    return (
        <AppProvider>
            <MainContent />
        </AppProvider>
    );
}