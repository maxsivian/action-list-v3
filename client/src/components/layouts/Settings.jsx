import styles from "./Settings.module.css";
import { useState } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Player } from '@lordicon/react';

import { clearLocalStorage, clearCompletedTasks } from "../../redux/tasksSlice";
import { changeColorTheme } from "../../redux/themesSlice";
import { syncTasks } from "../../redux/tasksSlice";
import SOLID_DELETE_ICON from "../../assets/solid_delete.json";


const Settings = () => {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isRendered, setIsRendered] = useState(false); // Controls actual DOM presence
    const [shouldAnimate, setShouldAnimate] = useState(false); // Controls animation timing

    const playerRef = useRef(null);
    const playerRef1 = useRef(null);

    const dispatch = useDispatch();
    const pendingTasks = useSelector((state) => state.core.pendingTasks)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)


    const handleClick = () => {
        if (isMenuVisible) {
            // Start fade-out animation, then remove from DOM
            setShouldAnimate(false);
            setTimeout(() => setIsMenuVisible(false), 300);
        } else {
            // First, add to the DOM
            // setIsRendered(true);
            setIsMenuVisible(true);

            // Delay animation slightly so it fades in smoothly
            setTimeout(() => setShouldAnimate(true), 10);
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains(styles.overlay)) {
            // setIsMenuVisible(true)
            handleClick()
        }
    };

    const handleCloseButton = (e) => {
        // setIsMenuVisible(true)
        handleClick()
    };

    const handleColorButtons = (e) => {
        const mode = e.target.name;
        dispatch(changeColorTheme(mode))
    };

    const handleClearAllTasks = () => {
        dispatch(clearLocalStorage())
        if(isAccountSignedIn){
            dispatch(syncTasks({ pendingTasks: [], completedTasks: [] }))
        }
    }

    const handleClearFinishedTasks = () => {
        dispatch(clearCompletedTasks())
        if(isAccountSignedIn){
            dispatch(syncTasks({ pendingTasks: pendingTasks, completedTasks: [] }))
        }
    }

    return (
        <div className={styles.container}>
            <button onClick={handleClick} className={styles.button} tabIndex={-1}>
                <div className={styles.icon}>
                    <SettingsSVG />
                </div>
            </button>
            {isMenuVisible && (
                <div className={styles.overlay} onClick={handleOutsideClick}>
                    <div className={`${styles.box} ${shouldAnimate ? styles.show : ""}`}>
                        <button className={styles.closeButton} onClick={handleCloseButton}>
                            <CloseSVG />
                        </button>
                        <div>
                            <button onClick={handleClearAllTasks} onMouseEnter={() => { playerRef.current?.playFromBeginning() }}>
                                <span>Clear all tasks</span>
                                <span>
                                    <Player
                                        ref={playerRef}
                                        icon={SOLID_DELETE_ICON}
                                        colors='secondary:crimson,tertiary:crimson'
                                    />
                                </span>
                            </button>
                        </div>
                        <div>
                            <button onClick={() => dispatch(handleClearFinishedTasks)} onMouseEnter={() => { playerRef1.current?.playFromBeginning() }}>
                                <span>Clear finished tasks</span>
                                <span>
                                    <Player
                                        ref={playerRef1}
                                        icon={SOLID_DELETE_ICON}
                                        colors='secondary:crimson,tertiary:crimson'
                                    />
                                </span>
                            </button>
                        </div>
                        <div className={styles.colorThemeBox}>
                            <h3>Themes</h3>
                            <button onClick={handleColorButtons} name="blue" className={styles.blueTheme}>CADET BLUE</button>
                            <button onClick={handleColorButtons} name="green" className={styles.greenTheme}>MEDIUM SEA GREEN</button>
                            <button onClick={handleColorButtons} name="pink" className={styles.purpleTheme}>LIGHT CORAL</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Settings;

const SettingsSVG = () => {
    return (
        <svg
            style={{
                width: "90%", height: "90%",
                // border: "1px solid"
            }}
            className="svgIcon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48" aria-label='settings'>
            <g transform="translate(0,-1)">
                <path fill="var(--color1)" d="M39.6,27.2c0.1-0.7,0.2-1.4,0.2-2.2s-0.1-1.5-0.2-2.2l4.5-3.2c0.4-0.3,0.6-0.9,0.3-1.4L40,10.8c-0.3-0.5-0.8-0.7-1.3-0.4l-5,2.3c-1.2-0.9-2.4-1.6-3.8-2.2l-0.5-5.5c-0.1-0.5-0.5-0.9-1-0.9h-8.6c-0.5,0-1,0.4-1,0.9l-0.5,5.5c-1.4,0.6-2.7,1.3-3.8,2.2l-5-2.3c-0.5-0.2-1.1,0-1.3,0.4l-4.3,7.4c-0.3,0.5-0.1,1.1,0.3,1.4l4.5,3.2c-0.1,0.7-0.2,1.4-0.2,2.2s0.1,1.5,0.2,2.2L4,30.4c-0.4,0.3-0.6,0.9-0.3,1.4L8,39.2c0.3,0.5,0.8,0.7,1.3,0.4l5-2.3c1.2,0.9,2.4,1.6,3.8,2.2l0.5,5.5c0.1,0.5,0.5,0.9,1,0.9h8.6c0.5,0,1-0.4,1-0.9l0.5-5.5c1.4-0.6,2.7-1.3,3.8-2.2l5,2.3c0.5,0.2,1.1,0,1.3-0.4l4.3-7.4c0.3-0.5,0.1-1.1-0.3-1.4L39.6,27.2z M24,35c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10C34,30.5,29.5,35,24,35z"></path><path fill="var(--color3)" d="M24,13c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12s12-5.4,12-12C36,18.4,30.6,13,24,13z M24,30c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5s5,2.2,5,5C29,27.8,26.8,30,24,30z"></path>
            </g>
        </svg>
    )
}

const CloseSVG = () => {
    return (
        <svg
            style={{
                width: "70%", height: "70%",
                // border: "1px solid"
            }}
            width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 6L18 18M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" />
        </svg>
    )
}
