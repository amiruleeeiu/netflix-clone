import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Movie from './Movie';
import { MdChevronLeft,MdChevronRight } from 'react-icons/md';
import { Link } from 'react-router-dom';
import ShowVideo from './ShowVideo';
import movieTrailer from 'movie-trailer';

const Row = ({title,fetchURL,rowID}) => {

    const[movies,setMovies]=useState([]);
    const[trailerUrl,setTrailerUrl]=useState('');
    const[showModal,setShowModal]=useState(false);
    const[movieTitle,setMovieTitle]=useState('')

    useEffect(() => {
        axios.get(fetchURL).then((response) => {
          setMovies(response.data.results);
        });
    }, [fetchURL]);

      const slideLeft=()=>{
        var slider= document.getElementById('slider'+rowID);
        slider.scrollLeft=slider.scrollLeft+500;
      }

      const slideRight=()=>{
        var slider= document.getElementById('slider'+rowID);
        slider.scrollLeft=slider.scrollLeft-500;
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
        setMovieTitle(movie?.title);
        setShowModal(true);
    }

    const handleClose=(showType)=>{
        setTrailerUrl('')
        setShowModal(showType)
    }



    return (
        <>
        
            <div className='flex items-center justify-between'>
                <h1 className='text-white font-bold p-4 m-4'>{title}</h1>
                <Link className='text-blue-800 mr-5' to={`movies/${title}`}>See All</Link>
            </div>
            
            <div className='relative flex items-center group'>
            <MdChevronLeft onClick={slideLeft} className='bg-white left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
                <div id={'slider'+rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative' >
                    {
                        movies.map((item,index)=>(
                            <Movie handleVideo={handleVideo} trailerUrl={trailerUrl} showModal={showModal} key={index} item={item}/>
                        ))
                    }
                </div>
                <MdChevronRight onClick={slideRight} className='bg-white right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40}/>
            </div>

            <ShowVideo title={movieTitle} handleClose={handleClose} trailerUrl={trailerUrl} visible={showModal}/>
        </>
    );
};

export default Row;