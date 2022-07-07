const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [postToComment, setPostToComment] = React.useState('');
    const [showCommentBox, setShowCommentBox] = React.useState(false);
    const [comment, setComment] = React.useState('');
    const [deleteOrigin, setDeleteOrigin] = React.useState('');
    const [newComment, setNewComment] = React.useState('');
    const [allCommentsInfo, setAllCommentsInfo] = React.useState([]);

    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            // console.log("username of this post:", result)
            setLoggedInUser(result)
        })
    }, []);

    const allComments = []

    React.useEffect(() => {
        fetch('/get-all-comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.post_id)
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("getallcomments result text:", result)
            // console.log("typeof passing in:", typeof result[0]['comment_date'])
            // console.log("typeof passing this too:", typeof result[0]['text'])

            // setAllCommentsInfo(result);
            for (let i=0; i < result.length; i+=1) {
                //blocker: comment component not showing in browser but console.log ok 
                allComments.push(<Comment comment_date={result[i]['comment_date']}
                                            text={result[i]['text']} />)
            }
        })
        .then(() => {console.log('******', allComments)})
    }, []);



    // const tester = () => {

    
    //     fetch('/get-all-comments', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json"},
    //         body: JSON.stringify(props.post_id)
    //     })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         // console.log("getallcomments result text:", result)
    //         // console.log("typeof passing in:", typeof result[0]['comment_date'])
    //         // console.log("typeof passing this too:", typeof result[0]['text'])

    //         // setAllCommentsInfo(result);
    //         // for (let i=0; i < result.length; i+=1) {
    //         //     allComments.push(<Comment comment_date={result[i]['comment_date']}
    //         //                                 text={result[i]['text']} />)
    //         // }
    //         for (let i=0; i < result.length; i+=1) {
    //             allComments.push(<Comment comment_date={"7/6"}
    //                                         text={"i+1"} />)
    //         }
    //     })
    //     .then(() => {console.log('******', allComments)})
    // }
    // console.log("singlepost props:", props)
    // React.useEffect(() => {
    //     tester();
    // }, [])

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

    // const optToComment = () => {
    //     setShowCommentBox(true);
    //     setPostToComment(props.post_id);
    // }

    const addComment = () => {
        fetch('/add-comment', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postToComment, comment })
                })
        .then((response) => response.json())
        .then((result) => {
            console.log("addcomment result to siinglepost", result)
            console.log("addcomment result[0]", result[0]['comment'])
            setNewComment(result[0]['comment'])
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
                <button onClick={() => {deletePost}}>Confirm Delete</button>
                : <div></div>
            }

            <button onClick={() => {setShowCommentBox(true); setPostToComment(props.post_id)}}>Comment</button>   

            {showCommentBox ? 
                <div>
                    <input type="text" 
                            placeholder="Add a comment"
                            onChange={(e) => setComment(e.target.value)}>
                    </input>
                    <button type="submit" onClick={addComment}>Save</button>
                </div>
                : <div></div>
            } 
            
            {allComments}
            
        </React.Fragment>
    )
}
//send comment state variable into fetch post request to server and add to database, create add comment funciton in crud