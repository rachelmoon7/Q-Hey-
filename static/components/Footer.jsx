const Footer = () => {
    console.log("ASDFAISD")
    return (
        <React.Fragment>
            <div>hello</div>
        <ReactBootstrap.CDBFooter className="shadow">
          <ReactBootstrap.CDBBox
            display="flex"
            justifyContent="between"
            alignItems="center"
            className="mx-auto py-4 flex-wrap"
            style={{ width: '80%' }}
          >
            <ReactBootstrap.CDBBox display="flex" alignItems="center">
              <a href="/" className="d-flex align-items-center p-0 text-dark">
                <img
                  alt="logo"
                  src="/static/images/Logo2.png"
                  width="30px"
                />
                <span className="ml-4 h5 mb-0 font-weight-bold">Q & Hey</span>
              </a>
              <small className="ml-2">&copy; Q & Hey, 2022. All rights reserved.</small>
            </ReactBootstrap.CDBBox>
            <ReactBootstrap.CDBBox display="flex">
              <ReactBootstrap.CDBBtn flat color="dark" className="p-2">
                <ReactBootstrap.CDBIcon fab icon="facebook-f" />
              </ReactBootstrap.CDBBtn>
              <ReactBootstrap.CDBBtn flat color="dark" className="mx-3 p-2">
                <ReactBootstrap.CDBIcon fab icon="twitter" />
              </ReactBootstrap.CDBBtn>
              <ReactBootstrap.CDBBtn flat color="dark" className="p-2">
                <ReactBootstrap.CDBIcon fab icon="instagram" />
              </ReactBootstrap.CDBBtn>
            </ReactBootstrap.CDBBox>
          </ReactBootstrap.CDBBox>
        </ReactBootstrap.CDBFooter>
        </React.Fragment>
      );
    };
    ReactDOM.render(<Footer />, document.querySelector("#footer"));