import { useState, useEffect } from "react";

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".nav-item");

    function updateActiveNav() {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute("id") || "";
        }
      });

      setActiveSection(current);
    }

    window.addEventListener("scroll", updateActiveNav);
    return () => window.removeEventListener("scroll", updateActiveNav);
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold gradient-text">JG</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button
                onClick={() => handleNavClick("#home")}
                className={`nav-item px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === "home"
                    ? "text-foreground active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="nav-home"
              >
                Início
              </button>
              <button
                onClick={() => handleNavClick("#about")}
                className={`nav-item px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === "about"
                    ? "text-foreground active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="nav-about"
              >
                Sobre
              </button>
              <button
                onClick={() => handleNavClick("#skills")}
                className={`nav-item px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === "skills"
                    ? "text-foreground active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="nav-skills"
              >
                Skills
              </button>
              <button
                onClick={() => handleNavClick("#projects")}
                className={`nav-item px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === "projects"
                    ? "text-foreground active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="nav-projects"
              >
                Projetos
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className={`nav-item px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === "contact"
                    ? "text-foreground active"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                data-testid="nav-contact"
              >
                Contato
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="mobile-menu-button"
            >
              <i className="fas fa-bars text-xl"></i>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-lg border-t border-border/50">
              <button
                onClick={() => handleNavClick("#home")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground w-full text-left"
                data-testid="mobile-nav-home"
              >
                Início
              </button>
              <button
                onClick={() => handleNavClick("#about")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground w-full text-left"
                data-testid="mobile-nav-about"
              >
                Sobre
              </button>
              <button
                onClick={() => handleNavClick("#skills")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground w-full text-left"
                data-testid="mobile-nav-skills"
              >
                Skills
              </button>
              <button
                onClick={() => handleNavClick("#projects")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground w-full text-left"
                data-testid="mobile-nav-projects"
              >
                Projetos
              </button>
              <button
                onClick={() => handleNavClick("#contact")}
                className="block px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground w-full text-left"
                data-testid="mobile-nav-contact"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
