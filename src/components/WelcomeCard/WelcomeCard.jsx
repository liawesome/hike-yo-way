import "./WelcomeCard.scss"
import { FaAngleRight } from "react-icons/fa6";

// function WelcomeCard({onButtonClick}){
function WelcomeCard(){

    return(
        <div className="card">
            <div className="card__wrapper">
                <h1 className="card__title">Discover Your Path </h1>
                <h3 className="card__subtitle">Indulge in the freedom of exploration with effortless trail recommendations</h3>
                <button className="card__btn" type="button">
                    Explore New Trails <FaAngleRight /> 
                </button>
            </div>
            
        </div>

    )
}

export default WelcomeCard;
