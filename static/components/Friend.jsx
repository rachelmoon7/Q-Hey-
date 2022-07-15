const Friend = (props) => {
    const [friendPosts, setFriendPosts] = React.useState([]);

    //showFriendsPosts passes in info from props as props to FriendPosts
    const showFriendsPosts = () => { 
            setFriendPosts(<FriendPosts user_id={props.user_id}
                                    fname={props.fname}
                                    lname={props.lname}
                                    setFriendPosts={setFriendPosts} />)
    }

    //deleteFriend sends post fetch request with user_id of friend to delete
    const deleteFriend = () => {
        // console.log("CALLIGN DELETEFRIEND FCN")
        fetch('/delete-friend', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( props.user_id )
            })
        //then passes in boolean to props' set function to change the state to re-render 
        .then(() => {
           props.setAfterFriendDeleted(true)
        })
    }

    return (
        <React.Fragment>
            <div>
                <span>
                <a class="friend-name" onClick={showFriendsPosts} >{props.fname} {props.lname}</a>
                </span>
                <span>
                <button class="trash" onClick={deleteFriend}><i className="bi bi-person-x-fill"></i></button>
                </span>
            </div>

            {friendPosts}
            
        </React.Fragment>
    )
}