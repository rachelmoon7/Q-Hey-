const LandingPosts = (props) => {
    const [allLandingPosts, setAllLandingPosts] = React.useState([]);
    const [newPostComments, setNewPostComments] = React.useState(false); 
    const [newPostReactions, setNewPostReactions] = React.useState(false);


    React.useEffect(() => {
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            console.log("*LANDINPOSTS RESULT FROM SERVER*:", result)
            setAllLandingPosts(result)
        })
    }, []);    

    //passing in newPostComments and setNewPostComments to trigger changes when there is NewPost 
    //prop drilling to re-rendering Comments everytime there is new post 
    return ( 
        <React.Fragment>
            <ReactBootstrap.Stack gap={3}>
                <div className="bg-light border">
                    <NewPost 
                            setAllLandingPosts={setAllLandingPosts} 
                            setNewPostComments={setNewPostComments}
                            newPostComments={newPostComments}
                            setNewPostReactions={setNewPostReactions}
                            newPostReactions={newPostReactions}
                    />
                </div>
                <div className="bg-light border post-container">
                    <ShowPosts 
                            thePosts={allLandingPosts} 
                            setAllLandingPosts={setAllLandingPosts}
                            deleteOnProfile={false}
                            newPostComments={newPostComments}
                            newPostReactions={newPostReactions}
                    />
                </div>
            
            </ReactBootstrap.Stack>
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));