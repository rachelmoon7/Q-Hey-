const Comment = (props) => {
    const [commentToDelete, setCommentToDelete] = React.useState('');
    const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

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
            //changing state from props for React.useEffect, which is listening to this state in SinglePost
            if (props.afterDeletedComment == false) {
                props.setAfterDeletedComment(true);
            } else {
                props.setAfterDeletedComment(false);
            }
        })
    }


    return (
        <React.Fragment>
            <div className="comment-div-1">
                {props.username} comments: {props.text} on {props.commentDate} 
            </div>

            {props.deleteOption ?
                <button onClick={() => {setCommentToDelete(props.commentID), setShowConfirmDelete(true)}}>Delete Comment</button>
                : <div></div>
            }

            {showConfirmDelete ?
                <button onClick={deleteComment}>Confirm Delete</button>
                : <div></div>
            }
        </React.Fragment>
    )
}