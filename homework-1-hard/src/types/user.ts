
export type ActionResultLogin = {
    status: 'success' | 'error';
    error?: string | {email?: string[], password?: string[]}
}


interface IGeo {
    lat: string;
    lng: string
}

interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
}

interface ICompany {
    name: string;
    catchPhrase?: string;
    bs?: string
}

export interface IUser {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company?: ICompany;
    address?: IAddress;

}