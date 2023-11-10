import { Link } from 'react-router-dom';
import './SignupPageComponent.css';
import { useEffect, useState } from 'react';
import { EmailChecker, PhoneChecker } from '../REGEX/Regex';

function SignupPageComponent() {
    // const squaresArray = Array.from(Array(260).keys())

    const [formFlag, setFormFlag] = useState(false)
    const [userOTP, setuUserOTP] = useState("")
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
                setUserPhone(null)
            } else if (PhoneChecker(inp)) {
                setUserPhone(inp)
                setUserEmail(null)
            }
            return true
        } else {
            alert("")
            return false
        }
    }

    const FormChecker = () => {
        if (EmailPhoneValidator(emailOrPhone)) {
            setFormFlag(true)
        }
    }

    const FormSender = () => {
        console.log(username, emailOrPhone, userEmail, userPhone, userPass, userConfirmPass)
    }

    useEffect(() => {
        if (formFlag) {
            FormSender()
            setShowModal(true)
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
                                /> <i>Password</i>

                            </div>

                            <div className="inputBox">

                                <input
                                    type="password"
                                    required
                                    value={userConfirmPass}
                                    onChange={e => setUserConfirmPass(e.target.value)}
                                /> <i>Password</i>

                            </div>


                            <div className="links"><Link to={"/login"} className='login-link'>Login</Link>

                            </div>

                            <div className="inputBox">

                                <button className='form-btn' onClick={() => FormChecker(emailOrPhone)}>sign up</button>

                            </div>

                        </div>

                    </div>

                </div>

                {showModal && <div className="otp-modal-bg">
                    <div className="otp-modal">
                        <span>Enter your code</span>
                        <input className='otp-input' type="text" value={userOTP} onChange={e => setuUserOTP(e.target.value)}/>
                    </div>
                </div>}

            </section>
        </>
    )
}

export default SignupPageComponent