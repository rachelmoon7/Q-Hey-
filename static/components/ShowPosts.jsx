const ShowPosts = (props) => {

    // console.log("PROPS:", props)
    // console.log("PROPS.thePosts:", props.thePosts)

    const afterDelete = () => {
        // setUpdatedPostsAfterDelete("afterDelete")
        console.log("SHOWPOSTS 12 PROPS", props);
        if (props.handleAfterDeleteOnProfile) {
            props.handleAfterDeleteOnProfile();
        }
        props.handleAfterDeleteOnLanding();
    }

    const newPost = () => {
        props.newPost();
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
                                          handleNewPost={newPost}                
                                />)
    }};

    return (
        <React.Fragment>
            {allPosts}
        </React.Fragment>
    )
}