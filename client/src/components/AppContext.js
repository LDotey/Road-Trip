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

  // const deleteTrail = (id) => {
  //   fetch(`/trails/${id}`, {
  //     method: "DELETE",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("Deleted Trail:", data);

  //       if (data.message === "Trail deleted successfully") {
  //         const updatedPark = parks.find((park) => park.id === data.park_id);

  //         if (updatedPark) {
  //           // update the parks state with the modified park
  //           const updatedParks = parks.map((park) =>
  //             park.id === updatedPark.id ? updatedPark : park
  //           );
  //           setParks(updatedParks); // update state with the new park list
  //           // Also update the trails state to remove the trail
  //           console.log("Updated Parks after deleting trail:", updatedParks);

  //           const updatedTrails = trails.filter(
  //             (trail) => trail.id !== data.id
  //           );
  //           setTrails(updatedTrails); // Update the trails state
  //         } else {
  //           console.error("Failed to find the park for the deleted trail.");
  //         }
  //       } else {
  //         console.error("Failed to delete trail:", data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error deleting trail:", error);
  //     });
  // };

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

  // const deleteTrail = (id) => {
  //   fetch(`trails/${id}`, {
  //     method: "DELETE",
  //   }).then((response) => response.json())
  //     .then((deletedTrail) => {
  //     if (response.ok) {
  //       const updatedPark = parks.find((p) => p.id === deletedTrail.park_id);
  //       const updatedTrails = updatedPark.trails.map((t) =>
  //       t.id === deletedTrail.id ? )

  //       // setParks((prev) => prev.filter((park) => park.id !== id));
  //     } else {
  //       console.error("Failed to delete trail");
  //     }
  //   });
  // };
  // unfinished ~~
  // const updateHiker = (id, updatedHikerData) => {
  //   fetch(`/hikers/${id}`, {
  //     method: "PATCH",
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(updatedHikerData),
  //   })
  //     .then((response) => response.json())
  //     .then((updatedHiker) => {
  //       const updatedPark = parks
  //     })
  // }

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
        deleteTrail,
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
