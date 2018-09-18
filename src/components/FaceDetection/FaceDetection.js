import React from 'react';
import './FaceDetection.css'
const FaceDetection = ({imageURL,box}) => {
	return(
          <div className='Center ma'>
            <div className='absolute mt2'>
            <img id='inputimage' src={imageURL} alt='face'  className='imgdetect'  ></img>
            <div className='bounding-box' style={{ top: box.topRow, right:box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>            </div>
          </div>


		);
}

export default FaceDetection;   