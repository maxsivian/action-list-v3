import styles from "./Auth.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"

import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Grid } from "react-loader-spinner"
import { toast } from "react-toastify"
import { resetPassword } from "../../../redux/authSlice"
import { useSearchParams } from "react-router-dom"
import { validatePassword } from "../../../scripts/validatePassword"

import LogoSVG from "../../svg/LogoSVG"
import NameSVG from "../../svg/NameSVG"
import EmailSVG from "../../svg/EmailSVG"
import PasswordSVG from "../../svg/PasswordSVG"
import PasswordShowSVG from "../../svg/PasswordShowSVG"
import PasswordHideSVG from "../../svg/PasswordHideSVG"
import ResetSVG from "../../svg/ResetSVG"

import { toastConditions } from "../../../scripts/toastConditions"


// const toastConditions = {
//     position: "bottom-left",
//     autoClose: 4000,
//     hideProgressBar: false,
//     closeOnClick: false,
//     pauseOnHover: true,
//     draggable: true,
//     progress: undefined,
//     theme: "dark",
//     // transition: Bounce,
// }

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [search] = useSearchParams()
    // // console.log(search);
    // console.log(search.get("name"));
    // console.log(search.get("email"));


    const isLoading = useSelector((state) => state.auth.isLoading)
    // const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

    const [form, setForm] = useState({ password: "", confirm_password: "" })
    const [formFocused, setFormFocused] = useState({ password: false, confirm_password: false })
    const [isPasswordMatching, setIsPasswordMatching] = useState(2)

    const minCharLimitRef = useRef(null)
    const includeUpperCaseRef = useRef(null)
    const includeNumberRef = useRef(null)

    const [passwordVisibility, setPasswordVisibility] = useState(false)

    const [token, setToken] = useState("Not Available")
    const [email, setEmail] = useState("Not Available")
    const [name, setName] = useState("Not Available")

    // useEffect(() => {
    //     if (isAccountSignedIn) {
    //         navigate("/")
    //     }
    // }, [isAccountSignedIn])

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

    useEffect(() => {
        let token = search.get("token")
        if (token) {
            setToken(token)
            //clear form ui
        }
        else {
            toast.error("Token is missing. Redirecting to Sign In page... 😅", toastConditions);
            setTimeout(() => {
                navigate("/signin")
            }, 3000);
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
        }

        let name = search.get("name")
        if (name) {
            setName(name)
        }

    }, [search])



    // useEffect(() => {
    //   console.log('form', form);
    // }, [form])

    // useEffect(() => {
    //     console.log('formFocused', formFocused);
    // }, [formFocused])




    const handleSubmit = (e) => {
        e.preventDefault()

        if (!token) {
            toast.error("Token is missing. Redirecting to Sign In page... 😅", toastConditions);
            setTimeout(() => {
                navigate("/signin")
            }, 3000);
        }

        if (!email) {
            toast.error("Email is missing. Redirecting to Sign In page... 😅", toastConditions);
            setTimeout(() => {
                navigate("/signin")
            }, 3000);
        }

        if (form.password.trim().length == 0) {
            // console.log('new password is empty 😅');
            toast.warn("new password is empty 😅", toastConditions);
            return;
        }

        const isPasswordValid = validatePassword(form.password)

        if (!isPasswordValid) {
            // console.log('Please fulfill password conditions 😅');
            toast.warn("Please fulfill password conditions 😅", toastConditions);
            return
        }

        if (form.confirm_password.trim().length == 0) {
            // console.log('Confirm new password is empty 😅');
            toast.warn("Confirm new password is empty 😅", toastConditions);
            return;
        }

        if (!isPasswordMatching) {
            // console.log("Please match the passwords 😅");
            toast.warn("Please match the passwords 😅", toastConditions);
            return
        }

        dispatch(resetPassword({ password: form.password.trim(), token, email }))

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
                <div className={styles.containerResetPassword}>
                    <form className={`${styles.box} ${styles.animateBoxResetPassword}`} onSubmit={handleSubmit}>
                        <h1>Reset Password</h1>

                        <div className={`${styles.item} ${styles.resetItem}`}>
                            <div className={styles.iconC}>
                                <NameSVG isFocused={formFocused.name} />
                            </div>
                            <input type="text" id="name" name="name" placeholder="" aria-label="name"
                                value={name}
                                className={styles.inputText}
                                readOnly
                            />
                            <label htmlFor="name">name</label>
                        </div>

                        <div className={`${styles.item} ${styles.resetItem}`}>
                            <div className={styles.iconC}>
                                <EmailSVG isFocused={formFocused.email} />
                            </div>
                            <input type="text" inputMode="email" id="email" name="email" placeholder="" aria-label="email"
                                value={email}
                                className={styles.inputText}
                                readOnly
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
                            <label htmlFor="password">new password</label>
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
                            <label htmlFor="confirm_password">confirm new password</label>
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
                                Reset Password
                            </span>
                            <span className={styles.icon}>
                                {/* <SignUpSVG /> */}
                                <ResetSVG />
                            </span>
                        </button>

                        <button className={styles.sideButtonMobile} onClick={handleSideButtonClick}
                            type="button">
                            Don't want to reset password? Sign In
                        </button>
                    </form>
                    <div className={`${styles.sideBox} ${styles.animateSideBoxResetPassword}`}>
                        <div className={styles.logoC}>
                            <LogoSVG />
                        </div>
                        <h2>Almost There</h2>
                        <p>Set a new password to regain access to your tasks.</p>

                        <button className={styles.sideButton} onClick={handleSideButtonClick}>
                            Don't want to reset password? Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword