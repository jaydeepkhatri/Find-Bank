function Filter({updateCity}) {



    return (
        <>
            <div className="filter">
                <h2>All Banks</h2>            
                <div className="formelement">
                    <select id="city" onChange={(e) => updateCity(e.target.value)}>
                        <option value="MUMBAI">Mumbai</option>
                        <option value="BANGALORE">Bangalore</option>
                        <option value="DELHI">Delhi</option>
                        <option value="KOLKATA">Kolkata</option>
                        <option value="CHENNAI">Chennai</option>
                    </select>

                    <select id="category">
                        <option value="MUMBAI">Mumbai</option>
                        <option value="BANGALORE">Bangalore</option>
                        <option value="DELHI">Delhi</option>
                        <option value="KOLKATA">Kolkata</option>
                        <option value="CHENNAI">Chennai</option>
                    </select>

                    <input type="search" placeholder="Search" />
                </div>
            </div>
        </>
    )
}

export default Filter;