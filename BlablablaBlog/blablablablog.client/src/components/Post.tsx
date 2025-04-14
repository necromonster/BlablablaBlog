import styles from './css/PostFeed.module.css';

import { useRef, useContext } from 'react';
import { UserContext, AppState } from '../App'
import { PostItem } from './model/Data.ts';
import CommentBlock from './CommentBlock.tsx'

import { Panel, PanelFooterTemplateOptions, PanelHeaderTemplateOptions } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';
interface IProps {
    changeAppState: Function;
    postData: PostItem;
}
function Post({ changeAppState, postData }: IProps) {

    const userData = useContext(UserContext);
    const toast = useRef<Toast>(null);    
    const configMenu = useRef<Menu>(null);

    const handlePostDelete = () => {
        confirmDialog({
            message: 'Удалить пост?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            closable: false,
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: () => {
                changeAppState(AppState.FEED);
                toast.current?.show({ severity: 'success', summary: 'Сообщение', detail: 'Пост удален', life: 2000 });
            }
        });
    };
    const handlePostEdit = () => {
        changeAppState(AppState.POSTEDIT);
    };
    const items = [
        {
            label: 'Редактировать',
            icon: 'pi pi-pencil',
            command: handlePostEdit
        },
        {
            label: 'Удалить',
            icon: 'pi pi-times',
            command: handlePostDelete
        }
    ];

    const panelHeader = (options: PanelHeaderTemplateOptions) => {
        const classNameHeaderPanel = `${options.className} `;
        function getPostActions() {            
            if (userData && postData.user.id == userData.id)
                return (
                    <>
                        <Menu model={items} popup ref={configMenu} id="config_menu" />
                        <button className="p-panel-header-icon p-link mr-2" onClick={(e) => configMenu?.current?.toggle(e)}>
                            <span className="pi pi-cog"></span>
                        </button>
                    </>
                )
        };        
        return (
            <div className={classNameHeaderPanel}>
                <div className="flex align-items-center gap-2">
                    <Avatar icon="pi pi-user" label={postData.user.name.substring(0, 1)} size="normal" shape="circle" style={{marginRight: "10px"}} />
                    <span className="font-bold">{postData.user.name}</span>
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
        
        let tagList, commentsPanel;
        if (postData.tagList)
            tagList = <div>{postData.tagList?.map(
                (item) => {
                    return <Tag key={item.id} value={item.text} rounded style={{ margin: "1px",minWidth: "50px"} } />
                })}</div>
        if (postData.hasComments)
            commentsPanel = <div style={{ marginTop:"10px" }}><CommentBlock commentsData={postData.comments} /></div>

        return (
            <div className={customClassName}>
                <div className={styles.footerBlock}>
                    {tagList}
                    <div className="p-text-secondary">Создан: {postData.dateCreate.toLocaleString()}</div>
                </div>
                {commentsPanel}
            </div>
        );
    }
    
    return (
        <>
            <Panel
                key={postData.id}
                className={styles.postFeed}
                headerTemplate={panelHeader}
                footerTemplate={panelFooter}
            >
                <p>{postData.message}</p>
            </Panel>
            <Toast ref={toast} position="bottom-right" />
        </>
        
    );
}

export default Post;