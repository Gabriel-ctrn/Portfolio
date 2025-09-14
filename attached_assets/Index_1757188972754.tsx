import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import EmailIcon from "@mui/icons-material/Email";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import GitHubIcon from "@mui/icons-material/GitHub";

interface SkillPosition {
  x: number;
  y: number;
  id: number;
  size: 'small' | 'medium' | 'large';
  vx: number;
  vy: number;
}

interface TerminalLine {
  prompt: string;
  content: string;
  completed: boolean;
  currentText: string;
}

export default function Index() {
  const [skills, setSkills] = useState<SkillPosition[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const skillsRef = useRef<HTMLDivElement>(null);

  // Typing animation state
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showFinalMessage, setShowFinalMessage] = useState(false);

    const [selectedCard, setSelectedCard] = useState(0);

   const handleCardClick = (index: number) => {
     // Se o mesmo card for clicado novamente, desmarca
     setSelectedCard((prev) => (prev === index ? null : index));
   };
  
  const descriptions = [
    "Este é o texto do Card 1. Ele descreve algo interessante sobre o projeto 1.",
    "Este é o texto do Card 2. Mais detalhes e informações aqui.",
    "Este é o texto do Card 3. Informações adicionais sobre o projeto.",
  ];

  const terminalLines: TerminalLine[] = [
    { prompt: '>_', content: ' nome="J Gabriel"', completed: false, currentText: '' },
    { prompt: '>_', content: ' curso="Ciência da Computação"', completed: false, currentText: '' },
    { prompt: '>_', content: ' perfil="Desenvolvedor Web"', completed: false, currentText: '' },
    { prompt: '>_', content: ' echo Olá! meu nome é ${nome}, sou um ${perfil} e estudante de ${curso}.', completed: false, currentText: '' }
  ];

  const [displayLines, setDisplayLines] = useState<TerminalLine[]>(terminalLines);

  // Typing animation effect
  useEffect(() => {
    if (animationComplete) return;

    const typingSpeed = 100; // milliseconds per character
    const lineDelay = 800; // delay between lines

    const timer = setTimeout(() => {
      if (currentLineIndex >= terminalLines.length) {
        // All lines completed, start fade out animation
        setTimeout(() => {
          setAnimationComplete(true);
          setTimeout(() => {
            setShowFinalMessage(true);
          }, 1000); // Wait 1 second before showing final message
        }, 1500); // Wait 1.5 seconds after completing all lines
        return;
      }

      const currentLine = terminalLines[currentLineIndex];
      const targetText = currentLine.content;

      if (currentCharIndex < targetText.length) {
        // Continue typing current line
        setDisplayLines(prev =>
          prev.map((line, index) =>
            index === currentLineIndex
              ? { ...line, currentText: targetText.substring(0, currentCharIndex + 1) }
              : line
          )
        );
        setCurrentCharIndex(prev => prev + 1);
      } else {
        // Current line complete, move to next line
        setDisplayLines(prev =>
          prev.map((line, index) =>
            index === currentLineIndex
              ? { ...line, completed: true }
              : line
          )
        );
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }
    }, currentCharIndex === 0 && currentLineIndex > 0 ? lineDelay : typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, animationComplete]);

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(cursorTimer);
  }, []);

  // Initialize skill positions - responsive to screen size
  useEffect(() => {
    const updateSkillPositions = () => {
      const screenWidth = window.innerWidth;
      const basePositions = [
        { baseX: 0.3, baseY: 0.6, id: 1, size: 'large', vx: 0.5, vy: 0.3 },
        { baseX: 0.6, baseY: 0.4, id: 2, size: 'medium', vx: -0.4, vy: 0.6 },
        { baseX: 0.8, baseY: 0.7, id: 3, size: 'medium', vx: 0.3, vy: -0.4 },
        { baseX: 0.4, baseY: 0.3, id: 4, size: 'small', vx: -0.6, vy: 0.2 },
        { baseX: 0.7, baseY: 0.5, id: 5, size: 'large', vx: 0.2, vy: 0.5 },
        { baseX: 0.5, baseY: 0.8, id: 6, size: 'large', vx: -0.3, vy: -0.3 },
        { baseX: 0.85, baseY: 0.45, id: 7, size: 'large', vx: 0.4, vy: 0.4 },
        { baseX: 0.65, baseY: 0.75, id: 8, size: 'large', vx: -0.2, vy: -0.5 }
      ];

      const skillsAreaWidth = Math.min(screenWidth - 298, 800); // Account for padding
      const skillsAreaHeight = 300;

      const initialSkills: SkillPosition[] = basePositions.map(pos => ({
        x: pos.baseX * skillsAreaWidth + 50,
        y: pos.baseY * skillsAreaHeight + 50,
        id: pos.id,
        size: pos.size as 'small' | 'medium' | 'large',
        vx: pos.vx,
        vy: pos.vy
      }));

      setSkills(initialSkills);
    };

    updateSkillPositions();
    window.addEventListener('resize', updateSkillPositions);
    return () => window.removeEventListener('resize', updateSkillPositions);
  }, []);

  // Auto-movement animation
  useEffect(() => {
    const interval = setInterval(() => {
      setSkills(prevSkills =>
        prevSkills.map(skill => {
          let newX = skill.x + skill.vx;
          let newY = skill.y + skill.vy;
          let newVx = skill.vx;
          let newVy = skill.vy;

          // Bounce off boundaries
          if (newX <= 300 || newX >= 900) {
            newVx = -skill.vx;
          }
          if (newY <= 200 || newY >= 400) {
            newVy = -skill.vy;
          }

          return {
            ...skill,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const skillsElement = skillsRef.current;
    if (skillsElement) {
      skillsElement.addEventListener('mousemove', handleMouseMove);
      return () => skillsElement.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  // Calculate skill positions with mouse influence
  const getSkillStyle = (skill: SkillPosition) => {
    const mouseInfluence = 50;
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - skill.x, 2) + Math.pow(mousePosition.y - skill.y, 2)
    );

    let offsetX = 0;
    let offsetY = 0;

    if (distance < mouseInfluence && distance > 0) {
      const force = (mouseInfluence - distance) / mouseInfluence;
      offsetX = ((skill.x - mousePosition.x) / distance) * force * 20;
      offsetY = ((skill.y - mousePosition.y) / distance) * force * 20;
    }

    const sizeMap = {
      small: '20px',
      medium: '24px',
      large: '32px'
    };

    // Centraliza a bola principal (id: 1)
    if (skill.id === 1) {
      return {
        position: 'absolute' as const,
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: sizeMap[skill.size],
        color: '#F4E8D8',
        zIndex: 2,
        textAlign: 'center' as const,
        transition: 'all 0.1s ease-out'
      };
    }

    return {
      position: 'absolute' as const,
      left: `${skill.x + offsetX}px`,
      top: `${skill.y + offsetY}px`,
      fontSize: sizeMap[skill.size],
      transition: 'all 0.1s ease-out',
      color: '#F4E8D8'
    };
  };

  return (
    <div className="min-h-screen bg-dark-bg text-cream">
      {/* Hero Section */}
      <div className="relative overflow-hidden min-h-[600px] lg:min-h-[500px]">
        {/* Background circles */}
        <div className="absolute left-4 lg:left-[71px] top-[59px] w-[150px] h-[150px] lg:w-[232px] lg:h-[232px] rounded-full bg-gradient-to-br from-teal-primary via-teal-primary/50 to-transparent"></div>

        {/* Profile Image */}
        <div
          className="absolute right-4 lg:right-[68px] top-[102px] w-[200px] h-[260px] lg:w-[312px] lg:h-[410px] bg-cover bg-center rounded-lg lg:rounded-none"
          style={{
            backgroundImage: `url('/Intersect (1).png)`,
          }}
        ></div>

        {/* Terminal Code */}
        <div className="pt-[80px] lg:pt-[135px] px-4 lg:pl-[167px] lg:pr-4">
          <div className="font-mono text-lg sm:text-2xl lg:text-[32px] leading-[1.27] max-w-full lg:max-w-[990px] min-h-[200px]">
            {!showFinalMessage ? (
              // Typing Animation
              <div
                className={`transition-opacity duration-1000 ${animationComplete ? "opacity-0" : "opacity-100"}`}
              >
                {displayLines.map((line, index) => (
                  <div
                    key={index}
                    className={`mb-2 transition-opacity duration-300 ${index <= currentLineIndex ? "opacity-100" : "opacity-30"}`}
                  >
                    <span className="text-green-terminal">{line.prompt}</span>
                    <span className="text-cream">
                      {line.completed ? line.content : line.currentText}
                      {index === currentLineIndex &&
                        !line.completed &&
                        showCursor && (
                          <span className="text-green-terminal ml-1">|</span>
                        )}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              // Final Message
              <div
                className="opacity-0"
                style={{ animation: "fadeIn 1.5s ease-in-out 0.3s forwards" }}
              >
                <div className="text-cream text-center lg:text-left leading-relaxed">
                  Olá! meu nome é{" "}
                  <span className="text-teal-accent font-semibold">
                    J Gabriel
                  </span>
                  , sou um{" "}
                  <span className="text-teal-accent font-semibold">
                    Desenvolvedor Web
                  </span>{" "}
                  e estudante de{" "}
                  <span className="text-teal-accent font-semibold">
                    Ciência da Computação
                  </span>
                  .
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Button */}
        <div className="absolute left-1/2 transform -translate-x-1/2 lg:left-auto lg:transform-none lg:right-[602px] top-[420px] lg:top-[393px]">
          <button className="px-6 lg:px-8 py-2 bg-cream text-dark-bg rounded-[10px] text-xl lg:text-2xl font-medium hover:bg-cream/90 transition-colors">
            Contatos
          </button>
        </div>

        {/* Decorative oval behind button - hidden on mobile */}
        <div className="hidden lg:block absolute left-[-68px] top-[425px] w-[469px] h-[51px] rounded-full bg-teal-primary/33"></div>
      </div>

      {/* Divider */}
      <div className="mt-[100px] lg:mt-[186px] px-4 lg:px-[149px]">
        <div className="w-full h-[1px] bg-teal-primary"></div>
      </div>

      {/* Skills Section */}
      <div className="px-4 lg:px-[149px] mt-[50px] lg:mt-[75px] mb-[50px] lg:mb-[75px]">
        <h2 className="text-2xl lg:text-[32px] font-sans text-cream mb-[50px] lg:mb-[77px]">
          Principais Skills
        </h2>

        {/* Skills Animation Area */}
        <div
          ref={skillsRef}
          className="relative h-[400px] lg:h-[500px] overflow-visible flex items-center justify-center"
        >
          {/* Background circles */}
          <div className="absolute left-[50%] lg:left-[321px] top-[30px] transform -translate-x-1/2 lg:transform-none w-[300px] lg:w-[433px] h-[300px] lg:h-[433px] rounded-full bg-gradient-to-b from-gradient-teal to-transparent"></div>
          <div className="hidden lg:block absolute right-[-68px] top-[24px] w-[444px] h-[51px] rounded-full bg-gradient-teal/20"></div>

          {skills.map((skill) => (
            <div
              key={skill.id}
              style={getSkillStyle(skill)}
              className="font-sans select-none pointer-events-none"
            >
              Javascript
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="px-4 lg:px-[149px]">
        <div className="w-full h-[1px] bg-teal-primary"></div>
      </div>

      {/* Projects Section */}
      <div className="px-4 lg:px-[149px] mt-[50px] lg:mt-[75px] mb-[50px] lg:mb-[100px]">
        <h2 className="text-2xl lg:text-[32px] font-sans text-cream mb-[50px] lg:mb-[77px]">
          Principais projetos
        </h2>

        {/* Alinhamento perfeito em grid, itens clicáveis (botões) */}
        <div className="relative py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-10">
            {[0, 1, 2].map((index) => (
              <ProjectCard
                key={index}
                title={`Card ${index + 1}`}
                selected={selectedCard === index}
                onClick={() => handleCardClick(index)}
                ariaLabel={`Projeto ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-[60px] lg:mt-[109px] max-w-[903px] mx-auto px-4 lg:px-0">
          <div className="border-l border-white/25 pl-6">
            <p className="text-cream/95 text-lg lg:text-2xl leading-relaxed transition-opacity duration-300">
              {selectedCard !== null
                ? descriptions[selectedCard]
                : descriptions[0]}
            </p>
          </div>
        </div>

        {/* Additional Projects Link */}
        <div className="mt-[24px] lg:mt-[36px] text-center">
          <a
            href="https://github.com/jgabirel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream/90 text-lg lg:text-xl underline decoration-dotted underline-offset-4 hover:text-cream"
          >
            Outro projetos disponíveis em &lt;github.com/jgabirel&gt;
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-darker-bg py-8 lg:h-[189px] flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 px-4">
          {/* Contact Icons */}
          <div className="flex flex-row lg:flex-col gap-4">
            <div className="w-[60px] h-[60px] lg:w-[79px] lg:h-[79px] rounded-full bg-gradient-to-br from-teal-primary to-transparent flex items-center justify-center">
              <EmailIcon className="text-teal-secondary text-3xl lg:text-4xl" />
            </div>
            <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-teal-primary to-transparent flex items-center justify-center">
              <PhoneAndroidIcon className="text-teal-secondary text-xl lg:text-2xl" />
            </div>
            <div className="w-[44px] h-[44px] rounded-full bg-gradient-to-br from-teal-primary to-transparent flex items-center justify-center">
              <GitHubIcon className="text-teal-secondary text-xl lg:text-2xl" />
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-cream text-center lg:text-left">
            <div className="text-lg lg:text-xl mb-2 lg:mb-3 break-words">
              jayme.gabriel@gmail.com
            </div>
            <div className="text-lg lg:text-xl mb-2 lg:mb-3">
              (87) 91205-8745
            </div>
            <div className="text-lg lg:text-xl break-words">
              github.com/jgabirel
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
