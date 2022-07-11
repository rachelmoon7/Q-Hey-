const FriendPosts = (props) => {
    const [friendProfilePosts, setFriendProfilePosts] = React.useState([]);


    console.log("friendprofiel !! props:", props)

    React.useEffect(() => {
        fetch('/get-friend-posts', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.user_id)
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
            setFriendProfilePosts(result)
        })
    }, []);

    const hideFriendPosts = () => {
        //reset state to empty array to hide friend's posts after browsing
        props.setFriendPosts([]);
    }

    return ( 
        <React.Fragment>

            <h1> {props.fname} {props.lname}'s Posts</h1>
           
           <ShowPosts 
                thePosts={friendProfilePosts} 
                setFriendProfilePosts={setFriendProfilePosts}
                deleteOnProfile={true}
                />
            
            <button onClick={hideFriendPosts}>Done</button>
        </React.Fragment>
    )


}



