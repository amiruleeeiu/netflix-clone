import React from 'react';
import SavedShow from '../componets/SavedShow';

const Account = () => {
    return (
        <>
            <div className='w-full text-white'>
                <img className=' w-full h-[300px] object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/3dd40b6f-3366-4f38-af74-5f11db137e52/BD-en-20220801-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt="/" />
                <div className='bg-black/60 absolute w-full h-[300px] top-0 left-0'></div>
                <div className='absolute top-[20%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-3xl font-bold'>My Show</h1>
                </div>
            </div>
            <SavedShow/>

            
        </>
    );
};

export default Account;