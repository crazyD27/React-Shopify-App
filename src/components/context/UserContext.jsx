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
    const [draftList, setDraftList] = useState([]);
    const [marketDraftList, setMarketDraftList] = useState([]);
    const [marketDraftId, setMarketDraftId] = useState([]);
    const [testing, setTesting] = useState([]);
    const [image, setImage] = useState('')
    const [name, setName] = useState('');

    return (
        <UserContext.Provider value={{name, setName, image, setImage,testing, setTesting, marketDraftId, setMarketDraftId, marketDraftList, setMarketDraftList, draftList, setDraftList, marketId, setMarketId, marketList, setMarketList, countCamp, setCountCamp, userToken, setUserToken, influenceList, setInfluenceList, campList, setCampList, campListPending, setCampListPending}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;