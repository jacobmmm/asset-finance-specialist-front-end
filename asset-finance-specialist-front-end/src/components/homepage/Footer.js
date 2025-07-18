import React from 'react';
import '../../css/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Asset Finance Specialists</h3>
          <p>Your trusted partner in asset financing solutions</p>
        </div>
        
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li>Equipment Financing</li>
            <li>Vehicle Loans</li>
            <li>Asset Management</li>
            <li>Financial Consulting</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <ul>
            <li>Phone: (555) 123-4567</li>
            <li>Email: info@assetfinance.com</li>
            <li>Address: 123 Finance St, Business City</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#support">Support</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Asset Finance Specialists. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer; 