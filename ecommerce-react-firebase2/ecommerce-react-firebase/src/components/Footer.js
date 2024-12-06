import React from 'react';

const Footer = () => {
  return (
    <>
      <footer
        className="text-center text-lg-start text-muted"
        style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-1 border-bottom">
        </section>

        <section>
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#4caf50' }}>
                  <i className="fas fa-gem me-3"></i>E-shop
                </h6>
                <p>
                  E-Shop est votre boutique en ligne de référence, offrant une large gamme de produits de qualité à des prix compétitifs. Notre objectif est de fournir une expérience d'achat exceptionnelle avec un service client de premier ordre.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#4caf50' }}>Nos Produits</h6>
                <p><a href="#!" className="text-reset" style={{ color: '#4caf50' }}>Électronique</a></p>
                <p><a href="#!" className="text-reset" style={{ color: '#4caf50' }}>Accessoires</a></p>
                <p><a href="#!" className="text-reset" style={{ color: '#4caf50' }}>Autres</a></p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4" style={{ color: '#4caf50' }}>Contactez-nous</h6>
                <p><i className="fas fa-home me-3"></i> Tunis, Tunisie</p>
                <p><i className="fas fa-envelope me-3"></i> mathlothieya@gmail.com</p>
                <p><i className="fas fa-phone me-3"></i> +216 56 306 151</p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-4"
          style={{ backgroundColor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50' }}
        >
          © 2024 E-shop. Tous droits réservés.
        </div>
      </footer>
    </>
  );
};

export default Footer;
