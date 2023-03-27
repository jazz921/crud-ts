import { FC, useState } from "react";
import AddUserModal from "./AddUserModal";
import { useDispatch, useSelector } from "react-redux/es/exports";
import {
  UserStateType,
  Users,
  deleteUser,
  openModal,
} from "../store/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

interface TableComponentProps {
  resultUsers: Users[];
}

const Table = ({ resultUsers }: TableComponentProps) => {
  const [modal, setModal] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<number>(0);
  const dispatch = useDispatch();

  const { users } = useSelector((state: { user: UserStateType }) => state.user);

  return (
    <>
      {modal && (
        <AddUserModal
          type={"edit_user"}
          setModal={setModal}
          selectedUserId={selectedUserId}
        />
      )}
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
                  }}
                />
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="x-icon"
                  onClick={() => dispatch(deleteUser(user.id))}
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
