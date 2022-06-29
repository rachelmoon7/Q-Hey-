const MyFriends = () => {
    const [friendsPosts, setFriendsPosts] = React.useState({});

    React.useEffect(() => {
        fetch('/get-friends-posts')
        .then((response) => response.json())
        .then((result) => {
            setFriendsPosts(result)
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

    return (  
        <React.Fragment>
           <div>
               {allPosts}
           </div>
        </React.Fragment>
    );
}

