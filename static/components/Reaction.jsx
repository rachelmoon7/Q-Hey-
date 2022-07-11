const Reaction = (props) => {
    const [isShown, setIsShown] = React.useState(false);
    //disables button once liked - works
    const [showLike, setShowLike] = React.useState(true);
    const [showUnlike, setShowUnlike] = React.useState(false);
    const [showLove, setShowLove] = React.useState(true);
    const [showUnlove, setShowUnlove] = React.useState(false);
    const [showHaha, setShowHaha] = React.useState(true);
    const [showUnhaha, setShowUnhaha] = React.useState(false);
    const [showHug, setShowHug] = React.useState(true);
    const [showUnhug, setShowUnhug] = React.useState(false);

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
            props.setNumberOfLikes(result['like']['count']);
            props.setUsersWhoLiked(result['like']['users']);

            props.setNumberOfLoves(result['love']['count']);
            props.setUsersWhoLoved(result['love']['users'])

            props.setNumberOfHahas(result['haha']['count']);
            props.setUsersWhoHaha(result['haha']['users']);

            props.setNumberOfHugs(result['hug']['count']);
            props.setUsersWhoHugged(result['hug']['users']);
        })

    }
    // console.log("$$$usersWhoLiked", props.usersWhoLiked)
    // console.log("__loggedInUsertypeof ", typeof props.loggedInUser)
    // console.log("###included yes or no", !props.usersWhoLiked.includes(props.loggedInUser))
    // console.log("!!!props.usersWhoHugged", props.usersWhoHugged)
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
                      
                        {showLove && !props.usersWhoLoved.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), addReaction('Love'), setShowLove(false), setShowUnlove(true)}}>Love</button>
                        : <div></div>
                        }
                        
                        {props.usersWhoLoved.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), undoReaction('Love'), setShowLove(true)}}>Unlove</button>
                        : <div></div>
                        }
                        
                        {showHaha && !props.usersWhoHaha.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), addReaction('Ha ha!'), setShowHaha(false), setShowUnhaha(true)}}>Ha ha!</button>
                        : <div></div>
                        }
                        
                        {props.usersWhoHaha.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), undoReaction('Ha ha!'), setShowHaha(true)}}>Un-haha</button>
                        : <div></div>
                        }

                        {showHug && !props.usersWhoHugged.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), addReaction('Hug'), setShowHug(false), setShowUnhug(true)}}>Hug</button> 
                        : <div></div>
                        }
                        
                        {props.usersWhoHugged.includes(props.loggedInUser) ?
                            <button onClick={() => {setIsShown(false), undoReaction('Hug'), setShowHug(true)}}>Un-hug</button>
                        : <div></div>
                        }

                    </div>
                )}
            </div>
        </React.Fragment>
    )
}

