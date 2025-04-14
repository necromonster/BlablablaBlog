import { Button } from "primereact/button";
import { CommentItem } from "../model/Data";

/*https://choubey.gitbook.io/react-coding-puzzles/39-comment-section-with-nested-replies*/
interface IProps {
    comment: CommentItem,
    onReply: Function
}
function Comment({ comment, onReply }: IProps ){
    return (
        <div>
            <div>
                <span><h4>{comment.user.name}</h4></span>
                <span>{comment.dateCreate.toLocaleString()}</span>
            </div>
            <div>
                <p>{comment.message}</p>
            </div>                                   
            {comment.replies && (
                <ul>
                    {comment.replies.map((reply) => (
                        <li key={reply.id}>
                            <Comment comment={reply} onReply={onReply} />
                        </li>
                    ))}
                </ul>
            )}
            {/*<Button onClick={ () => onReply(comment.id)} >Ответить</Button>*/}
        </div>
    );
};

export default Comment;