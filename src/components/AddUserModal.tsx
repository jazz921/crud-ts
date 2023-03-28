import React, { FC, ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  UserStateType,
  addUser,
  deleteUser,
  closeModal,
  updateUser,
} from "../store//userSlice";

export interface Inputs {
  first_name: string;
  last_name: string;
  email: string;
}

interface PropTypes {
  type: string;
  selectedUserId?: number;
  setModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddUserModal = ({ type, setModal, selectedUserId }: PropTypes) => {
  const [formData, setFormData] = useState<Inputs>({
    first_name: "",
    last_name: "",
    email: "",
  });

  const { users } = useSelector((state: { user: UserStateType }) => state.user);
  const dispatch = useDispatch();

  // function for onChange event in the input elements
  const inputHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    let { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // check if the inputs are not empty
  const isDataNotEmpty = (data: Inputs): boolean => {
    const { first_name, last_name, email } = data;

    if (first_name === "" || last_name === "" || email === "") {
      return false;
    }
    return true;
  };

  // check if the inputted email is valid
  const isEmailValid = (email: string): boolean => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return false;
    }
    return true;
  };

  // function for onSubmit event in form
  const submitHandler = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    let checkData = isDataNotEmpty(formData);
    if (!checkData) {
      alert("All inputs are mandatory");
    } else {
      let checkEmail = isEmailValid(formData.email);
      if (!checkEmail) {
        alert("Email must be valid");
      } else {
        if (type === "add_user") {
          let isEmailAlreadyUsed = users.find(user => user.email === formData.email)
          if (isEmailAlreadyUsed) {
            alert("Email already used");
          } else {
            dispatch(addUser(formData));
          }
        } else {
          if (selectedUserId) {
            dispatch(
              updateUser({
                id: selectedUserId,
                formData,
              })
            );
          }
          if (setModal) {
            setModal(false);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (type === "edit_user") {
      let selectedUser = users.find(
        (user) => user.id === selectedUserId
      ) as Inputs;
      setFormData(selectedUser);
    }

    return () => {
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
      });
    };
  }, []);

  if (type === "confirm_delete") {
    return (
      <section className="backdrop">
        <div className="modal">
          <div className="modal__header">
            <p>CONFIRM USER DELETION</p>
          </div>

          <div className="modal__inputs">
            <p className="confirm-msg">Do you want to delete the user?</p>
          </div>

          <div className="modal__buttons-container">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                dispatch(closeModal());
                if (setModal) {
                  setModal(false);
                }
              }}
            >
              CANCEL
            </button>
            <button className="submit-btn" onClick={() => {
              dispatch(deleteUser(selectedUserId))
              if (setModal) {
                setModal(false);
              }
            }}>
              SUBMIT
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <form onSubmit={submitHandler}>
      <section className="backdrop">
        <div className="modal">
          <div className="modal__header">
            {type === "add_user" ? <p>ADD NEW USER</p> : <p>EDIT USER</p>}
          </div>
          <div className="modal__inputs">
            <p>First Name*</p>
            <input
              type="text"
              placeholder="Enter First Name"
              name="first_name"
              value={formData.first_name}
              onChange={inputHandler}
            />
            <p>Last Name*</p>
            <input
              type="text"
              placeholder="Enter Last Name"
              name="last_name"
              value={formData.last_name}
              onChange={inputHandler}
            />
            <p>Email*</p>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={inputHandler}
            />
          </div>
          <div className="modal__buttons-container">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                dispatch(closeModal());
                if (setModal) {
                  setModal(false);
                }
              }}
            >
              CANCEL
            </button>
            <button className="submit-btn" type="submit">
              SUBMIT
            </button>
          </div>
        </div>
      </section>
    </form>
  );
};

export default AddUserModal;
