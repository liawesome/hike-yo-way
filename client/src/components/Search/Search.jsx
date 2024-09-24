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

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(!input.trim()) return;

    try {
      const {data} = await axios.post('http://localhost:3000/api/chat/ask-query',  { query: input, sessionId});
      // console.log(data.reply);
      setResponse(data.reply);
      setInput('');
      setShowTrailContent(true);
      
    } catch (error) {
      console.error('Error getting response:', error);
  }
}

  return (
    <div className="search-input">
      <h2>Describe your current mood...</h2>
      <form className="search-input__wrapper" onSubmit = {handleSubmit}>
        <button className="icon-btn add">
          <GoPlusCircle size={20} />
        </button>
        <input
          type="text"
          name="search-input"
          id="search-input"
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