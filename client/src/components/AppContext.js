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
  const updateTrail = (id, updatedTrailData) => {
    fetch(`/trails/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTrailData),
    })
      .then((response) => response.json())
      .then((updatedTrail) => {
        const updatedPark = parks.find((p) => p.id === updatedTrail.park_id);
        const updatedTrails = updatedPark.trails.map((t) =>
          t.id === updatedTrail.id ? updatedTrail : t
        );
        updatedPark.trails = updatedTrails;
        const updatedParks = parks.map((p) =>
          p.id === updatedTrail.park_id ? updatedPark : p
        );
        setParks(updatedParks);

        console.log(updatedTrail);
        setTrails(updatedTrail);
      })
      .catch((error) => {
        console.error("Error updating trail:", error);
      });
  };
  // Delete trail
  const deleteTrail = (id) => {
    fetch(`/trails/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted Trail Response:", data);

        if (data.message === "Trail deleted successfully") {
          const updatedParks = parks.map((park) => {
            if (park.id === data.park_id) {
              // filter out the deleted trail from the park's trails array
              park.trails = park.trails.filter((trail) => trail.id !== id);
            }
            return park;
          });

          //  the updated parks state
          console.log("Updated Parks after deleting trail:", updatedParks);

          // Update the parks state with the new parks list
          setParks(updatedParks);

          // Optionally, update the trails state globally (if needed)
          const updatedTrails = trails.filter((trail) => trail.id !== id);
          setTrails(updatedTrails);
        } else {
          console.error("Failed to delete trail:", data);
        }
      })
      .catch((error) => {
        console.error("Error deleting trail:", error);
      });
  };

  // Update Hiker
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

  // Delete Hiker
  const deleteHiker = (id) => {
    console.log("deleteHiker called with id:", id);

    fetch(`/hikers/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Deleted Hiker response:", data);

        if (data.message === "Hiker deleted successfully") {
          // Update the hikers state (remove the deleted hiker)
          const updatedHikers = hikers.filter((hiker) => hiker.id !== id);

          // Update the parks state (remove hiker from any park that has the hiker)
          const updatedParks = parks.map((park) => {
            return {
              ...park,
              // Check if park.hikers exists and is an array before calling filter
              hikers: Array.isArray(park.hikers)
                ? park.hikers.filter((hiker) => hiker.id !== id)
                : park.hikers,
              // Check if park.trails exists and is an array before calling map
              trails: Array.isArray(park.trails)
                ? park.trails.map((trail) => {
                    // Detach the trail from the hiker if it's associated with the deleted hiker
                    if (trail.hiker_id === id) {
                      trail.hiker_id = null; // Disassociate the hiker from the trail
                    }
                    return trail;
                  })
                : park.trails,
            };
          });

          // set the updated state of hikers and parks
          setHikers(updatedHikers);
          setParks(updatedParks);

          console.log("Updated hikers:", updatedHikers);
          console.log("Updated parks after deleting hiker:", updatedParks);
        } else {
          console.error("Failed to delete hiker:", data);
        }
      })
      .catch((error) => {
        console.error("Error deleting hiker:", error);
      });
  };

  const updatePark = async (id, updatedParkData) => {
    try {
      const response = await fetch(`/parks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedParkData),
      });
      if (response.ok) {
        const updatedPark = await response.json();
        setParks((prevParks) =>
          prevParks.map((park) =>
            park.id === updatedPark.id ? updatedPark : park
          )
        );
        // setPark(updatedPark);
      } else {
        console.error("failed to update park");
      }
    } catch (error) {
      console.error("Error updating park:", error);
    }
  };
  return (
    <MyContext.Provider
      value={{
        parks,
        setParks,
        updatePark,
        hikers,
        setHikers,
        trails,
        setTrails,
        updateTrail,
        deleteTrail,
        updateHiker,
        hiker,
        setHiker,
        deleteHiker,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
