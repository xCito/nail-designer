import classNames from "classnames";
import { useEffect, useState } from "react";
import { Chat } from "../chat/Chat";
import { ServiceDetails } from "../service-details/ServiceDetails";
import { Designs } from "../designs/Designs";

const TABS = {
  CHAT: "Star Chat",
  DETAIL: "Service Details",
  DESIGN: "Designs"
} as const;
type Tab = typeof TABS[keyof typeof TABS];

export function Tabs() {
  const tabTitles = [TABS.CHAT, TABS.DETAIL, TABS.DESIGN];
  const [activeTab, setActiveTab] = useState<Tab>(tabTitles[0]);
  
  const onTabClick = (tab: Tab) => {
    setActiveTab(tab);
    sessionStorage.setItem('activeTab', tab);
  }

  useEffect(() => {
    const activeT = sessionStorage.getItem('activeTab');
    if (activeT) setActiveTab(activeT as Tab);
  },[]);

  return <>
    <nav>
      <ol className="tab-titles">
        {tabTitles.map(tab => 
          <li key={tab} 
            className={classNames("tab", {active: activeTab === tab})} 
            onClick={() => onTabClick(tab)}>{tab}</li>
        )}
      </ol>
    </nav>

    <div className="tab-container p-2 pe-0 d-flex" style={{height: '1px'}}>
      {activeTab === TABS.CHAT && <Chat />}
      {activeTab === TABS.DETAIL && <ServiceDetails />}
      {activeTab === TABS.DESIGN && <Designs />}
    </div>
  </>
}