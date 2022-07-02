const ShowPosts = (props) => {

    const [updatedPostsAfterDelete, setUpdatedPostsAfterDelete] = React.useState('beforeDelete');

    const [posts, setPosts] = React.useState(props.thePosts);
    // console.log("PROPS:", props)
    // console.log("PROPS.thePosts:", props.thePosts)

    const afterDelete = () => {
        console.log("called callbackfun 24**")
        setUpdatedPostsAfterDelete("afterDelete")
        console.log("SHOWPOSTS 12 PROPS", props)
        props.afterDeleteOnProfile()
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