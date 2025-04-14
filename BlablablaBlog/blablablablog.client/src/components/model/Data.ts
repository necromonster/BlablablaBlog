export interface PostItem {    
    id: number,
    title: string;
    message: string;
    dateCreate: Date;
    user: UserData;
    hasComments: boolean;
    comments?: CommentItem[];
    tagList?: TagItem[];
};
export interface TagItem {
    id: number;
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
    unreadPosts?: number;
}

function getRandomDate() {
    var from = new Date('2025-01-01T00:00:00.001Z');
    var to = new Date(); 

    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
}
export function getRandomUser() {
    const users = [
        { id: 1, name: "Василий" },
        { id: 2, name: "Александр" },
        { id: 3, name: "Григорий" },
    ];
    const randInt = Math.floor(Math.random() * users.length);

    return { id: users[randInt].id, name: users[randInt].name };
}
export function randomIntFromInterval(min: number, max: number) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function getRandomComment(count: number, level: number) {

    const rnd = (len: number, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') => [...Array(len)].map(() => chars.charAt(Math.floor(Math.random() * chars.length))).join('');
    //let randInt;
    let comments: Array<CommentItem> = [];
    
    let i = 0;
    while (i < count - 1) {        
        //randInt = Math.floor(Math.random());
        comments.push(
            {
                id: (i + level*10), //level > 0 ? level * 1000 * randInt : randInt,
                message: rnd(randomIntFromInterval(5, 50)),
                dateCreate: getRandomDate(),
                user: getRandomUser(),
                replies: (level < 3) ? getRandomComment(randomIntFromInterval(0, 3), level + 1) : []
            }
        );
        i++;
    }       
    return comments;    
}
export function getRandomTags() {
    let tags: Array<TagItem> = [];
    
    const tagNames = ["первый", "пост", "лучший", "весна", "что-то", "новости"];    
    const count = randomIntFromInterval(1, 5);

    let i = 0;
    let randInt;
    while (i < count) {
        randInt = Math.floor(Math.random() * tagNames.length);
        tags.push( { id: randInt, text: tagNames[randInt] });
        i++;
    }

    return tags;
}
export const TestPosts: PostItem[] = [
    {
        id: 1,
        title: "Первый пост",
        message: "Привет это пост1",
        dateCreate: getRandomDate(),
        user: { id: 1, name: 'Василий' },
        hasComments: true,
        comments: [
            {
                id: 1,
                message: 'How artistic!',
                dateCreate: getRandomDate(),
                user: { id: 1, name: 'Василий' },
                replies: [
                    {
                        id: 3,
                        message: 'How artistic!',
                        dateCreate: getRandomDate(),
                        user: { id: 1, name: 'Василий' },
                        replies: [
                            {
                                id: 2,
                                message: 'This has been very useful for my research. Thanks as well!',
                                dateCreate: getRandomDate(),
                                user: { id: 2, name: 'Александр' }
                            }
                        ]
                    }
                ]
            },
            {
                id: 8,
                message: 'This has been very useful for my research. Thanks as well!',
                dateCreate: getRandomDate(),
                user: { id: 2, name: 'Александр' }
            }
            
        ]
        ,
        tagList: [{ id: 1, text: 'тег' }, { id: 2, text: 'первый' }],
    },
    {
        id: 2,
        title: "Второй пост",
        message: "Привет это пост2",
        dateCreate: getRandomDate(),
        user: { id: 2, name: 'Александр' },
        hasComments: true,
        comments: [
            {
                id: 3,
                message: 'How artistic!',
                dateCreate: getRandomDate(),
                user: { id: 1, name: 'Василий' }
            },
            {
                id: 4,
                message: 'This has been very useful for my research. Thanks as well!',
                dateCreate: getRandomDate(),
                user: { id: 2, name: 'Александр' }
            }
        ],
        tagList: [{ id: 3, text: 'второй' }, { id: 4, text: 'тоже' }],
    },
    {
        id: 3,
        title: "Третий пост",
        message: "Привет это пост3",
        dateCreate: getRandomDate(),
        user: { id: 3, name: 'Григорий' },
        hasComments: true,
        comments: [
            {
                id: 5,
                message: 'How artistic!',
                dateCreate: getRandomDate(),
                user: { id: 1, name: 'Василий' }
            },
            {
                id: 6,
                message: 'This has been very useful for my research. Thanks as well!',
                dateCreate: getRandomDate(),
                user: { id: 2, name: 'Александр' }
            }
        ],
        tagList: [{ id: 5, text: 'я' }, { id: 6, text: 'пост' }],
    },

];
/*
export const TestPosts: PostItem[] = [
    {
        id: Math.random(),
        title: "Первый пост",
        message: "Привет это пост1",
        dateCreate: getRandomDate(),
        user: getRandomUser(),
        hasComments: true,
        comments: getRandomComment(randomIntFromInterval(1, 5), 0),
        tagList: getRandomTags(),
    },
    {
        id: Math.random(),
        title: "Второй пост",
        message: "Привет это пост2",
        dateCreate: getRandomDate(),
        user: getRandomUser(),
        hasComments: true,
        comments: getRandomComment(randomIntFromInterval(1, 2), 0),
        tagList: getRandomTags(),
    },
    {
        id: Math.random(),
        title: "Третий пост",
        message: "Привет это пост3",
        dateCreate: getRandomDate(),
        user: getRandomUser(),
        hasComments: true,
        comments: getRandomComment(randomIntFromInterval(1, 2), 0),
        tagList: getRandomTags(),
    },    
];
*/