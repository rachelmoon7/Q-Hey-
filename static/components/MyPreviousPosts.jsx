const MyPreviousPosts = () => {
    const [loggedInUser, setLoggedInUser] = React.useState('');
    //previousPosts = all my previous posts
    const [previousPosts, setpreviousPosts] = React.useState({});

    React.useEffect(() => {
        fetch('/get-my-previous-posts')
        .then((response) => response.json())
        .then((result) => {
            setpreviousPosts(result)
        })
    }, []);

    const allPosts = []
    
    for (const allposts in previousPosts) {
        for (const mine in previousPosts[allposts]) {
                allPosts.push(<SinglePost username={allposts}
                                        caption={previousPosts[allposts][mine]['caption']}
                                        img_url={previousPosts[allposts][mine]['img_url']} 
                                        img_url2={previousPosts[allposts][mine]['img_url2']}                             
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