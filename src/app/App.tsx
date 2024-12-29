import './App.css';
import {TaskType, Todolist} from "../Todolist";
import {AddItemForm} from "../AddItemForm";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid2";
import Paper from '@mui/material/Paper'
import { MenuButton } from '../MenuButton'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Switch from '@mui/material/Switch'
import CssBaseline from '@mui/material/CssBaseline'
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
} from "../model/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../model/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {changeThemeAC} from "./app-reducer";


export type FilterValuesType = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: TaskType[]
}

type ThemeMode = 'dark' | 'light'

function App() {


    const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
    const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

    const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)

    const dispatch = useDispatch()

    const removeTask = (taskId: string, todolistId: string) => {
        dispatch(removeTaskAC({taskId, todolistId}))
    }

    const changeFilter = (filter: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC({id, filter}))

    }

    const addTask = (taskTitle: string, todolistId: string) => {
        dispatch(addTaskAC({title: taskTitle, todolistId}))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC({taskId, todolistId, isDone}))
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC({taskId, todolistId, title}))
    }

    const updateTodolist = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC({id, title}))
    }

    const removeTodolist = (todolistId: string) => {
        const action = removeTodolistAC(todolistId)
        dispatch(action)

    }

    const addTodolist = (title: string) => {
        const action = addTodolistAC(title)
        dispatch(action)
    }

    const changeModeHandler = () => {
        dispatch(changeThemeAC(themeMode))
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static" sx={{mb: '30px'}}>
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <IconButton color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <div>
                        <MenuButton>Login</MenuButton>
                        <MenuButton>Logout</MenuButton>
                        <MenuButton>Faq</MenuButton>
                        <Switch color={'default'} onChange={changeModeHandler} />
                    </div>
                </Toolbar>
            </AppBar>

            <Container fixed>
                <Grid container sx={{mb: '30px'}}>
                    <div>
                        <h3>Add New Todolist</h3>
                        <AddItemForm addItem={addTodolist}/>
                    </div>
                </Grid>
                <Grid container spacing={4}>
                    {todolists.map(td => {

                        let tasksForTodolist = tasks[td.id]
                        if (td.filter === 'active') {
                            tasksForTodolist = tasks[td.id].filter(t => !t.isDone)
                        }
                        if (td.filter === 'completed') {
                            tasksForTodolist = tasks[td.id].filter(t => t.isDone)
                        }

                        return (
                            <Grid key={td.id}>
                                <Paper sx={{p: '0 20px 20px 20px'}}>
                                    <Todolist
                                        key={td.id}
                                        todolistId={td.id}
                                        title={td.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        filter={td.filter}
                                        removeTodolist={removeTodolist}
                                        updateTask={updateTask}
                                        updateTodolist={updateTodolist}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </ThemeProvider>
    )
}

export default App;
