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
           //pass setAllLandingPpsts as a propso that newPost can update this compoent, landingposts when a user uplaods, to rerender component wihtout window.location
           state updates 
           updating state vairable of parent component from child which is newpost because we're passing in the function as aprop from parent to child 

           in new post = 
           <ShowPosts thePosts={allLandingPosts} />
           <SinglePost />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingPosts />, document.querySelector("#reactLandingPosts"));