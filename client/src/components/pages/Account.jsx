import styles from "./Account.module.css"
import { useEffect } from "react"
import { useRef } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { updateName } from "../../redux/accountSlice"
import { deleteAccount } from "../../redux/accountSlice"
import { toastConditions } from "../../scripts/toastConditions"

import NameSVG from "../svg/NameSVG"
import EmailSVG from "../svg/EmailSVG"


const MyAccount = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)
  const updatedNameSelector = useSelector((state) => state.account.account.updatedName)


  const nameRef = useRef()
  const [updatedName, setUpdatedName] = useState("")

  const [showSaveButton_name, setShowSaveButton_name] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (!isAccountSignedIn) {
      navigate("/signin")
    }
  }, [isAccountSignedIn])

  useEffect(() => {
    // console.log('updatedNameSelector', updatedNameSelector);
    if (updatedNameSelector) {
      setUpdatedName(updatedNameSelector)
    }
    else {
      setUpdatedName(user.name)
    }
  }, [user, updatedNameSelector])


  const handleAccountSettings = () => {
    setShowSettings(!showSettings)
  }

  const handleChangeName = () => {
    nameRef.current.removeAttribute("disabled")
    nameRef.current.focus()
    setShowSaveButton_name(true)
  }

  const handleNameBlur = () => {
    // setTimeout(() => {
    //   nameRef.current.setAttribute("disabled", "true")
    //   setShowSaveButton_name(false)
    // }, 100);
    // nameRef.current.blur()
  }

  const handleUpdate_UpdateName = () => {
    if (updatedName.trim()) {
      dispatch(updateName({ updatedName: updatedName }))
    }
    else {
      toast.warn("Empty name 😅", toastConditions)
    }
  }

  const handleCancel_UpdateName = () => {
    nameRef.current.setAttribute("disabled", "true")
    setShowSaveButton_name(false)
    if (updatedNameSelector) {
      setUpdatedName(updatedNameSelector)
    }
    else {
      setUpdatedName(user.name)
    }
  }

  const handleForgotPassword = () => {
    navigate(`/forgotpassword?email=${user.email}`)
  }

  const handleDelete = () => {
    let answer = confirm("ARE YOU SURE TO DELETE YOUR ACCOUNT ?")
    if (!answer) return
    dispatch(deleteAccount())
  }

  return (
    <div className={styles.container}>
      <h1>My Account</h1>

      <div className={styles.item}>
        <div className={styles.iconC}>
          <NameSVG isFocused={true} />
        </div>
        <input type="text" id="name" name="name" placeholder="" aria-label="name"
          value={updatedName}
          className={styles.inputText}

          ref={nameRef}
          onChange={(e) => setUpdatedName(e.target.value)}
          // onBlur={handleNameBlur}
          disabled
        />
        <label htmlFor="name">name</label>
      </div>

      {
        showSaveButton_name && (
          <div className={styles.controlButtons}>
            <button className={styles.saveButton} onClick={handleUpdate_UpdateName}>
              Update Name
            </button>
            <button className={styles.saveButton} onClick={handleCancel_UpdateName}>
              Close
            </button>
          </div>
        )
      }

      <div className={styles.item}>
        <div className={styles.iconC}>
          <EmailSVG isFocused={true} />
        </div>
        <input type="text" inputMode="email" id="email" name="email" placeholder="" aria-label="email" value={user.email}
          className={styles.inputText} disabled
        />
        <label htmlFor="email">email</label>
      </div>

      <button className={styles.accountSettingsButton} onClick={handleAccountSettings}>
        <span>
          {!showSettings && <span>Show account settings</span>}
          {showSettings && <span>Hide account settings</span>}
        </span>
        <span className={styles.icon}>
          <SettingsSVG />
        </span>
      </button>

      {
        showSettings && (
          <>
            <div className={styles.settingsButtons}>
              <button className={`${styles.settingsButton} ${styles.settings1}`} onClick={handleChangeName}>Change name</button>
              <button className={`${styles.settingsButton} ${styles.settings2}`} onClick={handleForgotPassword}>Change / Forgot password</button>
              <button className={`${styles.settingsButton} ${styles.settings3}`} onClick={handleDelete}>Delete account</button>
            </div>
          </>
        )
      }

    </div>
  )
}

export default MyAccount



const SettingsSVG = () => {

  return (
    <svg
      style={{
        width: "90%", height: "90%",
        // border: "1px solid"
      }}
      className="svgIcon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 48 48" aria-label='settings'>
      <g transform="translate(0,-1)">
        <path fill="black" d="M39.6,27.2c0.1-0.7,0.2-1.4,0.2-2.2s-0.1-1.5-0.2-2.2l4.5-3.2c0.4-0.3,0.6-0.9,0.3-1.4L40,10.8c-0.3-0.5-0.8-0.7-1.3-0.4l-5,2.3c-1.2-0.9-2.4-1.6-3.8-2.2l-0.5-5.5c-0.1-0.5-0.5-0.9-1-0.9h-8.6c-0.5,0-1,0.4-1,0.9l-0.5,5.5c-1.4,0.6-2.7,1.3-3.8,2.2l-5-2.3c-0.5-0.2-1.1,0-1.3,0.4l-4.3,7.4c-0.3,0.5-0.1,1.1,0.3,1.4l4.5,3.2c-0.1,0.7-0.2,1.4-0.2,2.2s0.1,1.5,0.2,2.2L4,30.4c-0.4,0.3-0.6,0.9-0.3,1.4L8,39.2c0.3,0.5,0.8,0.7,1.3,0.4l5-2.3c1.2,0.9,2.4,1.6,3.8,2.2l0.5,5.5c0.1,0.5,0.5,0.9,1,0.9h8.6c0.5,0,1-0.4,1-0.9l0.5-5.5c1.4-0.6,2.7-1.3,3.8-2.2l5,2.3c0.5,0.2,1.1,0,1.3-0.4l4.3-7.4c0.3-0.5,0.1-1.1-0.3-1.4L39.6,27.2z M24,35c-5.5,0-10-4.5-10-10c0-5.5,4.5-10,10-10c5.5,0,10,4.5,10,10C34,30.5,29.5,35,24,35z"></path><path fill="black" d="M24,13c-6.6,0-12,5.4-12,12c0,6.6,5.4,12,12,12s12-5.4,12-12C36,18.4,30.6,13,24,13z M24,30c-2.8,0-5-2.2-5-5c0-2.8,2.2-5,5-5s5,2.2,5,5C29,27.8,26.8,30,24,30z"></path>
      </g>
    </svg>
  )
}