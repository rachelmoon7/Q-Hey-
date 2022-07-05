const ShowPosts = (props) => {

    // console.log("typeof PROPS:", typeof props.theUpdatedPosts)
    // console.log("PROPS.thePosts:", props.thePosts)

    const afterDelete = () => {
        // setUpdatedPostsAfterDelete("afterDelete")
        console.log("SHOWPOSTS 12 PROPS", props);
        if (props.handleAfterDeleteOnProfile) {
            props.handleAfterDeleteOnProfile();
        }
        else if (props.handleAfterDeleteOnLanding) {
            props.handleAfterDeleteOnLanding();

        }
    }

    // const newPost = () => {
    //     props.handleAfterNewPost();
    // }

    const allPosts = []
    // console.log("ShowPosts props.thePosts:", props.thePosts)
    console.log("showPosts props:", props)
    // for (const [user, allUserPosts] of Object.entries(props.thePosts)) {
    //     console.log("USER:", user)
    //     // console.log("allLandingPosts after NEWPOST:", props.thePosts)
    //     for (const [postID, postInfo] of Object.entries(allUserPosts)) {
    //             allPosts.push(<SinglePost username={user}
    //                                       caption={postInfo['caption']}
    //                                       img_url={postInfo['img_url']} 
    //                                       img_url2={postInfo['img_url2']} 
    //                                       post_id={postID} 
    //                                       post_date={postInfo['post_date']} 
    //                                       handleAfterDelete={afterDelete}
    //                                     //   handleNewPost={newPost}        
    //                             />)
    // }};
    if (props.theUpdatedPosts.length == 0) {
        for (const [user, allUserPosts] of Object.entries(props.thePosts)) {
        console.log("USER:", user)
        // console.log("allLandingPosts after NEWPOST:", props.thePosts)
            for (const [postID, postInfo] of Object.entries(allUserPosts)) {
                allPosts.push(<SinglePost username={user}
                                          caption={postInfo['caption']}
                                          img_url={postInfo['img_url']} 
                                          img_url2={postInfo['img_url2']} 
                                          post_id={postID} 
                                          post_date={postInfo['post_date']} 
                                          handleAfterDelete={afterDelete}
                                        //   handleNewPost={newPost}        
                                />)
    }};
    } else {
        for (const [user, allUserPosts] of Object.entries(props.theUpdatedPosts)) {
            console.log("USER:", user)
            // console.log("allLandingPosts after NEWPOST:", props.thePosts)
                for (const [postID, postInfo] of Object.entries(allUserPosts)) {
                    allPosts.push(<SinglePost username={user}
                                              caption={postInfo['caption']}
                                              img_url={postInfo['img_url']} 
                                              img_url2={postInfo['img_url2']} 
                                              post_id={postID} 
                                              post_date={postInfo['post_date']} 
                                              handleAfterDelete={afterDelete}
                                            //   handleNewPost={newPost}        
                                    />)
        }};
    }


    return (
        <React.Fragment>
            {allPosts}
        </React.Fragment>
    )
}