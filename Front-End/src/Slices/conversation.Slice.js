import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../lib/axios";
import { toast } from "sonner";

const initialState = {
    conversations: [],
    loading: false,
    searchedUser: [],
    searchLoading: false,
    currentConversation: null,
    error: null,
}
export const findUser = createAsyncThunk("conversation/findUsers", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get("conversation/findUsers", { params: { userNameorEmail: data } });
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "failed to find users");
        return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
})

export const createConversation = createAsyncThunk("conversation/createConversation", async (data, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post("conversation/createConversation", { memberId: data });
        console.log(res, "res of create conversation");
        return res.data;
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message || "failed to create conversation");
        return rejectWithValue(error.response?.data || { message: "Something went wrong" });
    }
})

const ConversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        clearSearchedUser: (state) => {
            state.searchedUser = [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(findUser.pending, (state, action) => {
            state.searchLoading = true;
            state.searchedUser = [];
        })
        builder.addCase(findUser.fulfilled, (state, action) => {
            state.searchedUser = action.payload.user;
            state.searchLoading = false;
        })
        builder.addCase(findUser.rejected, (state, action) => {
            state.searchLoading = false;
        })

        builder.addCase(createConversation.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(createConversation.fulfilled, (state, action) => {
            console.log(action.payload, "payload");
            state.loading = false;
            // state.conversations.push(action.payload.conversation);
        })
        builder.addCase(createConversation.rejected, (state, action) => {
            state.loading = false;
        })
    }
})

export const { clearSearchedUser } = ConversationSlice.actions;
export default ConversationSlice.reducer