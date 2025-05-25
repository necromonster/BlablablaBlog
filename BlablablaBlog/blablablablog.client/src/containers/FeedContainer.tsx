import { useContext, useEffect } from "react";
import { connect } from "react-redux";

import { AppToastContext, FilterParams } from "../types/types";
import Feed from "../components/feed/Feed";
import { deletePost, getFeed } from "../actions/feedActions";
import { handleShowPostEdit } from "../actions/appActions";

function FeedContainer({ app, feed, user, getFeed, showPostEdit }) {

    const appToast = useContext(AppToastContext);

    useEffect(() => getFeed(feed.filter), []);

    const handlerGetFeed = () => {
        getFeed(feed.filter);
    }
    const handlerDeletePost = async (postId: string) => {
        const response = await fetch(`post/${postId}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {   
            appToast.current?.show({ severity: 'success', summary: 'Сообщение', detail: 'Пост удален', life: 3000 });
            handlerGetFeed();
        }
        else {
            appToast.current?.show({ severity: 'error', summary: 'Сообщение', detail: 'Ошибка удаления поста', life: 3000 });
        }
    }

    return (
        <Feed
            currentUser={user.profile}
            filter={feed.filter}
            posts={feed.posts}
            isFetching={feed.isFetching}
            error={feed.error}
            showPostEdit={showPostEdit}
            handlerDeletePost={handlerDeletePost}
            handlerGetFeed={handlerGetFeed }
        />
  );
}
const mapStateToProps = (store) => {
    return {
        app: store.app,
        feed: store.feed,
        user: store.user,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        getFeed: (filter: FilterParams) => dispatch(getFeed(filter)),
        showPostEdit: (postId: string) => dispatch(handleShowPostEdit(postId)),
        //handlerDeletePost: (postId: string, successCallback ) => dispatch(deletePost(postId), successCallback),    // TODO:    
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);
