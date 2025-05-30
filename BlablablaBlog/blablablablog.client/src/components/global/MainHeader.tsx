import { useRef, useState } from 'react';

import styles from './MainHeader.module.css'

//сторонние компоненты:
import { Button } from 'primereact/button';
import { ConfirmDialog } from 'primereact/confirmdialog'; // For <ConfirmDialog /> component
import { confirmDialog } from 'primereact/confirmdialog'; // For confirmDialog method
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { Menu } from 'primereact/menu';
import { Tooltip } from 'primereact/tooltip';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { connect } from 'react-redux';
import { handleShowFeed, handleShowPostEdit } from '../../actions/appActions.ts';
import { AppState } from '../../types/types.ts';
import { login, logout } from '../../actions/userActions.ts';

function MainHeader({ app, feed, user, showFeed, showPostEdit, handleLogin, handleLogout }) {

    const menuUser = useRef<Menu>(null);   
    const [visibleLoginPage, setVisibleLoginPage] = useState<boolean>(false);

    const showToIndexMessage = () => {
        if (app.appState === AppState.APP_SHOW_EDIT) //TODO: как бы сделать такую же проверку, как при нажатии на Отмена в PostEdit
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
    };

    const items = [
        {
            label: 'Выйти',
            icon: 'pi pi-sign-out',
            command: () => {
                const successCallback = () => {
                    showFeed();
                }
                handleLogout(successCallback)
            }
        }
    ]; 

    const showLoginMessage = () => {
        confirmDialog({
            message: 'Вы хотите авторизоваться?',
            header: 'Подтверждение',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            closable: false,
            acceptLabel: 'Да',
            rejectLabel: 'Нет',
            accept: () => {
                const successCallback = () => {                    
                    showFeed();                                        
                }
                handleLogin(successCallback);                
            }            
        });

        //setVisibleLoginPage(true);        
    };
    
    let content;
    if (user.profile==null) {
        content = <Button onClick={showLoginMessage} icon="pi pi-user" label="Авторизация"></Button>;
    }
    else {        
        const className = `${styles.authBlock} flex-auto`;        
        content =
            <div className={className} >
                <Menu model={items} popup ref={menuUser} id="popup_menu_left" /> 

                <Tooltip target=".p-overlay-badge" />

                <Avatar                                      
                    icon="pi pi-user"
                    label={user.profile?.name.substring(0, 1)}
                    size="large"
                    className="p-overlay-badge"
                    data-pr-tooltip={user.profile?.name}
                    data-pr-position="bottom"
                    onClick={(event) => { if (menuUser.current) menuUser.current.toggle(event) }}
                >                    
                    <Badge severity="danger"></Badge>
                </Avatar>               
            </div>
        ;
    }

    const headerElement = (
        <div className="inline-flex align-items-center justify-content-center gap-2">            
            <span className="font-bold white-space-nowrap">Авторизация</span>
        </div>
    );    

    return (
        <div className={styles.header}>
            <h1 onClick={showToIndexMessage}>BlablablaBlog</h1>           
            <div>                
                <Dialog
                    visible={visibleLoginPage}
                    header={headerElement}                    
                    modal
                    draggable={false}
                    closable={false}
                    style={{ width: '20rem' }}
                    onHide={() => { if (!visibleLoginPage) return; setVisibleLoginPage(false); }}                   
                >
                    <div style={{display: "flex", flexDirection: "column"}}>  
                        <div>
                            <label htmlFor="username" >Имя пользователя</label>
                            <InputText id="username" style={{ width: "100%" }} ></InputText>
                        </div>
                        <div style={{  marginTop: "20px" }}>
                            <label htmlFor="password" >Пароль</label>
                            <InputText id="password" type="password" style={{ width: "100%" }}></InputText>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px", marginBottom: "20px" }} >
                            <Button label="Войти" onClick={() => setVisibleLoginPage(false)} style={{ width: "7rem" }} ></Button>
                            <Button label="Отмена" onClick={() => setVisibleLoginPage(false)} style={{ width: "7rem" }} ></Button>
                        </div>

                        <div style={{ textAlign: "center" }}>или</div>
                        
                        <Button
                            disabled
                            style={{ width: "100%", marginTop: "20px" }}
                            label="Войти через Google"
                        />
            
                    </div>
                </Dialog>

                <ConfirmDialog />
                {content}
            </div>            
        </div>       
  );
}
const mapStateToProps = (store) => {
    return {
        app: store.app,
        feed: store.feed,
        user: store.user,
    };
};
function mapDispatchToProps(dispatch) {
    return {
        showFeed: () => dispatch(handleShowFeed()),
        showPostEdit: (id_post: string) => dispatch(handleShowPostEdit(id_post)),
        handleLogin: successCallback  => dispatch(login(successCallback)),     
        handleLogout: successCallback => dispatch(logout(successCallback)),
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);
