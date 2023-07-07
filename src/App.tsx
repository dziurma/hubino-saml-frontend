import React, { useState } from 'react';
import SBLogo from './assets/img/spring-boot-saml.png'
import './App.css';

const App = () => {
  const [isLoading, setLoading] = useState(false);
  const [discovery, setDiscovery] = useState({
    idps: '',
    message: '',
    redirect: ''
  });

  const idpDiscoReturnURL = "http://localhost:8080/saml/login?disco=true";
  const idpDiscoReturnParam = "idp";

  const handleDiscover = async () => {
    setLoading(true);

    fetch("http://localhost:8080/saml/discovery?entityID=dummybot-saml&returnIDParam=idp")
      .then(data => data.json()).then(value => {
        setDiscovery(value);
      }).finally(() => {
        setLoading(false);
      })
  }

  return (
    <div role="main" className="container">
      <header className="d-flex align-items-center p-3 my-3 text-white-50 bg-success rounded box-shadow">
        <img className="mr-3" src={SBLogo} alt="" height="48" />
        <div className="ms-3 lh-100">
          <h6 className="mb-0 text-white lh-100">Spring Boot &mdash; SAML 2.0 Service Provider</h6>
        </div>
      </header>
      <section className="my-3 p-3 bg-white rounded box-shadow">
        {discovery.message === "DISCOVERY_SUCCESS"
          ?
          <form action={idpDiscoReturnURL} method="get">
            <fieldset className="form-group">
              <div className="form-check">
                <label className="form-check-label">
                  <input type="radio" className="form-check-input form-success" name={idpDiscoReturnParam} id={'idp_' + discovery.idps} value={discovery.idps} />
                  <span className="text-success fw-bold">Azure IDP</span>
                </label>
              </div>
            </fieldset>

            <small className="d-block text-right mt-3" id="sso-btn">
              <button type="submit" className="btn btn-success">
                <i className="fas fa-handshake"></i> Start 3rd Party Login
              </button>
            </small>
          </form>
          :
          <div>
            <h6 className="border-bottom border-gray pb-2 mb-0">The authentication flow, step by step:</h6>
            <small className="d-block text-right mt-3" id="sso-btn">
              <button type='button' className="btn btn-success" onClick={handleDiscover}>
                {isLoading ?
                  <div className="spinner-border spinner-border-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div> :
                  <><i className="fas fa-rocket"></i> Get started</>
                }
              </button>
            </small>
          </div>
        }
      </section>
    </div >
  );
}

export default App;
