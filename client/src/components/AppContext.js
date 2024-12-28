import React, { createContext, useState, useEffect } from "react";

const MyContext = createContext();

// export const useAppContext = () => useContext(AppContext);

const MyProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [hikers, setHikers] = useState([]);
  const [trails, setTrails] = useState([]);
  const [hiker, setHiker] = useState({
    name: "",
    skill_level: "",
    trails: [],
  });

  useEffect(() => {
    fetch("/parks")
      .then((r) => r.json())
      .then((parks_array) => setParks(parks_array))
      .catch((error) => console.error("Error fetching parks:", error));
  }, []);

  useEffect(() => {
    fetch("/hikers")
      .then((r) => r.json())
      .then((hikers_array) => setHikers(hikers_array));
  }, []);

  useEffect(() => {
    fetch("/trails")
      .then((r) => r.json())
      .then((trails_array) => setTrails(trails_array));
  }, []);

  // Update trail
  const updateTrail = async (id, updatedTrailData) => {
    try {
      const response = await fetch(`/trails/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTrailData),
      });

      if (response.ok) {
        const updatedTrail = await response.json();
        setTrails((prevTrails) =>
          prevTrails.map((trail) =>
            trail.id === updatedTrail.id ? updatedTrail : trail
          )
        );
      } else {
        console.error("Failed to update trail");
      }
    } catch (error) {
      console.error("Error updating trail:", error);
    }
  };

  const updateHiker = async (id, updatedHikerData) => {
    try {
      const response = await fetch(`/hikers/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedHikerData),
      });
      console.log(response);
      if (response.ok) {
        const updatedHiker = await response.json();
        setHikers((prevHikers) =>
          prevHikers.map((hiker) =>
            hiker.id === updatedHiker.id ? updatedHiker : hiker
          )
        );
        setHiker(updatedHiker);
      } else {
        console.error("Failed to update hiker");
      }
    } catch (error) {
      console.error("Error updating hiker:", error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        parks,
        setParks,
        hikers,
        setHikers,
        trails,
        setTrails,
        updateTrail,
        updateHiker,
        hiker,
        setHiker,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
