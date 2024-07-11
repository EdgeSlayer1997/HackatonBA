import React, { useState } from 'react';

function Home() {
  
  

  // Estado para controlar la apertura/cierre del panel lateral
  const [sidePanelOpen, setSidePanelOpen] = useState(false);

  // Función para abrir el panel lateral
  const openNav = () => {
    setSidePanelOpen(true);
  };

  // Función para cerrar el panel lateral
  const closeNav = () => {
    setSidePanelOpen(false);
  };

  return (
    <div className="App">
      {/* No hay necesidad de incluir elementos de <head> aquí */}
      {/* Loader */}
      <div className="loader_bg">
        <div className="loader"><img src="images/loading.gif" alt="#" /></div>
      </div>

      {/* Panel lateral */}
      <div id="mySidepanel" className={`sidepanel ${sidePanelOpen ? 'open' : ''}`}>
        <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>×</a>
        <a href="index.html">Home</a>
        <a href="Register.html">Registro</a>
        <a href="Login.html">Login</a>
        <a href="Servicios.html">Servicios</a>
        <a href="Comentarios.html">Comentarios</a>
        <a href="Historial.html">Historial</a>
        <a href="Registro_Servicios.html">Registro_Servicios</a>
      </div>

      {/* Header */}
      <header>
        <div className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4 col-sm-4">
                <div className="logo">
                  <a href="index.html"><img src="images/logo.jpg" alt="#" /></a>
                </div>
              </div>
              <div className="col-md-8 col-sm-8">
                <div className="right_bottun">
                  <button className="openbtn" onClick={openNav}><img src="images/menu_icon.png" alt="#" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section className="banner_main">
        {/* Tu contenido del banner aquí */}
      </section>

      {/* Scripts al final del body */}
      {/* Scripts de JavaScript */}
      <script src="js/jquery.min.js"></script>
      <script src="js/popper.min.js"></script>
      <script src="js/bootstrap.bundle.min.js"></script>
      <script src="js/jquery-3.0.0.min.js"></script>
      <script src="js/jquery.mCustomScrollbar.concat.min.js"></script>
      <script src="js/custom.js"></script>
    </div>
  );




}

export default Home;
