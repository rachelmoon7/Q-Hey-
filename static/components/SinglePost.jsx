const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    // const [deleteResult, setDeleteResult] = React.useState('');

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
            console.log("DELETE RESULT:", result)
            if (result == "Delete successful") {
                props.handleAfterDelete(result)
                //setting showConfirmDelete back to false so it doesn't stay true for next post 
                setShowConfirmDelete(false)
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