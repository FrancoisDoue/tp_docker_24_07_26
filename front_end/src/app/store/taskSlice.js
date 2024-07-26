import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        taskList: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        setTaskList: (state, {payload}) => {
            console.log(payload)
            state.taskList = payload
        },
        addTask: (state, {payload}) => {
            console.log(payload)
            state.taskList.push(payload)
        },
        replaceTask: (state, {payload}) => {
            state.taskList = state.taskList.map(t => (t.id === payload.id) ? payload : t)
        },
        removeTask: (state, {payload}) => {
            state.taskList = state.taskList.filter(e => e.id != payload)
        }
    },
    extraReducers: ({addMatcher}) => {
        addMatcher(({type}) => (type.endsWith('/fulfilled') && type.startsWith("task")), (state) => {
            state.isLoading = false
            state.error = null
        })
        addMatcher(({type}) => (type.endsWith('/pending') && type.startsWith("task")), (state) => {
            state.isLoading = true
        })
        addMatcher(({type}) => (type.endsWith('/rejected') && type.startsWith("task")), (state, action) => {
            console.error(action.payload)
            state.isLoading = false
            state.error = action.payload
        })
    }
})

export const {
    setTaskList,
    addTask,
    replaceTask,
    removeTask
} = taskSlice.actions

export default taskSlice.reducer