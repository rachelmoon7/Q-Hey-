const NavBar = () => {

    return (
        
        <ReactBootstrap.Navbar className="justify-content-center"  expand="lg">
            
            <span>
                <ReactBootstrap.Container className="navbar-tabs">
                    <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                        <ReactBootstrap.Nav className="me-auto">
                            <span><ReactBootstrap.Nav.Link href="/landing-page">Home</ReactBootstrap.Nav.Link></span>
                            <span><ReactBootstrap.Nav.Link href="/profile" id="my-profile">My Profile</ReactBootstrap.Nav.Link></span>
                            <ReactBootstrap.Navbar.Brand href="/landing-page"><img id="home-logo" src="/static/images/Logo2.jpeg" />
                            </ReactBootstrap.Navbar.Brand> 
                            <span><ReactBootstrap.Nav.Link href="/myFriends">My Friends</ReactBootstrap.Nav.Link></span> 
                            <span><ReactBootstrap.Nav.Link id="logout" href="/logout">Logout</ReactBootstrap.Nav.Link></span>
                        </ReactBootstrap.Nav>
                    </ReactBootstrap.Navbar.Collapse>
                </ReactBootstrap.Container>
            </span>
        </ReactBootstrap.Navbar>
        )
    }

ReactDOM.render(<NavBar />, document.querySelector('#navBar'))

