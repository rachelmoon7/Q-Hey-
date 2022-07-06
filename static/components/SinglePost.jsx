const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [showCommentBox, setShowCommentBox] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [deleteOrigin, setDeleteOrigin] = React.useState('');

    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            // console.log("username of this post:", result)
            setLoggedInUser(result)
        })
    }, []);

    console.log("singlepost props:", props)

    const deletePost = () => {
        fetch('/delete-post', {
                    method:'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postToDelete, deleteOrigin })
                })
        .then((response) => response.json())
        .then((result) => {
            // console.log("DELETE RESULT:", result)
            console.log("SINGLEPOST'S PROP:", props)
            // console.log("type of landing'S PROP:", typeof props.setAllLandingPosts)
            setShowConfirmDelete(false)
            if (!props.setAllLandingPosts) {
                    props.setMyProfilePosts(result);
                } else {
                    props.setAllLandingPosts(result)
                }
        })
    }
    const optionToComment = () => {
        setShowCommentBox(true)
    }

    const addComment = () => {
        fetch('/add-comment', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ comment })
                })
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
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
                <button onClick={() => {setPostToDelete(props.post_id), setDeleteOrigin(props.deleteOnProfile), setShowConfirmDelete(true)}}>Delete</button>
                : <div></div>
            }

            {showConfirmDelete ?
                <button onClick={deletePost}>Confirm Delete</button>
                : <div></div>
            }

            <button onClick={optionToComment}>Comment</button>   

            {showCommentBox ? 
                <div>
                    <input type="text" 
                            placeholder="Add a comment"
                            onChange={(e) => setComment(e.target.value)}>
                    </input>
                    <input type="submit" onClick={addComment}></input>
                </div>
                : <div></div>
            }        

        </React.Fragment>
    )
}
//send comment state variable into fetch post request to server and add to database, create add comment funciton in crud