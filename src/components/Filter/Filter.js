function Filter({city, updateCity, handleCategory, handleSearchQuery}) {
    let timer = ''
    const countsearch = (value) => {
        timer = setTimeout(() => handleSearchQuery(value), 2500);
    }


    return (
        <>
            <div className="filter">
                <h2>All Banks - {city}</h2>            
                <div className="formelement">
                    <select id="city" value={city} onChange={(e) => updateCity(e.target.value)}>
                        <option value="BANGALORE">Bangalore</option>
                        <option value="MUMBAI">Mumbai</option>
                        <option value="DELHI">Delhi</option>
                        <option value="KOLKATA">Kolkata</option>
                        <option value="CHENNAI">Chennai</option>
                    </select>

                    <select id="category" onChange={(e) => handleCategory(e.target.value)}>
                        <option disabled>Category</option>
                        <option value="IFSC">IFSC</option>
                        <option value="branch">Branch</option>
                        <option value="bank_name">Bank Name</option>
                    </select>

                    <input type="text" placeholder="Search"
                        onChange={(e) => {countsearch(e.target.value)}} />
                </div>
            </div>
        </>
    )
}

export default Filter;