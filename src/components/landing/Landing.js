// React Import
import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Link as Links } from "react-scroll";
import ReactPlayer from "react-player";
// Main CSS style
import "./assets/css/style.css";
import "bootstrap/dist/css/bootstrap.css";
const Landing = ({ loadUser }) => {
  return (
    <Fragment>
      <header id="header" className="header-transparent">
        <div className="container">
          <div id="logo" className="pull-left">
            {/* <a href="index.html"><img src="assets/img/logo.png" alt=""></a> */}
            <h1>
              <Links
                activeClass="active"
                to="hero"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-light"
              >
                Obscura
              </Links>
            </h1>
          </div>

          <nav id="nav-menu-container">
            <ul className="nav-menu">
              <li>
                <Links
                  activeClass="active"
                  to="hero"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="btn text-light"
                >
                  Home
                </Links>
              </li>

              <li>
                <Links
                  className="menuu"
                  activeClass="active"
                  to="about"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="btn text-light"
                >
                  About
                </Links>
              </li>
              <li>
                <Links
                  activeClass="ac tive"
                  to="services"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="btn text-light"
                >
                  Services
                </Links>
              </li>
              <li>
                <Links
                  className="menuu"
                  activeClass="active"
                  to="portofolio"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="btn text-light"
                >
                  Portfolio
                </Links>
              </li>
              <li>
                <Links
                  activeClass="active"
                  to="team"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="btn text-light"
                >
                  Team
                </Links>
              </li>
              <li>
                <Links
                  activeClass="active"
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="btn text-light"
                >
                  Contact Us
                </Links>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/book">Book Now</Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <section id="hero" name="hero">
        <div className="hero-container" data-aos="zoom-in" data-aos-delay="100">
          <div className="row">
            <div className="col-md-6 align-items-center my-4">
              <ReactPlayer
                width="115%"
                height="125%"
                controls
                url="https://www.youtube.com/watch?v=f9CfAqZfHoc"
              />
            </div>
            <div className="col-md-1" />

            <div className="col-md-5 align-items-end">
              <h1> Welcome to Obscura</h1>
              <h2> Contactless Visitor Management System done Seamlessly</h2>
              <Link to="/book" className="btn-get-started">
                Book a Visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <main id="main">
        <section id="about" name="about">
          <div className="container" data-aos="fade-up">
            <div className="row about-container">
              <div className="col-lg-6 content order-lg-1 order-2">
                <h2 className="title">About Us</h2>
                <p>
                  Obscura is a cloud-based visitor management solution for
                  midsize and large hospitals. It is suitable for hospitals that
                  need a VMS that can seamlessly monitor and identify visitors
                  while still maintaining flexibility.
                </p>

                <div
                  className="icon-box"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <div className="icon">
                    <i className="fa fa-shopping-bag"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Virus-Free Environment</a>
                  </h4>
                  <p className="description">
                    Obscura provides a contactless visitor management system
                    that can minimize human interaction and skin-to-surface
                    contact as these are the way viruses spread, including
                    COVID-19.
                  </p>
                </div>

                <div
                  className="icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="icon">
                    <i className="fa fa-photo"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Low-Cost System</a>
                  </h4>
                  <p className="description">
                    Obscura is a cloud-based web application VMS with a fully
                    serverless architecture that is built using AWS services.
                    Obscura will help hospitals to reduce operating cost,
                    especially in visitor management aspect, since there will be
                    less manpower needed for managing the system and
                    infrastructures needed to support Page 6 of 18 the system.
                  </p>
                </div>
                <div
                  className="icon-box"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <div className="icon">
                    <i className="fa fa-photo"></i>
                  </div>
                  <h4 className="title">
                    <a href="">Productivity Improvement</a>
                  </h4>
                  <p className="description">
                    As our product’s system needs very few man powers, this will
                    help hospitals to improve overall productivity by allocating
                    man powers to other more crucial sectors.Obscura already
                    provides a well-automated system which gives management
                    result as demanded by hospitals which is to maintain
                    well-organized visitor management.
                  </p>
                </div>
              </div>

              <div
                className="col-lg-6 background order-lg-2 order-1"
                data-aos="fade-left"
                data-aos-delay="100"
              ></div>
            </div>
          </div>
        </section>

        <section id="facts">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h3 className="section-title">Facts</h3>
              <p className="section-description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque
              </p>
            </div>
            <div className="row counters">
              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">232</span>
                <p>Clients</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">521</span>
                <p>Projects</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">1,463</span>
                <p>Hours Of Support</p>
              </div>

              <div className="col-lg-3 col-6 text-center">
                <span data-toggle="counter-up">15</span>
                <p>Hard Workers</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" name="services">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h3 className="section-title">Services</h3>
              <p className="section-description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque
              </p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="box">
                  <div className="icon">
                    <a href="">
                      <i className="fa fa-desktop"></i>
                    </a>
                  </div>
                  <h4 className="title">
                    <a href="">Lorem Ipsum</a>
                  </h4>
                  <p className="description">
                    Voluptatum deleniti atque corrupti quos dolores et quas
                    molestias excepturi sint occaecati cupiditate non provident
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="box">
                  <div className="icon">
                    <a href="">
                      <i className="fa fa-bar-chart"></i>
                    </a>
                  </div>
                  <h4 className="title">
                    <a href="">Dolor Sitema</a>
                  </h4>
                  <p className="description">
                    Minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat tarad limino ata
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="box">
                  <div className="icon">
                    <a href="">
                      <i className="fa fa-paper-plane"></i>
                    </a>
                  </div>
                  <h4 className="title">
                    <a href="">Sed ut perspiciatis</a>
                  </h4>
                  <p className="description">
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur
                  </p>
                </div>
              </div>

              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="box">
                  <div className="icon">
                    <a href="">
                      <i className="fa fa-photo"></i>
                    </a>
                  </div>
                  <h4 className="title">
                    <a href="">Magni Dolores</a>
                  </h4>
                  <p className="description">
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="box">
                  <div className="icon">
                    <a href="">
                      <i className="fa fa-road"></i>
                    </a>
                  </div>
                  <h4 className="title">
                    <a href="">Nemo Enim</a>
                  </h4>
                  <p className="description">
                    At vero eos et accusamus et iusto odio dignissimos ducimus
                    qui blanditiis praesentium voluptatum deleniti atque
                  </p>
                </div>
              </div>
              <div className="col-lg-4 col-md-6" data-aos="zoom-in">
                <div className="box">
                  <div className="icon">
                    <a href="">
                      <i className="fa fa-shopping-bag"></i>
                    </a>
                  </div>
                  <h4 className="title">
                    <a href="">Eiusmod Tempor</a>
                  </h4>
                  <p className="description">
                    Et harum quidem rerum facilis est et expedita distinctio.
                    Nam libero tempore, cum soluta nobis est eligendi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="call-to-action">
          <div className="container">
            <div className="row" data-aos="zoom-in">
              <div className="col-lg-9 text-center text-lg-left">
                <h3 className="cta-title">Call To Action</h3>
                <p className="cta-text">
                  {" "}
                  Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint
                  occaecat cupidatat non proident, sunt in culpa qui officia
                  deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="col-lg-3 cta-btn-container text-center">
                <a className="cta-btn align-middle" href="#">
                  Call To Action
                </a>
              </div>
            </div>
          </div>
        </section>
        <section id="portfolio" className="portfolio" name="portofolio">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h3 className="section-title">Portfolio</h3>
              <p className="section-description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque
              </p>
            </div>

            <div className="row" data-aos="fade-up" data-aos-delay="100">
              <div className="col-lg-12 d-flex justify-content-center">
                <ul id="portfolio-flters">
                  <li data-filter="*" className="filter-active">
                    All
                  </li>
                  <li data-filter=".filter-app">App</li>
                  <li data-filter=".filter-card">Card</li>
                  <li data-filter=".filter-web">Web</li>
                </ul>
              </div>
            </div>

            <div
              className="row portfolio-container"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <img
                  src="assets/img/portfolio/portfolio-1.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>App 1</h4>
                  <p>App</p>
                  <a
                    href="assets/img/portfolio/portfolio-1.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="App 1"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <img
                  src="assets/img/portfolio/portfolio-2.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Web 3</h4>
                  <p>Web</p>
                  <a
                    href="assets/img/portfolio/portfolio-2.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="Web 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <img
                  src="assets/img/portfolio/portfolio-3.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>App 2</h4>
                  <p>App</p>
                  <a
                    href="assets/img/portfolio/portfolio-3.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="App 2"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <img
                  src="assets/img/portfolio/portfolio-4.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Card 2</h4>
                  <p>Card</p>
                  <a
                    href="assets/img/portfolio/portfolio-4.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="Card 2"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <img
                  src="assets/img/portfolio/portfolio-5.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Web 2</h4>
                  <p>Web</p>
                  <a
                    href="assets/img/portfolio/portfolio-5.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="Web 2"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-app">
                <img
                  src="assets/img/portfolio/portfolio-6.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>App 3</h4>
                  <p>App</p>
                  <a
                    href="assets/img/portfolio/portfolio-6.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="App 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <img
                  src="assets/img/portfolio/portfolio-7.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Card 1</h4>
                  <p>Card</p>
                  <a
                    href="assets/img/portfolio/portfolio-7.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="Card 1"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-card">
                <img
                  src="assets/img/portfolio/portfolio-8.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Card 3</h4>
                  <p>Card</p>
                  <a
                    href="assets/img/portfolio/portfolio-8.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="Card 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 portfolio-item filter-web">
                <img
                  src="assets/img/portfolio/portfolio-9.jpg"
                  className="img-fluid"
                  alt=""
                />
                <div className="portfolio-info">
                  <h4>Web 3</h4>
                  <p>Web</p>
                  <a
                    href="assets/img/portfolio/portfolio-9.jpg"
                    data-gall="portfolioGallery"
                    className="venobox preview-link"
                    title="Web 3"
                  >
                    <i className="bx bx-plus"></i>
                  </a>
                  <a
                    href="portfolio-details.html"
                    className="details-link"
                    title="More Details"
                  >
                    <i className="bx bx-link"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <section id="team" name="team">
          <div className="container" data-aos="fade-up">
            <div className="section-header">
              <h3 className="section-title">Team</h3>
              <p className="section-description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque
              </p>
            </div>
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="member" data-aos="fade-up" data-aos-delay="100">
                  <div className="pic">
                    <img src="assets/img/team-1.jpg" alt="" />
                  </div>
                  <h4>Walter White</h4>
                  <span>Chief Executive Officer</span>
                  <div className="social">
                      <i className="fa fa-twitter"></i>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="member" data-aos="fade-up" data-aos-delay="200">
                  <div className="pic">
                    <img src="assets/img/team-2.jpg" alt="" />
                  </div>
                  <h4>Sarah Jhinson</h4>
                  <span>Product Manager</span>
                  <div className="social">
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="member" data-aos="fade-up" data-aos-delay="300">
                  <div className="pic">
                    <img src="assets/img/team-3.jpg" alt="" />
                  </div>
                  <h4>William Anderson</h4>
                  <span>CTO</span>
                  <div className="social">
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>

              <div className="col-lg-3 col-md-6">
                <div className="member" data-aos="fade-up" data-aos-delay="400">
                  <div className="pic">
                    <img src="assets/img/team-4.jpg" alt="" />
                  </div>
                  <h4>Amanda Jepson</h4>
                  <span>Accountant</span>
                  <div className="social">
                    <a href="">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-facebook"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-google-plus"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        <section id="contact" name="contact">
          <div className="container">
            <div className="section-header">
              <h3 className="section-title">Contact</h3>
              <p className="section-description">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque
              </p>
            </div>
          </div>

          <iframe
            src="https://maps.google.com/maps?q=jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="380"
            frameBorder="0"
            style={{ border: "0" }}
            allowFullScreen
          ></iframe>
        </section>
      </main>
      <footer id="footer">
        <div className="footer-top">
          <div className="container"></div>
        </div>

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong>Regna</strong>. All Rights Reserved
          </div>
          <div className="credits">
            <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Landing;
