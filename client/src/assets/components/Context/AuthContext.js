import { createContext } from "react"

const AuthContext = createContext({
    isLoggedIn: false,
    accessToken: null,
    refreshToken: null,
    userInfo: null,
    login: () => { },
    logout: () => { },
    writeTokenInStorage: () => { }
})

export default AuthContext