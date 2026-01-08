import {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Profile = () => {
    const navigate = useNavigate();
    const handleSubmit = async () => {
        navigate("/user/dashboard"); 
    }
    return (
    <div className="
  w-full min-h-screen
  flex items-center justify-center
  p-6 md:p-12
  bg-[linear-gradient(to_bottom_right,rgba(0,0,0,0.65),rgba(0,0,0,0.85))]
  bg-cover bg-center bg-no-repeat
"
style={{
  backgroundImage:
    "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab')",
}}>
        <div>
            <p>Name: </p>
      <input type="text" className="hidden lg:flex items-center justify-center p-1" placeholder="Enter your name"></input><br></br>
      <p>Email: </p>
      <input type="text" className="hidden lg:flex  items-center justify-center p-1" placeholder="Enter your email"></input><br></br>
      <p>Phone:</p>
      <input type="text" className="hidden lg:flex  items-center justify-center p-1" placeholder="Enter your phone number"></input><br></br>
      <p>Address: </p>
      <input type="text" className="hidden lg:flex  items-center justify-center p-1" placeholder="Enter your address"></input><br></br>
      <p>Total exprience: </p>
      <input type="integer" className="hidden lg:flex  items-center justify-center p-1" placeholder="Enter your experience"></input><br></br>
      <p>Skills: </p>
      <input type="text" className="hidden lg:flex  items-center justify-center p-1" placeholder="Enter your skills"></input><br></br>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSubmit}>submit</button>
        </div>
    </div>
    );
};
export default Profile;