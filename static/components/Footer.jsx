const Footer = () => {
    console.log("ASDFAISD")

    return (
        <React.Fragment>
         
          <div className="text-center" >
            <div className="container d-flex justify-content-center py-5">
              <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
                <i class="bi bi-linkedin"></i>
              </button>
              <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
                <i class="bi bi-youtube"></i>
              </button>
              <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
                <i class="bi bi-github"></i>
              </button>
              <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
              <i class="bi bi-file-earmark-person"></i>
              </button>
            </div>

            <div className="text-center text-white p-3" >
              © 2022 Copyright:
              <a className="text-white" href="https://mdbootstrap.com/">Q & Hey!</a>
            </div>

          </div>
  
        </React.Fragment>
      );
    }
ReactDOM.render(<Footer />, document.querySelector("#footer"));