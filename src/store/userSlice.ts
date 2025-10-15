import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  a: number;
  b:number;
  c:number;
  // Add other user properties as needed
}

let initialState: any = {
  users: [{ }],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<UserState>) => {
      //state.users.push(action.payload);
       state.users={...action.payload};
    },
    // removeUser: (state, action) => {
    //   state.users = state.users.filter(u => u.id !== action.payload);
    // },
    // clearUsers: (state) => {
    //   state.users = [];
    // },
    // putData:(state,action)=>{
    //     state.gatedata={...state.gatedata,...action.payload};
    // },
    // setSocketData:(state,action)=>{
    //   state.socketData=action.payload;
    // },
    // setAdminuser:(state,action)=>{
    //   state.adminUSer=action.payload;
    // }
}
});

export const { addUser} = userSlice.actions;

export default userSlice.reducer;
