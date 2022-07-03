const MyProfilePosts = (props) => {
    const [myProfilePosts, setMyProfilePosts] = React.useState([]);
    const [username, setUsername] = React.useState('');
    // const [afterDelete, setAfterDelete] = React.useState('myprofile.jsx before update')

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
        // setAfterDelete('myprofile.jsx')-setting state did not rerender this component** so,
        //doing another fetch request to get fresh set of data when this function is called
        fetch('/get-my-profile-posts')
        .then((response) => response.json())
        .then((result) => {
            console.log("**:", result)
            setMyProfilePosts(result)
        })
    }

    return ( 
        <React.Fragment>
            <NavBar />
            <h1> {username}'s Profile</h1>
           <ShowPosts 
                thePosts={myProfilePosts} 
                handleAfterDeleteOnProfile={afterDeleteOnProfile}
                />
           <SinglePost />
           {/* {afterDelete} */}
        </React.Fragment>
    )
}

ReactDOM.render(<MyProfilePosts />, document.querySelector("#my-profile"));