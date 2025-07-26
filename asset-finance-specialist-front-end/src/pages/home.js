import NavBar from '../components/homepage/NavBar';
import WelcomeMessage from '../components/homepage/WelcomeMessage';
import Footer from '../components/homepage/Footer';
import '../css/Home.css';

// import HomeParagraph from '../components/homepage/HomeParagraph';
// import HomeFeatures from '../components/homepage/HomeFeatures';
import { useLocation } from 'react-router-dom';

export default function Home() {

  const location = useLocation();
  const { email } = location.state || {};

  console.log("Email in homepage: ",email)

  return(
    <div className="home-container">
    <NavBar email={email} />
    <div className="main-content">
      <WelcomeMessage email={email} />
    </div>
    <Footer />
  
    </div>
  )


}

