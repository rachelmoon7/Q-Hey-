const MyFriends = () => {
    const [allFriends, setAllFriends] = React.useState([]);
    const [afterFriendDeleted, setAfterFriendDeleted] = React.useState(false);
    const [pendingFriends, setPendingFriends] = React.useState([]);
    const [friendRequestHandled, setFriendRequestHandled] = React.useState(false);
    const [requestSent, setRequestSent] = React.useState(false);

    const [searchString, setSearchString] = React.useState('');
    const [result, setResult] = React.useState('')
    const [showSearchResult, setShowSearchResult] = React.useState(false);

    React.useEffect(() => {
        fetch('/get_list_of_friends')
        .then((response) => response.json())
        .then((result) => {
            console.log("??", result)
            setAllFriends([]);
            for (const [userID, info] of Object.entries(result)) {
                setAllFriends((x) => [...x, <Friend user_id={info['user_id']}
                                                    fname={info['fname']}
                                                    lname={info['lname']} 
                                                    setAfterFriendDeleted={setAfterFriendDeleted}/>])
            }
        })
    }, [ , friendRequestHandled, afterFriendDeleted])


    React.useEffect(() => {
        fetch('/get_list_of_pending')
        .then((response) => response.json())
        .then((result) => {
            console.log("+++", result)
            setPendingFriends([]);
            for (const [userID, info] of Object.entries(result)) {
                setPendingFriends((x) => [...x, <PendingFriend fname={info['fname']}
                                                                lname={info['lname']} />])
            }
        })
    }, [ , requestSent])

    const handleClick = () => {
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
            // console.log("###", result);      
            setResult('');
            setShowSearchResult(false);
            setSearchString('');
            setRequestSent(true);
        })
       
    }

    return (
        <React.Fragment>
            <h2>Search for friends to add</h2>
                <input type="text" key={showSearchResult} 
                                    name ="searchString" 
                                    placeholder="Find friends via username" 
                                    onChange={(e) => setSearchString(e.target.value)}
                ></input>
                    <p>
                        {searchString} 
                    </p>

                <button type="submit" onClick={handleClick}>Submit</button>              
              
                {showSearchResult ? 
                    <div>
                        <div> Add this friend?:</div>
                        <button onClick={requestFriend}>  {result} </button> 
                        </div>
                    : <div></div>               
                } 

            <h2>Friend Request:</h2>
                <FriendRequestContainer setFriendRequestHandled={setFriendRequestHandled}/>

            <h1>Requested to...</h1>
                {pendingFriends}

            <h2>My Friends:</h2>
                {allFriends}
        </React.Fragment>
    )
}

ReactDOM.render(<MyFriends />, document.querySelector('#my-friends'));