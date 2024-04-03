import Login from "./Login";
import Browse from './Browse';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useDispatch } from "react-redux";
import {addUser, removeUser} from '../utils/userSlice';

const Body = () => {

    const dispatch = useDispatch();

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/browse',
            element: <Browse />
        }
    ]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
            //* If the user signed in, let us write the user over here
              const {uid, email, displayName, photoURL} = user;
              //* Now we will add the below dispacth details to the store
              dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            } else {
                dispatch(removeUser());
            }
          });          
    }, []);

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    );
};

export default Body;