/* eslint-disable react/style-prop-object */
import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
       <div>
           <p classname="f3">
               {'This is a real-time application which can detect faces in your images. Give it a try.'}
           </p>
           <div className="center">
               <div className="form center pa2 br3 shadow-2">
               <input className="f4 pa2 w-70 center" type="text" onChange={onInputChange} /> 
               <button className="w-30 grow f4 link ph3 pv2  dib  white bg-light-purple" onClick={onButtonSubmit}>Detect</button>
               </div>
               
           </div>
       </div>
    );
}

export default ImageLinkForm;