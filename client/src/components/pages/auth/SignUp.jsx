import styles from "./Auth.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Grid } from "react-loader-spinner"
import { toast } from "react-toastify"
import { GoogleLogin } from "@react-oauth/google"

import { preSignUp } from "../../../redux/authSlice"
import { validatePassword } from "../../../scripts/validatePassword"
import { signInWithGoogle } from "../../../redux/authSlice"
import { toastConditions } from "../../../scripts/toastConditions"
import { clearAccountFromLS } from "../../../redux/accountSlice"

import LogoSVG from "../../svg/LogoSVG"
import SignUpSVG from "../../svg/SignUpSVG"
import NameSVG from "../../svg/NameSVG"
import EmailSVG from "../../svg/EmailSVG"
import PasswordSVG from "../../svg/PasswordSVG"
import PasswordShowSVG from "../../svg/PasswordShowSVG"
import PasswordHideSVG from "../../svg/PasswordHideSVG"
// import GoogleImg from "/google.png"

// const toastConditions = {
//     position: "bottom-left",
//     autoClose: 2000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//     // transition: Bounce,
// }


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isLoading = useSelector((state) => state.auth.isLoading)
    const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

    const [form, setForm] = useState({ name: "", email: "", password: "", confirm_password: "" })
    const [formFocused, setFormFocused] = useState({ name: false, email: false, password: false, confirm_password: false })
    const [isPasswordMatching, setIsPasswordMatching] = useState(2)

    const minCharLimitRef = useRef(null)
    const includeUpperCaseRef = useRef(null)
    const includeNumberRef = useRef(null)

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

    useEffect(() => {
        // console.log('form.password');
        if (form.password.trim().length >= 8) {
            minCharLimitRef.current.classList.add(styles.greenBg)
        }
        else {
            minCharLimitRef.current.classList.remove(styles.greenBg, styles.redBg)
        }

        if (/[A-Z]/.test(form.password)) {
            includeUpperCaseRef.current.classList.add(styles.greenBg)
        }
        else {
            includeUpperCaseRef.current.classList.remove(styles.greenBg, styles.redBg)
        }

        if (/[0-9]/.test(form.password)) {
            includeNumberRef.current.classList.add(styles.greenBg)
        }
        else {
            includeNumberRef.current.classList.remove(styles.greenBg, styles.redBg)
        }

        if (form.password.trim().length && form.confirm_password.trim().length) {
            if (form.password.trim() == form.confirm_password.trim()) {
                setIsPasswordMatching(1)
            }
            else {
                setIsPasswordMatching(0)
            }
        }


    }, [form.password, form.confirm_password])



    const handleSubmit = (e) => {
        e.preventDefault()


        if (form.name.trim() == "") {
            // console.log('Name is empty 😅');
            toast.warn("Name is empty 😅", toastConditions);
            return;
        }

        if (form.email.trim() == "") {
            // console.log('Email is empty 😅');
            toast.warn("Email is empty 😅", toastConditions);
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            // console.log('Email format is not valid 😅');
            toast.warn("Email format is not valid 😅", toastConditions);
            return;
        }

        if (form.password.trim() == "") {
            // console.log('Password is empty 😅');
            toast.warn("Password is empty 😅", toastConditions);
            return;
        }

        const isPasswordValid = validatePassword(form.password)

        if (!isPasswordValid) {
            // console.log('Please fulfill password conditions 😅');
            toast.warn("Please fulfill password conditions 😅", toastConditions);
            return
        }


        if (form.confirm_password.trim() == "") {
            // console.log('Confirm password is empty 😅');
            toast.warn("Confirm password is empty 😅", toastConditions);
            return;
        }

        if (!isPasswordMatching) {
            // console.log("Please match the passwords 😅");
            toast.warn("Please match the passwords 😅", toastConditions);
            return
        }

        dispatch(preSignUp({ name: form.name.trim(), email: form.email.trim(), password: form.password.trim() }))
        dispatch(clearAccountFromLS())
        // console.log('Submitted');
    }

    const handleChange = (e) => {
        if (e.target.name == "password" || e.target.name == "confirm_password") {
            if (e.target.value.includes(" ")) {
                // console.log('No spaces allowed in password 😅');
                toast.warn("No spaces allowed in password 😅", toastConditions);
                return
            }
        }
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

    const handlePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility)
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
                <div className={styles.containerSignUp}>
                    <form className={`${styles.box} ${styles.animateBoxSignUp}`} onSubmit={handleSubmit}>
                        <h1>Sign Up</h1>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <NameSVG isFocused={formFocused.name} />
                            </div>
                            <input type="text" id="name" name="name" placeholder="" aria-label="name" value={form.name} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                            />
                            <label htmlFor="name">name</label>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <EmailSVG isFocused={formFocused.email} />
                            </div>
                            <input type="text" inputMode="email" id="email" name="email" placeholder="" aria-label="email" value={form.email} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                            />
                            <label htmlFor="email">email</label>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <PasswordSVG isFocused={formFocused.password} />
                            </div>
                            <input type={passwordVisibility ? "text" : "password"} id="password" name="password" placeholder="" aria-label="password" value={form.password} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                            />
                            <label htmlFor="password">password</label>
                            <button className={styles.passwordVisibility} onClick={handlePasswordVisibility} type="button">
                                {passwordVisibility && <PasswordHideSVG isFocused={formFocused.password} />}
                                {!passwordVisibility && <PasswordShowSVG isFocused={formFocused.password} />}
                            </button>
                        </div>

                        <div className={styles.passwordConditions}>
                            <div className={styles.passwordCondition}>
                                <div className={styles.passwordBox} ref={minCharLimitRef}>
                                </div>
                                <div>
                                    At least 8 characters long
                                </div>
                            </div>
                            <div className={styles.passwordCondition}>
                                <div className={styles.passwordBox} ref={includeUpperCaseRef}>
                                </div>
                                <div>
                                    At least 1 capital letter
                                </div>
                            </div>
                            <div className={styles.passwordCondition}>
                                <div className={styles.passwordBox} ref={includeNumberRef}>
                                </div>
                                <div>
                                    At least 1 number
                                </div>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconC}>
                                <PasswordSVG isFocused={formFocused.confirm_password} />
                            </div>
                            <input type="password" id="confirm_password" name="confirm_password" placeholder="" aria-label="confirm_password" value={form.confirm_password} onChange={handleChange} className={styles.inputText}
                                onFocus={handleFocus} onBlur={handleBlur}
                            />
                            <label htmlFor="confirm_password">confirm password</label>
                        </div>

                        <div className={styles.passwordMatch}>
                            {isPasswordMatching == 0 && (
                                <div className={styles.red}>Passwords don't match</div>
                            )}
                            {isPasswordMatching == 1 && (
                                <div className={styles.green}>Passwords match</div>
                            )}
                            {isPasswordMatching == 2 && (
                                <div>&nbsp;</div>
                            )}
                        </div>

                        <button className={styles.SignUpbutton}>
                            <span>
                                Sign&nbsp;Up
                            </span>
                            <span className={styles.icon}>
                                <SignUpSVG />
                            </span>
                        </button>

                        <div className={styles.otherOptionsC}>
                            <div>or sign in with</div>
                            <div className={styles.otherOptions}>
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


                        <button className={styles.sideButtonMobile} onClick={handleSideButtonClick}
                            type="button"
                        >Already have an account? Sign In</button>

                    </form>
                    <div className={`${styles.sideBox} ${styles.animateSideBoxSignUp}`}>
                        <div className={styles.logoC}>
                            <LogoSVG />
                        </div>
                        <h2>Join Us Today</h2>
                        <p>We're excited to have you! Sign Up to access cloud storage for your tasks.</p>
                        <button className={styles.sideButton} onClick={handleSideButtonClick}>Already have an account? Sign In</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp




