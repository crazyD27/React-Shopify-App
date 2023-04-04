import React from "react";

const UserContext = React.createContext();

export const AuthProvider = ({children})=>{
    const [userToken, setUserToken] = React.useState('');   

    return (
        <UserContext.Provider value={{userToken, setUserToken}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;