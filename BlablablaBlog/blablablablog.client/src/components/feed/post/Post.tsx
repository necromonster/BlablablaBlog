import { useRef, MouseEventHandler } from 'react';
import { Panel, PanelFooterTemplateOptions, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Tooltip } from 'primereact/tooltip';
import MarkdownPreview from '@uiw/react-markdown-preview';
import rehypeSanitize from "rehype-sanitize";

import styles from '../Feed.module.css'
import { PostState, PostItem, UserData } from '../../../types/types';
import { FormatDate } from '../../../utils/utils.ts';
import CommentBlock from './CommentBlock.tsx'


interface IProps {    
    postData: PostItem;
    currentUser: UserData;
    showPostEdit: (postId: string) => MouseEventHandler;
    handlerDeletePost: (postId: string) => Promise<void>;
    handlerGetFeed: () => void;
    /*refToast: React.RefObject<Toast | null>;*/
}
function Post({ postData, currentUser, showPostEdit, handlerDeletePost, handlerGetFeed }: IProps) {

    const editPost = () => {
        showPostEdit(postData.id);
    }
    const deletePost = () => {
        handlerDeletePost(postData.id);        
    }

    const refPost = useRef<HTMLDivElement>(null);
    const configMenu = useRef<Menu>(null);

    const rehypePlugins = [rehypeSanitize];
    /*
    const deletePost = async ()=>{
        const response = await fetch(`post/${postData.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        });
        if (response.ok) {
            //refToast.current?.show({ severity: 'success', summary: 'Сообщение', detail: 'Пост удален', life: 3000 });
            //changeAppState(AppState.FEED);
            refPost.current?.remove();
        }
        else {
            console.log("Ошибка HTTP: " + response.status);
        }
    }*/

    const handlePostDelete = () => {
        confirmDialog({
            message: 'Удалить пост?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            closable: false,
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: deletePost
        });
    };
    const handlePostEdit = () => {
        // TODO: реализовать редактирование на клиенте и сервере 
        //setPostEdit(postData.id);
        editPost();
        //changeAppState(AppState.POSTEDIT);
    };
    const panelHeader = (options: PanelHeaderTemplateOptions) => {
        const classNameHeaderPanel = `${options.className} `;
        function getPostActions() {
            if (currentUser && postData.author.id == currentUser.id) {
                const items = [];
                if (postData.state == PostState.DRAFT)
                    items.push(
                        {
                            label: 'Редактировать',
                            icon: 'pi pi-pen-to-square',
                            command: handlePostEdit
                        }
                    );
                items.push(
                    {
                        label: 'Удалить',
                        icon: 'pi pi-times',
                        command: handlePostDelete
                    }
                );

                return (
                    <>
                        <Menu model={items} popup ref={configMenu} id="config_menu" />
                        <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                            <span className="pi pi-cog"></span>
                        </button>
                    </>
                )
            }
               
        };        
        return (
            <div className={classNameHeaderPanel}>
                <div className="flex align-items-center gap-2">                   
                    {postData.state === PostState.DRAFT && <i className="pi pi-pencil"style={{ marginRight: "10px" }}></i>}
                    <Avatar icon="pi pi-user" label={postData.author.name.substring(0, 1)} size="normal" style={{marginRight: "10px"}} />
                    <span className="font-bold">{postData.author.name}</span>
                </div>
                <div>                    
                    {getPostActions()}
                    {options.togglerElement}
                </div>
            </div>
        );
    }
    const panelFooter = (options: PanelFooterTemplateOptions) => {
        const customClassName = `${options.className} flex flex-wrap align-items-center justify-content-between gap-3`;
        /*
        useEffect(() => {
            setTimeout(() => {
                setNodes(createCommentNodes(postData.comments));
            }, 1000);
            setLoading(false);
        }, []);
        */ 
        
        let commentsPanel;

        const tagList = <div>{postData.tags?.map(
            (item) => {
                return <Tag
                    key={item.id}
                    value={item.text}
                    rounded
                    style={{ margin: "1px", minWidth: "50px" }}
                    /*onClick={(e) => {

                        //filterParams?.setParams()
                        //console.log(e.currentTarget.innerText);
                    }}*/
                />
            })}</div>;
        // TODO: клик по тегу должен переформировывать список постов. сам тег должен фиксироваться в области с фильтрами?

        if (postData.comments?.length && postData.comments?.length > 0) // TODO: придумать внешний вид комментов
            commentsPanel = <div style={{ marginTop:"10px" }}><CommentBlock commentsData={postData.comments} /></div>
        return (
            <div className={customClassName}>
                <div className={styles.footerBlock}>
                    {tagList}
                    <div className="p-text-secondary">
                        {(postData.datePublished && `Опубликован: ${ FormatDate(postData.datePublished)}`) /*TODO: сделать нормальный вывод даты и времени*/ }
                        {(!postData.datePublished && `Создан: ${FormatDate(postData.dateCreate)}`)}                        
                    </div>
                </div>
                {commentsPanel}
            </div>
        );
    }
    return (
        <div ref={refPost}>
            <Panel                
                key={postData.id}
                className={styles.postFeed}
                headerTemplate={panelHeader}
                footerTemplate={panelFooter}
           >
                {(postData.title && <p><b>{postData.title}</b></p>) }                
                <div data-color-mode="light"><MarkdownPreview source={postData.message} rehypePlugins={rehypePlugins}/></div>
            </Panel>
            
        </div>
        
    );
}

export default Post;