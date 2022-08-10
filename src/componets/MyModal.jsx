import React from 'react';
import ShowVideo from './ShowVideo';

const MyModal = ({visible,trailerUrl}) => {
    if(!visible) return null;
    return (
            <div className='fixed inset-0 w-[1200px] bg-opacity-30 flex justify-center items-center'>
                
            </div>
    );
};

export default MyModal;