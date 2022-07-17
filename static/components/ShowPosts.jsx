const ShowPosts = (props) => {
    const [allPosts, setAllPosts] = React.useState([]);
    const [refreshAfterDelete, setRefreshAfterDelete] = React.useState(false);
    const [count, setCount] = React.useState(0);
    // console.log("typeof PROPS:", typeof props.theUpdatedPosts)
    // console.log("PROPS.thePosts:", props.thePosts)
    
    // console.log("ShowPosts props.thePosts:", props.thePosts)
    // console.log("showPosts props:", props)

    // React.useEffect(() => {
    //     if (props.refreshAfterDelete== false) {
    //         props.setRefreshAfterDelete(true);
    //     } else {
    //         props.setRefreshAfterDelete(false);
    //     }
    // }, [refreshAfterDelete])

    React.useEffect(()=> {
        console.log('rerendering show post', allPosts)
        setCount(count + 1)
        setAllPosts([]);
        console.log(count)
        for (const [user, allUserPosts] of Object.entries(props.thePosts)) {
            // console.log("USER:", user)
            // console.log("allLandingPosts  after NEWPOST:", props.thePosts)
            for (const [postID, postInfo] of Object.entries(allUserPosts)) {
                let d = new Date(postInfo['post_date'])
                setAllPosts((x) => [...x, <div className="single-post">
                                            <SinglePost username={user}
                                                key={count}
                                                caption={postInfo['caption']}
                                                img_url={postInfo['img_url']} 
                                                img_url2={postInfo['img_url2']} 
                                                post_id={postID} 
                                                post_date={d.toLocaleDateString()} 
                                                setAllLandingPosts={props.setAllLandingPosts}
                                                setMyProfilePosts={props.setMyProfilePosts}
                                                deleteOnLanding={props.deleteOnLanding}
                                                deleteOnProfile={props.deleteOnProfile}
                                                newPostComments={props.newPostComments}
                                                newPostReactions={props.newPostReactions}
                                            /> 
                                        </div>])
        }};        
    }, [ , props.thePosts, props.setNewPostComments, props.setNewPostReactions])


    return (
        <React.Fragment>
            <ReactBootstrap.Stack direction="horizontal" gap={90}>
                <div className="bg-light border"></div>
                <div className="bg-light border">{allPosts}</div>
                <div className="bg-light border"></div>
            </ReactBootstrap.Stack>
        </React.Fragment>
    )
}