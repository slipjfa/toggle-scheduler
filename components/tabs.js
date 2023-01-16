import React, { useState } from "react";

const Tabs = (playersCount) => {
  const sorted = playersCount.players;
  const [activeTab, setActiveTab] = useState(0);
  const allTabs = ["All", "+2", "+8", "+14", "+20"];

  function DisplayTab(activeTab) {
    if (activeTab === 0) {
      return <FirstTab total={sorted.total} />;
    } else {
      return <Tab activeTabInfo={Object.values(sorted)[activeTab]} />;
    }
  }
  return (
    <div className="Tabs">
      <ul className="nav">
        {allTabs.map((tab, tabNumber) => {
          return (
            <li
              key={tabNumber}
              className={activeTab === tabNumber ? "active" : ""}
              onClick={() => setActiveTab(tabNumber)}
            >
              {tab} ({Object.values(sorted)[tabNumber].length})
            </li>
          );
        })}
      </ul>
      <div className="outlet">{DisplayTab(activeTab)}</div>
    </div>
  );
};

const Tab = (activeTabInfo) => {
  return (
    <div className={"Tab"}>{DisplayNames(Object.values(activeTabInfo)[0])}</div>
  );
};

const FirstTab = (total) => {
  return <div className="FirstTab">{DisplayAllNamesAndTime(total)}</div>;
};

const DisplayNames = (timeSlot) => {
  return timeSlot.map((name, index) => {
    return (
      <div key={index}>
        <input
          type="text"
          className="input-name"
          name="playername"
          id="playername"
          readOnly
          value={name}
        />
        <br />
      </div>
    );
  });
};

const DisplayAllNamesAndTime = (players) => {
  return players.total.map((player) => {
    return (
      <div key={player._id}>
        <input
          className="input-name"
          type="text"
          name="playername"
          id="playername"
          readOnly
          value={player.name}
        />
        <br />
        {player.timeSlots.map((slot, index) => {
          return (
            <label className="switch" key={index}>
              <input
                type="checkbox"
                name={"time-slot" + index}
                id={"time-slot" + index}
                checked={slot ? "checked" : ""}
                readOnly
              />
              <span className="slider"></span>
            </label>
          );
        })}
      </div>
    );
  });
};

export default Tabs;
