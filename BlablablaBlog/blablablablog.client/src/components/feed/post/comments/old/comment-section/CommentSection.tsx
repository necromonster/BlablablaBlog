import { useState } from 'react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { CommentItem } from '../model/Data';

interface IProps {
    commentsData: CommentItem[]
}
function CommentSection({ commentsData }: IProps) {
    const [comments, setComments] = useState<CommentItem[]>(commentsData);
    const [currentComment, setCurrentComment] = useState(null);

    const handleNewComment = (comment: CommentItem) => {
        setComments([...comments, comment]);
    };

    const handleReply = (commentId: number, reply: CommentItem) => {
        const updatedComments = comments.map((comment) => {
            if (comment.id === commentId) {
                return { ...comment, replies: [...comment.replies, reply] };
            }
            return comment;
        });
        setComments(updatedComments);
    };

    return (
        <div>
            {comments.map((comment) => (
                <Comment
                    key={comment.id}
                    comment={comment}
                    onReply={(reply: CommentItem ) => handleReply(comment.id, reply)}
                />
            ))}
            {/*<CommentForm onSubmit={(comment: CommentItem) => handleNewComment(comment)} />*/}
        </div>
    );
};

export default CommentSection;