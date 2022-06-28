const MyFriends = () => {
    //friends is a list of [{10:xxxx}, {9:xxxx}]
    
    const [friend, setFriend] = React.useState([]);

    const [img, setImg] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [caption, setCaption] = React.useState([]);


    React.useEffect(() => {
        fetch('/get-friends-posts')
        .then((response) => response.json())
        .then((result) => {
            //set variables 
            //figure out what to send to child component, usersPosts
            setFriend(result)
            //loop over result - child comp for a post
            //1 key val pair in result = 1 friend
            //component for 1 friend
                //child comp of 1 friend comp = 1 post
            //handle varying length by looping over each key in result
            //
        })

    }, []);


    return ( 
        <React.Fragment>
            <div>  </div>
        </React.Fragment>
    );
}

// ReactDOM.render(<Post />, document.querySelector("#reactPost"));

    // React.useEffect(() => {
    //     fetch('/get-friends')
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("POST (REACT) RESULT:", result);
    //         //result is an array of friend objects with fname, lname, user_id, username key val pairs
    //         for (let i = 0; i < result.length; i+=1) {
    //             setFriends((current) => [...current, result[i]['user_id']]);
    //         };
    //         fetch('/get-post', {
    //             method: 'POST',
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ result })
    //         }
    //         )
    //         .then((response) => response.json())
    //         .then((result) => {
    //             console.log("THIS IS RESULT FROM SERVER /get-post:", result);
    //             for (let i = 0; i < result.length; i+=1) {
    //             setCaption((current) => [...current, result[i][0]['caption']]);
    //             };
    //         });

    //     })
    // }, []);
