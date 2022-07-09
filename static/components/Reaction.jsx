const Reaction = (props) => {
    const [isShown, setIsShown] = React.useState(false);
    const [reactionType, setReactionType] = React.useState('');
    
    const addReaction = (type) => {
        console.log("REACTION.JSX PROPS", props)

        fetch('/add-reaction', {
            method:'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify( {'reactionType': type, 'postID': props.postID })
            })
        .then((response) => response.json())
        .then((result) => {
        })
    }


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
                    <button onClick={() => {setIsShown(false), addReaction('Like')}}>Like</button>
                    <button onClick={() => {setIsShown(false), addReaction('Love')}}>Love</button>
                    <button onClick={() => {setIsShown(false), addReaction('Ha ha!'), setReactionType('Ha ha!')}}>Ha ha!</button>
                    <button onClick={() => {setIsShown(false), addReaction('Hug'), setReactionType('Hug')}}>Hug</button>
                </div>
                )}
                </div>
        </React.Fragment>
    )
}

//