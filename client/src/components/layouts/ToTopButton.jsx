import styles from "./ToTopButton.module.css"

const ToTopButton = () => {

    return (
        <a className={styles.toTopButton} href='#navbar' tabIndex={-1} aria-label="To Top">
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 95 128"
            >
                <g transform="translate(-17, 1)">
                    <path
                        d="M64 1 17.9 127 64 99.8l46.1 27.2L64 1zm0 20.4 32.6 89.2L64 91.3V21.4z"
                        fill="var(--color1)"
                    />
                </g>
            </svg>
        </a>
    );
};

export default ToTopButton;
