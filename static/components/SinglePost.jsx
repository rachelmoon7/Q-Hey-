const SinglePost = (props) => {
    
    return (
        <React.Fragment>
            {props.username}'s caption: {props.caption}
            <img src={props.img_url} />
            <img src={props.img_url2} />
        </React.Fragment>
    )
}