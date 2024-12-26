import React, { createContext, useState, useEffect } from "react";

const MyContext = createContext();

// export const useAppContext = () => useContext(AppContext);

const MyProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [hikers, setHikers] = useState([]);
  const [trails, setTrails] = useState([]);

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

  return (
    <MyContext.Provider
      value={{ parks, setParks, hikers, setHikers, trails, setTrails }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
