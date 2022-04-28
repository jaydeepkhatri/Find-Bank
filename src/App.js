import "./style/main.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Navbar, BankList, Filter, Favorites, Help, Lost, Pagination, Details } from "./components";
import { useState, useEffect } from "react";
import axios from "axios";

// Need to imply routing, find bank, pagination

//Add button to clear favorites
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
	const [FilteredBanks, setFilteredBanks] = useState([]);
	const [category, setCategory] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setisLoading] = useState(true);
	const [city, setCity] = useState("KOLKATA");
	const [currentPage, setCurrentPage] = useState(1);
	const [banksPerPage, setbanksPerPage] = useState(10);
	const API = "https://vast-shore-74260.herokuapp.com/banks"

	useEffect(() => {
		//Check on localstorage
		if (localStorage.getItem(city) === null) {
			axios.get(API, {
				params: {
					city
				}
			})
				.then(res => {
					setisLoading(false);
					setBanks(res.data);
					setCurrentPage(1);
					setFilteredBanks(res.data);
					setCategory('');

					//Setting the data in Browser local storage
					localStorage.setItem(city, JSON.stringify(res.data));
					
				})
		} else {
			setBanks(JSON.parse(localStorage.getItem(city)));
			setisLoading(false);
			setCurrentPage(1);
			setFilteredBanks(JSON.parse(localStorage.getItem(city)));
			setCategory('');
		}

	}, [city]);


	//Pagination
	const lastIndexBank = currentPage*banksPerPage;
	const firstIndexBank = lastIndexBank - banksPerPage;
	const currentBanks = FilteredBanks.slice(firstIndexBank, lastIndexBank);

	//Pagination Functions
	const paginate = (pageNumber) => setCurrentPage(pageNumber);
	const handleBanksPerPage = (value) => {
		setbanksPerPage(value);
		setCurrentPage(1);
	}

	useEffect(() => {
		let Filter = Banks.find((Bank) => {
			Bank.ifsc.includes(searchQuery)
		});

		console.log(Filter)
	}, [searchQuery])

	const updateCity = (city) => {
		console.log(city)
		setisLoading(true);
		setCity(city);
	}

	const handleCategory = (value) => setCategory(value)

	const handleSearchQuery = (value) => {
		setSearchQuery(value)
		console.log(value);
	}

	const Home = () => {
		return (
			<>
				<Filter city={city} updateCity={updateCity} searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} handleCategory={handleCategory} />
				<BankList loading={isLoading} Banks={currentBanks} />
				<Pagination currentPage={currentPage} banksPerPage={banksPerPage} totalBanks={FilteredBanks.length} paginate={paginate} handleBanksPerPage={handleBanksPerPage}  />
			</>
		)
	}





	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" index element={<Home />} />
				<Route path="favorites" element={<Favorites />} />
				<Route path="bank-details/:ifsc" element={<Details />} />
				<Route path="help" element={<Help />} />
				<Route path="*" element={<Lost />} />
			</Routes>
		</>

	);
}

export default App;
