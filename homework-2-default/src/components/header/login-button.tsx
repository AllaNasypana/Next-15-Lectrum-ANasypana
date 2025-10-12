
interface IProps {
    isLoggedIn?: boolean;
    onClick?: () => void;
}

export const LoginButton = ({ isLoggedIn, onClick }: IProps) => {

    return (
        <button
            onClick={() => onClick && onClick()}
            className={' flex bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mt-4 hover:cursor-pointer'}>
            {isLoggedIn ? 'Logout' : 'Login' }
        </button>
    )
}