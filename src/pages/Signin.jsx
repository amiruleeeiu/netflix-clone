import React, { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import { UserAuth } from '../Context/AuthContext';

const Signin = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState('');
    const {signIn}=UserAuth()
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            await signIn(email,password);
            navigate('/')
        }catch(err){
            setError(err.message);
        }
    }

    return (
        <div className='h-screen w-full'>
          <img className='hidden sm:block absolute w-full h-full' src='https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/3dd40b6f-3366-4f38-af74-5f11db137e52/BD-en-20220801-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt="/" />
            <div className='bg-black/60 fixed left-0 top-0 w-full h-screen '></div>
            <div className='fixed w-full z-50'>
                <div className='max-w-[450px] h-[600px] mx-auto my-24 bg-black/75 text-white'>
                    <div className='max-w-[320px] mx-auto py-16'>
                        <h1 className=' text-3xl font-bold'>Sign In</h1>
                        {error ? <p className='p-2 my-2 bg-red-400'>{error}</p> : null}
                        <form className='flex flex-col py-3' onSubmit={handleSubmit}>
                            <input className=' p-3 my-2 bg-gray-700 rounded' type="email" onChange={(e)=>setEmail(e.target.value)} placeholder='Email . . .' />
                            <input className='p-3 my-2 bg-gray-700 rounded' type="password" onChange={(e)=>setPassword(e.target.value)}  placeholder='Current Password . . .' />
                            <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign In</button>
                            <div className='flex items-center justify-between text-sm text-gray-700'>
                                <p><input className='mr-2' type="checkbox"/>Remember Me</p>
                                <p>Need Help?</p>
                                
                            </div>
                            <p className='py-8 
                            '>
                                <span className='mr-2 text-gray-600'>Already Subscribed to Netflix? </span>
                                <Link to='/aignup'>Sign Up</Link>
                            </p>
                        </form>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signin;