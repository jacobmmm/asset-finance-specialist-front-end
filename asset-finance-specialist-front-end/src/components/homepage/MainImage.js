import React from 'react';
import "../../css/MainImage.css"; 
import HomePageImage from  './HomePageImage.png'

function MainImage() {

    // const imageStyle = {
    //   textAlign: 'center', // Center the image horizontally
    //   marginTop: '20px', 
    // };
    return (
      <div className="main-image">
      <img src={HomePageImage} alt="GymWallpaper" />
      </div>
    )
  }
  
  export default MainImage