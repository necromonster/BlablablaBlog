import { MouseEventHandler } from 'react';

import styles from './Feed.module.css';
import { FilterParams, PostItem, UserData } from '../../types/types';
import Post from './post/Post.tsx';

//сторонние компоненты:
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { Chip } from 'primereact/chip';

interface IFeedProps {
    currentUser: UserData;
    filter: FilterParams;
    posts: PostItem[];
    isFetching: boolean;
    error: string;
    showPostEdit: (postId: string) => MouseEventHandler;
    handlerDeletePost: (postId: string) => Promise<void>;
    handlerGetFeed: () => void;
};
function Feed({ currentUser, filter, posts, isFetching, error, showPostEdit, handlerDeletePost, handlerGetFeed }: IFeedProps) {
    
    const handleNewPost = () => {
        showPostEdit("");
    }   

    function FilterPanel() {
      /*  const tagCloud =             
            <div>
                <div>Облако тегов:</div>
                {filterParams?.params?.tags && filterParams.params?.tags?.map(
                (item: string) => {
                        return <Chip
                            label={item}
                            removable
                            style={{ margin: "1px", minWidth: "50px" }}
                            onRemove={
                                setFilterParams();
                            }
                        />
                    })}
            </div>; */                 

        return (
            <div>
                {/*filterParams?.params?.tags && tagCloud*/}
            </div>
        )        
    }

    function FeedList() {
      /*  const [feedData, setFeedData] = useState<PostItem[]>();
        const [loading, setLoading] = useState(false);*/
        
        // получение постов с сервера
     /*   useEffect(() => {
            // запрос происходит дважды потому что девелопмент мод <StrictMode> в main.tsx
            /*  setLoading(true);
              fetch('post/feed')
                  .then(response => {              
                      if (!response.ok) {
                          throw new Error('Error fetching feed: ' + response.statusText);
                      }
                      return response.json()
                  })
                  .then(
                      data => {                                
  
                          setFeedData(data);                    
                          setLoading(false);
                      })              
                  .catch((err) => {
                      console.log(err)
                  })
        }, []);
*/
       

        let content;
        if (isFetching) {
            content = <div style={{ textAlign: "center" }}><i className="pi pi-spin pi-spinner" style={{ fontSize: '2.5rem' }}></i></div>;
        }
        else {
            
            if (posts && posts?.length>0)
                content = posts.map(postItem => {
                    return <Post
                        key={postItem.id}
                        postData={postItem}
                        currentUser={currentUser}
                        showPostEdit={showPostEdit}
                        handlerDeletePost={handlerDeletePost}
                        handlerGetFeed={handlerGetFeed}
                    />
                });
            else
                content = <h3><p style={{ textAlign: "center" }}>Постов нет!</p></h3>;
        }
      
        return (
            <div>
                {content}                   
            </div>
            
        );
    }   

    let contentAction;
    if (currentUser)
        contentAction = <div className={styles.newPost}>
                            <Button label="Новый пост" onClick={handleNewPost} />
                        </div>;

    return (
        <div className={styles.postFeed}>                      
            {contentAction}
            <FilterPanel/>
            <FeedList /> 
         </div>
       );    
}

export default Feed;
