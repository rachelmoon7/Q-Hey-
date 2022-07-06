const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            // console.log("username of this post:", result)
            setLoggedInUser(result)
        })
    }, []);

    const deletePost = () => {
        fetch('/delete-post', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(postToDelete)
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("DELETE RESULT:", result)
            // console.log("SINGLEPOST'S PROP:", props)
            // console.log("type of landing'S PROP:", typeof props.setAllLandingPosts)
            setShowConfirmDelete(false)
            if (!props.setAllLandingPosts) {
                props.setMyProfilePosts(result);
            } else {
                props.setAllLandingPosts(result)
            }
        })
    }

    return (
        <React.Fragment>
            <div>
                {props.username} caption: {props.caption}
                <img src={props.img_url} />
                <img src={props.img_url2} />
                posted date: {props.post_date}   
            </div>

            {loggedInUser==props.username ? 
                <button onClick={() => {setPostToDelete(props.post_id), setShowConfirmDelete(true)}}>Delete</button>
                : <div></div>
            }

            {showConfirmDelete ?
                <button onClick={deletePost}>Confirm Delete</button>
                : <div></div>
            }           
        </React.Fragment>
    )
}