const SinglePost = (props) => {
    
    return (
        <React.Fragment>
            <div>
            {props.username} caption: {props.caption}
            <img src={props.img_url} />
            <img src={props.img_url2} />
            </div>
        </React.Fragment>
    )
}