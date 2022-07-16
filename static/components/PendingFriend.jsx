const PendingFriend = (props) => {

    return (
        <React.Fragment>
            <div className="pending-friend">
                {props.fname} {props.lname}
            </div>
        </React.Fragment>
    )
}