function App() {
    // const[post, setPost] = React.useState({});

    // React.useEffect(() => {
    //     fetch('')
    // })
    return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar brand="Q and Hey" />
      <div className="container-fluid">
        <ReactRouterDOM.Route exact path="/profile">
          <Profile />
        </ReactRouterDOM.Route>
        
        
      </div>
    </ReactRouterDOM.BrowserRouter>
    )
}
ReactDOM.render(<App />, document.querySelector('#app'));
