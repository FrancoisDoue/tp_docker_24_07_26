import { createAsyncThunk } from "@reduxjs/toolkit";
import { tasksApi } from "./api.backend";
import { addTask, removeTask, replaceTask, setTaskList } from "../store/taskSlice";

const setConfig = (getState) => {
    const state = getState()
    return ({
        headers : {
            Authorization: "Bearer " + state.auth.token
        },
        ...state.auth.roles.some(e => e === "ROLE_ADMIN") && {params: {
            id: state.auth.id
        }}
    })
}

export const getAllTasks = createAsyncThunk(
    "task/getAllTasks",
    async (_arg, {rejectWithValue, dispatch, getState}) => {
        try {
            const taskList = await tasksApi.get("", setConfig(getState))
            dispatch(setTaskList(taskList))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const postTask = createAsyncThunk(
    "task/postTask",
    async ({body}, {rejectWithValue, dispatch, getState}) => {
        try {
            const newTask = await tasksApi.post("", body, setConfig(getState))
            dispatch(addTask(newTask))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const updateTask = createAsyncThunk(
    "task/updateTask",
    async ({body}, {rejectWithValue, dispatch, getState}) => {
        try {
            // console.log(setConfig(getState))
            const updatedTask = await tasksApi.put("", body, setConfig(getState))
            dispatch(replaceTask(updatedTask))
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)

export const deleteTask = createAsyncThunk(
    "task/deleteTask",
    async ({id}, {rejectWithValue, dispatch, getState}) => {
        console.log("test")
        try {
            await tasksApi.delete("/"+id, setConfig(getState))
            dispatch(removeTask(id))
        } catch (error) {
            return rejectWithValue(error)
            
        }
    }
)