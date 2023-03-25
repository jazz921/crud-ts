import { createSlice } from "@reduxjs/toolkit";
import { Inputs } from "../components/AddUserModal";

export interface Users {
  readonly id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export type UserStateType = {
  isModalOpen: boolean;
  users: Users[];
};

const initialState: UserStateType = {
  isModalOpen: false,
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
    addUser: (state, action) => {
      const newUser = action.payload;
      newUser.id = Number(new Date());
      state.users = [...state.users, newUser];
      state.isModalOpen = false;
    },
    updateUser: (state, action) => {
      const {
        formData: { email, first_name, last_name },
        id,
      } = action.payload;

      state.users = state.users.map((user) => {
        if (user.id === id) {
          return {
            ...user,
            email,
            first_name,
            last_name,
          };
        }
        return user;
      });
    },
    deleteUser: (state, action) => {
      let selectedId = action.payload;
      let updatedUsers = state.users.filter(({ id }) => id !== selectedId);
      state.users = updatedUsers;
    },
  },
});

export const { addUser, openModal, closeModal, updateUser, deleteUser } =
  userSlice.actions;
export default userSlice.reducer;
