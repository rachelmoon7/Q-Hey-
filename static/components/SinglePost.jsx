const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);

    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
            // if (result==props.username) {
            //     setLoggedInUser(result)
            // }
            setLoggedInUser(result)
        })
    }, []);

    const deletePost = () => {
        
    }
    return (
        <React.Fragment>
            <div>
            {props.username} caption: {props.caption}
            <img src={props.img_url} />
            <img src={props.img_url2} />
            </div>

            {loggedInUser==props.username ? 
            <button onClick = {deletePost}>Delete</button>
            : <div></div>
            }
        </React.Fragment>
    )
}