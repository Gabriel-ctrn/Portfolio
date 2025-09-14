export default function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Sobre <span className="gradient-text">Mim</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-up">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Sou estudante de Ciência da Computação com paixão por desenvolvimento web.
              Tenho experiência em tecnologias modernas como React, Node.js e TypeScript,
              sempre buscando criar aplicações que combinam design elegante com funcionalidade robusta.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
             Meus principais hobbies são jogar bola e videogame, assistir filmes e animes, além de treinar na academia. Gosto de manter um equilíbrio entre atividades físicas e momentos de lazer, sempre buscando diversão, descontração e também cuidar da minha saúde.
            </p>

          </div>

          <div className="space-y-6 animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <i className="fas fa-graduation-cap text-primary mr-3"></i>
                Educação
              </h3>
              <div className="space-y-4">
                <div data-testid="education-item">
                  <h4 className="font-medium">Bacharelado em andamento em Ciência da Computação</h4>
                </div>
                <span className="text-muted-foreground">Universidade Federal do Vale do São Francisco (UNIVASF)</span>
              </div>
            </div>

            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <i className="fas fa-trophy text-primary mr-3"></i>
                Objetivos
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center" data-testid="goal-ux">
                  <i className="fas fa-check-circle text-primary mr-2 text-sm"></i>
                  Aprender cada vez mais sobre tecnologia
                </li>
                <li className="flex items-center" data-testid="goal-fullstack">
                  <i className="fas fa-check-circle text-primary mr-2 text-sm"></i>
                  Usar Inteligência Artificial para eficiência
                </li>
                <li className="flex items-center" data-testid="goal-opensource">
                  <i className="fas fa-check-circle text-primary mr-2 text-sm"></i>
                  Contribuir para projetos de impacto real
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
