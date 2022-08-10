import axios from 'axios';
import movieTrailer from 'movie-trailer';
import React, { useEffect, useState } from 'react';
import requests from '../Requests'
import ShowVideo from './ShowVideo';

const Main = () => {

    const[movies,setMovies]=useState([]);
    const[trailerUrl,setTrailerUrl]=useState('');
    const[showModal,setShowModal]=useState(false);

    useEffect(()=>{
        axios.get(requests.requestPopular).then((response)=>{
            setMovies(response.data.results);
        })
    },[])

    const movie=movies[Math.floor(Math.random()*movies.length)]

    const turncateString=(str,num)=>{
        if(str?.length>num){
            return str.slice(0,num)+'...';
        }else{
            return str;
        }
    }

    

    const handleVideo=(movie)=>{
        movieTrailer(movie?.title || '')
            .then((url)=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                setTrailerUrl(urlParams.get('v'));
                
            })
            .catch(()=>console.log('Temporary Unavailable'));
        setShowModal(true);
    }

    const handleClose=(showType)=>{
        setTrailerUrl('')
        setShowModal(showType)
    }

    return (
        <div className='w-full h-[550px] text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'>

                </div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
                <div className='absolute w-full top-[25%] p-4 md:P-8 ml-5'>
                    <h1 className='text-3xl md:5xl font-bold
                    '>{movie?.title}</h1>
                    <div className='py-5'>
                        <button onClick={()=>handleVideo(movie)} className='border bg-gray-300 text-black border-gray-300 px-5 py-2'>Play</button>
                        <button className='border text-white border-gray-300 px-5 py-2 ml-4'>Watch Later</button>
                    </div>
                    <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
                    <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%]  text-gray-200'>{turncateString(movie?.overview,150)}</p>
                </div>
            </div>
            <ShowVideo handleClose={handleClose} trailerUrl={trailerUrl} visible={showModal}/>
        </div>
    );
};

export default Main;