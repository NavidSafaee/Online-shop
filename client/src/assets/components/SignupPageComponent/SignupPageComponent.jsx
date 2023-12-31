/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate } from 'react-router-dom';
import './SignupPageComponent.css';
import { useEffect, useState } from 'react';
import { EmailChecker, PhoneChecker } from '../REGEX/Regex';
import baseURL from '../../baseURL';
import { Spinner } from 'react-bootstrap';
import swal from 'sweetalert';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { showMessage } from '../../functions';

function SignupPageComponent() {
    // const squaresArray = Array.from(Array(260).keys())

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const [formFlag, setFormFlag] = useState(false)
    const [OTP_Flag, setOTP_Flag] = useState(false)
    const [userOTP, setUserOTP] = useState("")
    const [username, setUsername] = useState("")
    const [userPass, setUserPass] = useState("")
    const [userConfirmPass, setUserConfirmPass] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [emailOrPhone, setEmailOrPhone] = useState("")
    const [showModal, setShowModal] = useState(false)

    const EmailPhoneValidator = (inp) => {
        if (EmailChecker(inp) | PhoneChecker(inp)) {
            if (EmailChecker(inp)) {
                setUserEmail(inp)
                setUserPhone(undefined)
            } else if (PhoneChecker(inp)) {
                setUserPhone(inp)
                setUserEmail(undefined)
            }
            return true
        } else {
            showMessage({
                title: "Invalid contact info!",
                text: "Please enter a valid email or phone number",
                icon: "warning",
                dangerMode: true
            })
            return false
        }
    }

    const FormChecker = () => {
        if (EmailPhoneValidator(emailOrPhone)) {
            setFormFlag(true)
        }
    }

    const FormSender = () => {
        let formInfo = {
            username,
            password: userPass,
            email: userEmail,
            phoneNumber: userPhone,
            confirmPassword: userConfirmPass
        }
        fetch(`${baseURL}/auth/contact-verification`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfo)
        }).then(res => {
            console.log(res)
            if (res.status === 204) {
                setShowModal(true)
            } else {
                return res.json()
            }
        }).then(data => {
            console.log(data)
            if (data) {
                showMessage({ title: "Oops!", text: data.message, icon: "warning" })
                    .then(val => {
                        setFormFlag(false)
                        setUserPass("")
                        setUserConfirmPass("")
                    })
            }
        })
    }

    const OPTSender = () => {
        setOTP_Flag(true)
        let formInfoWithOTP = {
            username,
            password: userPass,
            email: userEmail,
            phoneNumber: userPhone,
            confirmPassword: userConfirmPass,
            OTP: userOTP
        }
        console.log(formInfoWithOTP);
        fetch(`${baseURL}/auth/signup`, {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(formInfoWithOTP)
        })
            .then(res => {
                console.log(res)
                if (res.ok) {
                    showMessage({
                        title: "congratulations!",
                        text: "Your registration was successful!",
                        icon: "success",
                        timer: 3000
                    })
                }
                return res.json()
            })
            .then(data => {
                if (data.message && (data.message === "Wrong contact info or OTP")) {
                    showMessage({
                        title: "Wrong OTP!!",
                        text: "Please enter the OTP correctly",
                        icon: "error"
                    })
                    setOTP_Flag(false)
                    setUserOTP("")
                } else if (data) {
                    authContext.login(data.user, data.accessToken, data.refreshToken)
                    navigate("/")
                }
            })
    }

    useEffect(() => {
        if (formFlag) {
            FormSender()
        }
    }, [formFlag])

    return (
        <>
            <section className="signup-page-container">

                {/* {
                    squaresArray.map((sq, i) => (
                        <span key={i} className="bg-square"></span>
                    ))
                } */}
                <div className="sign-up">

                    <img src="./../../../../public/general_images/logo.png" alt="" />
                    <div className="form-container">

                        <h2 className="form-title">signup</h2>

                        <div className="form">

                            <div className="inputBox">

                                <input type="text"
                                    required
                                    value={username}
                                    onChange={e => setUsername(e.target.value)}
                                /><i>Username</i>

                            </div>

                            <div className="inputBox">

                                <input type="text"
                                    required
                                    value={emailOrPhone}
                                    onChange={(e) => setEmailOrPhone(e.target.value)}
                                /><i>Email / phone number</i>
                            </div>

                            <div className="inputBox">

                                <input
                                    type="password"
                                    required
                                    value={userPass}
                                    onChange={e => setUserPass(e.target.value)}
                                    maxLength={6}
                                    minLength={6}
                                /> <i>Password</i>

                            </div>

                            <div className="inputBox">

                                <input
                                    type="password"
                                    required
                                    value={userConfirmPass}
                                    onChange={e => setUserConfirmPass(e.target.value)}
                                    maxLength={6}
                                    minLength={6}
                                /> <i>Reenter Password</i>

                            </div>


                            <div className="links"><Link to={"/login"} className='login-link'>Login</Link>

                            </div>

                            <div className="inputBox">

                                <button
                                    className='form-btn'
                                    onClick={FormChecker}
                                >
                                    {!formFlag ? "continue" : <Spinner animation="grow" variant="dark" />}
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

                {showModal && <div className="otp-modal-bg">
                    <div className="otp-modal">
                        <img src="./../../../../public/general_images/otp_icon.png" alt="password-icon" />
                        <span className='otp-title'>Enter OTP code</span>
                        <p className='check-way-text'>Please check your {(userEmail !== undefined) ? "email" : "phone"}</p>
                        <input className='otp-input'
                            type="text"
                            value={userOTP}
                            onChange={e => setUserOTP(e.target.value)}
                            maxLength={6}
                            minLength={6}
                        />
                        <button
                            className={`otp-verification-btn ${(userOTP.length == 6) && "otp-active-btn"}`}
                            onClick={OPTSender}
                        >
                            {!OTP_Flag ? "Verify OTP" : <Spinner animation="grow" variant="dark" />}
                        </button>
                    </div>
                </div>}

            </section>
        </>
    )
}

export default SignupPageComponent