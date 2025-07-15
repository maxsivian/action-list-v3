import styles from "./TasksDisplayContainer.module.css"
import TaskItem from './TaskItem'
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { toggleTaskCompletion, showPopup, deleteTask, sortImportantTasks } from "../../redux/tasksSlice";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element"

import { Player } from "@lordicon/react";
import TICK_ICON from "../../assets/tick.json"
// import TICK_ICON from "../assets/tick-solid.json"

import { useRef } from "react";
import { store } from "../../redux/store"
import { syncTasks } from "../../redux/tasksSlice";
import { debounce } from "../../scripts/debounce";
import { resetIsMergingHappened } from "../../redux/tasksSlice"
import SyncStatus from "./SyncStatus";

const TasksDisplayContainer = () => {

    const dispatch = useDispatch();
    const [showFinishedTasks, setShowFinishedTasks] = useState(true)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

    const syncRef = useRef(
        debounce(() => {
            const state = store.getState();
            const pending = state.core.pendingTasks;
            const completed = state.core.completedTasks;
            dispatch(syncTasks({ pendingTasks: pending, completedTasks: completed }));
        }, 1000)
    );

    const pendingTasks = useSelector((state) => state.core.pendingTasks)
    const completedTasks = useSelector((state) => state.core.completedTasks)
    const isMergingHappened = useSelector((state) => state.core.isMergingHappened)

    const tickPlayerRef = useRef(null)

    // console.log('TasksDisplayContainer RAN');

    useEffect(() => {
        defineElement(lottie.loadAnimation)
    }, []);

    // useEffect(() => {
    //   if(showFinishedTasks){
    //     setTimeout(() => {
    //         tickPlayerRef.current?.playFromBeginning()
    //     }, 0);
    //   }
    // }, [showFinishedTasks])


    useEffect(() => {
        // console.log('test 1');
        if (isMergingHappened) {
            // console.log('test 2');
            dispatch(syncTasks({ pendingTasks: pendingTasks, completedTasks: completedTasks }))
                .then(() => {
                    // console.log('test 3');
                    dispatch(resetIsMergingHappened())
                })
        }
    }, [isMergingHappened])



    const toggleTask = (value) => {
        dispatch(toggleTaskCompletion(value));
        if (isAccountSignedIn) {
            syncRef.current();
        }
    }

    const editTask = (value) => {
        dispatch(showPopup(value));
        if (isAccountSignedIn) {
            syncRef.current();
        }
    }

    const deleteTaskById = (value) => {
        dispatch(deleteTask(value));
        if (isAccountSignedIn) {
            syncRef.current();
        }
    }

    const markImportant = (value) => {
        dispatch(sortImportantTasks(value));
        if (isAccountSignedIn) {
            syncRef.current();
        }
    }


    const handleChange = () => {
        setShowFinishedTasks(!showFinishedTasks)
        setTimeout(() => {
            if (showFinishedTasks) {
                tickPlayerRef.current?.playFromBeginning()
            }
        }, 100);
    }

    const handleMouseEnter = () => {
        tickPlayerRef.current?.playFromBeginning()
    }

    const completedTasksNumber = completedTasks.length
    const pendingTasksNumber = pendingTasks.length
    const totalTasks = completedTasksNumber + pendingTasksNumber
    const completedTasksPercent = totalTasks ? ((completedTasks.length / totalTasks) * 100).toFixed(1) : "0.0"


    return (
        <div className={styles.container}>
            <SyncStatus/>
            <div className={styles.heading1}>
                <div>
                    <h2>My Tasks</h2>
                </div>
                <div className={styles.stats}>
                    <div>
                        <span className={styles.highlight}>
                            {completedTasksNumber}
                        </span>
                        /
                        {totalTasks}
                    </div>
                    <div className={styles.highlight}>
                        {completedTasksPercent}%
                    </div>
                </div>
            </div>

            <div className={styles.pendingTasks}>
                <h3>Pending ({pendingTasksNumber})</h3>
                <ul className={`${styles.tasks} parent`}>
                    {pendingTasks.length === 0 && <div>No pending tasks</div>}

                    {
                        pendingTasks.map((value, index) => {
                            return (
                                // (showFinishedTasks || !value.isCompleted) && (
                                <TaskItem
                                    {...value}
                                    index={index}
                                    key={value.id}
                                    toggleTask={toggleTask}
                                    editTask={editTask}
                                    deleteTaskById={deleteTaskById}
                                    markImportant={markImportant}
                                    arrayName="pt"
                                />
                                // )
                            )
                        })
                    }

                </ul>

            </div>

            <div className={styles.completedTasksC}>
                <div className={styles.heading2}>
                    <h3>Completed ({completedTasksNumber})</h3>
                    <div className={styles.checkbox}>
                        <div className={`${styles.customCheckBoxC} ${showFinishedTasks ? styles.checkActive : ""}`} onMouseEnter={handleMouseEnter}>
                            <input type="checkbox" tabIndex={-1} className={styles.customCheckbox} onChange={handleChange} checked={showFinishedTasks} id='showFinishedTasks' />
                            {showFinishedTasks && (
                                <Player
                                    ref={tickPlayerRef}
                                    icon={TICK_ICON}
                                    colors='primary:black'
                                    size={"100%"}
                                    state="hover-pinch"
                                />
                            )
                            }
                        </div>
                        <label htmlFor='showFinishedTasks'>Show completed</label>
                    </div>
                </div>
                {completedTasks.length === 0 && <div>No completed tasks</div>}

                {
                    showFinishedTasks && (
                        <ul className={styles.tasks}>
                            {
                                completedTasks.map((value, index) => {
                                    return (
                                        // (showFinishedTasks) && (
                                        <TaskItem
                                            {...value}
                                            index={index}
                                            key={value.id}
                                            toggleTask={toggleTask}
                                            editTask={editTask}
                                            deleteTaskById={deleteTaskById}
                                            markImportant={markImportant}
                                            arrayName="ct"
                                        />
                                        // )
                                    )
                                })
                            }
                        </ul>
                    )
                }

            </div>

        </div>
    )
}

export default TasksDisplayContainer

