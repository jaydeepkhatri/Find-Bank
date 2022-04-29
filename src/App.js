import "./style/main.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Navbar, BankList, Filter, Favorites, Info, Lost, Pagination, Details } from "./components";
import { useState, useEffect } from "react";
import axios from "axios";

// Need to imply routing, find bank, pagination

//Add button to clear favorites
// able to add favorites (in local storage), I can use IFSC as a favorite or directly store the complete data
// take care of web rules, contrast, add nice comments


// Remove console.logs
// Create 404 Page to help return the site visitor on homepage
// Add meta informarion

// Visit /info for more information on the project



//Banks INfo
// Mumbai, Delhi, Kolkata, Chennai, Bangalore

function App() {
	const [Banks, setBanks] = useState([]);
	const [FilteredBanks, setFilteredBanks] = useState([]);
	const [category, setCategory] = useState("");
	const [favorite, setFavorite] = useState([]);
	const [favoritBank, setFavoriteBank] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setisLoading] = useState(true);
	const [city, setCity] = useState("KOLKATA");
	const [currentPage, setCurrentPage] = useState(1);
	const [banksPerPage, setbanksPerPage] = useState(10);
	const API = "https://vast-shore-74260.herokuapp.com/banks"

	useEffect(()=> {
		if(localStorage.getItem("Favorites")) {
			setFavorite(JSON.parse(localStorage.getItem("Favorites")));	
			console.log(localStorage.getItem("Favorites"))
		}
	}, [])

	useEffect(() => {
		if (localStorage.getItem(city) === null) {
			axios.get(API, {
				params: {
					city
				}
			})
				.then(res => {
					setisLoading(false);
					setBanks(res.data);
					
					setFilteredBanks(res.data);
					setCategory('');
					//Setting the data in Browser local storage
					localStorage.setItem(city, JSON.stringify(res.data));
					
				})
		} else {
			setBanks(JSON.parse(localStorage.getItem(city)));
			setisLoading(false);
			setFilteredBanks(JSON.parse(localStorage.getItem(city)));
			setCategory('');

		}

	}, [city, favorite]);


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

	//Search Query
	useEffect(() => {
		let Filter = Banks.find((Bank) => {
			Bank.ifsc.includes(searchQuery)
		});
	}, [searchQuery])


	const updateCity = (city) => {
		setisLoading(true);
		setCity(city);
		setCurrentPage(1);
	}


	const handleCategory = (value) => setCategory(value)


	const handleSearchQuery = (value) => {
		setSearchQuery(value)
	}

	//Favorite Check
	useEffect(() => {
		let getIFSC = [].concat(...favorite).map(({ifsc})=>ifsc);

		//Check status of stored 
		if (getIFSC.indexOf(favoritBank.ifsc) >= 0){
			let newFavorite = favorite.filter((item) => item.ifsc !== favoritBank.ifsc);
			localStorage.setItem("Favorites", JSON.stringify(newFavorite));
		} else {
			let newFavorite = [...favorite, favoritBank];
			localStorage.setItem("Favorites", JSON.stringify(newFavorite));
		}
	}, [favorite])
	

	
	const addFavorite = (Bank) => {
		if(localStorage.getItem("Favorites")) {
			setFavoriteBank(Bank);
			setFavorite(JSON.parse(localStorage.getItem("Favorites")));
		} else {
			setFavorite([]);
		}
	}

	const clearAllFavorites = () => {
		setFavorite([])
	}

	const Home = () => {
		return (
			<>
				<Filter city={city} updateCity={updateCity} handleSearchQuery={handleSearchQuery} handleCategory={handleCategory} />
				<BankList loading={isLoading} Banks={currentBanks} addFavorite={addFavorite} />
				<Pagination currentPage={currentPage} banksPerPage={banksPerPage} totalBanks={FilteredBanks.length} paginate={paginate} handleBanksPerPage={handleBanksPerPage}  />
			</>
		)
	}

	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/" index element={<Home />} />
				<Route path="favorites" element={<Favorites clearAllFavorites={clearAllFavorites} addFavorite={addFavorite} />} />
				<Route path="bank-details/:ifsc" element={<Details />} />
				<Route path="info" element={<Info />} />
				<Route path="*" element={<Lost />} />
			</Routes>
		</>

	);
}

export default App;
