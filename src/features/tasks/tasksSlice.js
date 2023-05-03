import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchString: ""
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        searchfilter: (state, action) => {
            state.searchString = action.payload;
        }
    },
});

export const { searchfilter } = tasksSlice.actions;
export default tasksSlice.reducer;
