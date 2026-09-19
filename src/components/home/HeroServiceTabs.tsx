"use client";

import { useState, useEffect } from "react";

type ServiceTab = "art" | "baby-sitter" | "elder-care";

interface TabItem {
  id: ServiceTab;
  label: string;
}

const TABS: TabItem[] = [
  { id: "art", label: "Asisten Rumah Tangga" },
  { id: "baby-sitter", label: "Baby Sitter" },
  { id: "elder-care", label: "Perawat Lansia" },
];

export default function HeroServiceTabs() {
  const [activeTab, setActiveTab] = useState<ServiceTab>("art");

  // Sync with initial URL hash if present
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as ServiceTab;
    if (hash && (hash === "art" || hash === "baby-sitter" || hash === "elder-care")) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabClick = (id: ServiceTab) => {
    setActiveTab(id);
    // Update hash smoothly without causing jump
    if (typeof window !== "undefined" && window.history) {
      window.history.replaceState(null, "", `#${id}`);
    }
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full">
      <div className="glass-surface p-2 rounded-xl flex flex-wrap sm:flex-nowrap gap-2 border border-outline-subtle/50 shadow-sm">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg font-sans text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-brand-pine text-white shadow-sm"
                  : "text-brand-charcoal hover:bg-surface-container-low"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
