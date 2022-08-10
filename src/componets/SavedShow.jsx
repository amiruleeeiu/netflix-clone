import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

import { UserAuth } from '../Context/AuthContext';
import { db } from '../firebaseConfig';
import movieTrailer from 'movie-trailer';
import ShowVideo from './ShowVideo';

const SavedShow = () => {

    const[movies,setMovies]=useState([]);
    const[keyword,setKeyword]=useState('');
    const[sortType,setSortType]=useState('');
    const[trailerUrl,setTrailerUrl]=useState('');
    const[showModal,setShowModal]=useState(false);
    const[movieTitle,setMovieTitle]=useState('')

    const{user}=UserAuth();

    let currentMovies=movies;
    
     if(keyword){
        currentMovies =movies?.filter(item=>item.title.toLowerCase().includes(keyword));
     }

     if(sortType==='assending'){
        currentMovies.sort((a,b)=>{
            let l1=a.title.toLowerCase();
            let l2=b.title.toLowerCase();
            if(l1>l2){
                return 1;
            }
            if(l1<l2){
                return -1;
            }
            else{
                return 0;
            }
        })
     }

     else if(sortType==='dessending'){
        currentMovies.sort((a,b)=>{
            let l1=a.title.toLowerCase();
            let l2=b.title.toLowerCase();
            if(l1>l2){
                return -1;
            }
            if(l1<l2){
                return 1;
            }
            else{
                return 0;
            }
        })
     }

    useEffect(()=>{
        onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
            setMovies(doc.data().saveShow);
        })
    },[user?.email])

    const slideLeft=()=>{
        var slider= document.getElementById('slider');
        slider.scrollLeft=slider.scrollLeft+500;
      }

      const slideRight=()=>{
        var slider= document.getElementById('slider');
        slider.scrollLeft=slider.scrollLeft-500;
      }

      const movieRef=doc(db,'users',`${user?.email}`);
      const deleteShow=async(passedID)=>{
        try{
            const result=movies.filter(item=>item.id!==passedID);
            updateDoc(movieRef,{
                saveShow:result
            })
        }catch(err){
            console.log(err.message);
        }
      }

      const handleVideo=(movie)=>{
        if(trailerUrl){
            setTrailerUrl('');
        }else{
            movieTrailer(movie?.title || '')
                .then((url)=>{
                    const urlParams=new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                })
                .catch(()=>console.log('Temporary Unavailable'));
        }
        setMovieTitle(movie?.title)
        setShowModal(true);
    }
    const handleClose=(showType)=>{
        setTrailerUrl('')
        setShowModal(showType)
    }

    console.log(trailerUrl,showModal);

    return (
        <>
            <h1 className='text-white font-bold p-4 m-4'>My Movies</h1>
            <div className='flex items-center text-black justify-between my-5 mx-3 z-1000 space-x-10'>
                    <input className='mx-0 border-none outline-none rounded w-[500px] px-5 py-1' onChange={(e)=>setKeyword(e.target.value)} type="text" placeholder='Search Movie'/>
                        <div className='flex space-x-3'>
                            
                            <select onChange={(e)=>setSortType(e.target.value)} className='text-black outline-none rounded px-3 py-1'>
                                <option>Default</option>
                                <option value="assending">Alphabetically (A-Z)</option>
                                <option value="dessending">Alphabetically (Z-A)</option>
                            </select>
                            <h1 className='text-1xl text-white'>Sort By</h1>
                        </div>
                        
                    </div>
                   
            <div className='relative flex items-center group'>
            <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
                <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative' >
                    {
                        currentMovies?.map((item,index)=>(
                            <div className='w-[100px]  sm:w-[200px] lg:w-[280px] inline-block cursor-pointer relative p-2' >
                                <img className='rounded' src={`https://image.tmdb.org/t/p/w500/${item?.img}`} alt={item?.title} />
                                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white'>
                                <div className='flex justify-center flex-col items-center h-full'>
                                    <p className='my-3'>{item?.title}</p>
                                    <button onClick={()=>handleVideo(item)} className='border-solid border-2 border-gray-500 py-1 px-5'>Play Now</button>
                                </div>
                                    <p onClick={()=>deleteShow(item.id)} className='absolute top-4 right-4 text-white '><AiOutlineClose/></p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
            </div> 
            <ShowVideo title={movieTitle} handleClose={handleClose} trailerUrl={trailerUrl} visible={showModal}/>
        </>
    );
};

export default SavedShow;