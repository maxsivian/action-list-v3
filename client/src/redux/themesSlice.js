// themesSlice.js

import { createSlice } from "@reduxjs/toolkit"

const savedTheme = localStorage.getItem("theme") || "blue";

// Apply the saved theme when the app loads
document.body.classList.add(`${savedTheme}Mode`);

const initialState = {
    value: savedTheme
};

const handleChangeColorTheme = (state, action) => {
    const mode = action.payload;
    
    // Remove all theme classes before adding the new one
    document.body.classList.remove("blueMode", "greenMode", "pinkMode");
    
    // Apply the new theme
    document.body.classList.add(`${mode}Mode`);
    
    // Update Redux state
    state.value = mode;
    
    // Persist to localStorage
    localStorage.setItem("theme", mode);
};

export const themesSlice = createSlice({
    name: "themes",
    initialState,
    reducers: {
        changeColorTheme: handleChangeColorTheme
    }
});

export const { changeColorTheme } = themesSlice.actions;
export default themesSlice.reducer;
