import styles from "./Auth.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Grid } from "react-loader-spinner"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom"

import { forgotPassword } from "../../../redux/authSlice"
import { toastConditions } from "../../../scripts/toastConditions"

import LogoSVG from "../../svg/LogoSVG"
import EmailSVG from "../../svg/EmailSVG"
import SendSVG from "../../svg/SendSVG"

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

const ForgotPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search] = useSearchParams()
    const isLoading = useSelector((state) => state.auth.isLoading)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

    const [form, setForm] = useState({ email: "" })
    const [formFocused, setFormFocused] = useState({ email: false })


    // useEffect(() => {
    //   console.log('form', form);
    // }, [form])

    // useEffect(() => {
    //     console.log('formFocused', formFocused);
    // }, [formFocused])

    useEffect(() => {
      let email = search.get("email")
      if(email){
        setForm({...form, email: email})
      }
    }, [search])
    

    // useEffect(() => {
    //     if (isAccountSignedIn) {
    //         navigate("/")
    //     }
    // }, [isAccountSignedIn])


    const handleSubmit = (e) => {
        e.preventDefault()

        if (form.email.trim().length == 0) {
            // console.log('Email is empty 😅');
            toast.warn("Email is empty 😅", toastConditions);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            // console.log('Email format is not valid 😅');
            toast.warn("Email format is not valid 😅", toastConditions);
            return;
        }

        dispatch(forgotPassword({ email: form.email.trim() }))

        // console.log('Submitted');
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleFocus = (e) => {
        setFormFocused({ ...formFocused, [e.target.name]: true })
    }

    const handleBlur = (e) => {
        setFormFocused({ ...formFocused, [e.target.name]: false })
    }

    const handleSideButtonClick = () => {
        navigate("/signin")
    }

    return (
        <>
            {
                isLoading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.loadingIcon}>
                            <Grid
                                visible={true}
                                height="100%"
                                width="100%"
                                color="var(--color1)"
                                ariaLabel="grid-loading"
                                radius="12.5"
                            />
                        </div>
                    </div>
                )
            }
            <div className={styles.mainContainer}>
                <div className={styles.containerForgotPassword}>
                    <form className={`${styles.box} ${styles.animateBoxForgotPassword}`} onSubmit={handleSubmit}>
                        <h1>Forgot Password</h1>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <EmailSVG isFocused={formFocused.email} />
                            </div>
                            <input type="text" inputMode="email" id="email" name="email" placeholder="" aria-label="email" value={form.email} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                            />
                            <label htmlFor="email">email</label>
                        </div>

                        <button className={styles.SignUpbutton}>
                            <span>
                                Send Reset Link
                            </span>
                            <span className={styles.icon}>
                                <SendSVG />
                            </span>
                        </button>

                        <div className={styles.forgotPasswordText}>
                            We will send a password reset link to this email address if it is associated with an account.
                        </div>

                        <button className={styles.sideButtonMobile} onClick={handleSideButtonClick}
                            type="button"
                        >Remember password? Sign In</button>
                    </form>
                    <div className={`${styles.sideBox} ${styles.animateSideBoxForgotPassword}`}>
                        <div className={styles.logoC}>
                            <LogoSVG />
                        </div>
                        <h2>Don't worry!</h2>
                        <p>Trouble Signing In? Enter your email to receive a password reset link.</p>
                        <button className={styles.sideButton} onClick={handleSideButtonClick}>Remember password? Sign In</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword