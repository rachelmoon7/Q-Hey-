const MyProfilePosts = (props) => {
    const [myProfilePosts, setMyProfilePosts] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [afterDelete, setAfterDelete] = React.useState(false)

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
            console.log("**:", result)
            setMyProfilePosts(result)
        })
    }, []);

    
    return ( 
        <React.Fragment>
            <NavBar />
            <h1> {username}'s Profile</h1>
           <ShowPosts 
                thePosts={myProfilePosts} 
                />
           <SinglePost />
        </React.Fragment>
    )
}

ReactDOM.render(<MyProfilePosts />, document.querySelector("#my-profile"));