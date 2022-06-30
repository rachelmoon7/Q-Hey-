//render one request
const FriendRequest = (props) => {
    const [friend, setFriend] = React.useState('')
    const [active, setActive] = React.useState(true)

    const handleClick = () => {
        fetch('/accept-request', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 'request_from': props.user_id })
        })
        .then((response) => response.json())
        .then((result) => {
            setActive(false)
        })
        .then(window.location.reload(false))
    }
    return (
        //if active is true = active ? // : is else
        active ?
        <React.Fragment>
            <button type="submit" onClick={handleClick}>Accept</button>
            <div>{props.name}</div>
        </React.Fragment>
        : <div></div>
    )
}

const FriendRequestContainer = () => {
    const requests = [];
    const [friends, setFriends] = React.useState('');

    React.useEffect(() => {
        fetch('/get-all-requests')
        .then((response) => response.json())
        .then((result) => {
            setFriends(result)
        });
    }, []);

    console.log("my friends as a result:", friends)

    for (const request of friends) {
        requests.push(<FriendRequest user_id={request.user_id} name={request.fname}          
        />
        )
    };
    return (
        <React.Fragment>
            {requests}
        </React.Fragment>
    )
}
ReactDOM.render(<FriendRequestContainer />, document.querySelector('#friend-request'),);