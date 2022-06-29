const LandingContainer = () => {
    return ( 
        <React.Fragment>
           <NewPost /> 
           <MyFriends />
           <SinglePost />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingContainer />, document.querySelector("#reactLandingContainer"));