import Header from "./components/Header";
import Table from "./components/Table";
import AddUserModal from "./components/AddUserModal";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { UserStateType, Users, openModal } from "./store/userSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  const { isModalOpen, users } = useSelector(
    (state: { user: UserStateType }) => state.user
  );
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useDispatch();

  const searchedUsers = (value: string, usersArray: Users[]): Users[] => {
    if (value === "") {
      return usersArray;
    }
    return usersArray.filter((user) =>
      user.last_name.toLowerCase().includes(value)
    );
  };

  const resultUsers = searchedUsers(searchValue, users); // pass this to Table as props

  return (
    <div className="App">

      {isModalOpen && <AddUserModal type={"add_user"} />}

      <Header />

      <section className="actions">
        <button
          className="actions__add-btn"
          onClick={() => dispatch(openModal())}
        >
          <FontAwesomeIcon icon={faPlusCircle} style={{ marginRight: "7px" }} />
          ADD NEW
        </button>

        <div className="actions__search-bar">
          <input
            type="text"
            placeholder="Search last name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="actions__search-icon"
          />
        </div>
      </section>

      <section className="table-container">
        <Table resultUsers={resultUsers} />
      </section>
    </div>
  );
}

export default App;
