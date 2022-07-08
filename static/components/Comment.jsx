const Comment = (props) => {
   const [commentToDelete, setCommentToDelete] = React.useState('');
   const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);
    

    const deleteComment = () => {
        console.log("CALLING DELETECOMMENT FUNCTION IN COMMENT")
        fetch('/delete-comment', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({commentToDelete})
            })
        .then((response) => response.json())
        .then((result) => {
    // console.log("DELETE RESULT:", result)
            setShowConfirmDelete(false)
           
        })
   }

    return (
        <React.Fragment>
            <div class="comment-div-1">
                {props.username} comments: {props.text} on {props.commentDate} 
            </div>

            {props.deleteOption ?
                <button onClick={() => {setCommentToDelete(props.commentID), setShowConfirmDelete(true)}}>Delete</button>
                : <div></div>
            }

            {showConfirmDelete ?
                <button onClick={deleteComment}>Confirm Delete</button>
                : <div></div>
            }
        </React.Fragment>
    )
}