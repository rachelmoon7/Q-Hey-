const MyProfilePosts = (props) => {
    const [myProfilePosts, setMyProfilePosts] = React.useState([]);
    const [username, setUsername] = React.useState('');
    const [afterDelete, setAfterDelete] = React.useState('myprofile.jsx before update')

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

    const afterDeleteOnProfile = () => {
        console.log("myprofile.jsx 24")
        setAfterDelete('myprofile.jsx woohoo')
    }
    return ( 
        <React.Fragment>
            <NavBar />
            <h1> {username}'s Profile</h1>
           <ShowPosts 
                thePosts={myProfilePosts} 
                afterDeleteOnProfile={afterDeleteOnProfile}
                />
           <SinglePost />
           {afterDelete}
        </React.Fragment>
    )
}

ReactDOM.render(<MyProfilePosts />, document.querySelector("#my-profile"));