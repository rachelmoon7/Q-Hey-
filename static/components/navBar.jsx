
const NavBar = () => {
    const [searchString, setSearchString] = React.useState('');
    const [result, setResult] = React.useState('')

    const handleClick = () => {
        fetch('/get-search-result', {
            //post request to this route with searchString
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ searchString })
        })
        .then((response) => response.json())
        .then((result) => {
            setResult(result[0]['potentialFriend'])             
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
            console.log("###", result)             
        }
    )}
    
    
    return (
        <nav class="navbar navbar-expand-lg bg-light" sticky="top">
            
        <div class="container-fluid">
        <a class="navbar-brand" href="#">Home</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/landing-page">Home</a>
            </li>
          
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
                <input type="text" name ="searchString" placeholder="Find friends via username" onChange={(e) => setSearchString(e.target.value)}></input>
                <p>
                    {searchString} 
                </p>
            </li>
            <li class="nav-item">
                <button type="submit" onClick={handleClick} >Submit</button>              
            </li>
            <li>
                <div> Add this friend?:</div>
                <button onClick={requestFriend}>  {result} </button>                             
            </li>            
            </ul>
        </div>
        </div>
    
        </nav>
        )
    }

ReactDOM.render(<NavBar />, document.querySelector('#navBar'))

