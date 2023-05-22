import { createContext, useState, useContext } from "react";
import {useBoolean} from '@chakra-ui/react'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [show,setShow]=useBoolean()
    const [selectValue,setSelectValue]=useState(localStorage.getItem("number"))

    const login = (token) => {
        setUsername(token);
    };
    const logout = () => {
        setUsername(null);
    };
    const displayValue=(num)=>{
        setSelectValue(num)
        localStorage.setItem("number",num)
        // window.location.reload(true)
    }
    const display=setShow.toggle
    return (
        <AuthContext.Provider value={{ username, login, logout ,show,display,selectValue,displayValue}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
