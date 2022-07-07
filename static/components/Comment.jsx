const Comment = (props) => {
    // const [comment, setComment] = React.useState('');
    console.log("comment props", props);
    console.log("ENTERING COMMENTS COMPONENT");
    
    // React.useEffect(() => {
    //     console.log("ENTERING COMMENTS COMPONENT")
    // }, [])

   
    return (
        <div class="comment-div-1">
            {props.username} comments: {props.text} on {props.comment_date}
        </div>
    )
}