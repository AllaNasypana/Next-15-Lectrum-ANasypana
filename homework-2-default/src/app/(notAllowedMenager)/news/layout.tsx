import { ReactNode} from 'react';
import {getUser} from "@/app/(auth)/actions";
import {ERole} from "@/types";
import {forbidden} from "next/navigation";

interface IProps {
    children: ReactNode;

};

const NewsLayout = async ({ children }: IProps) => {
    const user = await getUser();
    if(!!user && user?.role === ERole.manager) {
        forbidden()
    }

    return (
        <>
            {children}
        </>
    );
};

export default NewsLayout;