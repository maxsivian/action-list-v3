import styles from "./Auth.module.css"
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { resendVerificationEmail } from "../../../redux/authSlice"


const SignInVerificationPending = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailPendingVerify = useSelector((state) => state.auth.others.emailPendingVerify)
  const isLoading = useSelector((state) => state.auth.isLoading)
  const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

  // useEffect(() => {
  //   if (isAccountSignedIn) {
  //     navigate("/")
  //   }
  // }, [isAccountSignedIn])

  return (
    <div className={styles.SignInVerificationPendingC}>
      <p>
        A verification link was sent to your email&nbsp;
      </p>
      <p className={styles.highlight}>
        "{emailPendingVerify}"
      </p>
      {/* disable this */}
      <button onClick={() => dispatch(resendVerificationEmail({ email: emailPendingVerify }))}
        disabled={isLoading}
      >
        Didn't receive the email? Resend it.
      </button>
      <p>
        Please verify your email before Signing In.
      </p>
      <p>
        You may now close this window.
      </p>
    </div>
  )
}

export default SignInVerificationPending