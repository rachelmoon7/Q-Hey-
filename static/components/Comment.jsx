const Comment = (props) => {
    // const [comment, setComment] = React.useState('');
    console.log("comment props", props)
    
    React.useEffect(() => {
        console.log("ENTERING COMMENTS COMPONENT")
    }, [])

   
    return (
        <React.Fragment>
            comments: {props.text} on {props.comment_date}
        </React.Fragment>
    )
}