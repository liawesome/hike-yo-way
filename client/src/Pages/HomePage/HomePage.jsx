import Slider from "../../components/Slider/Slider"
import Map from "../../components/Map/Map"
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard"
import "./HomePage.scss"
import Search from '../../components/Search/Search'
import axios from 'axios'
import { useEffect, useState } from "react"
import getPath from "../../utils/loadAPI"

function HomePage(){

    const [trails, setTrails] = useState([]);
    const getTrailList = async() => {
        try{
            const { data } = await axios.get(getPath('/api/trails'));
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
            <div className="home-page__intro">
                <Slider data={trails} className="home-page__slider" />
                <div className="home-page__right">
                    <Map trailData={trails}/>
                    <WelcomeCard />
                </div>
            </div>
            <div className="home-page__search">
                <Search className="home-page"/>
            </div>
            
        </div>
        
    )
}
export default HomePage;
