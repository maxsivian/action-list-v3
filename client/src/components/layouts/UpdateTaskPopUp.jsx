import styles from "./UpdateTaskPopUp.module.css"
import { useState, } from 'react'
import { useEffect } from 'react'

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { updateTask, } from "../../redux/tasksSlice";
import { hidePopup } from "../../redux/tasksSlice";


const UpdateTaskPopUp = () => {

    const dispatch = useDispatch();
    const popupVisible = useSelector((state) => state.core.popupVisible);
    const task = useSelector((state) => state.core.taskToUpdate);

    const [updatedTask, setUpdatedTask] = useState({ title: "", desc: "" });
    const [isTitleEmpty, setIsTitleEmpty] = useState(false)


    // Update local state when `task` changes
    useEffect(() => {
        if (task) {
            setUpdatedTask({ title: task.title, desc: task.desc });
        }
    }, [task]); // Runs whenever `task` changes


    if (!popupVisible || !task) return null;


    const handleChange = (e) => {
        setUpdatedTask({ ...updatedTask, [e.target.name]: e.target.value });
        if (isTitleEmpty === true) {
            setIsTitleEmpty(false)
        }
    };

    const handleUpdate = () => {
        // e.preventDefault();
        if (updatedTask.title.trim() !== "") {
            // dispatch(updateTask({ id: task.id, ...updatedTask }));
            dispatch(updateTask({ id: task.id, title: updatedTask.title.trim(), desc: updatedTask.desc.trim(), arrayName: task.arrayName }));
            dispatch(hidePopup());
        }
        else {
            setIsTitleEmpty(true)
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            dispatch(hidePopup());
        }
        else if (e.key === "Enter") {
            // e.preventDefault(); 
            handleUpdate();
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            dispatch(hidePopup());
        }
    };



    return (
        <div className={styles.overlay} onClick={handleOutsideClick}>
            <div className={styles.formContainer} onKeyDown={handleKeyDown}>

                <h2>Update Task</h2>
                <form className={styles.form} >
                    <input type="text" name="title" value={updatedTask.title} onChange={handleChange}
                        className={`${isTitleEmpty ? styles.outlineRed : ""}`} aria-label='Title'
                        autoFocus placeholder="title" />
                    <input type="text" name="desc" value={updatedTask.desc} onChange={handleChange} aria-label='Description' placeholder="description (optional)" />
                    <div className={styles.buttons}>
                        <button type="button" className={styles.updateBtn} onClick={handleUpdate} aria-label="Update">Update</button>
                        <button type="button" className={styles.cancelBtn} onClick={() => dispatch(hidePopup())} aria-label="Cancel">Cancel</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default UpdateTaskPopUp