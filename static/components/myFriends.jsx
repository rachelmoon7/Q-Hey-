const MyFriends = () => {
    //friends is a list of [{10:xxxx}, {9:xxxx}]
    
    const [friendsPosts, setFriendsPosts] = React.useState({});
    // const [allPosts, setAllPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('/get-friends-posts')
        .then((response) => response.json())
        .then((result) => {
            setFriendsPosts(result)
        })
    }, []);

    
    const allPosts = []
    // React.useEffect(() => {
    //     for (const friend in friendsPosts) {
    //         for (const allposts in friendsPosts[friend]) {
    //             for (const post in friendsPosts[friend][allposts]) {
    //                 console.log("URL?", friendsPosts[friend][allposts]['caption'])

    //                 allPosts.push(<SinglePost username={friend} 
    //                                     caption={friendsPosts[friend][allposts]['caption']}
    //                                     img_url={friendsPosts[friend][allposts]['img_url']} 
    //                                     img_url2={friendsPosts[friend][allposts]['img_url2']}                             
    //                             />)};
    //             }
    //     }
    // }, [friendsPosts]); 
    for (const friend in friendsPosts) {
        for (const allposts in friendsPosts[friend]) {
            // for (const post in friendsPosts[friend][allposts]) {
                console.log("URL?", friendsPosts[friend][allposts]['img_url'])

                allPosts.push(<SinglePost username={friend} 
                                    caption={friendsPosts[friend][allposts]['caption']}
                                    img_url={friendsPosts[friend][allposts]['img_url']} 
                                    img_url2={friendsPosts[friend][allposts]['img_url2']}                             
                            />)};
            // }
    }
    return (  
        <React.Fragment>
           <div>
               {allPosts}
           </div>
        </React.Fragment>
    );
}

