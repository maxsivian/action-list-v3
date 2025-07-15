import styles from "./About.module.css"
import { useEffect } from "react"
import { setRouteLoading } from "../../redux/routeSlice"
import { useDispatch } from "react-redux"

const About = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setRouteLoading(false))
    }, [dispatch])

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th scope='col' className={styles.heading}>FEATURES</th>
                        <th scope='col' className={styles.heading}>v1</th>
                        <th scope='col' className={styles.heading}>v2</th>
                        <th scope='col' className={styles.heading}>v3</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope='row'>Animated icons (Lottie)</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Update menu popup: [ENTER] to update and [ESC] to close</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    {/* <tr>
                        <th scope='row'>Type a task and [ENTER] to add</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr> */}
                    <tr>
                        <th scope='row'>Mark tasks as important and auto sorting</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Automatically sort tasks after marking them as complete</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Clear all tasks with a single option</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Clear only completed tasks option</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Multiple color themes</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    {/* <tr>
                        <th scope='row'>"Scroll to top" button</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                    </tr> */}
                    <tr>
                        <th scope='row'>Dedicated settings menu</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Tasks Stats</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Toggle visibility of completed tasks</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>Improved UI</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                    <tr>
                        <th scope='row'>State management using Redux</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>✅</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                     <tr>
                        <th scope='row'>Cloud storage</th>
                        <td className={styles.cross}>❌</td>
                        <td className={styles.tick}>❌</td>
                        <td className={styles.tick}>✅</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default About