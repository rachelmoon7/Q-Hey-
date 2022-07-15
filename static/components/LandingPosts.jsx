const LandingPosts = (props) => {
    const [allLandingPosts, setAllLandingPosts] = React.useState([]);
    const [newPostComments, setNewPostComments] = React.useState(false); 


    React.useEffect(() => {
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            console.log("*LANDINPOSTS RESULT FROM SERVER*:", result)
            setAllLandingPosts(result)
        })
    }, []);    

    // console.log("!!ALL LANDING:", allLandingPosts)
    //passing in newPostComments and setNewPostComments to trigger changes when there is NewPost 
    //prop drilling to re-rendering Comments everytime there is new post 
    return ( 
        <React.Fragment>
            <ReactBootstrap.Stack gap={10}>
                <div className="bg-light border"><NewPost 
                                                    setAllLandingPosts={setAllLandingPosts} 
                                                    setNewPostComments={setNewPostComments}
                                                    newPostComments={newPostComments}
                            
                                                /></div>
                <div className="bg-light border post-container"><ShowPosts 
                            thePosts={allLandingPosts} 
                            setAllLandingPosts={setAllLandingPosts}
                            deleteOnProfile={false}
                            newPostComments={newPostComments}

                        /></div>
            
            </ReactBootstrap.Stack>
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));