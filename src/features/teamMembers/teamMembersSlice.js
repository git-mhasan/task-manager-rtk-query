import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const teamMembersSlice = createSlice({
    name: "team-members",
    initialState,
    reducers: {},
});

export const { } = teamMembersSlice.actions;
export default teamMembersSlice.reducer;
