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
    
    for (const allposts in myPosts) {
        for (const mine in myPosts[allposts]) {
                allPosts.push(<SinglePost
                                        caption={myPosts[allposts][mine]['caption']}
                                        img_url={myPosts[allposts][mine]['img_url']} 
                                        img_url2={myPosts[allposts][mine]['img_url2']}                             
                                    />)
    }};
    

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
            {allPosts}
        </React.Fragment>
    )
}