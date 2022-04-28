import "./style/main.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Navbar, BankList, Filter, Favorites, Help, Lost } from "./components";
import { useState, useEffect } from "react";
import axios from "axios";

// Need to imply routing, find bank, pagination
// able to add favorites (in local storage), I can use IFSC as a favorite or directly store the complete data
// take care of web rules, contrast, add nice comments
// Create 404 Page to help return the site visitor on homepage
// Add meta informarion

// Visit /help for more information on the project

//Add side bar with Home page link & Favorites


//Banks INfo
// Mumbai, Delhi, Kolkata, Chennai, Bangalore

function App() {
  const [Banks, setBanks] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [city, setCity] = useState("BANGLORE");
  const API = "https://vast-shore-74260.herokuapp.com/banks"

  useEffect(() => {
    axios.get(API, {
      params: {
        city
      }
    })
      .then(res => {
        setBanks(res.data);
      })
  }, [city]);


  //Update City
  const updateCity = (city) => {
    console.log(city)
    setCity(city);
  }

  const Home = () => {
    return (
      <>
        <Filter updateCity={updateCity} />
        <BankList Banks={Banks} />
      </>
    )
  }





  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<Lost />} />
        
      </Routes>
    </>
    
  );
}

export default App;
