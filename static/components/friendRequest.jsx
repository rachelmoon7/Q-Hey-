//render one request 
const FriendRequest = (props) => {
    // const [friend, setFriend] = React.useState('')
    const [active, setActive] = React.useState(true)

    const handleAccept = () => {
        fetch('/accept-request', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 'request_from': props.user_id })
        })
        .then(() => {
            setActive(false);
            props.setFriendRequestHandled(true);
        })
    }

    const handleDeny = () => {
        console.log("hello!")
        fetch('/deny-request', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 'request_from': props.user_id })
        })
        .then(() => {
            setActive(false);
            props.setFriendRequestHandled(true);
        })  
    }
    
    return ( 
        active ?
        <React.Fragment>
            <div>
            <span id="friend-request-from">{props.name}</span>

            <button type="submit" onClick={handleAccept}><i class="bi bi-person-check"></i></button>
            
            <button type="submit" onClick={handleDeny}><i class="bi bi-person-x-fill"></i></button>
            </div>
        </React.Fragment>
        : <span></span>
    )
}

//container for FriendRequest component
const FriendRequestContainer = (props) => {   
    const [friends, setFriends] = React.useState('');

    React.useEffect(() => {
        fetch('/get-all-requests')
        .then((response) => response.json())
        .then((result) => {
            setFriends(result)
        });
    }, []);

    const requests = [];

    //push FriendRequest child components into empty array while passing in props
    for (const request of friends) {
        requests.push(<FriendRequest user_id={request.user_id} 
                                        name={request.fname} 
                                        setFriendRequestHandled={props.setFriendRequestHandled}      
        />
        )
    };
    
    return (
        <React.Fragment>
            {requests}
        </React.Fragment>
    )
}
