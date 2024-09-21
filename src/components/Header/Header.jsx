import "./Header.scss";
import {Link} from "react-router-dom";
import { useState } from "react";
import { LuUser } from "react-icons/lu";
import Modal from 'react-modal';

// adjust the hover effect 
function Header(){
    const spans = document.querySelectorAll('.word span');
    const [isModalVisible, setModalVisible] = useState(false);
    

    spans.forEach((span, idx) => {
        span.addEventListener('click', (e) => {
            e.target.classList.add('active');
        });
        span.addEventListener('animationend', (e) => {
            e.target.classList.remove('active');
        });
        
        setTimeout(() => {
            span.classList.add('active');
        }, 750 * (idx+1))
        });


    const openModal = ()=>{
        setModalVisible(true);
    }

    const closeModal=()=>{
        setModalVisible(false);
    }


    

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-40%, -50%)'
        },
      };

    return(
       <nav className="navbar">
           <div className="navbar__left">
               <Link to="/" className="navbar__link">
                   <div className="word">
                        <span>H</span>
                        <span>i</span>
                        <span>k</span>
                        <span>e</span>
                        <span>&nbsp;</span>
                        <span>U</span>
                        <span>&nbsp;</span>
                        <span>W</span>
                        <span>a</span>
                        <span>y</span>
                    </div>
               </Link>
           </div>
           <div className="navbar__right">
                <ul className="navbar__right-list">
                    <li>
                        <Link to="/mylist" className="navbar__link">
                            <h2>My List</h2>
                            {/* <button 
                                className="navbar__btn"
                            >
                            My List
                            </button> */}
                        </Link>
                    </li>
                    <li>
                        <Link to="/places" className="navbar__link">
                            <h2>Places</h2>
                        </Link>
                    </li>
                </ul>
                <div className="navbar__user">
                    <LuUser onClick={openModal}/>
                    <Modal 
                        isOpen={isModalVisible}
                        onRequestClose ={closeModal}
                        style={customStyles}
                    >
                        <ul>
                            <li>Sign up</li>
                            <li>Log in</li>
                            <li>Hike with Us</li>
                        </ul>
                    </Modal>
                </div>
           </div>
       </nav>

    )

}

export default Header; 