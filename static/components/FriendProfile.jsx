const FriendProfile = (props) => {
    const [friendProfilePosts, setFriendProfilePosts] = React.useState([]);
    const [username, setUsername] = React.useState('');

    // React.useEffect(() => {
    //     fetch('/friend-profile')
    //     .then((response) => response.json())
    //     .then((result) => {
    //         setUsername(result)
    //     })
    // }, []);
    console.log("friendprofiel !! props:", props)

    React.useEffect(() => {
        fetch('/get-friend-posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.user_id)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("**:", result)
            setFriendProfilePosts(result)
        })
    }, []);

    return ( 
        <React.Fragment>
            {/* <NavBar /> */}
            <h1> {username}'s Profile</h1>
           
           <ShowPosts 
                thePosts={friendProfilePosts} 
                setFriendProfilePosts={setFriendProfilePosts}
                deleteOnProfile={true}
                />
        </React.Fragment>
    )


}
// ReactDOM.render(<FriendProfile />, document.querySelector('#friend-profile'));



