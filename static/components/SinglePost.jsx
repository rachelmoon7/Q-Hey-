const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [postToComment, setPostToComment] = React.useState('');
    const [showCommentBox, setShowCommentBox] = React.useState(false);
    const [comment, setComment] = React.useState('');
    
    const [deleteOrigin, setDeleteOrigin] = React.useState('');
    const [allComments, setAllComments] = React.useState([]);
    const [afterDeletedComment, setAfterDeletedComment] = React.useState(false);
    
    const [newReaction, setNewReaction] = React.useState(false);

    const [numberOfLikes, setNumberOfLikes] = React.useState(0);
    const [usersWhoLiked, setUsersWhoLiked] = React.useState([]);

    const [numberOfLoves, setNumberOfLoves] = React.useState(0);
    const [usersWhoLoved, setUsersWhoLoved] = React.useState([]);

    const [numberOfHaHas, setNumberOfHahas] = React.useState(0);
    const [usersWhoHaha, setUsersWhoHaha] = React.useState([]);

    const [numberOfHugs, setNumberOfHugs] = React.useState(0);
    const [usersWhoHugged, setUsersWhoHugged] = React.useState([]);

    const [index, setIndex] = React.useState(0);

    


    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            // console.log("username of this post:", result)
            setLoggedInUser(result)
        })
    }, []);

    React.useEffect(() => {
        fetch('/get-all-comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.post_id)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("getallcomments result text:", result)
            // console.log("typeof passing in:", typeof result[0]['comment_date'])
            // console.log("typeof passing this too:", typeof result[0]['text'])
            setAllComments([]);
            for (const [each_comment, comment_info] of Object.entries(result)) {
                // console.log("--comment_info", comment_info);
                setAllComments(prevState => [...prevState, <Comment username={comment_info['username']}
                                                                    commentDate={comment_info['comment_date']}
                                                                    text={comment_info['text']}
                                                                    deleteOption={comment_info['delete_option']}
                                                                    commentID={comment_info['comment_id']}
                                                                    postID={comment_info['post_id']}
                                                                    setAfterDeletedComment={setAfterDeletedComment}
                                                                    setAllComments={setAllComments}
                                                                    afterDeletedComment={afterDeletedComment}
                                                            />])
            }
        })
    }, [ , afterDeletedComment]);

    React.useEffect(() => {
        fetch('/get-all-reactions', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.post_id)
        })
        .then((response) => response.json())
        .then((result) => {
            setUsersWhoLiked([]);
            setUsersWhoLoved([]);
            setUsersWhoHaha([]);
            setUsersWhoHugged([]);
            // console.log("???getall-reactions result", result)
            
            setNumberOfLikes(result['like']['count']);
            setUsersWhoLiked(result['like']['users']);

            setNumberOfLoves(result['love']['count']);
            setUsersWhoLoved(result['love']['users']);

            setNumberOfHahas(result['haha']['count']);
            setUsersWhoHaha(result['haha']['users']);
            
            setNumberOfHugs(result['hug']['count']);
            setUsersWhoHugged(result['hug']['users']);
        })
    }, [ , newReaction]);


    const deletePost = () => {
        fetch('/delete-post', {
                    method:'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postToDelete, deleteOrigin })
                })
        .then((response) => response.json())
        .then((result) => {
            // console.log("DELETE-POST RESULT:", result)
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

    const addComment = () => {
        fetch('/add-comment', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ postToComment, comment })
                })
        .then((response) => response.json())
        .then((result) => {
            console.log("addcomment result to siinglepost", result)
            // setNewComment(result[0]['comment'])
            setAllComments(prevState => [...prevState, <Comment username={result['username']}
                                                                commentDate={result['comment_date']}
                                                                text={result['text']}
                                                                deleteOption={result['delete_option']}
                                                                commentID={result['comment_id']}
                                                                postID={result['post_id']}
                                                                setAfterDeletedComment={setAfterDeletedComment}
                                                                setAllComments={setAllComments}
                                                                afterDeletedComment={afterDeletedComment}
                                                        />]);
            setComment('');
        })
    }

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        };
    

    const carouselItems = [];

    carouselItems.push(<ReactBootstrap.Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.img_url} 
                                alt="First slide"
                            />
                        </ReactBootstrap.Carousel.Item>
                    );

    if (props.img_url2 !== undefined) {
        carouselItems.push(<ReactBootstrap.Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src={props.img_url2}
                                    alt="Second slide"
                                />
                            </ReactBootstrap.Carousel.Item>
                        );
    }

    return (
        <React.Fragment>
            <ReactBootstrap.Carousel activeIndex={index} onSelect={handleSelect}>
                {carouselItems}
            </ReactBootstrap.Carousel>

            <div>
                {props.username} caption: {props.caption}
                {/* <img src={props.img_url} />
                <img src={props.img_url2} /> */}
                posted date: {props.post_date}   
            </div>

            {loggedInUser==props.username ? 
                <button onClick={() => {setPostToDelete(props.post_id), 
                                        setDeleteOrigin(props.deleteOnProfile), 
                                        setShowConfirmDelete(true)}
                                }>Delete Post</button>
                : <div></div>
            }

            {showConfirmDelete ?
                <button onClick={deletePost}>Confirm Delete</button>
                : <div></div>
            }

            <button onClick={() => {setShowCommentBox(true), 
                                    setPostToComment(props.post_id)}
                            }>Comment</button>   

            <Reaction setNewReaction={setNewReaction}
                        newReaction={newReaction}
                        postID={props.post_id}
                        // setUndoReaction={setUndoReaction}
                        loggedInUser={loggedInUser}

                        numberOfLikes={numberOfLikes}
                        setNumberOfLikes={setNumberOfLikes}
                        usersWhoLiked={usersWhoLiked}
                        setUsersWhoLiked={setUsersWhoLiked}

                        numberOfLoves={numberOfLoves}
                        setNumberOfLoves={setNumberOfLoves}
                        usersWhoLoved={usersWhoLoved}
                        setUsersWhoLoved={setUsersWhoLoved}

                        numberOfHaHas={numberOfHaHas}
                        setNumberOfHahas={setNumberOfHahas}
                        usersWhoHaha={usersWhoHaha}
                        setUsersWhoHaha={setUsersWhoHaha}

                        numberOfHugs={numberOfHugs}
                        setNumberOfHugs={setNumberOfHugs}
                        usersWhoHugged={usersWhoHugged}
                        setUsersWhoHugged={setUsersWhoHugged}
                        />

            {showCommentBox ? 
                <div>
                    <input type="text" 
                            key={allComments}
                            placeholder="Add a comment"
                            onChange={(e) => setComment(e.target.value)}>
                    </input>
                    <button type="submit" onClick={addComment}>Save</button>
                </div>
                : <div></div>
            } 
            
            <div id="all-comments">
                {allComments}
            </div>
            
            {numberOfLikes > 0 ?
                <div>
                    <div>Likes</div>
                    {numberOfLikes}
                </div>
            : <div></div>
            }

            {numberOfLoves > 0 ?
                <div>
                    <div>Loves</div>
                    {numberOfLoves}
                </div>
            : <div></div>
            }  

            {numberOfHaHas > 0 ?
                <div>
                    <div>Ha ha!s</div>
                    {numberOfHaHas}
                </div>  
            : <div></div>
            }  

            {numberOfHugs > 0 ?
                <div>
                    <div>Hugs</div>
                    {numberOfHugs}
                </div>
            : <div></div>
            }            
                      
        </React.Fragment>
    )
}
