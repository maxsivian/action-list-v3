import styles from "./TaskItem.module.css";
import tickIcon from "../../assets/tick.json"
import starIcon from "../../assets/star.json"
import editIcon from "../../assets/edit.json"
import deleteIcon from "../../assets/delete.json"

import { Player } from "@lordicon/react";
import { useRef } from "react";

const TaskItem = ({ title, desc, isCompleted, id, index, isImportant, toggleTask, editTask, deleteTaskById, markImportant, arrayName }) => {

  // console.log('TastItem', index);
  const tickRef = useRef(null)
  const starRef = useRef(null)
  const editRef = useRef(null)
  const deleteRef = useRef(null)


  return (
    <li className={styles.task}>
      <span className={styles.index}>{index + 1}.</span>
      <div className={styles.text}>
        <span className={isCompleted ? `${styles.title} ${styles.strike}` : styles.title}>{title}</span>
        <span className={isCompleted ? `${styles.desc} ${styles.strike}` : styles.desc}>{desc}</span>
      </div>
      <div className={styles.buttons}>

        {/* <input type="checkbox" tabIndex={-1} className={styles.customCheckbox1} checked={isCompleted} onChange={() => toggleTask(id)} aria-label="Mark Complete" /> */}

        <label className={`${styles.customCheckBoxC} ${isCompleted ? styles.checkActive : ""}`}>
          <input type="checkbox" tabIndex={-1} className={styles.customCheckbox} onChange={() => toggleTask({ id, arrayName })} checked={isCompleted} />

          {/* {isCompleted && ( */}
          <div className={styles.checkIcon}
            onMouseEnter={() => { tickRef.current?.playFromBeginning() }}
          >
            {/* <lord-icon
                // src={`/tick.json`}
                src={tickIcon}
                stroke="bold"
                colors="primary:black"
                state="hover-pinch"
                trigger="hover"
                style={{ display: isCompleted ? "block" : "none" }}
              >
              </lord-icon> */}
            {
              isCompleted && (
                <Player
                  ref={tickRef}
                  icon={tickIcon}
                // size={"var(--iconDimention)"}
                />
              )
            }
          </div>

        </label>


        <button className={styles.button} onClick={() => markImportant({ id, arrayName })} tabIndex={-1} aria-label="Mark Important"
          onMouseEnter={() => { starRef.current?.playFromBeginning() }}
        >
          {/* <lord-icon
            src={`/star.json`}
            stroke="bold"
            colors={isImportant ? "primary:gold,secondary:gold" : "primary:white,secondary:white"}
            state="hover-circle"
            trigger="hover"
          >
          </lord-icon> */}
          <Player
            ref={starRef}
            icon={starIcon}
            colors={isImportant ? "primary:gold,secondary:gold" : "primary:white,secondary:white"}
          // size={"var(--iconDimention)"}
          />
        </button>

        <button onClick={() => editTask({ title, desc, id, arrayName })} className={styles.lordIcon} tabIndex={-1} aria-label="Edit"
          onMouseEnter={() => { editRef.current?.playFromBeginning() }}
        >
          {/* <lord-icon
            src={`/edit.json`}
            stroke="bold"
            colors="primary:white,secondary:white"
            state="hover-circle"
            trigger="hover"
          >
          </lord-icon> */}
          <Player
            ref={editRef}
            icon={editIcon}
            colors="primary:white,secondary:white"
          // size={"var(--iconDimention)"}
          />
        </button>

        <button onClick={() => deleteTaskById({ id, arrayName })} className={styles.lordIcon} tabIndex={-1} aria-label="Delete"
          onMouseEnter={() => { deleteRef.current?.playFromBeginning() }}
        >
          {/* <lord-icon
            src={`/delete.json`}
            stroke="bold"
            colors="primary:white,secondary:white"
            state="hover-empty"
            trigger="hover"
          >
          </lord-icon> */}
          <Player
            ref={deleteRef}
            icon={deleteIcon}
            colors="primary:white,secondary:white"

          // size={"var(--iconDimention)"}
          />
        </button>

      </div>
    </li>
  );
};

export default TaskItem;
