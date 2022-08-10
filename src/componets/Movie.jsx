import React, { useState } from 'react';
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import {db} from '../firebaseConfig';
import { arrayUnion,doc, updateDoc } from 'firebase/firestore';
import { UserAuth } from '../Context/AuthContext';

const Movie = ({item,handleVideo}) => {
    const[like,setLike]=useState(false);
    const[saved,setSaved]=useState(false);

    const {user}=UserAuth();
    const movieID=doc(db,'users',`${user?.email}`);
    
    const saveShow=async()=>{
        if(user?.email){
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID,{
                saveShow:arrayUnion({
                    id:item.id,
                    title:item.title,
                    img:item.backdrop_path
                })
            })
        }else{
            alert('Please log in to save a movie');
        }
    }

    return (
        <>
            <div className='w-[100px] sm:w-[200px]  lg:w-[280px] inline-block cursor-pointer relative p-2' >
                <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                    <div className='flex justify-center flex-col items-center h-full'>
                        
                        <p className='my-3'>{item?.title}</p>
                        <button onClick={()=>handleVideo(item)} className='border-solid border-2 border-gray-500 py-1 px-5'>Play Now</button>
                        
                    </div>
                    
                    <p className='absolute top-5 left-5 text-gray-300' onClick={saveShow}>
                        {
                            like ? <FaHeart/> : <FaRegHeart/>
                        }
                    </p>

                </div>
            </div>
        </>
    );
};

export default Movie;