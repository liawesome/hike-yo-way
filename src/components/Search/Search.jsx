import "./Search.scss";
// import {useState, useEffect} from 'react';
import { GoPlusCircle } from "react-icons/go";
import { LuArrowUpCircle } from "react-icons/lu";


// call backend api for 

function Search() {
    <div className="search-input-container">
      <div className="search-input-wrapper">
        <h3>Describe your current mood</h3>
        <button className="icon-button add-files-button">
          <GoPlusCircle size={20} />
        </button>
        <input
          type="text"
          placeholder="Ask me anything..."
          className="search-input"
        />
        <button className="icon-button submit-button">
          <LuArrowUpCircle size={20} />
        </button>
      </div>
    </div>
}
export default Search; 