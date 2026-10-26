import { createContext, useContext } from "react";
import type { Subject } from "../type/Subject";
import type { Section } from "../type/Section";

export type TabType = "students" | "subjects" | "sections";

export interface AppContextType {
    activeTab: TabType;
    setActiveTab: (tab: TabType) => void;
    subjects: Subject[];
    sections: Section[];
    refreshLookups: () => Promise<void>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within AppProvider");
    }
    return context;
};

export default useAppContext;
