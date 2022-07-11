const MyFriends = () => {
    const [allFriends, setAllFriends] = React.useState([]);
    const [friendRequestHandled, setFriendRequestHandled] = React.useState(false);

    React.useEffect(() => {
        fetch('/get_list_of_friends')
        .then((response) => response.json())
        .then((result) => {
            console.log("??", result)
            console.log("!!result[i]['user_id']", result['2'])
            setAllFriends([]);
            for (const [userID, info] of Object.entries(result)) {
                setAllFriends((x) => [...x, <Friend user_id={info['user_id']}
                                                    fname={info['fname']}
                                                    lname={info['lname']} />])
            }
        })
    }, [ , friendRequestHandled])


    return (
        <React.Fragment>
    
            <h2>Friend Request:</h2>
            <FriendRequestContainer setFriendRequestHandled={setFriendRequestHandled}/>

            <h2>My Friends:</h2>
            {allFriends}
        </React.Fragment>
    )
}

ReactDOM.render(<MyFriends />, document.querySelector('#my-friends'));