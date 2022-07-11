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
            <button type="submit" onClick={handleAccept}>Accept</button>
            <div>{props.name}</div>
            <button type="submit" onClick={handleDeny}>Deny</button>
        </React.Fragment>
        : <div></div>
    )
}

const FriendRequestContainer = (props) => {
    const requests = [];
    const [friends, setFriends] = React.useState('');

    React.useEffect(() => {
        fetch('/get-all-requests')
        .then((response) => response.json())
        .then((result) => {
            setFriends(result)
        });
    }, []);

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
