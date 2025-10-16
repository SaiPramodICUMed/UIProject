import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState { /* fields */ }

interface InboxTaskCountsResponse { /* fields */ }

let initialState: any = {
  users: [{}],
  taskCount: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserState>) => {
      state.users = { ...action.payload };
    },
    addTaskCount: (state, action: PayloadAction<InboxTaskCountsResponse>) => {
      state.taskCount = { ...action.payload };
    },
  },
});

export const { addUser, addTaskCount } = userSlice.actions;
export default userSlice.reducer;
