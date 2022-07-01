const PostsContainer = () => {
    const [loggedInUser, setLoggedInUser] = React.useState('');
    //previousPosts = all my previous posts
    const [posts, setPosts] = React.useState({});

    React.useEffect(() => {
        fetch('/get-my-previous-posts')
        .then((response) => response.json())
        .then((result) => {
            setPosts(result)
        })
    }, []);

    const allPosts = []
    
    for (const allposts in posts) {
        for (const mine in posts[allposts]) {
                allPosts.push(<SinglePost username={allposts}
                                        caption={posts[allposts][mine]['caption']}
                                        img_url={posts[allposts][mine]['img_url']} 
                                        img_url2={posts[allposts][mine]['img_url2']} 
                                        post_id={mine}  
                                        //add post_date                             
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
            {allPosts}
        </React.Fragment>
    )
}