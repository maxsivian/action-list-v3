import styles from "./TaskItem.module.css";


const TaskItem = ({ title, desc, isCompleted, id, index, isImportant, toggleTask, editTask, deleteTaskById, markImportant, arrayName }) => {

  // console.log('TastItem', index);

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
          <input type="checkbox" tabIndex={-1} className={styles.customCheckbox} onChange={() => toggleTask({id, arrayName})} checked={isCompleted} />

          {/* {isCompleted && ( */}
            <div className={styles.checkIcon}>
              <lord-icon
                src={`./tick.json`}
                stroke="bold"
                colors="primary:black"
                state="hover-pinch"
                trigger="hover"
                style={{ display: isCompleted ? "block" : "none" }}
              >
              </lord-icon>
            </div>

        </label>


        <button className={styles.button} onClick={() => markImportant({id, arrayName})} tabIndex={-1} aria-label="Mark Important">
          <lord-icon
            src={`./star.json`}
            stroke="bold"
            colors={isImportant ? "primary:gold,secondary:gold" : "primary:white,secondary:white"}
            state="hover-circle"
            trigger="hover"
          >
          </lord-icon>
        </button>

        <button onClick={() => editTask({ title, desc, id, arrayName })} className={styles.lordIcon} tabIndex={-1} aria-label="Edit">
          <lord-icon
            src={`./edit.json`}
            stroke="bold"
            colors="primary:white,secondary:white"
            state="hover-circle"
            trigger="hover"
          >
          </lord-icon>
        </button>

        <button onClick={() => deleteTaskById({id, arrayName})} className={styles.lordIcon} tabIndex={-1} aria-label="Delete">
          <lord-icon
            src={`./delete.json`}
            stroke="bold"
            colors="primary:white,secondary:white"
            state="hover-empty"
            trigger="hover"
          >
          </lord-icon>
        </button>

      </div>
    </li>
  );
};

export default TaskItem;
