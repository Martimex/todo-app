import { configureStore } from "@reduxjs/toolkit";

// Import feature specific reducer file
import todosSlice from "../features/todos/todosSlice";

export default configureStore({
    reducer: {
        todos: todosSlice,
        // Some reducers here
    }
})