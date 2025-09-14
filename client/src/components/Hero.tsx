import React, { useState, useEffect } from "react";

interface HeroProps {
  onShowSite?: () => void;
  floating?: boolean;
}

export default function Hero({ onShowSite, floating }: HeroProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const [commandHistory, setCommandHistory] = useState<
    Array<{ command: string; output: string[]; type: string }>
  >([]);
  const [currentCommand, setCurrentCommand] = useState("");

  const terminalLines = [
    {
      prompt: "jgabriel@portfolio:~$",
      content: " whoami",
      delay: 800,
      type: "command",
    },
    {
      prompt: "",
      content: "J Gabriel - Desenvolvedor Web",
      delay: 600,
      type: "output",
    },
    {
      prompt: "",
      content: "Ciência da Computação",
      delay: 300,
      type: "variable",
    },
    {
      prompt: "",
      content: "Desenvolvedor Web e Mobile",
      delay: 300,
      type: "variable",
    },
    { prompt: "", content: "", delay: 600, type: "blank" },
    {
      prompt: "jgabriel@portfolio:~$",
      content: " echo 'Olá! Bem-vindo ao meu portfólio'",
      delay: 1200,
      type: "command",
    },
    {
      prompt: "",
      content: "Olá! Bem-vindo ao meu portfólio",
      delay: 800,
      type: "success",
    },
  ];

  const [displayLines, setDisplayLines] = useState(
    terminalLines.map((line) => ({
      ...line,
      currentText: "",
      completed: false,
    }))
  );

  const availableCommands = {
    help: {
      description: "Mostra comandos disponíveis",
      output: [
        "Comandos disponíveis:",
        "",
        "Ver site  - Abre meu site pessoal",
        "help      - Mostra esta ajuda",
        "curso     - Informações sobre minha formação",
        "skills    - Lista minhas habilidades técnicas",
        "projetos  - Mostra meus projetos principais",
        "contato   - Informações de contato",
        "sobre     - Resumo sobre mim",
        "clear     - Limpa o terminal",
        "",
        "Digite qualquer comando para começar!",
      ],
    },
    curso: {
      description: "Informações acadêmicas",
      output: [
        "📚 FORMAÇÃO ACADÊMICA",
        "",
        "🎓 Bacharelado em andamento em Ciência da Computação",
        "📍 Universidade Federal do Vale do São Francisco",
        "UNIVASF",
        "",
        "📖 Áreas de foco:",
        "• Desenvolvimento de Software",
        "• Engenharia Web",
        "• Algoritmos e Estruturas de Dados",
        "• Banco de Dados",
      ],
    },
    skills: {
      description: "Habilidades técnicas",
      output: [
        "💻 HABILIDADES TÉCNICAS",
        "",
        "🌐 Frontend:",
        "• JavaScript/TypeScript",
        "• React.js",
        "• HTML5/CSS3 ",
        "• TailwindCSS ",
        "",
        "⚙️  Backend:",
        "• Node.js ",
        "• Express.js ",
        "• MongoDB ",
        "• PostgreSQL ",
        "",
        "🛠️  Ferramentas:",
        "• Git/GitHub ",
        "• Docker ",
        "• Figma",
      ],
    },
    projetos: {
      description: "Projetos principais",
      output: [
        "🚀 PROJETOS PRINCIPAIS",
        "",
        "1. 🛍️  E-commerce Dashboard",
        "   → React + Node.js + MongoDB",
        "   → Painel administrativo completo",
        "",
        "2. 📱 Task Manager App",
        "   → React Native + Firebase",
        "   → App de produtividade mobile",
        "",
        "3. 🌐 Social Platform",
        "   → Next.js + Socket.io + PostgreSQL",
        "   → Plataforma social com chat em tempo real",
        "",
        "Digite 'contato' para discutir um projeto!",
      ],
    },
    contato: {
      description: "Informações de contato",
      output: [
        "📞 INFORMAÇÕES DE CONTATO",
        "",
        "📧 Email: jayme.gabriel@gmail.com",
        "📱 Telefone: (87) 91205-8745",
        "📍 Localização: Brasil",
        "",
        "🌐 Redes sociais:",
        "• GitHub: /jgabriel",
        "• LinkedIn: /in/jgabriel",
        "• Twitter: @jgabriel_dev",
        "",
        "💬 Sempre aberto para conversar sobre projetos!",
      ],
    },
    sobre: {
      description: "Resumo pessoal",
      output: [
        "👨‍💻 SOBRE MIM",
        "",
        "Olá! Sou J Gabriel, desenvolvedor web apaixonado",
        "por criar experiências digitais incríveis.",
        "",
        "🎯 O que faço:",
        "• Desenvolvimento Full-Stack",
        "• Interfaces modernas e responsivas",
        "• Soluções web escaláveis",
        "• Consultoria em tecnologia",
        "",
        "🚀 Missão: Transformar ideias em realidade digital",
        "através de código limpo e design intuitivo.",
      ],
    },
    clear: {
      description: "Limpa o terminal",
      output: ["Terminal limpo! Digite 'help' para ver os comandos."],
    },
  };

  const processCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    if (command === "clear") {
      setCommandHistory([]);
      return;
    }
    if (command === "ver site" && onShowSite) {
      setCommandHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: ["Exibindo site completo..."],
          type: "success",
        },
      ]);
      setTimeout(() => {
        onShowSite();
      }, 700);
      return;
    }
    const commandData =
      availableCommands[command as keyof typeof availableCommands];
    if (commandData) {
      setCommandHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: commandData.output,
          type: "success",
        },
      ]);
    } else {
      setCommandHistory((prev) => [
        ...prev,
        {
          command: cmd,
          output: [
            `Comando '${cmd}' não encontrado.`,
            "Digite 'help' para ver os comandos disponíveis.",
          ],
          type: "error",
        },
      ]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      processCommand(currentCommand);
      setCurrentCommand("");
    }
  };

  useEffect(() => {
    if (animationComplete) return;

    const typingSpeed = 50;

    const timer = setTimeout(
      () => {
        if (currentLineIndex >= terminalLines.length) {
          setTimeout(() => {
            setAnimationComplete(true);
            setTimeout(() => {
              setShowFinalMessage(true);
              setIsInteractive(true);
            }, 800);
          }, 2000);
          return;
        }

        const currentLine = terminalLines[currentLineIndex];
        const targetText = currentLine.content;

        if (currentCharIndex < targetText.length) {
          setDisplayLines((prev) =>
            prev.map((line, index) =>
              index === currentLineIndex
                ? {
                    ...line,
                    currentText: targetText.substring(0, currentCharIndex + 1),
                  }
                : line
            )
          );
          setCurrentCharIndex((prev) => prev + 1);
        } else {
          setDisplayLines((prev) =>
            prev.map((line, index) =>
              index === currentLineIndex ? { ...line, completed: true } : line
            )
          );
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }
      },
      currentCharIndex === 0 && currentLineIndex > 0
        ? terminalLines[currentLineIndex]?.delay || 600
        : typingSpeed
    );

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, animationComplete]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 600);
    return () => clearInterval(cursorTimer);
  }, []);

  const handleShowSiteClick = () => {
    if (onShowSite) onShowSite();
  };

  if (floating) {
    return (
      <div className="glass-card rounded-lg p-4 font-mono text-sm shadow-2xl bg-black/90 text-green-400">
        <div className="mb-2">Terminal flutuante</div>
        <div className="overflow-y-auto max-h-60">
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className="text-green-400 font-medium">
                jgabriel@portfolio:~${" "}
                <span className="text-foreground">{entry.command}</span>
              </div>
              <div
                className={`mt-1 ${
                  entry.type === "error" ? "text-red-400" : "text-cyan-300"
                }`}
              >
                {entry.output.map((line, lineIndex) => (
                  <div key={lineIndex} className="leading-relaxed">
                    {line}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="pt-2 flex items-center">
          <span className="text-green-400 font-medium">
            jgabriel@portfolio:~$
          </span>
          <input
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 ml-2 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
            placeholder="Digite um comando..."
            data-testid="terminal-input"
          />
          <span className="text-green-400 ml-1 animate-pulse">▋</span>
        </div>
      </div>
    );
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full filter blur-3xl animate-float"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-8 animate-fade-in">
            <div className="glass-card rounded-lg p-6 sm:p-8 font-mono text-sm sm:text-base shadow-2xl">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground ml-4 hidden sm:inline">
                  terminal
                </span>
                <span className="text-muted-foreground ml-4 sm:hidden">
                  ~/portfolio
                </span>
              </div>

              <div className="space-y-1 text-foreground min-h-[400px] sm:min-h-[500px] max-h-[600px] overflow-y-auto">
                {!showFinalMessage ? (
                  <div
                    className={`transition-opacity duration-1000 ${
                      animationComplete ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {displayLines.map((line, index) => {
                      const getLineColor = (type: string) => {
                        switch (type) {
                          case "command":
                            return "text-foreground";
                          case "output":
                            return "text-cyan-300";
                          case "comment":
                            return "text-green-400";
                          case "variable":
                            return "text-yellow-300";
                          case "success":
                            return "text-green-300";
                          case "blank":
                            return "text-foreground";
                          default:
                            return "text-foreground";
                        }
                      };

                      return (
                        <div
                          key={index}
                          className={`transition-opacity duration-300 leading-relaxed ${
                            index <= currentLineIndex
                              ? "opacity-100"
                              : "opacity-20"
                          } ${line.type === "blank" ? "h-4" : ""}`}
                        >
                          {line.prompt && (
                            <span className="text-green-400 font-medium">
                              {line.prompt}
                            </span>
                          )}
                          <span className={getLineColor(line.type)}>
                            {line.completed ? line.content : line.currentText}
                            {index === currentLineIndex &&
                              !line.completed &&
                              showCursor && (
                                <span className="text-green-400 ml-1 animate-pulse">
                                  ▋
                                </span>
                              )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="animate-fade-in leading-relaxed">
                    <div className="text-green-400 font-medium">
                      jgabriel@portfolio:~${" "}
                      <span className="text-foreground">./start</span>
                    </div>
                    <div className="text-green-300 py-2">
                      ✨ Sistema inicializado com sucesso!
                    </div>
                    <div className="text-cyan-300 py-1">
                      → Desenvolvedor:{" "}
                      <span className="text-yellow-300">J Gabriel</span>
                    </div>
                    <div className="text-cyan-300 py-1">
                      → Formação:{" "}
                      <span className="text-yellow-300">
                        Ciência da Computação
                      </span>
                    </div>
                    <div className="text-cyan-300 py-1">
                      → Especialização:{" "}
                      <span className="text-yellow-300">
                        Desenvolvimento Web e Mobile Full-Stack
                      </span>
                    </div>
                    <div className="text-cyan-300 py-1">
                      → Status:{" "}
                      <span className="text-green-300">
                        Disponível para novos projetos
                      </span>
                    </div>
                    <div className="pt-4 text-muted-foreground">
                      Digite 'help' para ver comandos disponíveis...
                    </div>

                    {commandHistory.map((entry, index) => (
                      <div key={index} className="pt-4">
                        <div className="text-green-400 font-medium">
                          jgabriel@portfolio:~${" "}
                          <span className="text-foreground">
                            {entry.command}
                          </span>
                        </div>
                        <div
                          className={`mt-1 ${
                            entry.type === "error"
                              ? "text-red-400"
                              : "text-cyan-300"
                          }`}
                        >
                          {entry.output.map((line, lineIndex) => (
                            <div key={lineIndex} className="leading-relaxed">
                              {line}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {isInteractive && (
                      <div className="pt-4 flex items-center">
                        <span className="text-green-400 font-medium">
                          jgabriel@portfolio:~$
                        </span>
                        <input
                          type="text"
                          value={currentCommand}
                          onChange={(e) => setCurrentCommand(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 ml-2 bg-transparent border-none outline-none text-foreground placeholder-muted-foreground"
                          placeholder="Digite 'help' para começar..."
                          autoFocus
                          data-testid="terminal-input"
                        />
                        <span className="text-green-400 ml-1 animate-pulse">
                          ▋
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg animate-glow"
                onClick={handleShowSiteClick}
                data-testid="button-projects"
              >
                Ver Site
              </button>
              <a
                href="/Portfolio/cv.pdf"
                download
                className="border border-border text-foreground px-8 py-3 rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center"
                data-testid="button-download-cv"
                style={{ textDecoration: "none" }}
              >
                <i className="fas fa-download mr-2"></i>
                Download CV
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
