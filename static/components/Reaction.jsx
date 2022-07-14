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

                <button
                    onMouseEnter={() => setIsShown(true)}
                    onMouseLeave={() => setIsShown(true)}>
                    React!
                </button>

                {isShown && (
                    <div className="reactions">
                        
                        {showLike && !props.usersWhoLiked.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), addReaction('Like'), setShowLike(false), setShowUnlike(true)}}><i class="bi bi-hand-thumbs-up"></i></button>
                        : <div className="reactions"></div>
                        }
                        
                        {props.usersWhoLiked.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), undoReaction('Like'), setShowLike(true)}}><i class="bi bi-hand-thumbs-up-fill"></i></button>
                        : <div className="reactions"></div>
                        }
                      
                        {showLove && !props.usersWhoLoved.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), addReaction('Love'), setShowLove(false), setShowUnlove(true)}}><i class="bi bi-suit-heart"></i></button>
                        : <div className="reactions"></div>
                        }
                        
                        {props.usersWhoLoved.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), undoReaction('Love'), setShowLove(true)}}><i class="bi bi-suit-heart-fill"></i></button>
                        : <div className="reactions"></div>
                        }
                        
                        {showHaha && !props.usersWhoHaha.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), addReaction('Ha ha!'), setShowHaha(false), setShowUnhaha(true)}}><i class="bi bi-emoji-laughing"></i></button>
                        : <div className="reactions"></div>
                        }
                        
                        {props.usersWhoHaha.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), undoReaction('Ha ha!'), setShowHaha(true)}}><i class="bi bi-emoji-laughing-fill"></i></button>
                        : <div className="reactions"></div>
                        }

                        {showHug && !props.usersWhoHugged.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), addReaction('Hug'), setShowHug(false), setShowUnhug(true)}}><i class="bi bi-emoji-angry"></i></button> 
                        : <div className="reactions"></div>
                        }
                        
                        {props.usersWhoHugged.includes(props.loggedInUser) ?
                            <button className="reactions" onClick={() => {setIsShown(false), undoReaction('Hug'), setShowHug(true)}}><i class="bi bi-emoji-angry-fill"></i></button>
                        : <div className="reactions"></div>
                        }

                    </div>
                )}
            
        </React.Fragment>
    )
}

