import { createSlice, nanoid } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { toastConditions } from "../scripts/toastConditions";

const SERVER_BASE = import.meta.env.VITE_SERVER_BASE


const delay = async (n = 1) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, n * 1000);
    })
}

const safeParse = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
        return [];
    }
};


const initialState = {
    // pendingTasks: JSON.parse(localStorage.getItem("pending-tasks-v3")) || [],
    // completedTasks: JSON.parse(localStorage.getItem("completed-tasks-v3")) || [],
    pendingTasks: safeParse("pending-tasks-v3"),
    completedTasks: safeParse("completed-tasks-v3"),
    downloadedPendingTasks: [],
    downloadedCompletedTasks: [],
    isMergingHappened: false,

    popupVisible: false,
    taskToUpdate: null,
    syncStatus: "Not Syncing. Login required.",
    errorMsg: ""
};


const storePTtoLS = (array) => {
    localStorage.setItem("pending-tasks-v3", JSON.stringify(array))
}

const storeCTtoLS = (array) => {
    localStorage.setItem("completed-tasks-v3", JSON.stringify(array))
}

const handleShowPopup = (state, action) => {
    state.popupVisible = true;
    state.taskToUpdate = action.payload;
};

const handleHidePopup = (state) => {
    state.popupVisible = false;
    state.taskToUpdate = null;
};

const handleAddTask = (state, action) => {
    const task = {
        id: nanoid(),
        title: action.payload.title,
        desc: action.payload.desc,
        isCompleted: false,
        isImportant: false
    }
    state.pendingTasks.unshift(task)
    storePTtoLS(state.pendingTasks)
    // syncTasks({pendingTasks: state.pendingTasks, completedTasks: state.completedTasks})
}

const handleDeleteTask = (state, action) => {
    // console.log("action.payload.id", action.payload.id);
    // console.log("action.payload.arrayName", action.payload.arrayName);

    if (action.payload.arrayName == "pt") {
        state.pendingTasks = state.pendingTasks.filter(item => item.id !== action.payload.id)
        storePTtoLS(state.pendingTasks)
    }
    else {
        state.completedTasks = state.completedTasks.filter(item => item.id !== action.payload.id)
        storeCTtoLS(state.completedTasks)
    }
}

const handleUpdateTask = (state, action) => {
    // console.log("action.payload.id", action.payload.id);
    // console.log("action.payload.arrayName", action.payload.arrayName);

    const { id, title, desc } = action.payload;
    let task;
    if (action.payload.arrayName == "pt") {
        task = state.pendingTasks.find(task => task.id === id);
        storePTtoLS(state.pendingTasks)
    }
    else {
        task = state.completedTasks.find(task => task.id === id);
        storeCTtoLS(state.completedTasks)
    }

    if (task) {
        task.title = title;
        task.desc = desc;
    }
    state.popupVisible = false;
    state.taskToUpdate = null;

};


const handleToggleTaskCompletion = (state, action) => {
    // console.log("action.payload.id", action.payload.id);
    // console.log("action.payload.arrayName", action.payload.arrayName);

    let taskIndex
    let task;
    if (action.payload.arrayName == "pt") {
        taskIndex = state.pendingTasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex === -1) return;
        task = state.pendingTasks[taskIndex];
    }
    else {
        taskIndex = state.completedTasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex === -1) return;
        task = state.completedTasks[taskIndex];
    }

    task.isCompleted = !task.isCompleted;

    if (task.isCompleted) {
        state.pendingTasks.splice(taskIndex, 1);
        state.completedTasks.unshift(task);
    } else {
        state.completedTasks.splice(taskIndex, 1);
        state.pendingTasks.unshift(task);
    }

    storePTtoLS(state.pendingTasks)
    storeCTtoLS(state.completedTasks)
};


const handleSortImportantTasks = (state, action) => {

    // console.log("action.payload.id", action.payload.id);
    // console.log("action.payload.arrayName", action.payload.arrayName);

    let taskIndex
    let task;
    if (action.payload.arrayName == "pt") {
        taskIndex = state.pendingTasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex === -1) return;
        task = state.pendingTasks[taskIndex];
        task.isImportant = !task.isImportant;
        if (task.isImportant) {
            state.pendingTasks.splice(taskIndex, 1);
            state.pendingTasks.unshift(task);
        }
    }
    else {
        taskIndex = state.completedTasks.findIndex(task => task.id === action.payload.id);
        if (taskIndex === -1) return;
        task = state.completedTasks[taskIndex];
        task.isImportant = !task.isImportant;
        if (task.isImportant) {
            state.completedTasks.splice(taskIndex, 1);
            state.completedTasks.unshift(task);
        }
    }

    storePTtoLS(state.pendingTasks)
    storeCTtoLS(state.completedTasks)
};


const handleClearLocalStorage = (state) => {
    let answer = confirm("ARE YOU SURE TO DELETE ALL TASKS ?")
    if (!answer) return

    localStorage.removeItem("pending-tasks-v3")
    localStorage.removeItem("completed-tasks-v3")
    state.pendingTasks = []
    state.completedTasks = []
}

const handleResetData = (state) => {
    localStorage.clear()
    state.pendingTasks = []
    state.completedTasks = []
}

const handleClearCompletedTasks = (state) => {
    let answer = confirm("ARE YOU SURE TO DELETE ALL COMPLETED TASKS ?")
    if (!answer) return

    // state.pendingTasks = state.pendingTasks.filter(task => !task.isCompleted)
    state.completedTasks = []
    storeCTtoLS(state.completedTasks)
}

// const handleSyncData = (state, action) => {
//     state.pendingTasks = action.payload
// }

const handleSyncTabsPendingTasks = (state, action) => {
    state.pendingTasks = action.payload
}

const handleSyncTabsCompletedTasks = (state, action) => {
    state.completedTasks = action.payload
}

const handleResetSyncStatus = (state, action) => {
    state.syncStatus = "Not Syncing. Login required."
}

const handleResetIsMergingHappened = (state, action) => {
    state.isMergingHappened = false
}



export const downloadTasks = createAsyncThunk("tasks/downloadTasks", async (_, { rejectWithValue: reject, getState }) => {
    try {
        // console.log("Download Tasks...");
        // const state = getState();
        // const token = state.auth.authToken || localStorage.getItem("authToken");

        // console.log("Token being sent:", token)

        // await delay(1)

        let response = await fetch(`${SERVER_BASE}/api/task/get-tasks`, {
            method: "GET",
            // headers: {
            //     "auth-token": token,
            // },
            credentials: "include"
        })

        let data = await response.json()
        // console.log("data", data);

        if (!response.ok) {
            console.log("data", data);
            return reject(data.message)
        }
        return data

    } catch (error) {
        console.log("downloadTasks (error):", error);
        return reject(error.message);
    }
})



export const syncTasks = createAsyncThunk("tasks/syncTasks", async ({ pendingTasks, completedTasks }, { rejectWithValue: reject, getState }) => {
    try {
        // console.log("Syncing Tasks...");
        // const state = getState();
        // const token = state.auth.authToken || localStorage.getItem("authToken");

        // console.log("Token being sent:", token)

        const mergedArray = [...pendingTasks, ...completedTasks]
        // console.log("mergedArray", mergedArray);
        // await delay(1)


        let response = await fetch(`${SERVER_BASE}/api/task/sync-tasks`, {
            method: "POST",
            headers: {
                // "auth-token": token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(mergedArray),
            credentials: "include"
        })

        let data = await response.json()
        // console.log("data", data);

        if (!response.ok) {
            console.log("data", data);
            return reject(data.message)
        }
        return data
        // return true;

    } catch (error) {
        console.log("syncTasks (error):", error);
        return reject(error.message);
    }
})



export const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: handleAddTask,
        deleteTask: handleDeleteTask,
        updateTask: handleUpdateTask,
        showPopup: handleShowPopup,
        hidePopup: handleHidePopup,
        toggleTaskCompletion: handleToggleTaskCompletion,
        sortImportantTasks: handleSortImportantTasks,
        clearLocalStorage: handleClearLocalStorage,
        clearCompletedTasks: handleClearCompletedTasks,
        resetData: handleResetData,
        syncDataTabsPendingTasks: handleSyncTabsPendingTasks,
        syncDataTabsCompletedTasks: handleSyncTabsCompletedTasks,
        resetSyncStatus: handleResetSyncStatus,
        resetIsMergingHappened: handleResetIsMergingHappened
    },
    extraReducers: (builder) => {
        builder

            .addCase(downloadTasks.pending, (state, action) => {
                state.syncStatus = "Downloading"
                state.isLoading = true

            })
            .addCase(downloadTasks.fulfilled, (state, action) => {
                // console.log("action.payload", action.payload);

                // console.log("tasks", tasks);


                // let oldPendingTasksLength = state.pendingTasks.length
                // let oldCompletedTasksLength = state.completedTasks.length


                // state.downloadedPendingTasks = downloadedTasks.filter((element) => !element.isCompleted)
                // state.downloadedCompletedTasks = downloadedTasks.filter((element) => element.isCompleted)


                // Create a Set of existing pending/completed task IDs for quick lookup

                let downloadedTasks = action.payload.data

                const existingPendingIds = new Set(state.pendingTasks.map(task => task.id));
                const existingCompletedIds = new Set(state.completedTasks.map(task => task.id));

                const allIds = new Set([...existingPendingIds, ...existingCompletedIds]);

                // Add only non matching tasks
                for (let i = 0; i < downloadedTasks.length; i++) {
                    const task = downloadedTasks[i];
                    if (!allIds.has(task.id) && !task.isCompleted) {
                        state.pendingTasks.push(task);
                    }
                    else if (!allIds.has(task.id) && task.isCompleted) {
                        state.completedTasks.push(task)
                    }
                }



                // state.pendingTasks = [...state.pendingTasks, ...state.downloadedPendingTasks]
                // state.completedTasks = [...state.completedTasks, ...state.downloadedCompletedTasks]



                // let newPendingTasksLength = state.pendingTasks.length
                // let newCompletedTasksLength = state.completedTasks.length

                // if (newCompletedTasksLength > oldCompletedTasksLength || newPendingTasksLength > oldPendingTasksLength) {
                // console.log("Merge Condition Ran");
                state.isMergingHappened = true //force merge
                // }

                // console.log("oldPendingTasksLength, newPendingTasksLength", oldPendingTasksLength, newPendingTasksLength);
                // console.log("oldCompletedTasksLength, newCompletedTasksLength", oldCompletedTasksLength, newCompletedTasksLength);


                storePTtoLS(state.pendingTasks)
                storeCTtoLS(state.completedTasks)

                state.syncStatus = "Syncedd"
                state.isLoading = false
            })
            .addCase(downloadTasks.rejected, (state, action) => {
                console.log("error action.payload", action.payload);
                state.errorMsg = action.payload
                state.syncStatus = "Download failed"
                state.isLoading = false
        

                if (state.errorMsg == "invalid token") {
                    // console.log("Sign in timed out. Sign in again. 🙃");
                    toast.error("Sign in timed out. Sign in again. 🙃", toastConditions);
                    return
                }
                else if (state.errorMsg == "jwt expired") {
                    // console.log("Sign in timed out. Sign in again. 🙃");
                    toast.error("Sign in timed out. Sign in again. 🙃", toastConditions);
                    return
                }
                toast.error(state.errorMsg, toastConditions);
            })



            .addCase(syncTasks.pending, (state, action) => {
                state.isLoading = true
                state.syncStatus = "Syncing"
            })
            .addCase(syncTasks.fulfilled, (state, action) => {
                // console.log("action.payload", action.payload);

                state.isLoading = false
                state.syncStatus = "Synced"
            })
            .addCase(syncTasks.rejected, (state, action) => {
                console.log("error action.payload", action.payload);
                state.errorMsg = action.payload
                state.syncStatus = "Sync failed"
                state.isLoading = false
                

                if (state.errorMsg == "invalid token") {
                    // console.log("Sign in timed out. Sign in again. 🙃");
                    toast.error("Sign in timed out. Sign in again. 🙃", toastConditions);
                    return
                }
                else if (state.errorMsg == "jwt expired") {
                    // console.log("Sign in timed out. Sign in again. 🙃");
                    toast.error("Sign in timed out. Sign in again. 🙃", toastConditions);
                    return
                }
                toast.error(state.errorMsg, toastConditions);
            })
    }
})


export const { addTask, deleteTask, updateTask, showPopup, hidePopup, toggleTaskCompletion, sortImportantTasks, clearLocalStorage, clearCompletedTasks, syncDataTabsPendingTasks, syncDataTabsCompletedTasks, resetData, resetSyncStatus, resetIsMergingHappened } = tasksSlice.actions

export default tasksSlice.reducer


// const handleSortImportantTasks = (state, action) => {
//     const taskIndex = state.values.findIndex(task => task.id === action.payload);
//     if (taskIndex !== -1) {
//         // Clone the array to trigger state updates
//         // state.values = [...state.values];
//         state.values[taskIndex].isImportant = !state.values[taskIndex].isImportant;
//         state.values.sort((a, b) => b.isImportant - a.isImportant);
//     }
// };
