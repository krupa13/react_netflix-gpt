import { useState } from 'react';
import Header from './Header';

const Login = () => {

    const [isSignInForm, setIsSignInForm] = useState();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
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
            className='w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>
                    {isSignInForm ? "Sign Up" : "Sign In"}
                </h1>
                {isSignInForm &&
                    <input
                        type="text"
                        placeholder='Full Name'
                        className='p-4 my-4 w-full bg-gray-700'
                    />
                }
                <input
                    type="email"
                    placeholder='Enter Email'
                    className='p-4 my-4 w-full bg-gray-700'
                />
                <input
                    type='password'
                    placeholder='Enter Password'
                    className='p-4 my-4 w-full bg-gray-700'
                />
                <button
                    type='button'
                    className='p-4 my-6 bg-red-700 font-bold w-full rounded-md'
                >
                    {isSignInForm ? "Sign Up" : "Sign In"}
                </button>
                <p className='py-3'>
                    <span className='text-gray-300'>
                        {isSignInForm ? "Already Registered" : "New to Netflix?"}
                    </span>
                    <span
                        className='ml-1 font-bold text-white cursor-pointer hover:underline'
                        onClick={toggleSignInForm}
                    >
                        {isSignInForm ? "Sign In now." : "Sign Up now."}
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
