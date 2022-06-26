const PostsContainer = () => {
    return ( 
        <React.Fragment>
           <NewPost /> 
           <Post />
        </React.Fragment>
    )
}

ReactDOM.render(<PostsContainer />, document.querySelector("#reactPostsContainer"));