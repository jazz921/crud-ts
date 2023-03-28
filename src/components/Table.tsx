import { useState } from "react";
import AddUserModal from "./AddUserModal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { UserStateType, Users, deleteUser } from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface TableComponentProps {
  resultUsers: Users[];
}

const Table = ({ resultUsers }: TableComponentProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const [typeModal, setTypeModal] = useState<string>("");
  const dispatch = useDispatch();

  const { users } = useSelector((state: { user: UserStateType }) => state.user);

  const modalType = (type: string) => {
    if (type === "edit-user") {
      return (
        <AddUserModal
          type={"edit_user"}
          setModal={setModal}
          selectedUserId={selectedUserId}
        />
      );
    } else {
      return (
        <AddUserModal
          type={"confirm_delete"}
          setModal={setModal}
          selectedUserId={selectedUserId}
        />
      );
    }
  };

  let modalContainer = modalType(typeModal);

  return (
    <>
      {modal && modalContainer}
      <table className="table">
        <thead>
          <tr>
            <td>Actions</td>
            <td>ID</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Email</td>
          </tr>
        </thead>
        <tbody>
          {resultUsers.map((user: Users) => (
            <tr key={user.id}>
              <td>
                <FontAwesomeIcon
                  icon={faPencil}
                  className="pen-icon"
                  onClick={() => {
                    setModal(!modal);
                    setSelectedUserId(user.id);
                    setTypeModal("edit-user");
                  }}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="x-icon"
                  onClick={() => {
                    setTypeModal("confirm-delete");
                    setModal(!modal);
                    setSelectedUserId(user.id);
                  }}
                />
              </td>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
