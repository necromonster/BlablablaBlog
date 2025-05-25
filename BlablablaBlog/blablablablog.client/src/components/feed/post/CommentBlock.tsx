import { useRef, useContext, useState, useEffect } from "react";

import { CommentItem } from '../../../types/types'

//сторонние компоненты:
import { Panel, PanelHeaderTemplateOptions } from "primereact/panel";
import { Button } from "primereact/button";
import { Tree } from 'primereact/tree';
import { TreeNode } from 'primereact/treenode';

interface IProps {    
    commentsData?: CommentItem[];
}
function CommentBlock({ commentsData }: IProps) {

    const refCommentsPanel = useRef<Panel>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [nodes, setNodes] = useState<TreeNode[]>([]);    
    const loadOnExpand = (event) => {
        if (!event.node.children) {
            setLoading(true);

            setTimeout(() => {
                const node = { ...event.node };

                node.children = [];

                for (let i = 0; i < 3; i++) {
                    node.children.push({
                        key: node.key + '-' + i,
                        label: 'Lazy ' + node.label + '-' + i
                    });
                }

                const value = [...nodes];

                value[parseInt(event.node.key, 10)] = node;
                setNodes(value);
                setLoading(false);
            }, 200);
        }
    }    
    const headerTemplate = (options: PanelHeaderTemplateOptions) => {
        const toggleIcon = options.collapsed ? 'pi pi-chevron-down' : 'pi pi-chevron-up';
        const className = `${options.className} `;
        return(
            <div className={className} style={{justifyContent: "flex-start" /* TODO: так нельзя делать */}}>
                <Button
                    loading={loading}                    
                    text 
                >
                    <span className={toggleIcon} style={{ marginRight: "10px" }} ></span>                    
                    <span >
                        Комментарии
                    </span>                   
                </Button>
                
            </div>
        )
    };
    
    useEffect(() => {
        setTimeout(() => {            
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