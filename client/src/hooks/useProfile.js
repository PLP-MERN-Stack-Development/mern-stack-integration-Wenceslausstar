import { useState, useEffect } from "react";
import axios from "axios";

export default function useProfile() {
    const [isLogin, setisLogin] = useState(true)
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            setisLogin(false)
            return;
        } else {
            setisLogin(true)
        }
        axios.get("http://localhost:3000/api/auth/profile", {
            withCredentials: true
        })
            .then((res) => {
                setUser(res.data.user)
            })
            .catch((err) => {
                setError(err);
            })
    }, [])
    return { isLogin, user, error }
}