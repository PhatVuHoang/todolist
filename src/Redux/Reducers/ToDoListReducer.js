import { arrTheme } from "../../Themes/ThemeManage"
import { TodolistDarkTheme } from "../../Themes/TodolistDarkTheme"
import { ADD_TASK, CHANGE_THEME, DELETE_TASK, DONE_TASK, EDIT_TASK, REDO_TASK, UPDATE_TASK } from "../Actions/Types/ToDoListType"

const initialState = {
    themeToDoList: TodolistDarkTheme,
    taskList: [
        {id: 'task-1', taskName: 'task 1', done: true},
        {id: 'task-2', taskName: 'task 2', done: false},
        {id: 'task-3', taskName: 'task 3', done: true},
        {id: 'task-4', taskName: 'task 4', done: false}
    ],
    taskEdit: {
        id: '-1', taskName: '', done: false
    }
}

export default (state = initialState, action) => {

    switch (action.type) {

       

        case ADD_TASK: {
            // kiểm tra rỗng
            if(action.newTask.taskName.trim() === ''){
                alert('Task name is required!')
                return {...state};
            }

            let taskListUpdate = [...state.taskList];

            let index = taskListUpdate.findIndex(task =>task.taskName === action.newTask.taskName);

            // kiểm tra tồn tại

            if(index !== -1){
                alert('task name already exists!')
                return {...state};
            }

            taskListUpdate.push(action.newTask);

            // sau khi xử lí xong thì add tasklist mới vào tasklist

            state.taskList = taskListUpdate;

            return {...state};
        }

        case CHANGE_THEME: {
            let theme = arrTheme.find(theme => theme.id == action.themeId)
            if(theme) {
                state.themeToDoList = theme.theme
            }
            // console.log(theme)
            return {...state}
        }

        case DONE_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === action.taskId)
            if(index !== -1) {
                taskListUpdate[index].done = true; 
            }

            return {...state, taskList: taskListUpdate}
        }

        case REDO_TASK: {
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === action.taskId)
            if(index !== -1) {
                taskListUpdate[index].done = false; 
            }

            return {...state, taskList: taskListUpdate}
        }

        case DELETE_TASK: {
            let taskListUpdate = [...state.taskList];
            taskListUpdate = taskListUpdate.filter(task => task.id !== action.taskId)
            return {...state, taskList: taskListUpdate}
        }

        case EDIT_TASK: {
            return {...state, taskEdit: action.task}
        }

        case UPDATE_TASK: {
            //chỉnh sửa lại taskName của taskEdit
            state.taskEdit = {...state.taskEdit, taskName:action.taskName};
            //tìm trong tasklist cập nhật lại taskEdit của người dùng
            let taskListUpdate = [...state.taskList];
            let index = taskListUpdate.findIndex(task => task.id === state.taskEdit.id);
            if(index !== -1) {
                taskListUpdate[index] = state.taskEdit;
            }
            state.taskList = taskListUpdate;
            return {...state};
        }

        default:
            return {...state}
    }
}
