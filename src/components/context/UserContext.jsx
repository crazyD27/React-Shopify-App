import React, {useState} from "react";

const UserContext = React.createContext();

export const AuthProvider = ({children})=>{
    const [userToken, setUserToken] = useState('');
    const [influenceList, setInfluenceList] = useState('');
    const [campList, setCampList] = useState([])
    const [campListPending, setCampListPending] = useState([])
    const [countCamp, setCountCamp] = useState([]);
    const [marketList, setMarketList] = useState([]);
    const [marketId, setMarketId] = useState([]);

    return (
        <UserContext.Provider value={{marketId, setMarketId, marketList, setMarketList, countCamp, setCountCamp, userToken, setUserToken, influenceList, setInfluenceList, campList, setCampList, campListPending, setCampListPending}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;