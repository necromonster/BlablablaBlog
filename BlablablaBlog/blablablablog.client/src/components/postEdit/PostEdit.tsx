import { useContext, useEffect, useReducer } from 'react';
import { PostState, PostItem, UserData, AppToastContext } from '../../types/types'
import styles from './PostEdit.module.css';

//сторонние компоненты:
import 'primeicons/primeicons.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Chips, ChipsChangeEvent } from "primereact/chips";
import { FloatLabel } from "primereact/floatlabel";
import { confirmDialog } from 'primereact/confirmdialog';
import MDEditor from '@uiw/react-md-editor';/*https://www.npmjs.com/package/@uiw/react-md-editor */
import rehypeSanitize from "rehype-sanitize";

interface IPostProps {
    editedPostId: string;
    currrentUser: UserData;
    showFeed: () => void;
}
function PostEdit({ editedPostId, currrentUser, showFeed }: IPostProps) {

    const appToast = useContext(AppToastContext);

    type FormAction =
        | { type: 'updateField', field: string, value: string }
        | { type: 'reset' }
        | { type: 'updatePostItem', value: PostItem };

    const initialFormState: PostItem = {
        title: '',
        message: '',
        tags: [],
        authorId: currrentUser?.id,
        state: undefined,
    };

    function formReducer(state: PostItem, action: FormAction): PostItem {
        switch (action.type) {           
            case 'updateField':
                return { ...state, [action.field]: action.value };
            case 'updatePostItem':
                return action.value;
            case 'reset':
                return initialFormState;
            default:
                throw new Error('Неизвестное действие');
        }        
    };

    const [postData, dispatch] = useReducer(formReducer, initialFormState);
    const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: 'updateField', field, value: e.target.value });
    };
    const handleReset = () => {
        dispatch({ type: 'reset' });
    };

    /*
    useEffect(() => {
        console.log('State is changed!!', postData)
    }, [postData]) 
    */

    //const [postData, setPostData] = useState<PostItem | null>(null);
    /*
    const [title, setTitle] = useState<string>('');
    const [message, setMessage] = useState<string | undefined>('');
    const [tags, setTags] = useState<string[]>([]);
    */

    useEffect(() => {
        if (editedPostId)
            fetch(`post/${editedPostId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Error fetching postId=${editedPostId}: ` + response.statusText);
                    }
                    return response.json()
                })
                .then(
                    data => {     
                        dispatch({ type: 'updatePostItem', value: data });
                        /*
                        dispatch({ type: 'updateField', field: "title", value: data.title });
                        dispatch({ type: 'updateField', field: "message", value: data.message });
                        dispatch({ type: 'updateField', field: "tags", value: data.tags });
                        dispatch({ type: 'updateField', field: "state", value: data.state });
                        dispatch({ type: 'updateField', field: "authorId", value: data.authorId });
                        dispatch({ type: 'updateField', field: "id", value: data.id });
                        */
                    })
                .catch((err) => {
                    console.log(err)
                });
    }, [editedPostId]);

    // TODO: сделать разную валидацию: при новом посте, при редактировании поста
    async function submitPost(postState: PostState) {

        /*https://react.dev/reference/react/useReducer#ive-dispatched-an-action-but-logging-gives-me-the-old-state-value*/
        const newPostData = formReducer(postData, { type: 'updateField', field: "state", value: postState } );

        const method = (editedPostId ? "PUT" : "POST" );
        const url = "post" + (editedPostId? `/${editedPostId}` :'');        

        const response = await fetch(url, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPostData)
        });   
        
        if (response.ok) {

            let msg = "";
            if (postState === PostState.PUBLISHED)
                msg = "Пост опубликован";
            else if (postState === PostState.DRAFT) {
                if (editedPostId) msg = "Черновик сохранен"; 
                else msg = "Черновик создан";
            }
               
            appToast.current?.show({ severity: 'success', summary: 'Сообщение', detail: msg, life: 3000 });            
            showFeed();
        }
        else {
            console.log("Ошибка HTTP: ", response.status );
        }
    }
    const validateForm = () => {
        let valid = true;

        if (postData.message?.length == 0) {
            valid = false;
            appToast.current?.show({ severity: 'error', summary: 'Ошибка', detail: 'Введите сообщение', life: 3000 });
        }

        return valid;
    };
    
    function ActionPanel() {        
        const handleCancel = () => {
            if (
                (postData.title && postData.title?.length > 0) ||
                (postData.message && postData.message?.length > 0) ||
                (postData.tags && postData.tags?.length>0)
            )
                confirmDialog({
                    message: 'Отменить ввод?',
                    header: 'Подтверждение',
                    icon: 'pi pi-exclamation-triangle',
                    defaultFocus: 'accept',
                    closable: false,
                    acceptLabel: 'Да',
                    rejectLabel: 'Нет',
                    accept: () => {
                        showFeed();         
                    }
                });
            else
                showFeed();
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
                    if (validateForm()) {                        
                        submitPost(PostState.PUBLISHED); 
                    }                        
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
                    if (validateForm()) {                        
                        submitPost(PostState.DRAFT);
                    }                               
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
                        style={{ marginLeft:"10px" }}
                        label="Опубликовать"
                        onClick={handlePublish}
                    />
                </div>                
            </div>
        );
    }
    return (       
        <div style={{ marginLeft: "10px", marginRight: "10px"}}>
            <h2 style={{ textAlign: "center" }}>Новое сообщение</h2>            
                <div className="flex flex-column gap-2">
                    <FloatLabel>
                        <InputText
                            style={{ width: "50%" }}
                            type="text"
                            id="title"
                            name="title"
                            value={postData.title}
                        onChange={
                            handleChange('title')
                            /*(event: React.ChangeEvent<HTMLInputElement>) => {
                                setTitle(event.target.value);
                                event.target.focus();*/
                            }
                        />
                        <label htmlFor="title">Заголовок сообщения</label>
                    </FloatLabel>
                </div>  
                <div style={{ textAlign: "left", marginBottom: "20px", marginTop: "20px" }}>
                <div id="post-message" className="container" data-color-mode="light">
                    {/*TODO: проверить как драг энд дропать картинки, поиграть с оформлением, изменить стиль?*/ }
                        <MDEditor
                            height="100%"
                            minHeight={200}
                            value={postData.message}
                            onChange={
                                (value) => {
                                    //handleChange('message');
                                    dispatch({ type: 'updateField', field: "message", value: (value || '') });                                    
                                }                            
                                        /*(value) => {                                                                   
                                            setMessage(value);
                                        }*/
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
                <div className="card p-fluid" style={{ marginTop: "25px" }} >
                    <FloatLabel>
                        <Chips
                        id="tagInput"
                        value={postData.tags?.map(t => t.text) }
                        onChange={
                            (e: ChipsChangeEvent) => {
                                const tagList = e.value?.map(
                                    item => {
                                        return {                                            
                                            text: item
                                        };
                                    }
                                );
                                dispatch({ type: 'updateField', field: "tags", value: tagList }); 
                                
                                /* TODO:
                                    проблема с тегами:
                                    на фронте и беке в модели Объект Тег(id,text)
                                    на форме ввода: массив стрингов
                                    если в режиме редактирвоания - то с бека прилетает с идешниками и надо хранить
                                    если новый ввод - надо хранить/конвертить в массив стрингов без идешников

                                    либо сделать новый интерфейс на форме ввода
                                    либо менять общий для всего фронта интерфейс
                                    

                                    нужно использвать существующий интерфейс, т.к. на редактировании прилетает вся структура
                                    но при обновлении надо что-то менять с тегами, как EF будет их сохранять
                                    нужно чтобы она удилила все и добавила с нуля

                                */

                                //setTags(e.value);
                            }
                        }
                        />
                        <label htmlFor="tagInput">Тэги</label>
                    </FloatLabel>
                </div >
            <ActionPanel />   
      </div>
      
  );
}

export default PostEdit;