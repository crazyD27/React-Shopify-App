import React, {useState} from "react";

const UserContext = React.createContext();

export const AuthProvider = ({children})=>{
    const [userToken, setUserToken] = useState('');
    const [influenceList, setInfluenceList] = useState('');

    return (
        <UserContext.Provider value={{userToken, setUserToken, influenceList, setInfluenceList}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;