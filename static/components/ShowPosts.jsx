const ShowPosts = (props) => {
    // const [loggedInUser, setLoggedInUser] = React.useState('');

    const [posts, setPosts] = React.useState(props.thePosts);
    // console.log("PROPS:", props)
    // console.log("PROPS.thePosts:", props.thePosts)

    // console.log("WHAT IS STATE POST:", posts)
    
    const allPosts = []
    for (const [friend, allFriendPosts] of Object.entries(props.thePosts)) {
        console.log("FRIEND:", friend)
        for (const [postID, postInfo] of Object.entries(allFriendPosts)) {
                allPosts.push(<SinglePost username={friend}
                                        caption={postInfo['caption']}
                                        img_url={postInfo['img_url']} 
                                        img_url2={postInfo['img_url2']} 
                                        post_id={postID} 
                                        post_date={postInfo['post_date']} 
                                                        
                                    />)
    }};

    return (
        <React.Fragment>
            {allPosts}
        </React.Fragment>
    )
}