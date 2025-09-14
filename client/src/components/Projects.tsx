import { useState } from "react";
import ProjectCard from "./ProjectCard";
import image1 from "../images/ecommerce.png"
import image2 from "../images/academia.jpg"
import image3 from "../images/knowyourfan.png"
import image4 from "../images/furiabot.webp"
import image5 from "../images/portfolio.png"

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description: "Dashboard completo para gerenciamento de e-commerce com análises em tempo real e interface intuitiva.",
      image: image1,
      tags: ["TypeScript", "Java", "SpringBoot"],
      category: "web",
      demoUrl: "#",
      githubUrl: "https://github.com/Gabriel-ctrn/IndiePeak-",
    },
    {
      id: 2,
      title: "V-fitness",
      description: "Aplicativo mobile de gestão de treino e assistente inteligente.",
      image: image2,
      tags: ["React Native", "TypeScript", "Kotlin", "SpringBoot"],
      category: "mobile",
      demoUrl: "#",
      githubUrl: "https://github.com/Gabriel-ctrn/v-fitness",
    },
    {
      id: 3,
      title: "Know your fan",
      description: "Este projeto tem como objetivo principal criar uma solução para a FURIA identificar e classificar seus fãs com base em interações em redes sociais e avaliações de produtos, promovendo engajamento com uma mecânica de gamificação.",
      image: image3,
      tags: ["Typescript", "React", "Node.js", "APIs"],
      category: "web",
      demoUrl: "#",
      githubUrl: "https://github.com/Gabriel-ctrn/Know-your-fan",
    },
    {
      id: 4,
      title: "RadarFURIA",
      description: "O RadarFURIA é um bot para Telegram que permite aos fãs da FURIA e do CS2 se manterem atualizados com as últimas notícias, próximas partidas, estatísticas, curiosidades e quizzes interativos sobre a equipe.",
      image: image4,
      tags: ["Puppeteer", "API Integration", "Node.js"],
      category: "web e mobile",
      demoUrl: "#",
      githubUrl: "https://github.com/Gabriel-ctrn/furiabot",
    },
    {
      id: 5,
      title: "Portfolio",
      description: "Este projeto é o meu portfólio, feito com tecnologias eficientes e robustas, sempre aproveitando ao máximo o poder da inteligência artificial.",
      image: image5,
      tags: ["TypeScript", "React"],
      category: "web e mobile",
      demoUrl: "#",
      githubUrl: "https://github.com/Gabriel-ctrn/Portfolio",
    },
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  const handleViewMore = () => {
    window.open("https://github.com/Gabriel-ctrn?tab=repositories", "_blank");
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Meus <span className="gradient-text">Projetos</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Alguns dos projetos que desenvolvi, demonstrando minhas habilidades e criatividade
          </p>
        </div>

        

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              animationDelay={index * 0.1}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105"
            onClick={handleViewMore}
            data-testid="button-view-more"
          >
            Ver Mais Projetos
          </button>
        </div>
      </div>
    </section>
  );
}
