import axios from 'axios';
import movieTrailer from 'movie-trailer';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Movie from '../componets/Movie';
import ShowVideo from '../componets/ShowVideo';
import requests from '../Requests';


const MoviesInfo=[
    {
      title:'Up coming' ,
      fetchURL:requests.requestUpcoming
    },
    {
        title:'Popular' ,
        fetchURL:requests.requestPopular
      },
    {
      title:'Top Rated' ,
      fetchURL:requests.requestTopRated
    },
    {
      title:'Tredding' ,
      fetchURL:requests.requestTrending
    },
    {
      title:'Horror' ,
      fetchURL:requests.requestHorror
    }
  ]

const MovieList = () => {

    const[movies,setMovies]=useState([]);
    const[keyword,setKeyword]=useState('');
    const[sortType,setSortType]=useState('');
    const[showModal,setShowModal]=useState(false);
    const[trailerUrl,setTrailerUrl]=useState('');
    const[movieTitle,setMovieTitle]=useState('')
    const{title}=useParams();
    
    useEffect(()=>{
        if(title){
            const movieType=MoviesInfo.find(item=>item.title===title)
            console.log(movieType);
            axios.get(movieType.fetchURL).then((response) => {
                setMovies(response.data.results);
              });
        }
    },[title])

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

     const handleVideo=(movie)=>{
            movieTrailer(movie?.title || '')
                .then((url)=>{
                    const urlParams=new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));
                    
                })
                .catch(()=>console.log('Temporary Unavailable'));
        setMovieTitle(movie?.title)
        setShowModal(true);
    }

    const handleClose=(showType)=>{
        setTrailerUrl('')
        setShowModal(showType)
    }

    return (
        <>
            <div className='w-full text-white'>
                <img className=' w-full h-[200px] object-cover' src='https://assets.nflxext.com/ffe/siteui/vlv3/c8c8a0ad-86d6-45f1-b21d-821afa4e5027/3dd40b6f-3366-4f38-af74-5f11db137e52/BD-en-20220801-popsignuptwoweeks-perspective_alpha_website_medium.jpg' alt="/" />
                <div className='bg-black/60 absolute w-full h-[200px] top-0 left-0'></div>
                <div className='absolute top-[10%] p-4 md:p-8'>
                    <h1 className='text-3xl md:text-3xl mx-28 font-bold'>{title} Movies</h1>
                </div>
                
                <div className='mx-28 ms:mx-2 my-10 '>
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
                    {
                        currentMovies?.map(item=>(
                            <Movie handleVideo={handleVideo} key={item.id} item={item}/>
                        ))
                    }
                </div>
            </div>
            <ShowVideo title={movieTitle} handleClose={handleClose} trailerUrl={trailerUrl} visible={showModal}/>
        </>
    );
};

export default MovieList;