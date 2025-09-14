import React, { useState } from "react";
import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  const [siteLiberado, setSiteLiberado] = useState(false);
  const [terminalAberto, setTerminalAberto] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {!siteLiberado ? (
        <Hero onShowSite={() => setSiteLiberado(true)} />
      ) : (
        <>
          <Navigation />
          <main>
            <About />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <div className="fixed bottom-6 right-6 z-50">
            {terminalAberto ? (
              <div className="relative">
                <button
                  className="absolute -top-4 -right-4 bg-black text-green-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg border border-green-400"
                  onClick={() => setTerminalAberto(false)}
                  aria-label="Fechar terminal"
                >
                  ×
                </button>
                <div className="w-[350px] max-w-[90vw]">
                  <Hero floating />
                </div>
              </div>
            ) : (
              <button
                className="bg-black text-green-400 rounded-full w-12 h-12 flex items-center justify-center shadow-lg border border-green-400 hover:bg-green-900 transition"
                onClick={() => setTerminalAberto(true)}
                aria-label="Abrir terminal"
              >
                <svg
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-terminal"
                >
                  <polyline points="4 17 10 11 4 5" />
                  <line x1="12" y1="19" x2="20" y2="19" />
                </svg>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
