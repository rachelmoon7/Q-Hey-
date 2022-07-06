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
            <NewPost 
                setAllLandingPosts={setAllLandingPosts}                
            />   
            <ShowPosts 
                thePosts={allLandingPosts} 
                setAllLandingPosts={setAllLandingPosts}
                deleteOnProfile={false}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));