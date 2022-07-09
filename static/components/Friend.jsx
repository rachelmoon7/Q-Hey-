const Friend = (props) => {


    console.log("FRIEND PROPS", props)

    return (
        <React.Fragment>
            <button>{props.user_id}</button>
        </React.Fragment>
    )
}