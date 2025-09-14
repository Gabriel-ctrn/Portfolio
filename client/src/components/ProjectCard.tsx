interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  demoUrl: string;
  githubUrl: string;
}

interface ProjectCardProps {
  project: Project;
  animationDelay?: number;
}

export default function ProjectCard({ project, animationDelay = 0 }: ProjectCardProps) {
  const handleCardClick = () => {
    if (project.githubUrl && project.githubUrl !== "#") {
      window.open(project.githubUrl, "_blank");
    }
  };

  return (
    <button
      type="button"
      className="project-card glass-card rounded-lg overflow-hidden group animate-scale-in text-left w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
      style={{ animationDelay: `${animationDelay}s` }}
      data-testid={`project-card-${project.id}`}
      onClick={handleCardClick}
      tabIndex={0}
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} Project`}
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          data-testid={`project-image-${project.id}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex space-x-2">
              <button
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
                onClick={e => { e.stopPropagation(); if (project.demoUrl && project.demoUrl !== "#") window.open(project.demoUrl, "_blank"); }}
                data-testid={`button-demo-${project.id}`}
              >
                <i className="fas fa-external-link-alt text-sm"></i>
              </button>
              <button
                className="bg-secondary text-secondary-foreground p-2 rounded-full hover:bg-secondary/90 transition-colors"
                onClick={e => { e.stopPropagation(); if (project.githubUrl && project.githubUrl !== "#") window.open(project.githubUrl, "_blank"); }}
                data-testid={`button-github-${project.id}`}
              >
                <i className="fab fa-github text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2" data-testid={`project-title-${project.id}`}>
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4" data-testid={`project-description-${project.id}`}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/20 text-primary text-xs rounded-full"
              data-testid={`project-tag-${project.id}-${index}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
