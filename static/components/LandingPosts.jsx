const LandingPosts = (props) => {
    const [allLandingPosts, setAllLandingPosts] = React.useState([]);
    const [beforePost, setBeforePost] = React.useState('beforepost');
    const[updatedPosts, setUpdatedPosts] = React.useState([]);

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
            // setAllLandingPosts(prevState => {[...prevState, result]})
            setAllLandingPosts(result)
        })
    }


    const afterNewPost = (result) => {
        console.log("LandingPost afterNewPost is called")
        setBeforePost('after post')
        fetch('/get-landing-posts')
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
            setUpdatedPosts(result)
        })
    }
    // React.useEffect(() => {
    //     fetch('/get-landing-posts')
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("LANDINGPOST 2ND USEEFFECT")
    //         setAllLandingPosts(result)
    //     })
    // }, [beforePost]); 
    return ( 
        <React.Fragment>
            <NewPost 
                // setAllLandingPosts={setAllLandingPosts}
                handleAfterNewPost={afterNewPost}
                />   
            <ShowPosts 
                thePosts={allLandingPosts} 
                handleAfterDeleteOnLanding={afterDeleteOnLanding}
                theUpdatedPosts={updatedPosts}
                />
            {beforePost}
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));