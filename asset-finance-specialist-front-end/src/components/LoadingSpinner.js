import React from 'react';
import '../css/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-container">
        <div className="loading-spinner">
          <div className="spinner-circle">
            <div className="spinner-arrows">
              <div className="arrow arrow-top">→</div>
              <div className="arrow arrow-right">↓</div>
              <div className="arrow arrow-bottom">←</div>
              <div className="arrow arrow-left">↑</div>
            </div>
            <div className="dollar-sign">$</div>
          </div>
        </div>
        <p className="loading-text">Signing you in...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner; 