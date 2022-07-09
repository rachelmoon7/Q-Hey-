
const NavBar = () => {
    const [searchString, setSearchString] = React.useState('');
    const [result, setResult] = React.useState('')
    const [showSearchResult, setShowSearchResult] = React.useState(false);

    const handleClick = () => {
        console.log("ENTERING HADLECLICK")
        fetch('/get-search-result', {
            //post request to this route with searchString
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchString })
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("navBAR SEARCH RESULT:", result)
            setResult(result[0]['potentialFriend']);  
            setSearchString('');  
            setShowSearchResult(true);         
        }
    )}

    const requestFriend = () => {
        fetch('/request-friend', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ result })
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("###", result);      
            setResult('');
            setShowSearchResult(false);
            setSearchString('');
        })
       
    }
    

    
    return (
        <nav class="navbar navbar-expand-lg bg-light" sticky="top">
            
        <div class="container-fluid">
        <a class="navbar-brand" href="/landing-page">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            
                <li class="nav-item">
                <a class="nav-link" href="/profile" id="my-profile">My Profile</a>
                </li>
                
                <li class="nav-item">             
                <a class="nav-link" href="/myFriends">My Friends</a>
                </li>
                <li class="nav-item">
                <a class="nav-link" href="#">Settings</a>
                </li>
                <li class="nav-item">
                    <input type="text" key={showSearchResult} name ="searchString" placeholder="Find friends via username" onChange={(e) => setSearchString(e.target.value)}></input>
                    <p>
                        {searchString} 
                    </p>
                </li>
                <li class="nav-item">
                    <button type="submit" onClick={handleClick}>Submit</button>              
                </li>
                <li>
                    {showSearchResult ? 
                    <div>
                        <div> Add this friend?:</div>
                        <button onClick={requestFriend}>  {result} </button> 
                        </div>
                    : <div></div>               
                    }
                                 
                </li> 
                <li>
                    <a class="nav-link" href="/logout">Logout</a>
                </li>           
            </ul>
        </div>
        </div>
    
        </nav>
        )
    }

ReactDOM.render(<NavBar />, document.querySelector('#navBar'))

