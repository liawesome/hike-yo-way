import "./Slider.scss";
import {useState, useEffect} from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { GiStoneStack } from "react-icons/gi";
import { PiShootingStarFill } from "react-icons/pi";

import { IoEarth } from "react-icons/io5";

export default function Slider({ data }) {
  const [slide, setSlide] = useState(0);
  // const autoPlayTime= 50000;

  const nextSlide = ()=>{
    setSlide(slide===data.length -1 ? 0: slide+1)
  }

  const prevSlide= () =>{
    setSlide(slide===0 ? data.length -1 : slide -1)
  }
  // add that later, functionality works
  // useEffect(()=>{
  //   const slideInterval = setInterval(()=>{
  //     nextSlide();
  //   }, autoPlayTime)

  //   return ()=>clearInterval(slideInterval);
  // }, [nextSlide]);

  return (
    <div className="carousel">
      {data.map((item, idx) => (
        <div
        key={idx}
        className={`carousel__item ${idx === slide ? 'active' : ''}`}
        >
          <div className="carousel__info">
            <div className="carousel__content">
            <div className="carousel__review">
              <div className="rating">
                <PiShootingStarFill />
                <p>{item.rating} / 5.00</p>
              </div>
              <div className="carousel__reviewers">
                {item.reviewers.slice(0, 3).map((reviewer, index) => (
                  <div key={index} className="reviewer-avatar">
                    <img
                      src={`https://i.pravatar.cc/150?u=${reviewer.name}`}
                      alt={reviewer.name}
                    />
                  </div>
                ))}
                {item.reviewers.length > 3 && (
                  <div className="reviewer-avatar additional">
                    +{item.reviewers.length - 3}
                  </div>
                )}
              </div>
              </div>
            </div>
            <div className="carousel__visit">
              <h2>{item.name}, {item.place}</h2>
              <div className="carousel__desc">
                <div className="difficulty">
                  <GiStoneStack /> 
                  <p>{item.difficulty}</p>
                </div>
                <div className="visitor">
                  <IoEarth /> 
                  <p>{item.numberOfVisitors} hikers</p>
                </div>
              </div>
              <div className="carousel__tags">
                {item.type.map((tag, index)=>(
                  <button 
                    key={index}
                    className="carousel__tag"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <img
            src={item.image}
            alt={item.name}
            className="carousel__image"
          />
      </div>
      )
  )})
      <div className="carousel__controls">
        <IoIosArrowDropleft onClick={prevSlide} className="arrow arrow-left" />
        <IoIosArrowDropright  onClick={nextSlide} className="arrow arrow-right"/>
      </div>
  </div>
);
};

