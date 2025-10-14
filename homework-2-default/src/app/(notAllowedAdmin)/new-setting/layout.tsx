import {  ReactNode } from 'react'
import {getUser} from "@/app/(auth)/actions";
import {ERole} from "@/types";
import {forbidden} from "next/navigation";

interface IProps {
    children: ReactNode;

};

const SettingsLayout = async ({ children }: IProps) => {
    const user = await getUser();
    if(!!user && user?.role !== ERole.superadmin) {
        forbidden()
    }

    return (
        <>
            {children}
        </>
    );
};

export default SettingsLayout;