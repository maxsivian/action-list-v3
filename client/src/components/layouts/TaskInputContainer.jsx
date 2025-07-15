// --iconDimention: 40px;

import styles from "./TaskInputContainer.module.css";
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { Player } from '@lordicon/react';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux';

import { addTask } from '../../redux/tasksSlice';
import { colorThemes } from '../../scripts/colorThemesConfig';
import { syncTasks } from '../../redux/tasksSlice';
import { store } from '../../redux/store';
import { debounce } from '../../scripts/debounce';
import ADD_ICON from "../../assets/add.json"


const TaskInputContainer = () => {

  const [task, setTask] = useState({ title: "", desc: "" });
  const [isTitleEmpty, setIsTitleEmpty] = useState(false)

  const dispatch = useDispatch();

  const addPlayerRef = useRef(null)
  const [addAnimState, setaddAnimState] = useState()

  const colorTheme = useSelector((state) => state.themes.value)
  const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)


  // useEffect(() => {
  //   addPlayerRef.current?.playFromBeginning()
  // }, [addAnimState])

  const syncRef = useRef(
    debounce(() => {
      const state = store.getState();
      const pending = state.core.pendingTasks;
      const completed = state.core.completedTasks;
      dispatch(syncTasks({ pendingTasks: pending, completedTasks: completed }));
    }, 1000)
  );


  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    if (isTitleEmpty === true) {
      setIsTitleEmpty(false)
    }
  };

  const handleAdd = (e) => {
    // console.log('Added');
    e.preventDefault();

    if (task.title.trim() !== "") {
      dispatch(addTask({ title: task.title.trim(), desc: task.desc.trim() }));
      if (isAccountSignedIn) {
        syncRef.current();
      }
      setTask({ title: "", desc: "" });
    }
    else {
      setIsTitleEmpty(true)
      return
    }

    if (addAnimState != "hover-swirl") {
      setaddAnimState("hover-swirl")
      // setTimeout(() => {
      // }, 0);
    }
    addPlayerRef.current?.playFromBeginning()
  };

  const handleAddAnim = () => {
    // console.log('Test');
    if (addAnimState != "hover-rotation") {
      setaddAnimState("hover-rotation")
    }
    addPlayerRef.current?.playFromBeginning()
  }

  return (
    <div className={styles.formContainer}>
      <h2>Add Task</h2>
      <form onSubmit={handleAdd} className={styles.form}>
        <div className={styles.left}>
          <input
            type="text"
            placeholder="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className={`${isTitleEmpty ? styles.outlineRed : ""} othercommonclasses`}
            tabIndex={0}
            autoFocus
            aria-label='Title'
          />
          <input
            type="text"
            placeholder="description (optional)"
            name="desc"
            value={task.desc}
            onChange={handleChange}
            tabIndex={0}
            aria-label='Description'
          />
        </div>
        <div className={styles.right}>
          <button type="submit" tabIndex={-1} aria-label='Add'
            onPointerEnter={handleAddAnim}>
            <div>
              <Player
                ref={addPlayerRef}
                icon={ADD_ICON}
                // colors='primary:white,secondary:white'
                colors={colorThemes[colorTheme]}
                state={addAnimState}
                // state="hover-swirl"
                // size={40}
                size={"var(--iconDimention)"} 
              />
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskInputContainer;
