const UsersPosts = (props) => {
    const name = props.name;
    const user_id = props.user_id;
    const user_caption = props.caption;
    const user_img = props.img;
    const user_img2 = props.img2;
    const user_post_date = props.post_date;

    // const [img, setImg] = React.useState('');
    // const [img2, setImg2] = React.useState('');
    // const [caption, setCaption] = React.useState('');

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
            {name} posted {img} {user_caption} on {user_post_date}
        </React.Fragment>
    )
}