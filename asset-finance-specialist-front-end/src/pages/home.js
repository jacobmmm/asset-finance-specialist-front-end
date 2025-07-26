import NavBar from '../components/homepage/NavBar';
import WelcomeMessage from '../components/homepage/WelcomeMessage';
import Footer from '../components/homepage/Footer';

// import HomeParagraph from '../components/homepage/HomeParagraph';
// import HomeFeatures from '../components/homepage/HomeFeatures';
import { useLocation } from 'react-router-dom';

export default function Home() {

  const location = useLocation();
  const { email } = location.state || {};

  console.log("Email in homepage: ",email)

  return(
    <div>
    <NavBar email={email} />
    <WelcomeMessage email={email} />
    <Footer />
  
    </div>
  )


}

