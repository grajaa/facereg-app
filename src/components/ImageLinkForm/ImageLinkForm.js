import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange,onButtonSubmit}) => {
	return(
          <div>
          <p className='f3'>
          	{'This magic brain will detect face in your pictures. Git it a try '}
          </p>
         <div  className='Center'>
         <div className='form pa4 br3 shadow-5'>
         	<input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} /> 
         	<button className='w-30 grow f4 link pv2 ph3 dib white bg-light-purple' onClick={onButtonSubmit}>Detect</button>
         </div>
         </div>
           </div>
		);
}

export default ImageLinkForm;  