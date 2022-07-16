const Footer = () => {
    console.log("ASDFAISD")

    return (
        <React.Fragment>
          <div className="footer" >
            <div className="container d-flex justify-content-center py-3">
              <a href="https://www.linkedin.com/in/rachelmoon7/" type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
                <i class="bi bi-linkedin"></i>
              </a>
              <a type="button" className="btn btn-primary btn-lg btn-floating mx-3" >
                <i class="bi bi-youtube"></i>
              </a>
              <a href="https://github.com/rachelmoon7/Q-Hey-" type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
                <i class="bi bi-github"></i>
              </a>
              <button type="button" className="btn btn-primary btn-lg btn-floating mx-2" >
              <i class="bi bi-file-earmark-person"></i>
              </button>
            </div>

            <div className="text-center text-black p-1" >
            © 2022 Copyright: Q & Hey!
            </div>

          </div>
  
        </React.Fragment>
      );
    }
ReactDOM.render(<Footer />, document.querySelector("#footer"));