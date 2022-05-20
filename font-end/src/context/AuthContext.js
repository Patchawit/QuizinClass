import React, { createContext, useState, useEffect, useContext } from "react";
// import cookie from 'js-cookie'
import Cookies from 'universal-cookie';
import axios from 'axios';

const AuthContext = createContext();
const cookies = new Cookies();

export const AuthContextProvider = (props) => {
    const [isLogin, setIsLogin] = useState(false)
    const [user, setUser] = useState('')
    const [loginBy, setLoginBy] = useState('')
    const [studentid, setStudentid] = useState('')
    const [Authcookie, setAuthCookie] = useState('');
    const [IsShowModal, setIsShowModal] = useState(false)
    const googleAuth = ({ profileObj }) => {
        axios.post("http://localhost:7050/auth/login", {
            data: {
                googleId: profileObj.googleId,
                email: profileObj.email,
                first_name: profileObj.givenName,
                last_name: profileObj.familyName
            }
        })
            .then(res => {
                console.log(res.data)
                return res.data

            })
            .then(data => {
                const message = data.message
                const token = data.token.substring(6)
                // cookie.set(token)
                cookies.set('Authcookie', token, { path: '/' });
                console.log(token)
                console.log(cookies.get('Authcookie')); // token
                setAuthCookie(cookies.get('Authcookie'))
                setUser(data.user)
                setIsLogin(true)
                setLoginBy(data.user.name)
                setStudentid(data.user.email)
            })
            .catch(err => console.log(err))
    }

    const logoutHandler = () => {
        cookies.remove('token')
        setIsLogin(false)
    }
    const onClickShowModal = () => {
        setIsShowModal(true)
    }
    const onClickHiddenModal = () => {
        setIsShowModal(false)
    }


    return (
        <AuthContext.Provider
            value={{
                loginHandler: googleAuth,
                logoutHandler: logoutHandler,
                isLogin: isLogin,
                loginBy: loginBy,
                studentid: studentid,
                user: user,
                Authcookie: Authcookie,
                IsShowModal: IsShowModal,
                onClickHiddenModal: onClickHiddenModal,
                onClickShowModal: onClickShowModal
            }}>
            {props.children}
        </AuthContext.Provider >
    );
}

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext