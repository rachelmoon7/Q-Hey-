const Friend = (props) => {
    const [friendPosts, setFriendPosts] = React.useState([]);

    // console.log("FRIEND props.user_id", props.user_id)

    const showFriendsPosts = () => {
     
        setFriendPosts(<FriendPosts user_id={props.user_id}
                                    fname={props.fname}
                                    lname={props.lname}
                                    setFriendPosts={setFriendPosts} />)
    }

    const deleteFriend = () => {
        fetch('/delete-friend', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( props.user_id )
            })
        // .then((response) => response.json())
        .then((result) => {
           props.setAfterFriendDeleted(true)
        })
    }

    return (
        <React.Fragment>
            <li>
                <a onClick={showFriendsPosts} >{props.fname} {props.lname}</a>
                <button onClick={deleteFriend}>Delete</button>
            </li>

            {friendPosts}
            
        </React.Fragment>
    )
}