import { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);
        if(message) return; 
    //* If the message has an error text inside the validate file then return above code or else signIn/signUp condition
        
        if(!isSignInForm) {
            //* Sign Up Form
            createUserWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
                )
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(user);
                    updateProfile(auth.currentUser, {
                        displayName: name.current.value, 
                        photoURL: "https://avatars.githubusercontent.com/u/92149824?v=4"
                      }).then(() => {
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        //* Now we will add the below dispacth details to the store
                        dispatch(addUser({
                            uid: uid, 
                            email: email, 
                            displayName: displayName, 
                            photoURL: photoURL
                        }));
                        navigate('/browse');
                      }).catch((error) => {
                        setErrorMessage(error.message);
                      });                      
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            signInWithEmailAndPassword(
                auth, 
                email.current.value, 
                password.current.value
                )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    navigate('/browse');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }
    }

    return (
        <div>
            <Header />
            <div className='absolute'>
                <img
                    src='https://assets.nflxext.com/ffe/siteui/vlv3/7ca5b7c7-20aa-42a8-a278-f801b0d65fa1/fb548c0a-8582-43c5-9fba-cd98bf27452f/IN-en-20240326-popsignuptwoweeks-perspective_alpha_website_large.jpg'
                    alt='logo' />
            </div>
            <form 
            onSubmit={(e) => e.preventDefault()}
            className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm &&
                    <input
                        ref={name}
                        type="text"
                        placeholder='Full Name'
                        className='p-4 my-4 w-full bg-gray-700'
                        required
                    />
                }
                <input
                    ref={email}
                    type="email"
                    placeholder='Enter Email'
                    className='p-4 my-4 w-full bg-gray-700'
                    required
                />
                <input
                    ref={password}
                    type='password'
                    placeholder='Enter Password'
                    className='p-4 my-4 w-full bg-gray-700'
                    required
                />
                <p className='text-red-600 font-bold text-lg py-1'>{errorMessage}</p>
                <button
                    type='button'
                    className='p-4 my-6 bg-red-700 font-bold w-full rounded-md'
                    onClick={handleButtonClick}
                >
                    {isSignInForm ?  "Sign In" : "Sign Up"}
                </button>
                <p className='py-3'>
                    <span className='text-gray-300'>
                        {isSignInForm ? "New to Netflix?" : "Already Registered"}
                    </span>
                    <span
                        className='ml-1 font-bold text-white cursor-pointer hover:underline'
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? "Sign Up now." : "Sign In now."}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
