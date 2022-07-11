const Friend = (props) => {
    // const [friendID, setFriendID] = React.useState('');
    const [friendPosts, setFriendPosts] = React.useState([]);

    // console.log("FRIEND props.user_id", props.user_id)

    const showFriendsPosts = () => {
     
        setFriendPosts(<FriendPosts user_id={props.user_id}
                                    fname={props.fname}
                                    lname={props.lname}
                                    setFriendPosts={setFriendPosts} />)
       
    }

    return (
        <React.Fragment>
            <li>
                <a onClick={showFriendsPosts} >{props.fname} {props.lname}</a>
            </li>

            {friendPosts}
        </React.Fragment>
    )
}