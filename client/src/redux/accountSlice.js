import { createSlice } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import { toastConditions } from "../scripts/toastConditions";
import { signOut } from "./authSlice";
import { resetSyncStatus } from "./tasksSlice";

const SERVER_BASE = import.meta.env.VITE_SERVER_BASE


const delay = async (n = 1) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, n * 1000);
    })
}


const getInitialName = () => {
    const account = localStorage.getItem("account");

    if (!account) {
        return ""
    }

    try {
        return JSON.parse(account).updatedName;
    } catch (e) {
        return ""
    }
}



const initialState = {
    isLoading: false,
    errorMsg: "",
    toastId: "",

    account: {
        updatedName: getInitialName()
    }
};


export const updateName = createAsyncThunk("auth/updateName", async ({ updatedName }, { rejectWithValue: reject, getState }) => {

    try {
        // await delay(1)

        // console.log("updatedName", updatedName);
      
        // const state = getState();
        // const mongo_id = state.auth.user.mongo_id;


        let response = await fetch(`${SERVER_BASE}/api/account/update-name`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ updatedName}),
            credentials: "include"
        })

        let data = await response.json()
        // console.log("data", data);

        if (!response.ok) {
            // throw new Error(data.message); // Triggers action.error.message
            console.log("data", data);
            return reject(data.message)
        }

        return updatedName
    } catch (error) {
        console.log("updateName (error):", error);
        return reject(error.message);
    }

})

export const deleteAccount = createAsyncThunk("auth/deleteAccount", async (_, { rejectWithValue: reject, getState, dispatch }) => {

    try {
        // await delay(1)

        // const state = getState();
        // const mongo_id = state.auth.user.mongo_id;


        let response = await fetch(`${SERVER_BASE}/api/account/`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json",
            },
            credentials: "include"
        })

        let data = await response.json()
        // console.log("data", data);

        if (!response.ok) {
            // throw new Error(data.message); // Triggers action.error.message
            console.log("data", data);
            return reject(data.message)
        }

        dispatch(signOut())
        dispatch(resetSyncStatus())
        clearAccountFromLS()
        return data
    } catch (error) {
        console.log("deleteAccount (error):", error);
        return reject(error.message);
    }

})

const storeAccountToLS = (state) => {
    localStorage.setItem("account", JSON.stringify(state.account))
}

const handleClearAccountFromLS = (state) => {
    localStorage.removeItem("account")
}

export const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        clearAccountFromLS: handleClearAccountFromLS
    },
    extraReducers: (builder) => {

        builder

            .addCase(updateName.pending, (state, action) => {
                state.isLoading = true
                state.toastId = toast.loading("Updating...");
            })
            .addCase(updateName.fulfilled, (state, action) => {
                toast.update(state.toastId, {
                    render: `Name Updated 🙂` ,
                    type: "success",
                    ...toastConditions,
                });
                state.account.updatedName = action.payload
                storeAccountToLS(state)

                state.isLoading = false
            })
            .addCase(updateName.rejected, (state, action) => {
                // console.log("action.payload", action.payload);
                state.errorMsg = action.payload
                console.log("state.errorMsg", state.errorMsg);

                toast.update(state.toastId, {
                    render: `${state.errorMsg} 🥺`,
                    type: "error",
                    ...toastConditions,
                });
                state.isLoading = false
            })


            .addCase(deleteAccount.pending, (state, action) => {
                state.isLoading = true
                state.toastId = toast.loading("Deleting account...");
            })
            .addCase(deleteAccount.fulfilled, (state, action) => {
                toast.update(state.toastId, {
                    render: "Account Deleted 🙂",
                    type: "success",
                    ...toastConditions,
                });

                state.isLoading = false
            })
            .addCase(deleteAccount.rejected, (state, action) => {
                // console.log("action.payload", action.payload);
                state.errorMsg = action.payload
                console.log("state.errorMsg", state.errorMsg);

                toast.update(state.toastId, {
                    render: `${state.errorMsg} 🥺`,
                    type: "error",
                    ...toastConditions,
                });
                state.isLoading = false
            })

    }
})


export const { clearAccountFromLS } = accountSlice.actions

export default accountSlice.reducer



