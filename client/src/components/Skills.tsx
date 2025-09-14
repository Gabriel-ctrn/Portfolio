export default function Skills() {
  const frontendSkills = [
    { name: "JavaScript", icon: "fab fa-js", color: "text-yellow-400" },
    {
      name: "TypeScript",
      icon: "devicon-typescript-plain colored",
      color: "text-blue-500",
    },
    { name: "React", icon: "fab fa-react", color: "text-blue-400" },
    { name: "React Native", icon: "fab fa-react", color: "text-blue-400" },
    {
      name: "CSS/Tailwind",
      icon: "devicon-tailwindcss-original",
      color: "text-sky-400",
    },
    { name: "HTML5",
      icon: "fab fa-html5",
      color: "text-orange-500" },
  ];

  const backendSkills = [
    { name: "Node.js", icon: "fab fa-node", color: "text-green-500" },
    { name: "MongoDB", icon: "devicon-mongodb-plain", color: "text-green-600" },
    { name: "SQL", icon: "fas fa-database", color: "text-blue-600" },
    {
      name: "Express.js",
      icon: "devicon-express-original",
      color: "text-gray-300",
    },
    {
      name: "Springboot",
      icon: "devicon-spring-plain",
      color: "text-green-600",
    },
    { name: "APIs REST", icon: "fas fa-cloud", color: "text-gray-400" },
  ];

  const toolsSkills = [
    { name: "Git/GitHub", icon: "fab fa-github", color: "text-white" },
    { name: "Figma", icon: "fab fa-figma", color: "text-pink-500" },
    { name: "Terminal", icon: "fas fa-terminal", color: "text-gray-300" },
    { name: "Docker", icon: "fab fa-docker", color: "text-blue-400" },
    { name: "Linux", icon: "fab fa-linux", color: "text-yellow-400" },
    {
      name: "IA + Prompts eficientes",
      icon: "fas fa-robot",
      color: "text-purple-400",
    },
    {
      name: "Metodologias ágeis",
      icon: "fas fa-project-diagram",
      color: "text-green-500",
    },
    {
      name: "Análise de requisitos",
      icon: "fas fa-search",
      color: "text-blue-400",
    },
  ];

  function splitIntoColumns<T>(
    array: T[],
    columnCount: number,
    itemsPerColumn: number
  ): T[][] {
    return Array.from({ length: columnCount }, (_, colIndex) =>
      array.slice(colIndex * itemsPerColumn, (colIndex + 1) * itemsPerColumn)
    );
  }

  return (
    <section id="skills" className="py-20 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Minhas <span className="gradient-text">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologias e ferramentas que utilizo para criar experiências
            digitais
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div
            className="glass-card p-6 rounded-lg animate-slide-up"
            data-testid="skills-frontend"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-code text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Frontend</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {splitIntoColumns(frontendSkills, 2, 4).map(
                (column, columnIndex) => (
                  <div key={columnIndex} className="space-y-3">
                    {column.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-bubble flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70"
                        data-testid={`skill-${skill.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                      >
                        <span className="flex items-center">
                          <i
                            className={`${skill.icon} ${skill.color} mr-3`}
                          ></i>
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>

          <div
            className="glass-card p-6 rounded-lg animate-slide-up"
            style={{ animationDelay: "0.1s" }}
            data-testid="skills-backend"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-server text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Backend</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {splitIntoColumns(backendSkills, 2, 4).map(
                (column, columnIndex) => (
                  <div key={columnIndex} className="space-y-3">
                    {column.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-bubble flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70"
                        data-testid={`skill-${skill.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                      >
                        <span className="flex items-center">
                          <i
                            className={`${skill.icon} ${skill.color} mr-3`}
                          ></i>
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
          <div
            className="glass-card p-6 rounded-lg animate-slide-up"
            style={{ animationDelay: "0.2s" }}
            data-testid="skills-tools"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-tools text-primary text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold">Ferramentas</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {splitIntoColumns(toolsSkills, 2, 4).map(
                (column, columnIndex) => (
                  <div key={columnIndex} className="space-y-3">
                    {column.map((skill) => (
                      <div
                        key={skill.name}
                        className="skill-bubble flex items-center justify-between p-3 bg-background/50 rounded-lg hover:bg-background/70"
                        data-testid={`skill-${skill.name
                          .toLowerCase()
                          .replace(/[^a-z0-9]/g, "-")}`}
                      >
                        <span className="flex items-center">
                          <i
                            className={`${skill.icon} ${skill.color} mr-3`}
                          ></i>
                          {skill.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
