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
            let d = new Date(result['comment_date']);
            setAllComments(prevState => [...prevState, <Comment username={result['username']}
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
            <div class="single-post">
                {/* <ReactBootstrap.Container className="mx-auto">
                    <ReactBootstrap.Row>
                        <ReactBootstrap.Col>
                            <ReactBootstrap.Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                                {carouselItems}
                            </ReactBootstrap.Carousel>
                        </ReactBootstrap.Col>
                        <ReactBootstrap.Col class="right-column">
                            <div id="all-comments">
                                {allComments}
                            </div>
                        </ReactBootstrap.Col>
                    </ReactBootstrap.Row>
                </ReactBootstrap.Container> */}
                <ReactBootstrap.Stack direction="horizontal" gap={3}>
                <div className="bg-light border"> <ReactBootstrap.Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
                                {carouselItems}
                            </ReactBootstrap.Carousel></div>
                <div className="bg-light border"><div id="all-comments">
                                {allComments}
                            </div></div>
                </ReactBootstrap.Stack>
                
                <div class="caption-and-date">
                    {props.caption ?
                        <span id="caption">{props.username} "{props.caption}"</span>
                    : <span>props.username </span>
                    }
                    <div id="post-date"><span>posted date: {props.post_date}</span></div>   
                </div>

                <button class="comment"
                        onClick={() => {setShowCommentBox(true), 
                                        setPostToComment(props.post_id)}
                                }>
                    <span  >
                        <i class="bi bi-chat-dots">
                        </i>
                    </span>
                </button>

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

                
                    <div class="reaction-count">
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
                    : <div></div>
                    }

                    {showConfirmDelete ?
                        <button class="trash" onClick={deletePost}>Confirm <i class="bi bi-trash-fill"></i></button>
                    : <div></div>
                    }           
            </div>  
        </React.Fragment>
    )
}
