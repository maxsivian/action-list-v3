import { useEffect } from "react"
import { syncDataTabsPendingTasks } from "../../redux/tasksSlice"
import { syncDataTabsCompletedTasks } from "../../redux/tasksSlice"
import { useDispatch } from "react-redux"


const SyncDataAcrossTabs = () => {
    const dispatch = useDispatch();

    useEffect(() => {

        // const sync = (e) => {
        //     window.location.reload()
        // }

        const sync = (e) => {
            if (e.key === "pending-tasks-v3") {
                try {
                    const updatedValues = JSON.parse(e.newValue || "[]")
                    dispatch(syncDataTabsPendingTasks(updatedValues))
                } catch (error) {
                    console.log('Pending Sync Failed: ', error);
                }
            }
            else if (e.key === "completed-tasks-v3") {
                try {
                    const updatedValues = JSON.parse(e.newValue || "[]")
                    dispatch(syncDataTabsCompletedTasks(updatedValues))
                } catch (error) {
                    console.log('Completed Sync Failed: ', error);
                }
            }
            else {
                window.location.reload()
            }
        }

        window.addEventListener("storage", sync)

        return () => {
            window.removeEventListener("storage", sync)
        }

    }, [dispatch])

}

export default SyncDataAcrossTabs