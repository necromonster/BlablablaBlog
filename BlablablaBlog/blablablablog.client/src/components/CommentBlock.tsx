import { Panel, PanelHeaderTemplateOptions } from "primereact/panel";
import { useRef, useContext, useState } from "react";
import { CommentItem } from "./model/Data";
import { UserContext } from '../App'
import { Button } from "primereact/button";
import { Tree } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';
import { useEffect } from "react";

interface IProps {    
    commentsData?: CommentItem[];
}
function CommentBlock({ commentsData }: IProps) {
    const userData = useContext(UserContext);
    const refCommentsPanel = useRef<Panel>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [nodes, setNodes] = useState<TreeNode[]>([]);    
    const loadOnExpand = (event) => {
        if (!event.node.children) {
            setLoading(true);

            setTimeout(() => {
                let node = { ...event.node };

                node.children = [];

                for (let i = 0; i < 3; i++) {
                    node.children.push({
                        key: node.key + '-' + i,
                        label: 'Lazy ' + node.label + '-' + i
                    });
                }

                let value = [...nodes];

                value[parseInt(event.node.key, 10)] = node;
                setNodes(value);
                setLoading(false);
            }, 200);
        }
    }    

    const headerTemplate = (options: PanelHeaderTemplateOptions) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} `;
        const refToggleImg = useRef<any>(null);

        const loadComments = () => {
            if (options.collapsed) {               
                refToggleImg.current.className = "";
                setLoading(true);
                setTimeout(() => {
                    setLoading(false);
                    refCommentsPanel.current?.expand(undefined);
                    // TODO: загрузка комментариев
                    // setCommentsData();
                }, 1000);
            }
            else
                refCommentsPanel.current?.collapse(undefined);
        };

        return(
            <div className={className} style={{justifyContent: "flex-start" /* TODO: так нельзя делать */}}>
                <Button
                    loading={loading} 
                    onClick={loadComments}
                    text 
                >
                    <span ref={refToggleImg} className={toggleIcon} style={{ marginRight: "10px" }} ></span>                    
                    <span >
                        Комментарии
                    </span>
                   
                </Button>
                
            </div>
        )
    };

    const createLazyNodes = () => {
        return [
            {
                key: '0',
                label: 'Node 0',
                leaf: false,
                children: [
                    {
                        key: '0-0',
                        label: 'Work',
                        data: 'Work Folder',
                        icon: 'pi pi-fw pi-cog',
                        children: [
                            { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
                            { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
                        ]
                    },
                    {
                        key: '0-1',
                        label: 'Home',
                        data: 'Home Folder',
                        icon: 'pi pi-fw pi-home',
                        children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
                    }
                ]

            },
            {
                key: '1',
                label: 'Node 1',
                leaf: false
            },
            {
                key: '2',
                label: 'Node 2',
                leaf: false
            }
        ];
    }
    useEffect(() => {
        setTimeout(() => {
            setNodes(createLazyNodes());
            setLoading(false);
        }, 2000);
    }, []);

    return (
        < Panel
            ref = { refCommentsPanel }
            toggleable
            collapsed = {true}
            headerTemplate={headerTemplate}            
        >
            <p className="m-0">

                <Tree value={nodes} onExpand={loadOnExpand} loading={loading} className="w-full md:w-30rem" />

                {/*<CommentSection commentsData={commentsData} />*/}
        </p>
        </Panel >
    );
}

export default CommentBlock;