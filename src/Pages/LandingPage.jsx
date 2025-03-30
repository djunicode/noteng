import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
// Import react-slick for testimonial carousel
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// Import AOS for animations
import AOS from 'aos';
import 'aos/dist/aos.css';
// Import Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faDownload, faArrowRight, faCalendarAlt, faBriefcase, faVideo, faStickyNote, faComments, faMobileAlt } from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  useEffect(() => {
    // Initialize AOS animation library
    AOS.init({
      duration: 1000,
      once: false,
    });
    
    // Add Poppins font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    // Clean up
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="landing-page">
      {/* Navigation */}
      <nav className="landing-nav">
      <div className="logo-container">
        <div className="logo">
          NOT <span className="book-icon"><FontAwesomeIcon icon={faBook} /></span> NG
        </div>
        <p className="tagline">All your Notes in one place.</p>
      </div>

        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#download">Download</a>
          <a href="#testimonials">Testimonials</a>
        </div>
        <div className="nav-buttons">
          <Link to="/LoginPage" className="btn btn-outline">Login</Link>
          <Link to="/SignUp" className="btn btn-primary">Sign Up</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content" data-aos="fade-right">
          <h1>
            <span className="highlight">Revolutionize</span> Your College Experience
          </h1>
          <p className="hero-subtitle">Connect, share, and excel with Noteng - the ultimate knowledge-sharing platform built by students, for students.</p>
          <div className="hero-cta">
            <Link to="/SignUp" className="btn btn-primary btn-lg">
              Get Started
              <FontAwesomeIcon icon={faArrowRight} className="btn-icon" />
            </Link>
            <a href="#features" className="btn btn-secondary btn-lg">Learn More</a>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Students</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100+</span>
              <span className="stat-label">Notes</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">200+</span>
              <span className="stat-label">Opportunities</span>
            </div>
          </div>
        </div>
        <div className="hero-images" data-aos="fade-left">
          <div className="device mobile">
            <div className="device-frame"></div>
          </div>
          <div className="device desktop">
            <div className="device-frame"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <h2 data-aos="fade-up">Centralized Platform for College Success</h2>
        <p className="section-subtitle" data-aos="fade-up">All the tools you need to excel in your academic journey</p>
        
        <div className="feature-cards">
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon={faStickyNote} className="feature-icon" />
            </div>
            <h3>Note Sharing</h3>
            <p>Access premium notes from seniors across different years and subjects, with rating system for quality assurance</p>
          </div>
          
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon={faBriefcase} className="feature-icon" />
            </div>
            <h3>Job Opportunities</h3>
            <p>Discover internships and job openings posted by seniors and alumni with direct contact information</p>
          </div>
          
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon={faVideo} className="feature-icon" />
            </div>
            <h3>Video Resources</h3>
            <p>Access curated YouTube videos for specific subjects and topics with embedded player functionality</p>
          </div>
          
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="400">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon={faCalendarAlt} className="feature-icon" />
            </div>
            <h3>Events Calendar</h3>
            <p>Stay updated with campus events, workshops, hackathons and important academic dates</p>
          </div>
          
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="500">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon={faComments} className="feature-icon" />
            </div>
            <h3>Chat with PDF</h3>
            <p>Collaborate in real-time while viewing PDFs, enhancing group study sessions and discussions</p>
          </div>
          
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="600">
            <div className="feature-icon-container">
              <FontAwesomeIcon icon={faMobileAlt} className="feature-icon" />
            </div>
            <h3>Cross-Platform</h3>
            <p>Seamlessly switch between our responsive web platform and dedicated mobile application</p>
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section id="download" className="download-app">
        <div className="download-content" data-aos="fade-right">
          <h2>Take Noteng Wherever You Go</h2>
          <p>Download our mobile app to access your notes anywhere, anytime - even offline! Built with Flutter for a seamless experience across all devices.</p>
          <div className="download-buttons">
            <a href="https://drive.google.com/file/d/1aInFbgTugnLbesPj282mtCK8OIWkiaG6/view?usp=drivesdk" 
               className="download-btn google-drive" 
               target="_blank" 
               rel="noopener noreferrer"
               data-aos="zoom-in"
               data-aos-delay="200">
              <FontAwesomeIcon icon={faDownload} />
              <div>
                <span>Available on</span>
                <strong>Google Drive</strong>
              </div>
            </a>
          </div>
        </div>
        <div className="app-showcase" data-aos="fade-left">
          <div className="phone-mockup">
            <div className="phone-screen"></div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <h2 data-aos="fade-up">What Students Say About Us</h2>
        
        <div className="testimonial-carousel-container" data-aos="fade-up">
          <Slider {...settings} className="testimonial-carousel">
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">Noteng transformed how I study! The shared notes from seniors were precisely what I needed to understand complex topics. The job opportunities section also helped me land my first internship.</p>
                <div className="student-info">
                  <div className="student-avatar"></div>
                  <div className="student-details">
                    <strong>Alex P.</strong>
                    <span>Computer Science, Year 2</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">As a senior, I love being able to share my notes with juniors and see them succeed. The platform makes it so easy to upload and organize content. The events calendar keeps me updated about everything happening on campus.</p>
                <div className="student-info">
                  <div className="student-avatar"></div>
                  <div className="student-details">
                    <strong>Priya K.</strong>
                    <span>Electrical Engineering, Year 3</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="testimonial-slide">
              <div className="testimonial-card">
                <div className="quote-icon">"</div>
                <p className="testimonial-text">The video resources linked to specific topics made complex concepts so much easier to understand. I love how everything I need is on a single platform - notes, videos, events, and opportunities.</p>
                <div className="student-info">
                  <div className="student-avatar"></div>
                  <div className="student-details">
                    <strong>Michael R.</strong>
                    <span>Mechanical Engineering, Year 1</span>
                  </div>
                </div>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content" data-aos="fade-up">
          <h2>Join the Academic Revolution</h2>
          <p>Become part of a thriving community of students sharing knowledge and opportunities</p>
          <div className="cta-buttons">
            <Link to="/SignUp" className="btn btn-primary btn-lg pulse-animation">
              Create Free Account <FontAwesomeIcon icon={faArrowRight} />
            </Link>
            <Link to="/LoginPage" className="btn btn-outline btn-lg">Existing User? Login</Link>
          </div>
          <div className="cta-features">
            <div className="cta-feature">
              <span className="check-icon">✓</span>
              <span>Free Access to Notes</span>
            </div>
            <div className="cta-feature">
              <span className="check-icon">✓</span>
              <span>Career Opportunities</span>
            </div>
            <div className="cta-feature">
              <span className="check-icon">✓</span>
              <span>Community Support</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-branding">
            <div className="footer-logo-container">
              <FontAwesomeIcon icon={faBook} className="book-icon" />
              <div className="footer-logo">Noteng</div>
            </div>
            <p className="footer-tagline">Empowering students through knowledge sharing</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Platform</h4>
              <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#features">Privacy Policy</a></li>
                <li><a href="#features">Terms of Service</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Community</h4>
              <ul>
                <li><a href="#features">Blog</a></li>
                <li><a href="#features">Forum</a></li>
                <li><a href="#features">Support</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>Contact</h4>
              <ul>
                <li><a href="#features">Email Us</a></li>
                <li><a href="#features">About Us</a></li>
                <li><a href="#features">Careers</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Noteng. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
