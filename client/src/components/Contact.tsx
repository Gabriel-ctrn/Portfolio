import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mnnbldan", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        toast({
          title: "Mensagem enviada com sucesso!",
          description: "Obrigado pelo contato. Responderei em breve.",
        });

        form.reset();
      } else {
        toast({
          title: "Erro ao enviar mensagem",
          description: "Tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Erro ao enviar:", error);
      toast({
        title: "Erro de conexão",
        description: "Verifique sua conexão e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleSocialClick = (platform: string) => {
    console.log(`Opening ${platform} profile`);
  };

  return (
    <section id="contact" className="py-20 relative bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Entre em <span className="gradient-text">Contato</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tem algum projeto em mente? Vamos conversar e criar algo incrível
            juntos!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          <div className="space-y-8 animate-slide-up">
            <div>
              <h3 className="text-2xl font-semibold mb-6">
                Vamos trabalhar juntos
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Estou sempre aberto a novas oportunidades e projetos
                interessantes. Se você tem uma ideia ou precisa de ajuda com
                desenvolvimento web, não hesite em entrar em contato.
              </p>
            </div>

            <div className="space-y-6">
              <div
                className="flex items-center space-x-4"
                data-testid="contact-email"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
                    href="mailto:jaymegabriel765@gmail.com"
                    className="text-muted-foreground underline hover:text-primary transition-colors"
                  >
                    jaymegabriel765@gmail.com
                  </a>
                </div>
              </div>

              <div
                className="flex items-center space-x-4"
                data-testid="contact-phone"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-phone text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium">Telefone</h4>
                  <a
                    href="https://wa.me/5587998037705"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground underline hover:text-primary transition-colors"
                  >
                    (87) 99803-7705
                  </a>
                </div>
              </div>

              <div
                className="flex items-center space-x-4"
                data-testid="contact-location"
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                  <i className="fas fa-map-marker-alt text-primary"></i>
                </div>
                <div>
                  <h4 className="font-medium">Localização</h4>
                  <p className="text-muted-foreground">Brasil</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">Me encontre nas redes</h4>
              <div className="flex space-x-4">
                <a
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  href="https://github.com/Gabriel-ctrn"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-github"
                  aria-label="GitHub"
                >
                  <i className="fab fa-github"></i>
                </a>
                <a
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  href="https://www.linkedin.com/in/jayme-carvalho-b08506177/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-linkedin"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin-in"></i>
                </a>
               
                <a
                  className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
                  href="https://www.instagram.com/jaymecarvalho7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="social-instagram"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>

          <div
            className="glass-card p-8 rounded-lg animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              data-testid="contact-form"
            >
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="Seu nome"
                    required
                    data-testid="input-name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                    placeholder="seu@email.com"
                    required
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Assunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200"
                  placeholder="Assunto da mensagem"
                  required
                  data-testid="input-subject"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-foreground mb-2"
                >
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Conte-me sobre seu projeto..."
                  required
                  data-testid="input-message"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground py-3 px-6 rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed"
                data-testid="button-submit"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Enviando...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
