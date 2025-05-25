import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';

import  { useState } from 'react';
import { UserData } from '../model/Data';

interface IProps {
    onSubmit: Function
}
function CommentForm({ onSubmit }: IProps ) {
    const [author, setAuthor] = useState<UserData | null>(null);
    const [content, setContent] = useState('');

    const handleSubmit = (event: any) => {
        event.preventDefault();
        onSubmit({ author, content });
    };

    return (
        <form onSubmit={handleSubmit}>
            <InputText
                type="text"
                value={author?.name}
                data-user={author}
                onChange={(event) => setAuthor( event.target.value )}
                placeholder="Автор"
            />
            <InputTextarea 
                value={content}
                onChange={(event) => setContent(event.target.value)}
                placeholder="Комментарий"
            />
            <Button type="submit">Сохранить</Button>
        </form>
    );
};

export default CommentForm;