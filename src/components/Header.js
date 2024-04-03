import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {

    const navigate = useNavigate();
    const user = useSelector(store => store.user);

    const handleSignOut =() => {
        signOut(auth).then(() => {
            navigate('/');
          }).catch((error) => {
            navigate('/error');
          });
    }

    return (
        <div className="absolute w-screen px-36 py-2 bg-gradient-to-b from-black z-20 flex justify-between">
            <img 
                className="w-[186px]"
                src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" 
                alt=""/>

            {user && 
                <div className="flex gap-2 p-2 mt-4">
                    <img 
                        className="w-12 h-12 rounded-full"
                        src={user?.photoURL}
                        alt="userIcon"
                    />
                    <button 
                        className="bg-red-600 p-3 font-bold text-white rounded-3xl"
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                </div>
            }
        </div>
    );
};

export default Header;