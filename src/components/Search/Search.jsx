import "./Search.scss";
import {useState, useEffect} from 'react';
import { GoPlusCircle } from "react-icons/go";
import { LuArrowUpCircle } from "react-icons/lu";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import getPath from "../../utils/loadAPI"
import TrailCard from "../TrailCard/TrailCard"

function Search() {

  const [input, setInput] = useState('');
  const [response, setResponse] = useState([]) // model response
  const [sessionId, setSessionId] = useState('');
  const [showTrailContent, setShowTrailContent] = useState(false);

  // const trailData = [
  //   {
  //     id: 1,
  //     name: "Serene Forest Path",
  //     location: "Whispering Pines National Park",
  //     image: "/api/placeholder/400/300"
  //   },
  //   {
  //     id: 2,
  //     name: "Challenging Mountain Trek",
  //     location: "Rocky Peaks Wilderness Area",
  //     image: "/api/placeholder/400/300"
  //   }
  // ];
  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!input.trim()) return;

    try {
      const {data} = await axios.post(getPath('api/chat/ask-query'),  { query: input, sessionId});
      setResponse(data);
      setInput('');
      setShowTrailContent(true);
    } catch (error) {
      console.error('Error getting response:', error);
  }
}

  return (
   
    <div className="search-input">
      <h2>Describe your current mood...</h2>
      {/* {Serene, Challenging, Mystical, Invigorating, TranquilAdventurous}
      <button className="search-input__tag">
      </button> */} 
      <form className="search-input__wrapper" onSubmit = {handleSubmit}>
        <button className="icon-btn add">
          <GoPlusCircle size={20} />
        </button>
        <input
          type="text"
          placeholder="I would like to explore ... in ..."
          className="search-input__input"
          value = {input} 
          onChange={(e)=> setInput(e.target.value)} // update the syntax
        />
        <button className="icon-btn submit" >
          <LuArrowUpCircle size={20} />
        </button>
      </form>
      {showTrailContent && <TrailCard trailData={response} />}
    </div>
 
  )
    
}

export default Search; 