import styles from "./Navbar.module.css"
import { useRef } from "react"
import { useState } from "react"
import { useSelector } from "react-redux"
import { NavLink } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { useLocation } from "react-router-dom"
import { Player } from '@lordicon/react';

import { setRouteLoading } from "../../redux/routeSlice"
import { signOut } from "../../redux/authSlice"
import { resetSyncStatus } from "../../redux/tasksSlice"
import { clearAccountFromLS } from "../../redux/accountSlice"
import { colorThemes } from "../../scripts/colorThemesConfig"

import LogoSVG from "../svg/LogoSVG"
import Settings from "./Settings"
import ACCOUNT_ICON from "../../assets/account.json";


const Navbar = () => {

  const dispatch = useDispatch()
  const location = useLocation()

  const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)

  const handleClick = (targetPath) => {
    // console.log("location", location);
    // console.log("location.pathname", location.pathname);
    // console.log('targetPath', targetPath);
    if (location.pathname != targetPath) {
      dispatch(setRouteLoading(true))
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <NavLink to={"/"} tabIndex={-1} >
          <LogoSVG />
        </NavLink>
      </div>
      <nav className={styles.nav} id='navbar'>
        <div className={styles.logoLabel}>
          ACTION LIST v3
        </div>
        <ul>
          <li>
            <NavLink to={"/"} tabIndex={-1} className={e => e.isActive ? styles.active : ""} aria-label='Home' onClick={() => handleClick("/")}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"} tabIndex={-1} className={e => e.isActive ? styles.active : ""} aria-label='About' onClick={() => handleClick("/about")}>About</NavLink>
          </li>
          <li className={styles.settings}>
            <Settings />
          </li>
        </ul>
      </nav>
      <div className={styles.account}>
        {isAccountSignedIn && <AccountPopUpAfterSignedIn />}
        {!isAccountSignedIn && <AccountPopUpBeforeSignedIn />}
      </div>
    </header>
  )
}

export default Navbar




const AccountPopUpBeforeSignedIn = () => {

  const accountPlayerRef = useRef(null);
  const colorTheme = useSelector((state) => state.themes.value)

  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [anim, setAnim] = useState(false)

  const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)


  const handleClick = () => {
    accountPlayerRef.current?.playFromBeginning()

    if (isPopUpVisible) {
      setAnim(false)
      setTimeout(() => {
        setIsPopUpVisible(false)
      }, 300);
    }
    else {
      setIsPopUpVisible(true)
      setTimeout(() => {
        setAnim(true)
      }, 10);
    }
  }

  const handleBlur = () => {
    setAnim(false)
    setTimeout(() => {
      setIsPopUpVisible(false)
    }, 300);
  }

  return (
    <div className={styles.accountContainer}
      onClick={handleClick}
      onMouseEnter={() => { accountPlayerRef.current?.playFromBeginning() }}
      onBlur={handleBlur}
      tabIndex={1}
    >
      <Player
        ref={accountPlayerRef}
        icon={ACCOUNT_ICON}
        colors={isAccountSignedIn ? colorThemes[colorTheme] : "primary:gray,secondary:gray"}
        size={"80%"}
      />

      {
        isPopUpVisible && (
          <div className={`${styles.accountPopUpC} ${anim ? styles.anim : ""}`} >
            <ul>
              <li>
                <NavLink to={"/signup"}>Sign&nbsp;Up</NavLink>
              </li>
            </ul>
            <ul>
              <li>
                <NavLink to={"/signin"}>Sign&nbsp;In</NavLink>
              </li>
            </ul>
          </div>
        )
      }
    </div>
  )
}



const AccountPopUpAfterSignedIn = () => {

  const dispatch = useDispatch()
  const accountPlayerRef = useRef(null);
  const colorTheme = useSelector((state) => state.themes.value)

  const [isPopUpVisible, setIsPopUpVisible] = useState(false)
  const [anim, setAnim] = useState(false)

  const isAccountSignedIn = useSelector((state) => state.auth.isAccountSignedIn)
  const picture = useSelector((state) => state.auth.user.picture)


  const handleClick = () => {
    accountPlayerRef.current?.playFromBeginning()

    if (isPopUpVisible) {
      setAnim(false)
      setTimeout(() => {
        setIsPopUpVisible(false)
      }, 300);
    }
    else {
      setIsPopUpVisible(true)
      setTimeout(() => {
        setAnim(true)
      }, 10);
    }
  }

  const handleBlur = () => {
    setAnim(false)
    setTimeout(() => {
      setIsPopUpVisible(false)
    }, 300);
  }

  const handleSignOut = () => {
    // console.log('Sign Out...');
    dispatch(signOut())
    dispatch(resetSyncStatus())
    dispatch(clearAccountFromLS())
  }

  return (
    <div className={styles.accountContainer}
      onClick={handleClick}
      onMouseEnter={() => { accountPlayerRef.current?.playFromBeginning() }}
      onBlur={handleBlur}
      tabIndex={1}
    >
      {
        !picture && (
          <Player
            ref={accountPlayerRef}
            icon={ACCOUNT_ICON}
            colors={isAccountSignedIn ? colorThemes[colorTheme] : "primary:gray,secondary:gray"}
            size={"80%"}
          />
        )
      }

      {
        picture && (
          <div className={styles.pictureC}>
            <img src={picture} alt="" className={styles.picture} referrerPolicy="no-referrer" />
          </div>
        )
      }

      {
        isPopUpVisible && (
          <div className={`${styles.accountPopUpC} ${anim ? styles.anim : ""}`} >
            <ul>
              <li>
                <NavLink to={"/account"}
                // target="_blank"
                >My&nbsp;Account</NavLink>
              </li>
              <li>
                <button onClick={handleSignOut}>Sign&nbsp;Out</button>
              </li>
            </ul>
          </div>
        )
      }
    </div>
  )
}
