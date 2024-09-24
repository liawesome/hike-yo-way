import "./WelcomeCard.scss"
import { FaAngleRight } from "react-icons/fa6";

// function WelcomeCard({onButtonClick}){
function WelcomeCard(){

    return(
        <div className="card">
            <div className="card__wrapper">
                <h1 className="card__title">Discover Your Path </h1>
                <h2 className="card__subtitle">Indulge in the freedom of exploration with effortless trail recommendations</h2>
                <div className="card__container">
                    <button className="card__btn" type="button">
                        Explore New Trails <FaAngleRight /> 
                    </button>
                </div>
               
            </div>
            
        </div>

    )
}

export default WelcomeCard;
