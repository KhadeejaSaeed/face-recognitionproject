import React from 'react';
import './ImageBox.css';

const ImageBox = ({box,imageURL}) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputImage' style={{width:'500px', height:'auto'}} src={imageURL} alt='' />
                <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
}

export default ImageBox;