const Comment = (props) => {
    const [commentToDelete, setCommentToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    const [showTrash, setShowTrash] = React.useState(true);

    //deleteComment sends post fetch request to /delete-comment with comment's id to delete from db
    const deleteComment = () => {
        // console.log("COMMENTS PROPS", props)
        fetch('/delete-comment', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( commentToDelete )
            })
        //setting state variables to rerender state for user's experience
        .then(() => {
            // console.log("DELETE RESULT:", result)
            setShowConfirmDelete(false);
            //changing state from props for React.useEffect, which is listening to this state in SinglePost for potential consecutive deleting comments
            if (props.afterDeletedComment == false) {
                props.setAfterDeletedComment(true);
            } else {
                props.setAfterDeletedComment(false);
            }
        })
    }


    return (
        <React.Fragment>
            <span className="comment-div-1">
                {props.username} comments: "{props.text}" on {props.commentDate} 
            </span>
            
            {props.deleteOption && showTrash?
                <span>
                    <button className="trash" 
                            onClick={() => {setCommentToDelete(props.commentID),
                                            setShowConfirmDelete(true),
                                            setShowTrash(false);
                                            }}>
                        <i class="bi bi-dash"></i>
                    </button>
                </span>
                : <span></span>
            }

            {showConfirmDelete ?
                <span>
                    <button className="trash" onClick={deleteComment}>
                        Confirm <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                        </svg>
                    </button>
                </span>
                : <span></span>
            }
        </React.Fragment>
    )
}