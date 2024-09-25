import "./Search.scss";
import {useState, useEffect} from 'react';
import { GoPlusCircle } from "react-icons/go";
import { LuArrowUpCircle } from "react-icons/lu";
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import getPath from "../../utils/loadAPI"
import TrailCard from "../TrailCard/TrailCard"
import { MdOutlineFaceRetouchingNatural } from "react-icons/md";
import { FaTree } from "react-icons/fa6";



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
      setResponse(data.reply);
      setInput('');
      setShowTrailContent(true);
      
    } catch (error) {
      console.error('Error getting response:', error);
  }
}

  return (
    <div className="search-input">
      <h2>Hi, Describe your current mood...</h2>
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
      {/* show some example  */}
      <div className="search-input__example">
        <div className="search-input__example-a">
          <MdOutlineFaceRetouchingNatural className="example1"/>
          <p>I am looking for a moderate trail in the Pacific Northwest with a mystical forest feel for an autumn hike. </p>
        </div>
        <div className="search-input__example-b">
          <FaTree className="example2"/>
          <p>I need a break. Can you suggest a peaceful hike in Ontario that’s around 3 hours?
             Somewhere I can just clear my head </p>
        </div>
      </div>
      {showTrailContent && <TrailCard trailData={response} />}
    </div>
 
  )
    
}

export default Search; 