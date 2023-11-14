import swal from 'sweetalert'
import './ForgotPass.scss'
import { EmailChecker, PhoneChecker } from '../REGEX/Regex'
import { useEffect, useState } from 'react'
// import baseURL from '../../baseURL'

function ForgotPass() {

    const [formFlag, setFormFlag] = useState(false)
    const [userEmail, setUserEmail] = useState("")
    const [userPhone, setUserPhone] = useState("")
    const [emailOrPhone, setEmailOrPhone] = useState("")


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
            swal({
                title: "Invalid contact info!",
                text: "Please enter a valid email or phone number",
                icon: "warning",
                dangerMode: true,
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
            email: userEmail,
            phoneNumber: userPhone
        }
        console.log(formInfo)
        // fetch(`${baseURL}/auth/contact-verification`, {
        //     method: "POST",
        //     headers: { "Content-type": "application/json" },
        //     body: JSON.stringify(formInfo)
        // }).then(res => {
        //     console.log(res)
        // })
    }

    useEffect(() => {
        if (formFlag) {
            FormSender()
        }
    }, [formFlag])

    return (
        <div className="forget-page">
            <img className="forget-pass-img" src="./../../../../public/general_images/forget-pass.png" alt="forget-password" />
            <div className="forget-form-wrapper">
                <strong className="forgot-form-title">Forgot Your Password?</strong>
                <input
                    className="forgot-form-input"
                    type="text"
                    placeholder="Enter your email or phone number"
                    value={emailOrPhone}
                    onChange={e => setEmailOrPhone(e.target.value)}
                />
                <button className="forgot-form-btn" onClick={() => FormChecker()}>continue</button>
            </div>
        </div>
    )
}

export default ForgotPass