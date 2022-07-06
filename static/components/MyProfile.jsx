const MyProfilePosts = (props) => {
    const [myProfilePosts, setMyProfilePosts] = React.useState([]);
    const [username, setUsername] = React.useState('');

    React.useEffect(() => {
        fetch('/whose-profile')
        .then((response) => response.json())
        .then((result) => {
            setUsername(result)
        })
    }, []);

    React.useEffect(() => {
        fetch('/get-my-profile-posts')
        .then((response) => response.json())
        .then((result) => {
            // console.log("**:", result)
            setMyProfilePosts(result)
        })
    }, []);

    return ( 
        <React.Fragment>
            <NavBar />
            <h1> {username}'s Profile</h1>
           <ShowPosts 
                thePosts={myProfilePosts} 
                setMyProfilePosts={setMyProfilePosts}
                deleteOnProfile={true}
                />
        </React.Fragment>
    )
}

ReactDOM.render(<MyProfilePosts />, document.querySelector("#my-profile"));