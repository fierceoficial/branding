import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  Menu, 
  X, 
  ShieldCheck, 
  TrendingUp, 
  BarChart3, 
  Clock, 
  ArrowRight,
  Globe, 
  Lock, 
  Check, 
  Mail, 
  Instagram,
  Send
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Branding Constants
const LOGO_URL = "https://raw.githubusercontent.com/fierceoficial/branding/main/LOGO%20FIERCE.png";
const BRAND_NAME = "FIERCE";
const COMMERCIAL_EMAIL = "contato@fierceoficial.com";

// Types
interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, benefits }) => (
  <div className="group p-8 border border-white/10 rounded-2xl hover:border-white/30 transition-all duration-500 hover:bg-white/[0.02] bg-black">
    <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
      <div className="text-white">
        {icon}
      </div>
    </div>
    <h3 className="text-lg font-bold mb-4 text-white uppercase tracking-tight">{title}</h3>
    <p className="text-gray-400 mb-6 leading-relaxed text-[13px]">{description}</p>
    <ul className="space-y-3">
      {benefits.map((benefit, idx) => (
        <li key={idx} className="flex items-center gap-2 text-[10px] text-gray-500 uppercase tracking-wider">
          <ShieldCheck className="w-3 h-3 text-white/40" />
          {benefit}
        </li>
      ))}
    </ul>
  </div>
);

const TermsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-black border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl silver-glow scrollbar-hide">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="space-y-12">
          <div>
            <div className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-8">{BRAND_NAME}</div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">TERMOS DE USO</h2>
            <div className="h-px w-24 bg-white/20"></div>
          </div>

          <div className="space-y-10 text-gray-400 text-[13px] leading-relaxed font-light uppercase tracking-wide">
            <p className="text-white font-bold text-[10px] tracking-[0.2em]">AO NAVEGAR NESTE SITE, VOCÊ CONCORDA COM AS SEGUINTES REGRAS:</p>
            
            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">PROPRIEDADE</h3>
              <p>Todo o conteúdo (textos e imagens) pertence a Fierce.</p>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">USO ADEQUADO</h3>
              <p>Você se compromete a usar o formulário de contato apenas para fins lícitos e solicitações reais.</p>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">RESPONSABILIDADE</h3>
              <p>Não nos responsabilizamos por links externos ou má utilização das informações contidas aqui.</p>
            </section>

            <section className="pb-8">
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">ALTERAÇÕES</h3>
              <p>Podemos atualizar estes termos a qualquer momento.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const PrivacyModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-black border border-white/10 w-full max-w-3xl max-h-[80vh] overflow-y-auto rounded-3xl p-8 md:p-12 shadow-2xl silver-glow scrollbar-hide">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="space-y-12">
          <div>
            <div className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-8">{BRAND_NAME}</div>
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">POLÍTICA DE PRIVACIDADE E COOKIES</h2>
            <div className="h-px w-24 bg-white/20"></div>
          </div>

          <div className="space-y-10 text-gray-400 text-[13px] leading-relaxed font-light uppercase tracking-wide">
            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">1. COMPROMISSO COM A SUA PRIVACIDADE</h3>
              <p>A sua privacidade é prioridade para a Fierce. Esta Política explica como coletamos, utilizamos e protegemos seus data pessoais ao acessar nosso site https://www.fierceoficial.com, em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">2. COLETA DE DADOS E TECNOLOGIAS DE RASTREAMENTO</h3>
              <p className="mb-4">Para oferecer uma experiência personalizada, coletamos informações de duas formas:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Dados Fornecidos Voluntariamente:</strong> Nome, e-mail e telefone enviados por você através de nossos formulários de contato ou orçamentos.</li>
                <li><strong className="text-white">Dados de Navegação (Cookies e Pixels):</strong> Utilizamos ferramentas como Google Analytics, Google Ads e Meta Pixel (Facebook). Elas coletam data anônimos (como IP, tipo de dispositivo e páginas visitadas) para entendermos o desempenho do site e exibirmos anúncios relevantes para você.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">3. USO DE COOKIES</h3>
              <p className="mb-4">Cookies são arquivos que nos ajudam a reconhecer seu navegador. Nós os utilizamos para:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Analítica: Medir quantas pessoas visitam o site.</li>
                <li>Marketing (Remarketing): Mostrar anúncios dos nossos serviços para você em outras plataformas após sua visita.</li>
              </ul>
              <p className="mt-4">Você pode gerenciar ou desativar os cookies nas configurações do seu navegador a qualquer momento.</p>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">4. FINALIDADE DO TRATAMENTO</h3>
              <p className="mb-4">Seus data são usados exclusivamente para:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Responder às suas dúvidas e solicitações.</li>
                <li>Melhorar a navegação e a segurança do nosso site.</li>
              </ul>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">5. COMPARTILHAMENTO E SEGURANÇA</h3>
              <p>Não vendemos seus data. Compartilhamos informações apenas com plataformas de tecnologia essenciais (Google e Meta) que seguem padrões rigorosos de segurança. Seus data são protegidos por criptografia e armazenados em ambiente seguro.</p>
            </section>

            <section>
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">6. SEUS DIREITOS (LGPD)</h3>
              <p>Você tem o direito de, a qualquer momento, solicitar o acesso, a correção ou a exclusão dos seus data de nossa base, bem como revogar seu consentimento de contato.</p>
            </section>

            <section className="pb-8">
              <h3 className="text-white font-black mb-4 text-[11px] tracking-[0.2em]">7. CONTATO E ENCARREGADO DE DADOS</h3>
              <p>Para qualquer dúvida ou solicitarão sobre seus data pessoais, entre em contato pelo e-mail: <span className="text-white font-bold">diretoria@fierceoficial.com</span>.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [assessmentText, setAssessmentText] = useState("");
  const [assessmentResult, setAssessmentResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);
  
  // Footer Newsletter States
  const [footerEmail, setFooterEmail] = useState("");
  const [footerAgreed, setFooterAgreed] = useState(false);

  // Lógica de Cookies
  useEffect(() => {
    if (!localStorage.getItem('cookies-aceitos')) {
      setShowCookieBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookies-aceitos', 'true');
    setShowCookieBanner(false);
  };

  const declineCookies = () => {
    setShowCookieBanner(false);
  };

  // Helper para rolagem suave precisa
  const handleScroll = (e: React.MouseEvent<HTMLElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMenuOpen(false);
    }
  };

  const handleAssessment = async () => {
    if (!assessmentText.trim() || !isAgreed) return;
    setIsLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Você é um consultor financeiro de elite da FIERCE, uma consultoria premium para criadores digitais e profissionais de alta performance.
        Analise este perfil/situação e forneça uma avaliação "FIERCE" breve e profissional sobre estabilidade e proteção de legado em PORTUGUÊS. 
        Foque em identificar riscos de volatilidade e sugerir escala estratégica.
        Mantenha abaixo de 120 palavras. Seja direto, sofisticado e autoritário.
        
        Perfil do Cliente: ${assessmentText}`,
        config: {
          temperature: 0.7,
        }
      });
      setAssessmentResult(response.text || "Não foi possível gerar um diagnóstico no momento.");
    } catch (error) {
      console.error("Falha na avaliação", error);
      setAssessmentResult("Estamos com alta demanda de consultas de elite. Por favor, tente novamente em instantes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendToExpert = () => {
    if (!assessmentResult) return;
    
    const subject = encodeURIComponent("SOLICITAÇÃO DE CONSULTORIA - DIAGNÓSTICO FIERCE");
    const body = encodeURIComponent(`Olá equipe FIERCE,\n\nRecebi o seguinte diagnóstico preliminar através do site e gostaria de agendar uma consulta estratégica para aprofundar minha estrutura financeira:\n\n---\nDIAGNÓSTICO GERADO:\n${assessmentResult}\n---\n\nAguardo o contato para os próximos passos.\n\nAtenciosamente,`);
    
    window.location.href = `mailto:${COMMERCIAL_EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleNewsletterSubmit = () => {
    if (!footerEmail.trim() || !footerAgreed) return;
    
    const subject = encodeURIComponent("INSCRIÇÃO NEWSLETTER - FIERCE");
    const body = encodeURIComponent(`Olá equipe FIERCE,\n\nGostaria de me inscrever na newsletter exclusiva para receber insights estratégicos.\n\nE-mail para cadastro: ${footerEmail}\n\nAtenciosamente,`);
    
    window.location.href = `mailto:${COMMERCIAL_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <PrivacyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
      
      {/* Navigation - Fixed header height maintained, image logo kept as per user request */}
      <nav className="fixed w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/5 px-[5%] flex justify-between items-center transition-all duration-300 h-[80px] md:h-[100px]">
        <div className="flex-shrink-0 flex items-center h-full">
          <a href="#" className="flex items-center" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <img 
              src={LOGO_URL} 
              alt="FIERCE Logo" 
              className="h-[120px] md:h-[180px] w-auto object-contain transition-transform hover:scale-[1.03] mt-[10px]" 
            />
          </a>
        </div>
        
        <div className="hidden md:flex items-center space-x-12">
          <a href="#philosophy" onClick={(e) => handleScroll(e, 'philosophy')} className="text-gray-500 hover:text-white transition-colors text-[11px] font-medium tracking-[0.3em] uppercase">FILOSOFIA</a>
          <a href="#services" onClick={(e) => handleScroll(e, 'services')} className="text-gray-500 hover:text-white transition-colors text-[11px] font-medium tracking-[0.3em] uppercase">ESTRATÉGIAS</a>
          <a href="#assessment" onClick={(e) => handleScroll(e, 'assessment')} className="text-gray-500 hover:text-white transition-colors text-[11px] font-medium tracking-[0.3em] uppercase">DIAGNÓSTICO</a>
          <a href="#footer-contact" onClick={(e) => handleScroll(e, 'footer-contact')} className="bg-white text-black px-10 py-3 rounded-full font-black text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 uppercase inline-block">
            CONTATO
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black border-t border-white/10 px-4 py-8 space-y-6 text-center animate-in fade-in slide-in-from-top-4">
            <a href="#philosophy" onClick={(e) => handleScroll(e, 'philosophy')} className="block text-gray-400 text-[12px] font-bold tracking-[0.3em] uppercase">FILOSOFIA</a>
            <a href="#services" onClick={(e) => handleScroll(e, 'services')} className="block text-gray-400 text-[12px] font-bold tracking-[0.3em] uppercase">ESTRATÉGIAS</a>
            <a href="#assessment" onClick={(e) => handleScroll(e, 'assessment')} className="block text-gray-400 text-[12px] font-bold tracking-[0.3em] uppercase">DIAGNÓSTICO</a>
            <a href="#footer-contact" onClick={(e) => handleScroll(e, 'footer-contact')} className="block w-full bg-white text-black py-4 rounded-full font-black text-[12px] tracking-[0.2em] uppercase">CONTATO</a>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-[80px] pb-20 md:pt-[100px] md:pb-32 bg-gradient-dark relative overflow-hidden min-h-[80vh] flex flex-col items-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full translate-x-1/2"></div>
          <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full -translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center pt-16 md:pt-24">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block text-gray-500 font-light tracking-[0.4em] text-[9px] uppercase mb-6 animate-pulse px-4">ESTRUTURAÇÃO PATRIMONIAL ESTRATÉGICA</span>
            <h1 className="text-4xl sm:text-7xl md:text-8xl font-black text-white leading-[1.1] md:leading-[0.9] tracking-tighter mb-6 md:mb-8 uppercase px-4">
              TRANSFORME <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-white" style={{WebkitBackgroundClip: 'text', backgroundClip: 'text'}}>O HYPE EM</span> <br />
              PERMANÊNCIA.
            </h1>
            <div className="max-w-xl mx-auto mb-10 md:mb-12 px-4">
              <p className="text-[11px] md:text-[13px] text-gray-400 leading-relaxed font-light uppercase tracking-[0.2em] mb-4">
                Consultoria estratégica para criadores digitais, empresários e profissionais de alta performance que exigem legado, não apenas liquidez passageira.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 justify-center px-4">
              <a href="#assessment" onClick={(e) => handleScroll(e, 'assessment')} className="bg-white text-black px-12 md:px-14 py-4 md:py-5 rounded-full font-black text-[11px] md:text-xs tracking-[0.2em] hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group uppercase text-center">
                INICIAR CONSULTA <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="#services" onClick={(e) => handleScroll(e, 'services')} className="bg-transparent border border-white/20 text-white px-12 md:px-14 py-4 md:py-5 rounded-full font-bold text-[11px] md:text-xs tracking-[0.2em] hover:bg-white/5 transition-all uppercase flex items-center justify-center text-center">
                VER SERVIÇOS
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section id="about" className="py-32 bg-neutral-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-2 lg:gap-24 items-center">
          <div>
            <span className="text-white font-black tracking-[0.5em] text-[10px] uppercase mb-6 block border-l-2 border-white pl-4">MANIFESTO FIERCE</span>
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-white leading-tight uppercase tracking-tight">A VULNERABILIDADE DO SUCESSO DIGITAL</h2>
            <p className="text-base text-gray-400 mb-10 leading-relaxed">
              O sucesso digital costuma ser explosivo, mas é intrinsecamente volátil. Sem uma base financeira estruturada, o "hype" de hoje torna-se o passivo de amanhã.
            </p>
            <div className="space-y-8">
              {[
                { title: "O PROBLEMA", text: "Criadores de alta performance enfrentam vieses comportamentais, complexidades tributárias e oscilações de receita." },
                { title: "A SOLUÇÃO", text: "Um diagnóstico cirúrgico da sua posição financeira para total clareza e blindagem do seu futuro." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
                    <Lock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-white mb-2 text-[11px] tracking-widest uppercase">{item.title}</h4>
                    <p className="text-gray-500 text-[13px] leading-relaxed">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group mt-16 lg:mt-0">
            <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img 
              src="https://images.unsplash.com/photo-1554469384-e58fac16e23a?q=80&w=1974&auto=format&fit=crop" 
              alt="Architecture stability" 
              className="rounded-2xl shadow-2xl grayscale brightness-75 relative z-10 border border-white/10"
            />
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-2xl max-w-xs border border-white/10 hidden md:block z-20">
              <p className="text-[11px] italic text-black font-medium mb-4 leading-loose uppercase tracking-tighter">
                "Riqueza é o que você não vê."
              </p>
              <div className="font-black text-black text-[9px] tracking-[0.5em] uppercase">— MORGAN HOUSEL</div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Block Section */}
      <section id="philosophy" className="py-48 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tighter">FILOSOFIA</h2>
            <p className="text-base text-gray-400 leading-relaxed font-light">
              Na Fierce, números são apenas a base; nossa entrega é a blindagem do seu legado. Convertemos o caos do digital em solidez patrimonial, separando o palco da realidade financeira. Assumimos a sua retaguarda para que o seu único movimento seja avançar.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-neutral-950 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <h2 className="text-3xl font-black text-white mb-4 uppercase tracking-tighter">NOSSOS PILARES</h2>
              <p className="text-gray-500 uppercase text-[10px] tracking-[0.3em]">ESTRATÉGIAS DESENHADAS PARA O TOPO DA PIRÂMIDE</p>
            </div>
            <div className="h-[1px] flex-grow bg-white/10 mx-8 hidden md:block mb-4"></div>
            <div className="text-right">
              <span className="text-white/20 font-black text-5xl">03</span>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            <ServiceCard 
              icon={<ShieldCheck className="w-8 h-8" />}
              title="Diagnóstico FIERCE"
              description="Um check-up de precisão da sua saúde financeira. Descobrimos vazamentos, ineficiências fiscais e riscos ocultos no seu patrimônio."
              benefits={["Auditoria de Ativos", "Plano de Eficiência Fiscal", "Mitigação de Riscos"]}
            />
            <ServiceCard 
              icon={<Clock className="w-8 h-8" />}
              title="Gestão Recorrente"
              description="Acompanhamento proativo e 'hands-off' para garantir crescimento implacável e controle total sobre suas receitas recorrentes."
              benefits={["Monitoramento Mensal", "Otimização de Fluxo", "Estratégia de Crescimento"]}
            />
            <ServiceCard 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Estratégia CFO"
              description="Serviços de CFO fracionado para tomada de decisão em alto nível. Escale sua operação sem perder o controle dos números."
              benefits={["Escala Estratégica", "Modelagem Financeira", "Aconselhamento de Investimento"]}
            />
          </div>
        </div>
      </section>

      {/* AI Assessment Section */}
      <section id="assessment" className="py-32 bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-white text-[10px] font-black tracking-[0.4em] mb-12 uppercase">
            <Globe className="w-3 h-3 animate-pulse" />
            MOTOR DE DIAGNÓSTICO
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-10 uppercase tracking-tighter">QUAL O SEU <br /><span className="text-white/40">STATUS FIERCE?</span></h2>
          <p className="text-gray-500 mb-16 text-base font-light leading-relaxed px-4">
            Descreva sua estrutura atual de receita digital ou um desafio financeiro que esteja enfrentando. Nossa inteligência fornecerá uma avaliação inicial baseada na metodologia FIERCE.
          </p>

          <div className="max-w-3xl mx-auto mb-12">
            <div className="relative group mb-8">
              <div className="absolute -inset-1 bg-gradient-to-r from-white/20 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <textarea 
                value={assessmentText}
                onChange={(e) => setAssessmentText(e.target.value)}
                placeholder="Ex: Sou um criador com 1M de seguidores, faturo R$ 100k/mês mas não tenho clareza sobre minha tributação e investimentos..."
                className="w-full bg-black border border-white/10 rounded-2xl p-8 text-white placeholder-gray-700 focus:outline-none focus:border-white/40 h-52 transition-all resize-none relative z-10 text-[13px] leading-relaxed"
              />
            </div>
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 px-2">
              <div className="flex items-start gap-4 text-left max-w-md">
                 <div className="relative flex items-center justify-center pt-1 flex-shrink-0">
                  <input 
                    type="checkbox" 
                    id="agree-diagnostico"
                    checked={isAgreed}
                    onChange={(e) => setIsAgreed(e.target.checked)}
                    className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-black/50 checked:bg-white transition-all cursor-pointer"
                  />
                  <Check className="w-3 h-3 text-black absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                 </div>
                 <label htmlFor="agree-diagnostico" className="text-[9px] text-gray-600 font-bold tracking-widest uppercase cursor-pointer select-none leading-relaxed">
                    Ao clicar em 'Obter Diagnóstico', você concorda com nossa <button onClick={(e) => { e.preventDefault(); setIsPrivacyModalOpen(true); }} className="text-white/40 hover:text-white transition-colors underline decoration-white/10">Política de Privacidade</button> e <button onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }} className="text-white/40 hover:text-white transition-colors underline decoration-white/10">Termos de Uso</button>.
                 </label>
              </div>

              <button 
                onClick={handleAssessment}
                disabled={isLoading || !assessmentText.trim() || !isAgreed}
                className="w-full md:w-auto bg-white text-black px-8 py-3.5 rounded-full font-black text-[10px] tracking-widest flex items-center justify-center gap-3 hover:bg-gray-200 transition-all disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed uppercase shadow-2xl shrink-0"
              >
                {isLoading ? "PROCESSANDO..." : "OBTER DIAGNÓSTICO"} <TrendingUp className="w-4 h-4" />
              </button>
            </div>
          </div>

          {assessmentResult && (
            <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 text-left animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-3xl mx-auto">
              <div className="flex items-center gap-3 text-white mb-6 font-black text-[10px] tracking-[0.3em] uppercase">
                <ShieldCheck className="w-4 h-4" />
                INSIGHT ESTRATÉGICO
              </div>
              <p className="text-gray-300 leading-relaxed text-[13px] font-light mb-10">
                {assessmentResult}
              </p>
              
              <div className="h-px w-full bg-white/5 mb-10"></div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="text-left">
                  <p className="text-white font-black text-[9px] tracking-[0.2em] mb-1 uppercase">ANÁLISE COMPLETA DISPONÍVEL</p>
                  <p className="text-gray-500 text-[10px] uppercase tracking-wider">Envie este diagnóstico para um consultor e agende sua call.</p>
                </div>
                <button 
                  onClick={handleSendToExpert}
                  className="w-full sm:w-auto bg-white text-black px-10 py-4 rounded-full font-black text-[10px] tracking-[0.2em] hover:bg-gray-200 transition-all flex items-center justify-center gap-3 group uppercase shadow-xl"
                >
                  ENVIAR PARA ESPECIALISTA <Send className="w-4 h-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div 
          id="cookie-banner" 
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 w-[calc(100%-3rem)] max-w-[300px] bg-black border border-white/10 p-6 rounded-2xl shadow-2xl z-[9999] animate-in fade-in slide-in-from-bottom-12 duration-700"
        >
          <p className="text-gray-400 text-[9px] font-light leading-relaxed mb-6 uppercase tracking-wider">
            Utilizamos cookies para personalizar anúncios e melhorar a sua experiência no site. Ao continuar navegando, você concorda com a nossa <button onClick={() => setIsPrivacyModalOpen(true)} className="text-white underline decoration-white/20 underline-offset-4 font-bold">Política de Privacidade</button>.
          </p>
          <div className="flex gap-3 justify-end">
            <button 
              id="decline-cookies" 
              onClick={declineCookies}
              className="px-4 py-1.5 border border-white/10 rounded-full text-gray-500 font-black text-[8px] tracking-widest hover:text-white hover:border-white/30 transition-all uppercase"
            >
              Recusar
            </button>
            <button 
              id="accept-cookies" 
              onClick={acceptCookies}
              className="px-5 py-1.5 bg-white text-black rounded-full font-black text-[8px] tracking-widest hover:bg-gray-200 transition-all uppercase"
            >
              Aceitar
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black pt-32 pb-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-12 gap-12 items-start mb-24">
            <div className="md:col-span-4">
              <div className="text-2xl md:text-3xl font-black text-white tracking-[0.3em] mb-8 uppercase">
                {BRAND_NAME}
              </div>
              <p className="text-gray-500 max-w-sm text-[13px] leading-relaxed font-light">
                Estruturação patrimonial sob medida e planejamento tributário para quem exige o melhor. Legado acima de tudo.
              </p>
            </div>
            
            <div className="md:col-span-2 md:col-start-6">
              <h4 className="font-black text-[10px] tracking-[0.5em] mb-10 uppercase text-white/20 h-[10px] flex items-center">EXPLORAR</h4>
              <ul className="space-y-4 text-gray-500 text-[10px] font-bold tracking-widest">
                <li><a href="#philosophy" onClick={(e) => handleScroll(e, 'philosophy')} className="hover:text-white transition-colors uppercase">FILOSOFIA</a></li>
                <li><a href="#services" onClick={(e) => handleScroll(e, 'services')} className="hover:text-white transition-colors uppercase">ESTRATÉGIAS</a></li>
                <li><a href="#assessment" onClick={(e) => handleScroll(e, 'assessment')} className="hover:text-white transition-colors uppercase">DIAGNÓSTICO</a></li>
              </ul>
            </div>
            
            <div id="footer-contact" className="md:col-span-4 md:col-start-9">
              <h4 className="font-black text-[10px] tracking-[0.5em] mb-10 uppercase text-white/20 h-[10px] flex items-center">CONTATO</h4>
              
              <div className="mb-16">
                <p className="text-white/10 text-[7px] tracking-[0.4em] mb-4 uppercase font-black">INSIGHTS EXCLUSIVOS</p>
                <div className="flex border-b border-white/20 pb-3 mb-4 group focus-within:border-white transition-colors">
                  <input 
                    type="email" 
                    value={footerEmail}
                    onChange={(e) => setFooterEmail(e.target.value)}
                    placeholder="SEU MELHOR E-MAIL" 
                    className="bg-transparent border-none outline-none text-[11px] tracking-widest w-full placeholder:text-gray-800 text-white uppercase font-black"
                  />
                  <button 
                    onClick={handleNewsletterSubmit}
                    disabled={!footerEmail.trim() || !footerAgreed}
                    className="text-white hover:translate-x-1 transition-transform disabled:opacity-10 disabled:grayscale disabled:cursor-not-allowed"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-start gap-3 text-left">
                   <div className="relative flex items-center justify-center pt-1 flex-shrink-0">
                    <input 
                      type="checkbox" 
                      id="agree-footer"
                      checked={footerAgreed}
                      onChange={(e) => setFooterAgreed(e.target.checked)}
                      className="peer appearance-none w-4 h-4 rounded border border-white/20 bg-black/50 checked:bg-white transition-all cursor-pointer"
                    />
                    <Check className="w-2.5 h-2.5 text-black absolute pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" />
                   </div>
                   <label htmlFor="agree-footer" className="text-[9px] text-gray-600 font-medium tracking-tight leading-snug cursor-pointer select-none">
                      Ao clicar em enviar, você concorda com nossa <button onClick={(e) => { e.preventDefault(); setIsPrivacyModalOpen(true); }} className="text-gray-400 hover:text-white transition-colors underline decoration-white/10">Política de Privacidade</button> e <button onClick={(e) => { e.preventDefault(); setIsTermsModalOpen(true); }} className="text-gray-400 hover:text-white transition-colors underline decoration-white/10">Termos de Uso</button>.
                   </label>
                </div>
              </div>

              <div className="flex flex-col gap-8 pl-0">
                <a href={`mailto:${COMMERCIAL_EMAIL}`} className="text-white hover:text-white transition-all transform hover:scale-[1.05] flex items-center gap-5 group">
                  <Mail className="w-6 h-6 text-white group-hover:text-gray-400 transition-colors" />
                  <span className="text-[12px] font-black tracking-[0.2em] uppercase whitespace-nowrap">{COMMERCIAL_EMAIL}</span>
                </a>
                <a 
                  href="https://www.instagram.com/fierce.oficial/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white hover:text-white transition-all transform hover:scale-[1.05] flex items-center gap-5 group"
                >
                  <Instagram className="w-6 h-6 text-white group-hover:text-gray-400 transition-colors" />
                  <span className="text-[12px] font-black tracking-[0.2em] uppercase">@fierce.oficial</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] text-gray-600 font-black tracking-[0.4em] gap-10 md:gap-6 uppercase text-center md:text-left">
            <div className="flex flex-col gap-2">
              <div>© 2026 FIERCE CONSULTING | TODOS OS DIREITOS RESERVADOS.</div>
              <div>CNPJ: 64.086.463/0001-09 | SÃO PAULO-SP</div>
            </div>
            <div className="flex gap-10">
              <button onClick={() => setIsPrivacyModalOpen(true)} className="hover:text-white transition-colors">PRIVACIDADE</button>
              <button onClick={() => setIsTermsModalOpen(true)} className="hover:text-white transition-colors uppercase">TERMOS</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
