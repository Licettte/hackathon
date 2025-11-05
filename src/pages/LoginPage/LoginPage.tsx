import {FC} from 'react';
import {Login} from "@/entities/login";

interface LoginPageProps {

}

export const LoginPage: FC<LoginPageProps> = ({}) => {
    return (
        <>
          <Login/>
        </>
    );
};

