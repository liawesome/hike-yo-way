import Slider from "../../components/Slider/Slider"
// import Jsondata from "../../mock.json"
import Map from "../../components/Map/Map"
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard"
import "./HomePage.scss"
import Search from '../../components/Search/Search'
import axios from 'axios'
import { useEffect, useState } from "react"

function HomePage(){

    const baseURL = import.meta.env.VITE_API_URL;
    const [trails, setTrails] = useState([]);

    const getTrailList = async() => {
        try{
            const { data } = await axios.get(`${baseURL}/api/trails`);
            setTrails(data);
        }catch(error){
            console.log(`Error getting trials:`, error)
            setTrails([]);
        }
    };
    
    useEffect(()=>{
        getTrailList();
    }, [])

    return ( 
        <div className="home-page">
            <Slider data={trails} className="home-page__slider" />
            <div className="home-page__right">
                <Map trailData={trails}/>
                <WelcomeCard />
            </div>
            <Search />
        </div>
        
    )
}
export default HomePage;


// import React, { useState } from 'react';
// import Component1 from './Component1';
// import Component2 from './Component2';

// const HomePage = () => {
//   const [showComponentA, setShowComponentA] = useState(false);

//   const handleButtonClick = () => {
//     setShowComponentA(true);
//   };

//   return (
//     <div>
//       <h1>Home Page</h1>
//       <Component1 onButtonClick={handleButtonClick} />
//       {showComponentA && <Component2 />}
//     </div>
//   );
// };

// export default HomePage;