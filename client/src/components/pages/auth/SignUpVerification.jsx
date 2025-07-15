import styles from "./Auth.module.css"
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"

import { postSignUp } from '../../../redux/authSlice'
import { resendVerificationEmail } from "../../../redux/authSlice"
import { clearAccountFromLS } from "../../../redux/accountSlice"
import { toastConditions } from "../../../scripts/toastConditions"

// const toastConditions = {
//     position: "bottom-left",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//     // transition: Bounce,
// }

const SignUpVerification = () => {
    const navigate = useNavigate()
    const [search] = useSearchParams()
    const dispatch = useDispatch()
    const isVerificationFailed = useSelector((state) => state.auth.others.isVerificationFailed)
    const isVerificationEmailSent = useSelector((state) => state.auth.others.isVerificationEmailSent)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)
    const isLoading = useSelector((state) => state.auth.isLoading)

    // const [token, setToken] = useState("Not Available")
    const [email, setEmail] = useState("Not Available")

    useEffect(() => {
        if (isAccountSignedIn) {
            navigate("/")
        }
    }, [isAccountSignedIn])


    useEffect(() => {
        let token = search.get("token")
        if (token) {
            // setToken(token)
            //clear form ui
        }
        else {
            toast.error("Token is missing. Redirecting to Sign In page... 😅", toastConditions);
            setTimeout(() => {
                navigate("/signin")
            }, 3000);
            return
        }

        let email = search.get("email")
        if (email) {
            setEmail(email)
        }
        else {
            toast.error("Email is missing. Redirecting to Sign In page... 😅", toastConditions);
            setTimeout(() => {
                navigate("/signin")
            }, 3000);
            return
        }

        dispatch(postSignUp({ email, token }))
        dispatch(clearAccountFromLS())
    }, [search])


    return (
        <div className={styles.SignUpVerificationC}>
            <h1>Email Verification</h1>
            <p className={styles.highlight}>{email}</p>
            {/* {token} */}

            {
                isVerificationFailed && (
                    <button onClick={() => dispatch(resendVerificationEmail({ email }))}
                        disabled={isLoading}
                    >
                        Verification Failed? Resend email
                    </button>
                )
            }

            {
                isVerificationEmailSent && (
                    <div>
                        A new verification link has been sent to your email. You may now close this window.
                    </div>
                )
            }
        </div>
    )
}

export default SignUpVerification