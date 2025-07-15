import styles from "./Auth.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Grid } from "react-loader-spinner"
import { toast } from "react-toastify"
import { GoogleLogin } from "@react-oauth/google"


import { signIn } from "../../../redux/authSlice"
import { signInWithGoogle } from "../../../redux/authSlice"
import { toastConditions } from "../../../scripts/toastConditions"
import { clearAccountFromLS } from "../../../redux/accountSlice"

import LogoSVG from "../../svg/LogoSVG"
import SignUpSVG from "../../svg/SignUpSVG"
import EmailSVG from "../../svg/EmailSVG"
import PasswordSVG from "../../svg/PasswordSVG"
// import GoogleImg from "/google.png"
import PasswordShowSVG from "../../svg/PasswordShowSVG"
import PasswordHideSVG from "../../svg/PasswordHideSVG"

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

const SignIn = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector((state) => state.auth.isLoading)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

    const [form, setForm] = useState({ email: "", password: "" })
    const [formFocused, setFormFocused] = useState({ email: false, password: false })
    const [passwordVisibility, setPasswordVisibility] = useState(false)


    // useEffect(() => {
    //   console.log('form', form);
    // }, [form])

    // useEffect(() => {
    //     console.log('formFocused', formFocused);
    // }, [formFocused])


    useEffect(() => {
        if (isAccountSignedIn) {
            navigate("/")
        }
    }, [isAccountSignedIn])


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

        if (form.password.trim().length == 0) {
            // console.log('Password is empty 😅');
            toast.warn("Password is empty 😅", toastConditions);
            return;
        }

        dispatch(signIn({ email: form.email.trim(), password: form.password.trim() }))
        dispatch(clearAccountFromLS())
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
        navigate("/signup")
    }

    const handlePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
    }

    const handleForgotPassword = () => {
        navigate("/forgotpassword")
    }


    const handleGoogleSuccess = (credentialResponse) => {
        const idToken = credentialResponse.credential;
        dispatch(signInWithGoogle(idToken));
    };

    const handleGoogleError = () => {
        toast.error("Google Sign-In failed 😞", toastConditions);
    };



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
                <div className={styles.containerSignIn}>
                    <form className={`${styles.box} ${styles.animateBoxSignIn}`} onSubmit={handleSubmit}>
                        <h1>Sign In</h1>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <EmailSVG isFocused={formFocused.email} />
                            </div>
                            <input type="text" inputMode="email" id="email" name="email" placeholder="" aria-label="email" value={form.email} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                                autoComplete="email"
                            />
                            <label htmlFor="email">email</label>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <PasswordSVG isFocused={formFocused.password} />
                            </div>
                            <input type={passwordVisibility ? "text" : "password"} id="password" name="password" placeholder="" aria-label="password" value={form.password} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                                autoComplete="current-password"
                            />
                            <label htmlFor="password">password</label>
                            <button className={styles.passwordVisibility} onClick={handlePasswordVisibility} type="button">
                                {passwordVisibility && <PasswordHideSVG isFocused={formFocused.password} />}
                                {!passwordVisibility && <PasswordShowSVG isFocused={formFocused.password} />}
                            </button>
                        </div>

                        <button className={styles.SignUpbutton}>
                            <span>
                                Sign&nbsp;In
                            </span>
                            <span className={styles.icon}>
                                <SignUpSVG />
                            </span>
                        </button>

                        <div className={styles.otherOptionsC}>
                            <div>or sign in with</div>
                            <div className={styles.otherOptions}>
                                {/* google */}
                                <div className={styles.otherOption}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={handleGoogleError}
                                        // useOneTap // optional
                                        size="large"
                                    />
                                </div>
                                {/* <button className={styles.otherOption} type="button">
                                    <img src={GoogleImg} alt="" className={styles.otherOptionIcon} />
                                </button> */}
                            </div>
                        </div>

                        <button className={styles.ForgotPasswordButton} onClick={handleForgotPassword}
                            type="button"
                        >Forgot Password ?
                        </button>

                        <button className={styles.sideButtonMobile} onClick={handleSideButtonClick}
                            type="button"
                        >No account yet? Sign Up</button>
                    </form>
                    <div className={`${styles.sideBox} ${styles.animateSideBoxSignIn}`}>
                        <div className={styles.logoC}>
                            <LogoSVG />
                        </div>
                        <h2>Welcome Back</h2>
                        <p>We're glad to have you back! Sign In to access your tasks and keep everything in sync.</p>
                        <button className={styles.sideButton} onClick={handleSideButtonClick}>No account yet? Sign Up</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn