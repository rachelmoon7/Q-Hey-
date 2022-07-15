const LandingPosts = (props) => {
    const [allLandingPosts, setAllLandingPosts] = React.useState([]);

    React.useEffect(() => {
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            console.log("*LANDINPOSTS RESULT FROM SERVER*:", result)
            setAllLandingPosts(result)
        })
    }, []);    

    // console.log("rendering LandingPosts.jsx")

    return ( 
        <React.Fragment>
            <ReactBootstrap.Stack gap={10}>
                <div className="bg-light border"><NewPost 
                            setAllLandingPosts={setAllLandingPosts}                
                        /></div>
                <div className="bg-light border post-container"><ShowPosts 
                            thePosts={allLandingPosts} 
                            setAllLandingPosts={setAllLandingPosts}
                            deleteOnProfile={false}
                        /></div>
            
            </ReactBootstrap.Stack>
            {/* <NewPost 
                setAllLandingPosts={setAllLandingPosts}                
            />    */}
            {/* <ShowPosts 
                thePosts={allLandingPosts} 
                setAllLandingPosts={setAllLandingPosts}
                deleteOnProfile={false}
            /> */}
            
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));