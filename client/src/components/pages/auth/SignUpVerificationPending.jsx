import styles from "./Auth.module.css"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const SignUpVerificationPending = () => {
    const emailPendingVerify = useSelector((state) => state.auth.others.emailPendingVerify)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAccountSignedIn) {
            navigate("/")
        }
    }, [isAccountSignedIn])

    return (
        <div className={styles.SignUpVerificationPendingC}>
            <p>
                A verification link has been sent to your email&nbsp;
            </p>
            <p className={styles.highlight}>
                "{emailPendingVerify}"
            </p>
            <p>
                Please verify your email before Signing In.
            </p>
            <p>
                You may now close this window.
            </p>
        </div>
    );

}

export default SignUpVerificationPending