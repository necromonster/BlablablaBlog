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