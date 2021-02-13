/* eslint-disable react/style-prop-object */
import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return(
        <div className="ma4 mt0">
            <Tilt className="Tilt br2" options={{ max : 55 }} style={{ height:150, width: 150 }} >
                <div className="Tilt-inner pa3 grow">
                     <img style={{paddingTop: '5px', boxShadow: 'revert'}} src= {brain} alt="Logo" />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;