const Reaction = (props) => {
    const [isShown, setIsShown] = React.useState(false);
    //disables button once liked - works
    const [showLike, setShowLike] = React.useState(true);
    const [showUnlike, setShowUnlike] = React.useState(false);
    const [showLove, setShowLove] = React.useState(true);
    const [showHaha, setShowHaha] = React.useState(true);
    const [showHug, setShowHug] = React.useState(true);

    const addReaction = (type) => {
        console.log("REACTION.JSX PROPS", props)

        fetch('/add-reaction', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {'reactionType': type, 'postID': props.postID })
            })
        .then((response) => response.json())
        .then((result) => {
            if (props.newReaction==false) {
                props.setNewReaction(true)
            } else {
                props.setNewReaction(false)
            }
        })
    }
    
    const undoReaction = (type) => {
        console.log("UNLIKE", type)
        fetch('/undo-reaction', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {'reactionType': type, 'postID': props.postID })
            })
        .then((response) => response.json())
        .then((result) => {
            // if (props.undoReaction==false) {
            //     props.setNumberOfLikes(result['like'])
            // }
            props.setNumberOfLikes(result['like']['count']);
            props.setUsersWhoLiked(result['like']['users']);
            // props.setUndoReaction(true);
        })

    }
    console.log("$$$usersWhoLiked", props.usersWhoLiked)
    console.log("__loggedInUsertypeof ", typeof props.loggedInUser)
    console.log("###included yes or no", !props.usersWhoLiked.includes(props.loggedInUser))
    
    return (
        <React.Fragment>
            <div className="reaction">

                <button
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(true)}>
                    React!
                </button>

                {isShown && (
                    <div>
                        {showLike && !props.usersWhoLiked.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), addReaction('Like'), setShowLike(false), setShowUnlike(true)}}>Like</button>
                        : <div></div>
                        }
                        
                        {props.usersWhoLiked.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), undoReaction('Like'), setShowLike(true)}}>Unlike</button>
                        : <div></div>
                        }

                        {/* <button onClick={() => {setIsShown(false), addReaction('Like')}}>Like</button> */}
                        {/* <button onClick={() => {setIsShown(false), addReaction('Love')}}>Love</button>
                        <button onClick={() => {setIsShown(false), addReaction('Ha ha!')}}>Ha ha!</button>
                        <button onClick={() => {setIsShown(false), addReaction('Hug')}}>Hug</button> */}
                    
                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

//line 57 && && props.numberOfLikes == 0