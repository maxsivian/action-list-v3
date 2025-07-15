import styles from "./SyncStatus.module.css"
import { useSelector } from "react-redux"
import { useEffect, useRef, useState } from "react"

import { useDispatch } from "react-redux"
import { syncTasks } from "../../redux/tasksSlice"
import { downloadTasks } from "../../redux/tasksSlice"

import { Player } from "@lordicon/react"
import SYNC_ICON from "../../assets/sync.json"

const SyncStatus = () => {

    const dispatch = useDispatch()
    const syncStatus = useSelector((state) => state.core.syncStatus)
    const syncPlayerRef = useRef(null)

    const [colors, setColors] = useState("primary:white,secondary:white")
    const [textClass, setTextClass] = useState("")

    const pendingTasks = useSelector((state) => state.core.pendingTasks)
    const completedTasks = useSelector((state) => state.core.completedTasks)

    useEffect(() => {
        if (syncStatus == "Downloading") {
            setColors("primary:white,secondary:white")        
            setTextClass(styles.white)
        }
        else if (syncStatus == "Syncing") {
            setColors("primary:white,secondary:white")        
            setTextClass(styles.white)
        }
        else if (syncStatus == "Synced") {
            setColors("primary:#028045,secondary:#028045")            
            setTextClass(styles.green)
        }
        else if (syncStatus == "Download failed") {
            setColors("primary:crimson,secondary:crimson")            
            setTextClass(styles.red)
        }
        else if (syncStatus == "Sync failed") {
            setColors("primary:crimson,secondary:crimson")            
            setTextClass(styles.red)
        }
        else if (syncStatus == "Not Syncing. Login required.") {
            setColors("primary:white,secondary:white")            
            setTextClass(styles.white)
        }
        // console.log('syncStatus', syncStatus);
        setTimeout(() => {
            syncPlayerRef.current?.playFromBeginning()
        }, 0);
    }, [syncStatus])



    const handleDownloadClick = ()=>{
        dispatch(downloadTasks())
    }
    
    const handleSyncClick = ()=>{
        dispatch(syncTasks({ pendingTasks: pendingTasks, completedTasks: completedTasks }))
    }


    return (
        <div className={styles.container}>
            <div className={`${styles.icon} ${syncStatus == "Downloading" || syncStatus == "Syncing" ? styles.iconRotate:""}`}  
            onMouseEnter={() => syncPlayerRef.current?.playFromBeginning()}>
                <Player
                    ref={syncPlayerRef}
                    icon={SYNC_ICON}
                    colors={colors}
                    size={"100%"}
                    state="hover-pinch"
                    key={syncStatus}
                />
            </div>
            <div className={`${styles.text} ${textClass}`}>
                {syncStatus}
            </div>
            {
                syncStatus == "Download failed" && (
                    <button className={styles.retryButton} onClick={handleDownloadClick}>
                        Retry
                    </button>
                )
            }
            {
                 syncStatus == "Sync failed" && (
                    <button className={styles.retryButton} onClick={handleSyncClick}>
                        Retry
                    </button>
                 )
            }
        </div>
    )
}

export default SyncStatus