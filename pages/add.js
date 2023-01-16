import React from "react";
import { Bars } from "react-loader-spinner";  
import { useRouter } from "next/router";

export default function Add() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      name: event.target.playername.value,
      timeSlots: [],
    };

    for (let i = 1; i < 5; i++) {
      data.timeSlots.push(event.target[i].checked)
    }

    const JSONdata = JSON.stringify(data);
    const endpoint = "/api/addplayer";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch(endpoint, options);
    const result = await response.json();
    if (result.acknowledged == true) {
      alert("Registered with success! ⚔");
      setIsLoading(false);
      refreshData();
    } else {
      alert("An error occurred, please try again... 😞");
      setIsLoading(false);
    }
  };

  return (
    <>
      <main>
        <div className="add">
          <h1>Toggle Scheduler</h1>
          <form onSubmit={handleSubmit} method="POST">
            <input
              type="text"
              className="input-name"
              placeholder="Name here, then toggle available time"
              //placeholder="🔒"
              key="inSlot"
              name="playername"
              id="playername"
              required="1"
              //readOnly
            />
            <br />
            <p className="bohTimeStamps">+2 +8 +14 +20</p>

            <label className="switch"  key="tms1">
              <input type="checkbox" name="timeSlot1" id="time_slot1"/>
              <span className="slider"></span>
            </label>

            <label className="switch"  key="tms2">
              <input type="checkbox" name="timeSlot2" id="time_slot2"/>
              <span className="slider"></span>
            </label>

            <label className="switch"  key="tms3">
              <input type="checkbox" name="timeSlot3" id="time_slot3"/>
              <span className="slider"></span>
            </label>

            <label className="switch"  key="tms4">
              <input type="checkbox" name="timeSlot4" id="time_slot4"/>
              <span className="slider"></span>
            </label>
            <div className="loading-spinner">
              <Bars
                  height="20"
                  width="20"
                  color="#4fa94d"
                  ariaLabel="bars-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={isLoading ? 1 : 0}
              />
            </div>
            <br />
            <button value="Save">
              Save
            </button>
          </form>
        </div>
      </main>
    </>
  );
}