const MyFriends = () => {
    //friends is a list of user's friendss user_ids:
    const [friends, setFriends] = React.useState([]);

    const [img, setImg] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [caption, setCaption] = React.useState([]);

    React.useEffect(() => {
        fetch('/get-friends')
        .then((response) => response.json())
        .then((result) => {
            // console.log("POST (REACT) RESULT:", result);
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
                // console.log("THIS IS RESULT FROM SERVER /get-post:", result);
                for (let i = 0; i < result.length; i+=1) {
                setCaption((current) => [...current, result[i][0]['caption']]);
                };
            });

        })
    }, []);



    return ( 
        <React.Fragment>
            <div> {caption} </div>
        </React.Fragment>
    );
}

// ReactDOM.render(<Post />, document.querySelector("#reactPost"));