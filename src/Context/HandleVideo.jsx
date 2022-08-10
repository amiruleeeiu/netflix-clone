import movieTrailer from 'movie-trailer';
import React, { useState } from 'react';
import ShowVideo from '../componets/ShowVideo';

const HandleVideo = () => {

    const[trailerUrl,setTrailerUrl]=useState('');
    const[showModal,setShowModal]=useState(false);

    const handleOpenVideo=(movie)=>{
        
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
        setShowModal(true);
    }

    const handleClose=(showType)=>{
        setTrailerUrl('')
        setShowModal(showType)
    }

    return (
        <>
            <ShowVideo handleClose={handleClose} trailerUrl={trailerUrl} visible={showModal}/>
        </>
    );
};

export default HandleVideo;
