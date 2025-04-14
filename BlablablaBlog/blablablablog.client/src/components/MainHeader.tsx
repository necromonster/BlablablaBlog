import { useRef, useContext } from 'react';

import { AppState, AppStateContext, UserContext } from '../App'
import styles from './css/MainHeader.module.css'

//сторонние компоненты:
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Toast } from 'primereact/toast';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Menu } from 'primereact/menu';
import { Tooltip } from 'primereact/tooltip';

interface IProps {
    changeAppState: Function;
    changeAuthorizedState: Function;    
}
function MainHeader({ changeAppState, changeAuthorizedState }: IProps) {
    const userData = useContext(UserContext);
    const appState = useContext(AppStateContext);

    const toast = useRef<Toast>(null);
    const menuUser = useRef<Menu>(null);    

    const handleLogOut = () => {
        changeAuthorizedState(false);
        changeAppState(AppState.FEED);
        toast.current?.show({ severity: 'info', summary: 'Сообщение', detail: 'Вы вышли', life: 3000 });
    };

    const handleBackToIndex = () => {
        if (appState === AppState.POSTEDIT)
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

    const items = [
        {
            label: 'Выйти',
            icon: 'pi pi-sign-out',
            command: handleLogOut
        }
    ]; 

    const handleLogin = () => {
        confirmDialog({
            message: 'Вы хотите авторизоваться?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            closable: false,
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: () => {
                changeAuthorizedState(true);                
                toast.current?.show({ severity: 'success', summary: 'Сообщение', detail: 'Вы авторизованы', life: 2000 });
            }

        });
    };
    

    var content;
    if (userData==null) {
        content = <Button onClick={handleLogin} icon="pi pi-sign-in" label="Авторизация"></Button>;
    }
    else {        
        let className = `${styles.authBlock} flex-auto`;
        
        content =
            <div className={className} >
                <Menu model={items} popup ref={menuUser} id="popup_menu_left" /> 

                <Tooltip target=".p-overlay-badge" />

                <Avatar                                      
                    icon="pi pi-user"
                    label={ userData.name.substring(0, 1)}
                    size="large"
                    className="p-overlay-badge"
                    data-pr-tooltip={userData.name}
                    data-pr-position="bottom"
                    onClick={(event) => { if (menuUser.current) menuUser.current.toggle(event) }}
                >                    
                    <Badge severity="danger"></Badge>
                </Avatar>               
            </div>
        ;
    }

    return (
        <div className={styles.header}>
            <h1 onClick={handleBackToIndex}>BlablablaBlog</h1>           
            <div>
                <Toast ref={toast} position="bottom-right" />
                <ConfirmDialog />
                {content}
            </div>
            


        </div>       
  );
}

export default MainHeader;