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

    const afterDeleteOnLanding = () => {
        console.log("landingposts.jsx 15")
        //doing another fetch request to get fresh set of data when this function is called since setting state doesn't rerender parent
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
            setAllLandingPosts(result)
        })
    }

    console.log("rendering LandingPosts.jsx")

    return ( 
        <React.Fragment>
            <NewPost 
                setAllLandingPosts={setAllLandingPosts}                
            />   
            <ShowPosts 
                thePosts={allLandingPosts} 
                setAllLandingPosts={setAllLandingPosts}
            />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));