import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../../api/service";

const USER_MSG = {
  USER_PASS_NOT_MATCHING: "User and password does not matching.",
};

const initialState = {
  error: null,
  status: "IDEAL",
  user: null,
};

export const UserSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    logout(state, { payload }) {
      state.user = null;
      state.status = "IDEAL";
      state.error = null;
    },
    setOnFailure(state, { payload }) {
      state.user = null;
      state.error = USER_MSG[payload];
      state.status = "FAILURE";
    },
    updateUser(state, { payload }) {
      state.user = payload || null;
    },
  },
});

export const { setOnFailure, updateUser, logout } = UserSlice.actions;

export const fetchUser = createAsyncThunk(
  "GET_USER",
  async (arg, { dispatch }) => {
    try {
      const response = await loginAPI(arg);
      dispatch(updateUser(response));
      return response;
    } catch (err) {
      dispatch(setOnFailure(err.toString()));
      return err;
    }
  }
);

export default UserSlice.reducer;
