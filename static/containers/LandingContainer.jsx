const LandingContainer = () => {
    return ( 
        <React.Fragment>
           <NewPost /> 
           <MyFriends />
           <MyProfile />
           <SinglePost />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingContainer />, document.querySelector("#reactLandingContainer"));