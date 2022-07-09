const MyFriends = () => {
    const [allFriends, setAllFriends] = React.useState([]);
    const [friend, setFriend] = React.useState([]);

    React.useEffect(() => {
        fetch('/get_list_of_friends')
        .then((response) => response.json())
        .then((result) => {
            console.log("??", result)
            console.log("!!result[i]['user_id']", result['2'])
            setAllFriends([]);
            for (const [userID, info] of Object.entries(result)) {
                setAllFriends((x) => [...x, <Friend user_id={info['user_id']} />])
            }
        })
    }, [])


    return (
        <React.Fragment>
            {allFriends}
        </React.Fragment>
    )
}

ReactDOM.render(<MyFriends />, document.querySelector('#my-friends'));