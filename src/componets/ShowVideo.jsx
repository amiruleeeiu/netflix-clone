import React from 'react';
import YouTube from 'react-youtube';
import { AiOutlineClose } from 'react-icons/ai';

const ShowVideo = ({visible,trailerUrl,handleClose,title}) => {

    const opts={
        height:'390',
        width:'100%',
        playerVars:{
            autoPlay:1,
        }
    }

    if(!visible) return null;

    return (
       <>
         {
            trailerUrl &&
            <div className='fixed p-5 h-screen inset-0 backdrop-blur-md bg-opacity-30 flex justify-center items-center z-10000'>
                
                    <div className=' bg-white text-black p-5 rounded'>
                    <div className='flex justify-between'>
                        <h1 className='text-2xl'>{title}</h1>
                        <p onClick={()=>handleClose(false)} className='mb-3 cursor-pointer font-bold border-2 border-gray-800 rounded-2xl p-1'>< AiOutlineClose size={15}/></p>
                    </div>   
                        <YouTube className='w-[1200px]'  videoId={trailerUrl} opts={opts}/> 
                    </div>
                
            </div>
        }
       </>
    );
};

export default ShowVideo;