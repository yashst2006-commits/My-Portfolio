import { useState, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import TypingHeading from './components/TypingHeading';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import AboutSection from './components/AboutSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import ProjectsPage from './components/ProjectsPage';
import SkillsSection from './components/SkillsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import profileImg from './assets/img.jpeg';

const PARTICLE_COUNT = 250;
const VORTEX_STRENGTH = 1.2;
const ROTATION_SPEED = 1.4;
const MAX_PARTICLE_SIZE = 90;
const GLOW_STRENGTH = 20;
const MOUSE_FOLLOW_SPEED = 0.06;

const PHRASES = [
  'Problem Solver',
  'Code. Ship. Repeat.',
  'Tech Enthusiast',
  'AI Explorer',
  'Continuous Learner',
  'Future AI Engineer'
];

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Handle cross-page scroll intent: when landing on / with ?scroll=<sectionId>
  // (set by Navbar when clicking a home-section link from /projects)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const scrollTarget = params.get('scroll');
    if (!scrollTarget) return;

    // Clean the query param from the URL without a reload
    const cleanUrl = window.location.pathname;
    window.history.replaceState({}, '', cleanUrl);

    // Wait for sections to be painted before scrolling
    const timer = setTimeout(() => {
      const target = document.getElementById(scrollTarget);
      if (!target) return;
      const navbarHeight = (document.querySelector('header') as HTMLElement)?.offsetHeight ?? 72;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
      window.scrollTo({ top: targetTop, behavior: 'smooth' });
    }, 120);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    if (window.history.state && window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <CustomCursor />
      <BackgroundCanvas
        particleCount={PARTICLE_COUNT}
        vortexStrength={VORTEX_STRENGTH}
        rotationSpeed={ROTATION_SPEED}
        maxParticleSize={MAX_PARTICLE_SIZE}
        glowStrength={GLOW_STRENGTH}
        mouseFollowSpeed={MOUSE_FOLLOW_SPEED}
      />

      {currentPath === '/projects' ? (
        <ProjectsPage onBack={handleBack} />
      ) : (
        <>
          <Navbar />

          <main style={{
            flex: 1,
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '100px 24px 0 24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
          }}>
            <section id="hero" className="hero-grid" style={{
              alignItems: 'center',
              minHeight: '85vh',
              width: '100%',
              padding: '40px 0'
            }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>

                <div className="fade-up-1">
                  <span style={{
                    color: 'var(--color-orange)',
                    fontSize: '18px',
                    fontWeight: '600',
                    letterSpacing: '1px',
                    fontFamily: 'var(--font-display)',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}>
                    Hey, I'm Yash 👋
                  </span>
                </div>

                <div className="fade-up-2">
                  <h1 style={{
                    fontSize: '56px',
                    lineHeight: '1.15',
                    fontWeight: '800',
                    fontFamily: 'var(--font-display)',
                    color: '#FFFFFF',
                    minHeight: '2.2em',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <TypingHeading phrases={PHRASES} />
                  </h1>
                </div>

                <div className="fade-up-3" style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '600px' }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-sans)',
                    background: 'linear-gradient(90deg, #FFFFFF, var(--color-orange))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}>
                    Engineer across AI, ML, and Web Technologies
                  </h3>
                  <p style={{
                    color: 'var(--text-secondary)',
                    fontSize: '16.5px',
                    lineHeight: '1.7',
                    fontWeight: '400',
                  }}>
                    I enjoy building practical, high-impact solutions using Artificial Intelligence, Machine Learning, and modern web technologies. From intelligent applications and scalable backend systems to responsive web experiences, I love transforming ideas into reliable, efficient, and user-focused products.
                  </p>
                </div>

                <div className="button-container fade-up-4" style={{
                  display: 'flex',
                  gap: '16px',
                  marginTop: '12px'
                }}>
                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      const target = document.getElementById('contact');
                      if (target) {
                        const navbarHeight = document.querySelector('header')?.offsetHeight ?? 72;
                        const targetTop = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 8;
                        window.scrollTo({ top: targetTop, behavior: 'smooth' });
                      }
                    }}
                    className="btn-primary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'var(--color-orange)',
                      color: '#000000',
                      fontWeight: '700',
                      textDecoration: 'none',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontSize: '14.5px',
                      letterSpacing: '0.5px',
                      boxShadow: '0 4px 14px rgba(255, 140, 0, 0.35)',
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      cursor: 'pointer',
                      border: 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 6px 22px rgba(255, 140, 0, 0.55)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.boxShadow = '0 4px 14px rgba(255, 140, 0, 0.35)';
                    }}
                  >
                    Get in Touch
                  </a>

                  <a
                    href="/Yashwanth S T Internship Resume.pdf"
                    download="Yashwanth S T Resume.pdf"
                    className="btn-secondary"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'transparent',
                      color: '#FFFFFF',
                      fontWeight: '600',
                      textDecoration: 'none',
                      padding: '14px 28px',
                      borderRadius: '12px',
                      fontSize: '14.5px',
                      letterSpacing: '0.5px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.borderColor = 'var(--color-orange)';
                      e.currentTarget.style.background = 'rgba(255, 140, 0, 0.05)';
                      e.currentTarget.style.boxShadow = '0 6px 20px rgba(255, 140, 0, 0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'none';
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    Download Resume
                  </a>
                </div>

              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className="profile-card float-img">
                  <img
                    src={profileImg}
                    alt="Yashwanth Profile"
                    className="profile-img"
                  />
                </div>
              </div>

            </section>

            <AboutSection />
          </main>

          {/* Experience section at full-width so GSAP pin works correctly */}
          <div style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
            }}>
              <ExperienceSection />
            </div>
          </div>

          {/* Projects section */}
          <div style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
            }}>
              <ProjectsSection onNavigateAll={() => navigate('/projects')} showAll={false} />
            </div>
          </div>

          {/* Skills section */}
          <div style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
            }}>
              <SkillsSection />
            </div>
          </div>

          {/* Contact section */}
          <div style={{
            width: '100%',
            position: 'relative',
            zIndex: 10,
          }}>
            <div style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '0 24px',
            }}>
              <ContactSection />
            </div>
          </div>

          <Footer />
        </>
      )}

      <style>{`
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 48px;
            padding: 20px 0 60px 0;
          }
          
          .hero-grid > div {
            align-items: center;
            text-align: center;
          }

          h1 {
            font-size: 42px !important;
            justify-content: center;
            min-height: 2.2em !important;
          }

          .button-container {
            width: 100%;
            flex-direction: column;
            gap: 12px;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
