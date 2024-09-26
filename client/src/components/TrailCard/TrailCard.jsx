import "./TrailCard.scss"
import {useState} from "react";
import { LuHeartPulse } from "react-icons/lu";
import { BiSolidMapPin } from "react-icons/bi";
import { RiEmotionNormalLine } from "react-icons/ri";
import DynamicImage from './DynamicImage';

function TrailCard({ trailData }){
  // setting like/dislikes for user
  const [likes, setLikes] = useState(false);
  const [dislikes, setDislikes] = useState(false);
  
  const [openMap, setOpenMap] = useState(false);


  // add map modal 
  const handleOnClickMap = () => {
      setOpenMap(true);
  }

  console.log("trail.image", JSON.stringify(trailData))

  return (
       <div className="trail-card">
        {trailData.map((trail, index) => (
          <div key={index} className="trail-card__wrapper">
            {/* <img src={trail.image} alt={trail.name} className="trail-card__image" /> */}
            <DynamicImage 
              shortUrl={trail.image} 
              alt={trail.name} 
              className="trail-card__image" 
            />
            <div className="trail-card__content">
              <h2 className="trail-card__title">{trail.name}</h2>
              <p className="trail-card__location">{trail.location}</p>
              <div className="trail-card__actions">
                <button className="trail-card__map">
                  <BiSolidMapPin size={15} />
                  Locate on Map
                </button>
                <div className="trail-card__reaction-btns">
                  <button 
                    onClick={() => handleLikeEffect(index)}
                    className={`trail-card__reaction-btn ${likes[index] ? 'trail-card__reaction-btn--liked' : ''}`}
                  >
                    <LuHeartPulse size={15} />
                  </button>
                  <button 
                    onClick={() => handleDislike(index)}
                    className={`trail-card__reaction-btn ${dislikes[index] ? 'trail-card__reaction-btn--disliked' : ''}`}
                  >
                    <RiEmotionNormalLine size={15} />
                  </button>
                </div>
              </div>
            </div>
          </div>
      ))}
    </div>
  )
}


export default TrailCard;