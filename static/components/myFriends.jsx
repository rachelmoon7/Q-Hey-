const MyFriends = () => {
    //friends is a list of [{10:xxxx}, {9:xxxx}]
    
    const [friendsPosts, setFriendsPosts] = React.useState({});

    const [img, setImg] = React.useState('');
    const [img2, setImg2] = React.useState('');
    const [caption, setCaption] = React.useState([]);


    React.useEffect(() => {
        fetch('/get-friends-posts')
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })

    }, []);

    // const allPosts = []
    // for (const posts in friendsPosts) {
    //     allPosts.push(<SinglePost props/>)
    // }
    return ( 
        <React.Fragment>
            <div>
                {}
            </div>
        </React.Fragment>
    );
}

