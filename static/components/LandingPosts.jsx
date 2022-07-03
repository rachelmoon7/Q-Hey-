const LandingPosts = (props) => {
    const [allLandingPosts, setAllLandingPosts] = React.useState([]);
    const [beforePost, setBeforePost] = React.useState('beforepost')

    React.useEffect(() => {
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
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

    const afterPosting = () => {
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
            setBeforePost('after post')
            setAllLandingPosts(result)
        })
    }
    return ( 
        <React.Fragment>
            <NewPost 
                setAllLandingPosts={setAllLandingPosts}
                handleafterPosting={afterPosting}
                />   
            <ShowPosts 
                thePosts={allLandingPosts} 
                handleAfterDeleteOnLanding={afterDeleteOnLanding}
                handleAfterPosting={afterPosting}
                />
            <SinglePost />
            {beforePost}
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));