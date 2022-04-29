// Visit /info for more information on the project

import "./style/main.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { Navbar, BankList, Filter, Favorites, Info, Lost, Pagination, Details } from "./components";
import { useState, useEffect } from "react";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

//Banks Info
// Mumbai, Delhi, Kolkata, Chennai, Bangalore

function App() {
	const [Banks, setBanks] = useState([]);
	const [FilteredBanks, setFilteredBanks] = useState([]);
	const [category, setCategory] = useState("ifsc");
	const [favorite, setFavorite] = useState([]);
	const [favoriteBank, setFavoriteBank] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setisLoading] = useState(true);
	const [city, setCity] = useState("KOLKATA");
	const [currentPage, setCurrentPage] = useState(1);
	const [banksPerPage, setbanksPerPage] = useState(10);
	const API = "https://vast-shore-74260.herokuapp.com/banks"

	useEffect(()=> {
		if(localStorage.getItem("Favorites")) {
			setFavorite(JSON.parse(localStorage.getItem("Favorites")));	
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
					//Setting the data in Browser local storage
					localStorage.setItem(city, JSON.stringify(res.data));
					
				})
		} else {
			setBanks(JSON.parse(localStorage.getItem(city)));
			setisLoading(false);
			setFilteredBanks(JSON.parse(localStorage.getItem(city)));
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



	const updateCity = (city) => {
		setisLoading(true);
		setCity(city);
		setCurrentPage(1);
	}

	//Handle Filters
	const handleCategory = (value) => setCategory(value)
	const handleSearchQuery = (value) => setSearchQuery(value)

	useEffect(() => {
		if(category && searchQuery) {
			let banks = Banks.filter((item) => {
				item[category].search(searchQuery) > 0
			});
			setBanks(banks);
		}
	}, [category, searchQuery])


	

	//Favorite Check
	useEffect(() => {
		let getIFSC = [].concat(...favorite).map(({ifsc})=>ifsc);
		//Check status of stored 
		if (getIFSC.indexOf(favoriteBank.ifsc) >= 0){
			let newFavorite = favorite.filter((item) => item.ifsc !== favoriteBank.ifsc);
			localStorage.setItem("Favorites", JSON.stringify(newFavorite));
		} else {
			let newFavorite = [...favorite, favoriteBank];
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


	const Home = () => {
		return (
			<>
				<Filter city={city} searchQuery={searchQuery} category={category} updateCity={updateCity} handleSearchQuery={handleSearchQuery} handleCategory={handleCategory} />
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
				<Route path="favorites" element={<Favorites addFavorite={addFavorite} />} />
				<Route path="bank-details/:ifsc" element={<Details />} />
				<Route path="info" element={<Info />} />
				<Route path="*" element={<Lost />} />
			</Routes>
		</>

	);
}

export default App;
