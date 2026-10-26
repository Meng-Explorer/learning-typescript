import { useState, useEffect, type ReactNode } from "react";
import type { Subject } from "../type/Subject";
import type { Section } from "../type/Section";
import { getSubjects } from "../service/SubjectService";
import { getSections } from "../service/SectionService";
import { AppContext, type TabType } from "../hook/useAppContext";

export function AppProvider({ children }: { children: ReactNode }) {
    const [activeTab, setActiveTab] = useState<TabType>("students");
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [sections, setSections] = useState<Section[]>([]);

    const refreshLookups = async () => {
        try {
            const [subData, secData] = await Promise.all([getSubjects(), getSections()]);
            setSubjects(subData);
            setSections(secData);
        } catch (error) {
            console.error("Failed to load lookup data:", error);
        }
    };

    useEffect(() => {
        let active = true;
        Promise.all([getSubjects(), getSections()])
            .then(([subData, secData]) => {
                if (active) {
                    setSubjects(subData);
                    setSections(secData);
                }
            })
            .catch((error) => {
                console.error("Failed to load lookup data:", error);
            });

        return () => {
            active = false;
        };
    }, []);

    return (
        <AppContext.Provider value={{ activeTab, setActiveTab, subjects, sections, refreshLookups }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;