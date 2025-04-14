import { useState, createContext } from 'react';
import PostEdit from './components/PostEdit';
import Feed from './components/Feed';
import MainHeader from './components/MainHeader';
import MainFooter from './components/MainFooter';

import 'primereact/resources/themes/mira/theme.css';
import { UserData, getRandomUser } from './components/model/Data';


export enum AppState {
    FEED,
    POSTEDIT,
    ERROR
}
export const UserContext = createContext<UserData | null>(null);
export const AppStateContext = createContext(null);


/*  https://www.npmjs.com/package/@react-oauth/google */
function App() {
    const [appState, setAppState] = useState<AppState | null>(AppState.FEED);  // состояние приложения    
    const [userData, setUserData] = useState<UserData | null>(null);
   
    
    function handlerChangeAppState(stateName: AppState) {
        setAppState(stateName);
    }
    function handlerChangeAuthorizedState(authState: boolean) {
        if (authState)
            setUserData(getRandomUser());
        else
            setUserData(null);
    }

    let content;
    if (appState == AppState.FEED)
        content = < Feed changeAppState={handlerChangeAppState}  />;
    else if (appState == AppState.POSTEDIT)
        content = < PostEdit changeAppState={handlerChangeAppState} />;

    return (
        <div>
            <AppStateContext.Provider value={appState}>
                <UserContext.Provider value={userData}>
                    <MainHeader changeAppState={handlerChangeAppState} changeAuthorizedState={handlerChangeAuthorizedState} />
                        {content}            
                    <MainFooter />
                </UserContext.Provider>
            </AppStateContext.Provider>
        </div>
    );
}

export default App;