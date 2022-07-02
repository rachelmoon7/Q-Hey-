const LandingPosts = () => {
    const [allLandingPosts, setAllLandingPosts] = React.useState([]);


    React.useEffect(() => {
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
            setAllLandingPosts(result)
        })
    }, []);    

    return ( 
        <React.Fragment>
            <NewPost setAllLandingPosts={setAllLandingPosts}/>   
            <ShowPosts thePosts={allLandingPosts} />
            <SinglePost />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));