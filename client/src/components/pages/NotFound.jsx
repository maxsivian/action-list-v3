import styles from "./NotFound.module.css"; 
import { Link } from "react-router-dom";
import { Grid } from 'react-loader-spinner'

const NotFound = () => {

    const getDimensions = () => {
        const containerStyle = getComputedStyle(document.documentElement);
        const width = parseInt(containerStyle.getPropertyValue("--NFwidth")) || 150;
        const height = parseInt(containerStyle.getPropertyValue("--NFheight")) || 150;
        // console.log('width, height', width, height);
        return { width, height };
    };

    const { width, height } = getDimensions(); // Get dimensions before rendering

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.header}>404</h1>
                <p className={styles.subHeader}>Oops! The page you're looking for doesn't exist.</p>
                <p className={styles.description}>It might have been moved or deleted. Please check the URL or return to one of the following options:</p>

                <div className={styles.actions}>
                    <Link to="/" className={styles.button}>Go to Homepage</Link>
                    {/* <Link to="/contact" className={styles.button}>Contact Support</Link> */}
                </div>

                <div className={styles.image}>
                    {/* <img src="./favicon.png" alt="Page Not Found" className={styles.errorImage} /> */}
                    <Grid
                        visible={true}
                        height={height}
                        width={width}
                        color="var(--color1)"
                        ariaLabel="grid-loading"
                        radius="12.5"
                    />
                </div>
            </div>
        </div>
    );
};

export default NotFound;
