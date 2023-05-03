import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filterOut: []
};

const projectsSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        filterOutProject: (state, action) => {
            if (state?.filterOut?.includes(action.payload)) {
                state.filterOut = state?.filterOut.filter(x => x !== action.payload)
            } else {
                state.filterOut = [...state.filterOut, action.payload];
            }
        }

    },
});

export const { filterOutProject } = projectsSlice.actions;
export default projectsSlice.reducer;
