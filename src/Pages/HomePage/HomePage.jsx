import Slider from "../../components/Slider/Slider"
import Jsondata from "../../mock.json"
import Map from "../../components/Map/Map"
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard"

import "./HomePage.scss"

function HomePage(){
    return ( 
        <div className="home-page">
            <Slider data={Jsondata} className="home-page__slider" />
            <div className="home-page__right">
                <Map trailData={Jsondata}/>
                <WelcomeCard />
            </div>
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