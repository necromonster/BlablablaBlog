import styles from './css/PostFeed.module.css';
import { useEffect, useState, useContext } from 'react';
import { AppState, UserContext } from '../App'
import { TestPosts, PostItem } from './model/Data.ts';

import Post from './Post.tsx';

//сторонние компоненты:
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';


interface IProps {
    changeAppState: Function;
}
function Feed({ changeAppState }: IProps) {
    const userData = useContext(UserContext);

    function NewPostButton() {
        return (
            <div className={styles.newPost }>
                <Button label="Новый пост" onClick={() => changeAppState(AppState.POSTEDIT)} />
            </div>
        )           
    }
    function FeedList() {
        const [feedData, setFeedData] = useState<PostItem[]>();

        // получение постов с сервера
        useEffect(() => {
            setFeedData(TestPosts);
            /*
             const response = await fetch('feed');
             if (response.ok) {
                 const data = await response.json();
                 setFeed(data);
             }*/
        }, [])       

        let content;

        if (feedData)
            content = feedData.map(postItem => {
                return <Post key={postItem.id} changeAppState={changeAppState} postData={postItem} />
            });
        else
            content = <p>...Загрузка данных...</p>;

      
        return (
            <div>
                {content}                   
            </div>
            
        );
    }   

    let contentAction;
    if (userData)
        contentAction = <NewPostButton />;

    return (
        <div className={styles.postFeed}>                      
            { contentAction }
            <FeedList /> 
         </div>
       );

    
}


export default Feed;