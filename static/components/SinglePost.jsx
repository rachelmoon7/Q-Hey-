const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [postToComment, setPostToComment] = React.useState('');
    const [showCommentBox, setShowCommentBox] = React.useState(false);
    const [comment, setComment] = React.useState('');
    
    const [showTrash, setShowTrash] = React.useState(true);
    const [afterDeletedPost, setAfterDeletedPost] = React.useState(false);
    const [deleteOrigin, setDeleteOrigin] = React.useState('');
    const [allComments, setAllComments] = React.useState([]);
    const [afterDeletedComment, setAfterDeletedComment] = React.useState(false);
    
    const [newReaction, setNewReaction] = React.useState(false);
    const [afterUndoReaction, setAfterUndoReaction] = React.useState(false); 

    const [numberOfLikes, setNumberOfLikes] = React.useState(0);
    const [usersWhoLiked, setUsersWhoLiked] = React.useState([]);

    const [numberOfLoves, setNumberOfLoves] = React.useState(0);
    const [usersWhoLoved, setUsersWhoLoved] = React.useState([]);

    const [numberOfHaHas, setNumberOfHahas] = React.useState(0);
    const [usersWhoHaha, setUsersWhoHaha] = React.useState([]);

    const [numberOfHugs, setNumberOfHugs] = React.useState(0);
    const [usersWhoHugged, setUsersWhoHugged] = React.useState([]);

    const [index, setIndex] = React.useState(0);
    const [count, setCount] = React.useState(props.count);

    
    // console.log("**entering singlepost")
    // console.log("!!allComments", allComments)

    React.useEffect(() => {
        console.log('user', count)
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            // console.log("username of this post:", result)
            setLoggedInUser(result)
        })
    }, []);

    // React.useEffect(() => {
    //     gettingAllComments();
    //     // gettingAllReactions();
    // }, [afterDeletedPost])

    React.useEffect(() => {        
        gettingAllComments();        
        // console.log("afterDeletedPost", afterDeletedPost)
    }, [ , afterDeletedComment, props.newPostComments, afterDeletedPost]);

    React.useEffect(() => {
        gettingAllReactions();
        console.log('reactions')
    }, [ , newReaction, afterUndoReaction, props.newPostReactions, afterDeletedPost]);

    //called in useEffect hook 
    const gettingAllComments = () => {
        // console.log("$$$$props.post_id)", props.post_id)
        fetch('/get-all-comments', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.post_id)
        })
        .then((response) => response.json())
        .then((result) => {
            console.log("getallcomments result text:", result)
            //resetting allComments to [] to reset state
            setAllComments([]);
            for (const [each_comment, comment_info] of Object.entries(result)) {
                // console.log("--comment_info", comment_info);
                let d = new Date(comment_info['comment_date']);
                setAllComments(prevState => [...prevState, <div>
                                                                <Comment username={comment_info['username']}
                                                                    commentDate={d.toLocaleDateString()}
                                                                    text={comment_info['text']}
                                                                    deleteOption={comment_info['delete_option']}
                                                                    commentID={comment_info['comment_id']}
                                                                    postID={comment_info['post_id']}
                                                                    setAfterDeletedComment={setAfterDeletedComment}
                                                                    setAllComments={setAllComments}
                                                                    afterDeletedComment={afterDeletedComment}
                                                                />
                                                            </div>])
            }            
        });
    }

    const gettingAllReactions = () => {
        fetch('/get-all-reactions', {
            method: 'POST',
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(props.post_id)
        })
        .then((response) => response.json())
        .then((result) => {
            // console.log("!!gettingallreaction", result)
            setUsersWhoLiked([]);
            setUsersWhoLoved([]);
            setUsersWhoHaha([]);
            setUsersWhoHugged([]);
            
            setNumberOfLikes(result['like']['count']);
            setUsersWhoLiked(result['like']['users']);

            setNumberOfLoves(result['love']['count']);
            setUsersWhoLoved(result['love']['users']);

            setNumberOfHahas(result['haha']['count']);
            setUsersWhoHaha(result['haha']['users']);
            
            setNumberOfHugs(result['hug']['count']);
            setUsersWhoHugged(result['hug']['users']);
        })
    }

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
            setShowConfirmDelete(false);

            if (!props.setAllLandingPosts) {
                    props.setMyProfilePosts(result);
                } else {
                    props.setAllLandingPosts(result)
                }
            
            if (afterDeletedPost===false) {
                setAfterDeletedPost(true);
            } else {
                setAfterDeletedPost(false);
            }

            // if (props.refreshAfterDelete==false) {
            //     props.setRefreshAfterDelete(true)
            // } else {
            //     props.setRefreshAfterDelete(false)
            // }
            // if (props.afterDeletePost==false) {
            //     props.setAfterDeletePost(true)
            // } else {
            //     props.setAfterDeletePost(false)
            // }
        })
        .then(() => {
            gettingAllComments();
            gettingAllReactions();
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
            setAllComments([]);
            let d = new Date(result['comment_date']);
            setAllComments(x => [...x, <div>
                                            <Comment username={result['username']}
                                                    commentDate={d.toLocaleDateString()}
                                                    text={result['text']}
                                                    deleteOption={result['delete_option']}
                                                    commentID={result['comment_id']}
                                                    postID={result['post_id']}
                                                    setAfterDeletedComment={setAfterDeletedComment}
                                                    setAllComments={setAllComments}
                                                    afterDeletedComment={afterDeletedComment}
                                            />
                                        </div>]);
            setComment('');
            setShowCommentBox(false);
        })
        .then(() => {
            gettingAllComments();
        })
    }

    //allows users to click through carousel of images rather than auto-slide
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
        };

    //initialize empty array to push carousel of img's into since there may be one or two img's
    const carouselItems = [];
        
    carouselItems.push(<ReactBootstrap.Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={props.img_url} 
                                alt="No image"
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
            <div className="card">
                <ReactBootstrap.Card className="text-center">
                    <ReactBootstrap.Card.Header>
                        <span id="username">{props.username}</span>
                    </ReactBootstrap.Card.Header>
                    <ReactBootstrap.Card.Body>
                        <ReactBootstrap.Stack direction="horizontal" gap={3}>
                            <div className="bg-light border"> 
                                <ReactBootstrap.Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                                    {carouselItems}
                                </ReactBootstrap.Carousel></div>
                            <div className="bg-light border">
                                <div id="all-comments">
                                    {allComments}
                                </div>
                            </div>
                        </ReactBootstrap.Stack>

                        <ReactBootstrap.Stack direction="horizontal" gap={3}>
                            <div className="bg-light border">
                                <div className="caption-and-date">
                                    {props.caption ?
                                        <span id="caption">"{props.caption}"</span>
                                    : <span>{props.username}</span>
                                    }

                                    <div id="post-date"></div>   
                                </div>
                            </div>
                        </ReactBootstrap.Stack>

                        <button className="comment"
                                onClick={() => {setShowCommentBox(true), 
                                                setPostToComment(props.post_id)}
                                        }>
                            <span >
                                <i className="bi bi-chat-dots"></i>
                            </span>
                        </button>
                        {/* space between chat and react button */}
                        <span>     </span>

                        {showCommentBox ? 
                            <div>
                                <input type="text" 
                                        key={allComments}
                                        placeholder="Add a comment"
                                        onChange={(e) => setComment(e.target.value)}>
                                </input>
                                <button id="submit-comment" type="submit" onClick={addComment}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-plus" viewBox="0 0 16 16">
                                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855a.75.75 0 0 0-.124 1.329l4.995 3.178 1.531 2.406a.5.5 0 0 0 .844-.536L6.637 10.07l7.494-7.494-1.895 4.738a.5.5 0 1 0 .928.372l2.8-7Zm-2.54 1.183L5.93 9.363 1.591 6.602l11.833-4.733Z"/>
                                    <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-3.5-2a.5.5 0 0 0-.5.5v1h-1a.5.5 0 0 0 0 1h1v1a.5.5 0 0 0 1 0v-1h1a.5.5 0 0 0 0-1h-1v-1a.5.5 0 0 0-.5-.5Z"/>
                                    </svg>
                                </button>
                            </div>
                        : <span></span>
                        } 

                        <Reaction setNewReaction={setNewReaction}
                                    newReaction={newReaction}
                                    afterUndoReaction={afterUndoReaction}
                                    setAfterUndoReaction={setAfterUndoReaction}
                                    postID={props.post_id}
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
                        
                        <div className="reaction-count">
                            {numberOfLikes > 0 ?
                                <span>
                                    <span><i className="bi bi-hand-thumbs-up"></i>: {numberOfLikes}</span>
                                    <span> | </span>
                                </span>
                            : <span></span>
                            }
                            
                            {numberOfLoves > 0 ?
                                <span>
                                    <span><i className="bi bi-suit-heart"></i>: {numberOfLoves}</span>
                                    <span> | </span>
                                </span>
                            : <span></span>
                            }  

                            {numberOfHaHas > 0 ?
                                <span>
                                    <span><i className="bi bi-emoji-laughing"></i>: {numberOfHaHas}</span>
                                    <span> | </span>
                                </span>  
                            : <span></span>
                            }  

                            {numberOfHugs > 0 ?
                                <span>
                                    <span><i className="bi bi-emoji-angry"></i>: {numberOfHugs}</span>
                                    <span> | </span>
                                </span>
                            : <span></span>
                            } 
                        </div>         
                    </ReactBootstrap.Card.Body>
                    
                    <ReactBootstrap.Card.Footer className="text-muted">
                        <span>posted date: {props.post_date}</span>

                        {loggedInUser==props.username && showTrash ? 
                            <button onClick={() => {setPostToDelete(props.post_id), 
                                                    setDeleteOrigin(props.deleteOnProfile), 
                                                    setShowConfirmDelete(true),
                                                    setShowTrash(false)}
                                            }
                                            className="trash" id="trash-post"><i className="bi bi-trash"></i></button>
                        : <span></span>
                        }

                        {showConfirmDelete ?
                            <button className="trash" id="trash-post" onClick={deletePost}>Confirm <i className="bi bi-trash-fill"></i></button>
                        : <span></span>
                        }  
                    </ReactBootstrap.Card.Footer>
                    
                </ReactBootstrap.Card>
            </div>  
        </React.Fragment>
    )
}
