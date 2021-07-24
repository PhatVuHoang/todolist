import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, REDO_TASK, UPDATE_TASK } from "./Types/ToDoListType";

export const addTaskAction = (newTask) => ({
    type: ADD_TASK,
    newTask
})

export const changeThemeAction = (themeId) => ({
    type: CHANGE_THEME,
    themeId
})

export const doneTaskAction = (taskId) => ({
    type: DONE_TASK,
    taskId
})

export const redoTaskAction = (taskId) => ({
    type: REDO_TASK,
    taskId
})

export const deleteTaskAction = (taskId) => ({
    type: DELETE_TASK,
    taskId
})

export const editTaskAction = (task) => ({
    type: EDIT_TASK,
    task
})

export const updateTask = (taskName) => ({
    type: UPDATE_TASK,
    taskName
})