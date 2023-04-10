import React, {useState} from "react";

const UserContext = React.createContext();

export const AuthProvider = ({children})=>{
    const [userToken, setUserToken] = useState('');
    const [influenceList, setInfluenceList] = useState('');
    const [campList, setCampList] = useState([])
    const [campListPending, setCampListPending] = useState([])

    return (
        <UserContext.Provider value={{userToken, setUserToken, influenceList, setInfluenceList, campList, setCampList, campListPending, setCampListPending}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;