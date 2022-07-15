const NavBar = () => {

    return (
        
        <ReactBootstrap.Navbar className="justify-content-center" fixed="top" expand="lg">
            
            <span>
                <ReactBootstrap.Container className="navbar-tabs">
                    <ReactBootstrap.Navbar.Brand href="/landing-page"><img id="home-logo" src="/static/images/Logo2.png" />
                    </ReactBootstrap.Navbar.Brand>
                    
                    <ReactBootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <ReactBootstrap.Navbar.Collapse id="basic-navbar-nav">
                        <ReactBootstrap.Nav className="me-auto">
                            <ReactBootstrap.Nav.Link href="/profile" id="my-profile">My Profile</ReactBootstrap.Nav.Link>
                            <ReactBootstrap.Nav.Link href="/myFriends">My Friends</ReactBootstrap.Nav.Link>
                            <ReactBootstrap.Nav.Link href="/logout">Logout</ReactBootstrap.Nav.Link>
                        </ReactBootstrap.Nav>
                    </ReactBootstrap.Navbar.Collapse>
                </ReactBootstrap.Container>
            </span>
        </ReactBootstrap.Navbar>
        )
    }

ReactDOM.render(<NavBar />, document.querySelector('#navBar'))

