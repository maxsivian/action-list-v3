import styles from "./Home.module.css"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { setRouteLoading } from "../../redux/routeSlice"
import { downloadTasks } from "../../redux/tasksSlice"

import TaskInputContainer from '../layouts/TaskInputContainer'
import TasksDisplayContainer from '../layouts/TasksDisplayContainer'
import UpdateTaskPopUp from '../layouts/UpdateTaskPopUp'


const Home = () => {
    const dispatch = useDispatch()
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)


    useEffect(() => {
        // console.log('HOME');
        if (!isAccountSignedIn) return
        // console.log('isAccountSignedIn', isAccountSignedIn);
        dispatch(downloadTasks())
    }, [isAccountSignedIn])

    useEffect(() => {
        dispatch(setRouteLoading(false))
        // dispatch(checkAuth())
    }, [dispatch])


    return (
        <div className={styles.home}>
            <div className={styles.taskInputContainer}>
                <TaskInputContainer />
            </div>
            <div className={styles.tasksDisplayContainer}>
                <TasksDisplayContainer />
            </div>
            {/* <ToTopButton /> */}
            <UpdateTaskPopUp />
        </div>
    )
}

export default Home