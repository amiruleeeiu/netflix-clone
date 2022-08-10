import React from 'react';
import Main from '../componets/Main';
import Row from '../componets/Row';
import requests from '../Requests';

const Home = () => {
    return (
        <>
            <Main/>
            <Row rowID='1' title='Up coming' fetchURL={requests.requestUpcoming}/>
            <Row rowID='2' title='Top Rated' fetchURL={requests.requestTopRated}/>
            <Row rowID='3' title='Popular' fetchURL={requests.requestPopular}/>
            <Row rowID='4' title='Tredding' fetchURL={requests.requestTrending}/>
            <Row rowID='5' title='Horror' fetchURL={requests.requestHorror}/>
            
        </>
    );
};

export default Home;