import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "./AppContext";
import CreateHiker from "./NewHikerForm";
import { useParams } from "react-router-dom";

function HikersList() {
  const { hikers } = useContext(MyContext);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { id } = useParams();

  const toggleCreateForm = () => {
    setShowCreateForm((prev) => !prev);
  };

  return (
    <div>
      <h2>Hikers</h2>
      <ul>
        {hikers.map((hiker) => (
          <li key={hiker.id}>
            <Link to={`/hikers/${hiker.id}`}>
              {hiker.name} ({hiker.skill_level})
            </Link>
          </li>
        ))}
      </ul>
      {/* <h5>Add A Hiker</h5> */}
      <button onClick={toggleCreateForm}>
        {showCreateForm ? "Cancel" : "Add New Hiker"}
      </button>

      {showCreateForm && <CreateHiker />}
    </div>
  );
}

export default HikersList;
