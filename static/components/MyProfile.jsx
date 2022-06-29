const MyProfile = () => {
    const [loggedInUser, setLoggedInUser] = React.useState('');
    const [myPosts, setMyPosts] = React.useState({});

    React.useEffect(() => {
        fetch('/get-my-posts')
        .then((response) => response.json())
        .then((result) => {
            setMyPosts(result)
        })
    }, []);

    const allPosts = []
    
    for (const friend in friendsPosts) {
        for (const allposts in friendsPosts[friend]) {

                allPosts.push(<SinglePost username={friend} 
                                    caption={friendsPosts[friend][allposts]['caption']}
                                    img_url={friendsPosts[friend][allposts]['img_url']} 
                                    img_url2={friendsPosts[friend][allposts]['img_url2']}                             
                            />)};
    }

    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            setLoggedInUser(result)
        })
    }, []);

    return (
        <React.Fragment>
            Hello, {loggedInUser}
        </React.Fragment>
    )
}