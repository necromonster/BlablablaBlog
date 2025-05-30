import { useEffect, useRef, useState } from 'react';

//import { BrowserRouter, Routes, Route } from 'react-router-dom'; // TODO:
import { connect } from 'react-redux';
import 'primereact/resources/themes/mira/theme.css';
import { Toast } from 'primereact/toast';

import { AppState, AppToastContext } from './types/types';

import MainHeader from './components/global/MainHeader';
import MainFooter from './components/global/MainFooter';
import PostEdit from './components/postEdit/PostEdit';

import FeedContainer from './containers/FeedContainer';
import { handleShowFeed } from './actions/appActions';
/*  https://www.npmjs.com/package/@react-oauth/google */

function App({ app, user, feed, showFeed }) {  

    const refToast = useRef<Toast | null>(null);
    const [appToast, setAppToast] = useState<React.RefObject<Toast | null>>(refToast);

    useEffect(() => {    
        if (user.initialState) return;

        if (user.error)
            refToast.current?.show({ severity: 'error', summary: 'Сообщение', detail: 'Ошибка авторизации: ' + user.error, life: 3000 });
        else if (user.profile)
            refToast.current?.show({ severity: 'success', summary: 'Сообщение', detail: 'Вы авторизованы, ' + user.profile.name, life: 3000 });
        else if (!user.isFetching)
            refToast.current?.show({ severity: 'info', summary: 'Сообщение', detail: 'Вы вышли', life: 3000 });                
    }, [refToast, user])

    //useEffect(() => console.log(feed), [feed]);

    let content;
    if (app.appState == AppState.APP_SHOW_FEED)
        content = <FeedContainer />;
    else if (app.appState == AppState.APP_SHOW_EDIT)
        content = <PostEdit editedPostId={app.postId} currrentUser={user.profile} showFeed={showFeed} />
                       
    return (
        <div>
            <AppToastContext.Provider value={appToast}>
                <MainHeader />
                {content}
                <MainFooter />
            </AppToastContext.Provider>
            
            <Toast ref={refToast} position="bottom-right" />
        </div>
    );
}

const mapStateToProps = (store) => {
    return {
        app: store.app,
        user: store.user,
        feed: store.feed,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        showFeed: (postId?: string) => dispatch(handleShowFeed(postId)),        
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
