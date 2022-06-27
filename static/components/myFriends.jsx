const MyFriends = () => {
    const [friends, setFriends] = React.useState([]);

    const [img, setImg] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [caption, setCaption] = React.useState('');

    React.useEffect(() => {
        fetch('/get-friends')
        .then((response) => response.json())
        .then((result) => {
            console.log("POST (REACT) RESULT:", result);
            for (let i = 0; i < result.length; i+=1) {
                setFriends((current) => [...current, result[i]['user_id']]);
            };
            fetch('/get-post', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ result })
            }
            )
            .then((response) => response.json())
            .then((result) => {
                console.log("POST (REACT) RESULT:", result);
                
            });

        })
        // .then(() => {
        //     fetch('/get-post', {
        //         method: 'POST',
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({ result })
        //     }
        //     )
        //     .then((response) => response.json())
        //     .then((result) => {
        //         console.log("POST (REACT) RESULT:", result);
                
        //     });
        // })
    }, []);
    const showFriends = () => {
        console.log("FRIENDS SET TO:", friends)
    }

    // React.useEffect(() => {
    //     //post fetch request !!(add friends to send to)
    //     fetch('/get-post', {
    //         method: 'POST',
    //         headers: { "Content-Type": "application/json" },
    //         body: JSON.stringify({ friends })
    //     })
    //     .then((response) => response.json())
    //     .then((result) => {
    //         console.log("POST (REACT) RESULT:", result);
            
    //     });
    // }, []);


    return ( 
        <React.Fragment>
            <div> {friends} </div>
            <button onClick= {showFriends}>Submit</button>
        </React.Fragment>
    );
}

// ReactDOM.render(<Post />, document.querySelector("#reactPost"));