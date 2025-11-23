export interface IPost {
    id: number;
    title: string;
    body: string;
    userId: number;
}

interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {lat: string, lng: string};
}
export interface IUser {
    id: number;
    name: string;
    email: string;
    username: string;
    address: IAddress;
    phone: string;
    website: string;
    company: {name: string; catchPhrase: string; bs: string};
}
export interface IComment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}