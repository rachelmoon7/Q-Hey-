const ShowPosts = (props) => {
    // const [loggedInUser, setLoggedInUser] = React.useState('');
    const [updatedPostsAfterDelete, setUpdatedPostsAfterDelete] = React.useState('beforeDelete');

    const [posts, setPosts] = React.useState(props.thePosts);
    // console.log("PROPS:", props)
    // console.log("PROPS.thePosts:", props.thePosts)

    // console.log("WHAT IS STATE POST:", posts)
    const afterDelete = () => {
        console.log("called callbackfun 24**")
        setUpdatedPostsAfterDelete("afterDelete")
    }

    const allPosts = []
    for (const [user, allUserPosts] of Object.entries(props.thePosts)) {
        console.log("USER:", user)
        for (const [postID, postInfo] of Object.entries(allUserPosts)) {
                allPosts.push(<SinglePost username={user}
                                        caption={postInfo['caption']}
                                        img_url={postInfo['img_url']} 
                                        img_url2={postInfo['img_url2']} 
                                        post_id={postID} 
                                        post_date={postInfo['post_date']} 
                                        handleAfterDelete={afterDelete}                
                                    />)
    }};

    return (
        <React.Fragment>
            {allPosts}
            {updatedPostsAfterDelete}
        </React.Fragment>
    )
}