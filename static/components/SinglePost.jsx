const SinglePost = (props) => {
    const [loggedInUser, setLoggedInUser] = React.useState(false);
    
    const [postToDelete, setPostToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [postToComment, setPostToComment] = React.useState('');
    const [showCommentBox, setShowCommentBox] = React.useState(false);
    const [comment, setComment] = React.useState('');
    
    const [afterDeletedPost, setAfterDeletedPost] = React.useState(false);
    const [deleteOrigin, setDeleteOrigin] = React.useState('');
    const [allComments, setAllComments] = React.useState([]);
    const [afterNewComment, setAfterNewComment] = React.useState(false); 
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

    
    // console.log("**entering singlepost")
    // console.log("!!allComments", allComments)

    React.useEffect(() => {
        fetch('/get-logged-in-user')
        .then((response) => response.json())
        .then((result) => {
            // console.log("username of this post:", result)
            setLoggedInUser(result)
        })
    }, []);

    const gettingAllComments = () => {
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
                let d = new Date(comment_info['comment_date']);
                setAllComments(prevState => [...prevState, <Comment username={comment_info['username']}
                                                                    commentDate={d.toLocaleDateString()}
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
    }

    const gettingAllReactions = () => {
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
    }

    React.useEffect(() => {
        // console.log("get all comments")
        gettingAllComments();
    }, [ , afterDeletedComment, props.newPostComments, afterDeletedPost]);
    // React.useEffect(() => {
    //     // console.log("get all comments")
    //     fetch('/get-all-comments', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json"},
    //         body: JSON.stringify(props.post_id)
    //     })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("getallcomments result text:", result)
    //         // console.log("typeof passing in:", typeof result[0]['comment_date'])
    //         // console.log("typeof passing this too:", typeof result[0]['text'])
    //         setAllComments([]);
    //         for (const [each_comment, comment_info] of Object.entries(result)) {
    //             // console.log("--comment_info", comment_info);
    //             let d = new Date(comment_info['comment_date']);
    //             setAllComments(prevState => [...prevState, <Comment username={comment_info['username']}
    //                                                                 commentDate={d.toLocaleDateString()}
    //                                                                 text={comment_info['text']}
    //                                                                 deleteOption={comment_info['delete_option']}
    //                                                                 commentID={comment_info['comment_id']}
    //                                                                 postID={comment_info['post_id']}
    //                                                                 setAfterDeletedComment={setAfterDeletedComment}
    //                                                                 setAllComments={setAllComments}
    //                                                                 afterDeletedComment={afterDeletedComment}
    //                                                         />])
    //         }
    //     })
    // }, [ , afterDeletedComment, afterNewComment, props.newPostComments, afterDeletedPost]);

    React.useEffect(() => {
        gettingAllReactions();
        // console.log("get all reactions")

        // fetch('/get-all-reactions', {
        //     method: 'POST',
        //     headers: { "Content-Type": "application/json"},
        //     body: JSON.stringify(props.post_id)
        // })
        // .then((response) => response.json())
        // .then((result) => {
        //     setUsersWhoLiked([]);
        //     setUsersWhoLoved([]);
        //     setUsersWhoHaha([]);
        //     setUsersWhoHugged([]);
        //     // console.log("???getall-reactions result", result)
            
        //     setNumberOfLikes(result['like']['count']);
        //     setUsersWhoLiked(result['like']['users']);

        //     setNumberOfLoves(result['love']['count']);
        //     setUsersWhoLoved(result['love']['users']);

        //     setNumberOfHahas(result['haha']['count']);
        //     setUsersWhoHaha(result['haha']['users']);
            
        //     setNumberOfHugs(result['hug']['count']);
        //     setUsersWhoHugged(result['hug']['users']);
        // })
    }, [ , newReaction, afterUndoReaction, props.newPostReactions, afterDeletedPost]);


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
            // console.log("addcomment result to siinglepost", result)
            let d = new Date(result['comment_date']);
            setAllComments(x => [...x, <Comment username={result['username']}
                                                                commentDate={d.toLocaleDateString()}
                                                                text={result['text']}
                                                                deleteOption={result['delete_option']}
                                                                commentID={result['comment_id']}
                                                                postID={result['post_id']}
                                                                setAfterDeletedComment={setAfterDeletedComment}
                                                                setAllComments={setAllComments}
                                                                afterDeletedComment={afterDeletedComment}
                                                        />]);
            setComment('');
            setShowCommentBox(false);

        })
        .then(() => {
            gettingAllComments();
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
            <div className="card">
                <ReactBootstrap.Card className="text-center">
                    <ReactBootstrap.Card.Header>
                        <span id="username">{props.username}</span>
                    </ReactBootstrap.Card.Header>
                    <ReactBootstrap.Card.Body>
                        <ReactBootstrap.Stack direction="horizontal" gap={3}>
                            <div className="bg-light border"> <ReactBootstrap.Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                                            {carouselItems}
                                        </ReactBootstrap.Carousel></div>
                            <div className="bg-light border"><div id="all-comments">
                                            {allComments}
                                        </div></div>
                        </ReactBootstrap.Stack>

                        <ReactBootstrap.Stack direction="horizontal" gap={3}>
                            <div className="bg-light border">
                                <div class="caption-and-date">
                                    {props.caption ?
                                        <span id="caption">"{props.caption}"</span>
                                    : <span>{props.username}</span>
                                    }
                                    <div id="post-date"></div>   
                                </div>
                            </div>
                        </ReactBootstrap.Stack>

                        <button class="comment"
                                onClick={() => {setShowCommentBox(true), 
                                                setPostToComment(props.post_id)}
                                        }>
                            <span  >
                                <i class="bi bi-chat-dots">
                                </i>
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
                                    <span><i class="bi bi-hand-thumbs-up"></i>: {numberOfLikes}   </span>
                                </span>
                            : <span></span>
                            }

                            {numberOfLoves > 0 ?
                                <span>
                                    <span><i class="bi bi-suit-heart"></i>: {numberOfLoves}   </span>
                                </span>
                            : <span></span>
                            }  

                            {numberOfHaHas > 0 ?
                                <span>
                                    <span><i class="bi bi-emoji-laughing"></i>: {numberOfHaHas}   </span>
                                </span>  
                            : <span></span>
                            }  

                            {numberOfHugs > 0 ?
                                <span>
                                    <span><i class="bi bi-emoji-angry"></i>: {numberOfHugs}   </span>
                                </span>
                            : <span></span>
                            } 
                        </div>

                        {loggedInUser==props.username ? 
                            <button onClick={() => {setPostToDelete(props.post_id), 
                                                    setDeleteOrigin(props.deleteOnProfile), 
                                                    setShowConfirmDelete(true)}
                                            }
                                            class="trash"><i class="bi bi-trash"></i></button>
                        : <span></span>
                        }

                        {showConfirmDelete ?
                            <button class="trash" onClick={deletePost}>Confirm <i class="bi bi-trash-fill"></i></button>
                        : <span></span>
                        }           
                    </ReactBootstrap.Card.Body>
                    
                    <ReactBootstrap.Card.Footer className="text-muted">
                        <span>posted date: {props.post_date}</span>
                    </ReactBootstrap.Card.Footer>
                </ReactBootstrap.Card>
            </div>  
        </React.Fragment>
    )
}
