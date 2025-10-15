import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  activeCountryId: number;
  activityStatus: number;
  changeReportAlert: boolean;
  commentsAlert: boolean;
  country: string;
  coverMessage: string | null;
  coverMode: number;
  cultureCode: string;
  cultureCodeId: number;
  currencyCode: string;
  currencyFormat: string;
  email: string;
  enableEmail: boolean;
  extViewOptions: string | null;
  generalActionAlert: boolean;
  gridPageSize: number;
  isAdmin: boolean;
  numberFormatId: number;
  rate: number;
  regionId: number;
  roleId: number;
  strategyTabAccess: string;
  summaryReportType: string | null;
  taskOpenNewTab: boolean;
  timeZone: string;
  userGroup: string | null;
  userId: number;
  userName: string;
  userRole: string;
  viewAllSpotCodes: boolean;  
}

interface InboxTaskCountsResponse {
  awaitingResults: number;
  draft: number;
  inProgress: number;
  inbox: number;
}

let initialState: any = {
  users: [{ }],
  taskCount: { },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action:PayloadAction<UserState>) => {
      //state.users.push(action.payload);
       state.users={...action.payload};
    },
    addTaskCount: (state, action:PayloadAction<InboxTaskCountsResponse>) => {
      //state.users.push(action.payload);
       state.taskCount={...action.payload};
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

export const { addUser,addTaskCount} = userSlice.actions;

export default userSlice.reducer;
