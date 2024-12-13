import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [parks, setParks] = useState([]);
  const [hikers, setHikers] = useState([]);
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    fetch("/parks")
      .then((r) => r.json())
      .then((parks_array) => setParks(parks_array));
  }, []);

  useEffect(() => {
    fetch("/hikers")
      .then((r) => r.json())
      .then((hikers_array) => setParks(hikers_array));
  }, []);

  useEffect(() => {
    fetch("/trails")
      .then((r) => r.json())
      .then((trails_array) => setParks(trails_array));
  }, []);

  return (
    <AppContext.Provider value={{ parks, hikers, trails }}>
      {children}
    </AppContext.Provider>
  );
};
