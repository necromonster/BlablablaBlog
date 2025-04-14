import { useState } from 'react';
import { AppState } from '../App'
import styles from './css/PostEdit.module.css';

//сторонние компоненты:
import MDEditor from '@uiw/react-md-editor';/*https://www.npmjs.com/package/@uiw/react-md-editor */
import rehypeSanitize from "rehype-sanitize";
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FloatLabel } from "primereact/floatlabel";
import { confirmDialog } from 'primereact/confirmdialog';

const enum PostState {
    NONE,
    SAVEDRAFT,
    PUBLISH
}

interface IProps {
    changeAppState: Function;
}
function PostEdit({ changeAppState }: IProps) {
    const [postState, setPostState] = useState<PostState>(PostState.NONE);
    function Title() {
        const [title, setTitle] = useState<string>('');

        return (
            <div className="flex flex-column gap-2">

                <FloatLabel>
                    <InputText
                        style={{width: "25%"}}
                        type="text"
                        id="title"                        
                        value={title}
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTitle(event.target.value);
                                event.target.focus();
                        }}
                        
                    />
                    <label htmlFor="title">Заголовок сообщения</label>
                </FloatLabel>                
            </div>   
        );
    }
    function Message() {
        const [message, setMessage] = useState<string | any>('');
        return (
            <div style={{ textAlign: "left", marginBottom: "20px", marginTop: "20px" }}>                
                <div id="post-message" className="container">                  
                    <MDEditor
                        height="100%"
                        minHeight={200}
                        value={message}
                        onChange={(value) => {
                            setMessage(value);                  
                            }
                        }
                        previewOptions={{
                            rehypePlugins: [[rehypeSanitize]],
                        }}
                        textareaProps={{
                            placeholder: 'Введите сообщение'                          
                        }}
                        visibleDragbar={false}
                    />
                </div>
            </div>
        );
    }
    function TagPanel() {
        const [tags, setTags] = useState<string[]>([]);

        return (
            <div className="card p-fluid" style={{marginTop: "25px"}} >
                <FloatLabel>
                    <Chips
                        id="tagInput"
                        value={tags}
                        onChange={(e: ChipsChangeEvent) => setTags(e.value)}
                    />
                    <label htmlFor="tagInput">Тэги</label>
                </FloatLabel>
            </div >
        );
    }
    function ActionPanel() {

        const handleCancel = () => {            
            confirmDialog({
                message: 'Отменить ввод?',
                header: 'Подтверждение',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                closable: false,
                acceptLabel: 'Да',
                rejectLabel: 'Нет',
                accept: () => {
                    changeAppState(AppState.FEED);                    
                }
            });            
        };
        const handlePublish = () => {
            confirmDialog({
                message: 'Опубликовать пост?',
                header: 'Подтверждение',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                closable: false,
                acceptLabel: 'Да',
                rejectLabel: 'Нет',
                accept: () => {
                    setPostState(PostState.PUBLISH);
                    changeAppState(AppState.FEED);
                }
            });
        };
        const handleSaveDraft = () => {
            confirmDialog({
                message: 'Сохранить черновик?',
                header: 'Подтверждение',
                icon: 'pi pi-exclamation-triangle',
                defaultFocus: 'accept',
                closable: false,
                acceptLabel: 'Да',
                rejectLabel: 'Нет',
                accept: () => {
                    setPostState(PostState.SAVEDRAFT);
                    changeAppState(AppState.FEED);
                }
            });
        };

        return (
            <div className={styles.actionPanel}>
                <Button
                    label="Отмена"
                    onClick={handleCancel}
                />
                <div>
                    <Button
                        label="Сохранить черновик"
                        onClick={handleSaveDraft}
                    />
                    <Button
                        label="Опубликовать"
                        onClick={handlePublish}
                    />
                </div>                
            </div>
        );
    }

    return (
        <div>
            <h2 style={{textAlign: "center"}}>Новое сообщение</h2>
            <Title />
            <Message />
            <TagPanel />
            <ActionPanel/>
      </div>
      
  );
}

export default PostEdit;