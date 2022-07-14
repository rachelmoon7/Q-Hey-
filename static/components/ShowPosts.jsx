const ShowPosts = (props) => {

    // console.log("typeof PROPS:", typeof props.theUpdatedPosts)
    // console.log("PROPS.thePosts:", props.thePosts)

    const allPosts = []
    // console.log("ShowPosts props.thePosts:", props.thePosts)
    console.log("showPosts props:", props)

    for (const [user, allUserPosts] of Object.entries(props.thePosts)) {
        // console.log("USER:", user)
        // console.log("allLandingPosts  after NEWPOST:", props.thePosts)
        for (const [postID, postInfo] of Object.entries(allUserPosts)) {
            let d = new Date(postInfo['post_date'])
            allPosts.push(<div class="single-post">
                                    <SinglePost username={user}
                                        caption={postInfo['caption']}
                                        img_url={postInfo['img_url']} 
                                        img_url2={postInfo['img_url2']} 
                                        post_id={postID} 
                                        post_date={d.toLocaleDateString()} 
                                        setAllLandingPosts={props.setAllLandingPosts}
                                        setMyProfilePosts={props.setMyProfilePosts}
                                        deleteOnLanding={props.deleteOnLanding}
                                        deleteOnProfile={props.deleteOnProfile}
                            /> </div>)
    }};

    return (
        <React.Fragment>
            {/* <div class="grid">{allPosts}</div> */}
             {/* <ReactBootstrap.Container>
                <ReactBootstrap.Row>
                
                    <ReactBootstrap.Col>{allPosts}</ReactBootstrap.Col>
                </ReactBootstrap.Row>
            </ReactBootstrap.Container>
             */}
            <ReactBootstrap.Stack direction="horizontal" gap={2}>
                <div className="bg-light border">{allPosts}</div>
            </ReactBootstrap.Stack>
        </React.Fragment>
    )
}