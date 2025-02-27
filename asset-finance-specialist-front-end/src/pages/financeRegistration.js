import NavBar from "../components/homepage/NavBar"
import FinanceRegistrationForm from "../components/financeRegistration/financeRegistrationForm"
import { useLocation } from 'react-router-dom';

export default function FinanceRegistration(){


    // const location = useLocation();
    // console.log("Location in finance registration: ",location)
    // const { email } = location.state || {};

    // console.log("Email in finance registration: ",email)

    const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const email = queryParams.get('email');
  console.log("Email in finance registration: ",email)


    return(
        <div>
           <NavBar email={email} />
           <FinanceRegistrationForm email={email}/> 
        </div>

    )
}