import { createContext } from "react";

export interface PostItem {
    id?: number|null;
    title?: string;
    message?: string;
    dateCreate?: Date;
    datePublished?: Date;
    dateEdited?: Date;
    authorId?: number,
    author?: UserData;
    comments?: CommentItem[];    
    tags?: TagItem[];
    state?: PostState;
};
export interface TagItem {
    id?: number;
    text: string;
}
export interface CommentItem {
    id: number;
    message: string;
    dateCreate: Date;
    user: UserData;
    replies?: CommentItem[];
}
export interface UserData {
    id: number,
    name: string;
    email?: string;
}
export enum AppState {
    APP_SHOW_FEED,
    APP_SHOW_EDIT,
    APP_SHOW_ERROR
};

export enum PostState {
    PUBLISHED,
    DRAFT,
    DELETED
}

export interface FilterParams {    
    tags?: string[];
}

export const AppToastContext = createContext(null);

/*
export const CurrentUserContext = createContext<UserData | null>(null); //активный пользователь
export const AppStateContext = createContext(null);                     // текущее состояние приложения
export const PostIdEditContext = createContext(null);                   // id поста для редактирования (ну что за костыли)
export const SetPostIdContext = createContext(null);                    // функция установки post id для редактрования (ну что за костыли)

export const FilterContext = createContext<FilterParams | null>(null); // фильтр
export const SetFilterContext = createContext(null);                   // установить фильтр
*/
