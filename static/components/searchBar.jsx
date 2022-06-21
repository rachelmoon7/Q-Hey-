
const SearchBar = () => {
    
    const [searchString, setSearchString] = React.useState('');

    const handleClick = () => {
        fetch('/get-search-result', {
            //post request to this route with searchString
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchString })
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("ARE WE GETTING:", result);
            
        }
    )}

    return (
        <div>
            <input type="text" name ="searchString" placeholder="Find friends via username" onChange={(e) => setSearchString(e.target.value)}></input>
            <p>
                {searchString} 
            </p>
            <button type="submit" onClick={handleClick} >Submit</button>
        </div>
    );   
}

// ReactDOM.render(<SearchBar />, document.querySelector('#root'))
export default SearchBar;
