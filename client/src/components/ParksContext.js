import React, { createContext, useState, useEffect } from "react";

const ParksContext = createContext();

export const ParksProvider = ({ children }) => {
  const [parks, setParks] = useState([]);

  useEffect(() => {
    fetch("/parks")
      .then((r) => r.json())
      .then((parksArray) => {
        setParks(parksArray);
      });
  }, []);

  return (
    <ParksContext.Provider value={{ parks, setParks }}>
      {children}
    </ParksContext.Provider>
  );
};

export default ParksContext;
