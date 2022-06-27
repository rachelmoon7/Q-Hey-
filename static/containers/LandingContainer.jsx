const LandingContainer = () => {
    return ( 
        <React.Fragment>
           <NewPost /> 
           <MyFriends />
        </React.Fragment>
    )
}

ReactDOM.render(<LandingContainer />, document.querySelector("#reactLandingContainer"));