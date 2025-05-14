import { useState, type ReactNode } from "react";

export interface Tab {
  label: string;
  content: ReactNode;
}
interface TabsProps {
  tabs: Tab[];
  tabsClassname?: string;
  contentClassname?: string;
}

const Tabs = ({ tabs, tabsClassname, contentClassname }: TabsProps) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <div>
      <div className={`flex gap-2 ${tabsClassname}`}>
        {tabs.map((tab, index) => {
          return (
            <div
              key={tab.label}
              onClick={() => handleTabClick(index)}
              className={`cursor-pointer text-xs font-semibold px-2 py-2.5 rounded-lg 
                hover:brightness-90
                ${index == activeTab ? "bg-sky-200" : "bg-light-gray"}`}
            >
              {tab.label}
            </div>
          );
        })}
      </div>
      <div className={`mt-4 ${contentClassname}`}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default Tabs;
