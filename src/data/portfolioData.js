// ===================================
// PORTFOLIO DATA - Arthur Candian Rocha
// ===================================

export const personalInfo = {
  fullName: "Arthur Candian Rocha",
  displayName: "Arthur Rocha",
  title: "Full Stack Developer & Graphic Designer",
  subtitle: "Web Developer & Digital Designer",
  bio: "Estudante de Ciência da Computação no IF Sudeste MG (Previsão de conclusão: Julho/2026). Profissional híbrido com forte atuação tanto no desenvolvimento de software quanto no design gráfico e produção audiovisual. Busco integrar conhecimentos teóricos com experiências reais de mercado, focando em soluções eficientes e automação.",
  location: {
    city: "Rio Pomba",
    state: "Minas Gerais",
    country: "Brasil",
    displayText: "Rio Pomba, MG - Brasil"
  },
  availability: {
    status: "Available for projects",
    statusPT: "Disponível para projetos",
    type: "Remote & Flexible",
    preferredEngagement: "3-6 month engagements with possibility of ongoing collaboration"
  }
};

export const contactInfo = {
  email: "arthurcandian@gmail.com",
  phone: "+55 (32) 98493-0125",
  phoneFormatted: "(32) 98493-0125",
  whatsapp: "https://wa.me/5532984930125",
  social: {
    linkedin: {
      url: "https://www.linkedin.com/in/arthur-candian-rocha-3b346124a",
      username: "arthur-candian-rocha",
      displayName: "LinkedIn"
    },
    github: {
      url: "https://github.com/ArthurCRocha",
      username: "ArthurCRocha",
      displayName: "GitHub"
    },
    instagram: {
      url: "https://www.instagram.com/cand_rocha/",
      username: "@cand_rocha",
      displayName: "Instagram"
    }
  }
};

export const hardSkills = {
  frontend: {
    category: "Frontend Development",
    skills: [
      { name: "React.js", level: "advanced", icon: "⚛️" },
      { name: "Angular.js", level: "intermediate", icon: "🅰️" },
      { name: "HTML5", level: "advanced", icon: "🌐" },
      { name: "CSS3", level: "advanced", icon: "🎨" },
      { name: "Tailwind CSS", level: "intermediate", icon: "💨" },
      { name: "JavaScript", level: "advanced", icon: "📜" },
      { name: "TypeScript", level: "intermediate", icon: "📘" }
    ]
  },
  backend: {
    category: "Backend & Programming Languages",
    skills: [
      { name: "Java", level: "advanced", icon: "☕" },
      { name: "Python", level: "intermediate", icon: "🐍" },
      { name: "C++", level: "intermediate", icon: "⚙️" },
      { name: "Groovy", level: "basic", icon: "🎵" },
      { name: "Node.js", level: "intermediate", icon: "🟢" }
    ]
  },
  design: {
    category: "Design & Audiovisual",
    skills: [
      { name: "Adobe Photoshop", level: "advanced", icon: "🖼️" },
      { name: "Canva", level: "advanced", icon: "🎨" },
      { name: "Adobe Premiere", level: "intermediate", icon: "🎬" },
      { name: "CapCut", level: "intermediate", icon: "✂️" },
      { name: "Visual Identity Design", level: "advanced", icon: "🎯" },
      { name: "Document Layout", level: "advanced", icon: "📄" }
    ]
  },
  other: {
    category: "Other Skills",
    skills: [
      { name: "AI Automation", level: "intermediate", icon: "🤖" },
      { name: "Computer Assembly & Maintenance", level: "advanced", icon: "🖥️" },
      { name: "Git/GitHub", level: "advanced", icon: "📦" }
    ]
  }
};
// Fim da parte de hard skills
// Soft Skills
export const softSkills = [
  {
    name: "Comunicação Efetiva",
    nameEN: "Effective Communication",
    description: "Capacidade de transmitir ideias de forma clara e objetiva",
    icon: "💬"
  },
  {
    name: "Trabalho em Equipe",
    nameEN: "Teamwork",
    description: "Colaboração eficiente em ambientes multidisciplinares",
    icon: "🤝"
  },
  {
    name: "Visão Ampla de Mercado",
    nameEN: "Market Insight",
    description: "Compreensão holística das necessidades do mercado",
    icon: "🎯"
  }
];
// Fim da parte de soft skills

// Experiência
export const experience = [
  {
    id: 1,
    company: "Santiago TI",
    companyShort: "Santiago TI",
    position: "Suporte e Desenvolvimento",
    positionEN: "Support & Development",
    type: "full-time",
    startDate: "2025-07",
    endDate: null,
    current: true,
    duration: "Julho 2025 - Atualmente",
    durationEN: "July 2025 - Present",
    location: "Rio Pomba, MG",
    category: "Development & IT Support",
    description: "Montagem e manutenção de computadores, desenvolvimento de softwares e instalação de câmeras de segurança.",
    descriptionEN: "Computer assembly and maintenance, software development, and security camera installation.",
    responsibilities: [
      "Montagem e manutenção de computadores",
      "Desenvolvimento de softwares personalizados",
      "Instalação e configuração de sistemas de segurança"
    ],
    technologies: ["Hardware", "Software Development", "Security Systems"],
    featured: true
  },
  {
    id: 2,
    company: "Prefeitura de Rio Pomba",
    companyShort: "Prefeitura Rio Pomba",
    position: "Estagiário de Marketing",
    positionEN: "Marketing Intern",
    type: "internship",
    startDate: "2025-08",
    endDate: "2025-08",
    current: false,
    duration: "Agosto 2025 (1 mês)",
    durationEN: "August 2025 (1 month)",
    location: "Rio Pomba, MG",
    category: "Design & Marketing",
    description: "Desenvolvimento de competências em design gráfico, produção audiovisual e automações com IA. Criação de peças gráficas (banners, posts) e edição de vídeos para plataformas digitais.",
    descriptionEN: "Development of skills in graphic design, audiovisual production, and AI automation. Creation of graphic pieces (banners, posts) and video editing for digital platforms.",
    responsibilities: [
      "Design gráfico para mídias sociais",
      "Produção e edição de vídeos",
      "Implementação de automações com IA",
      "Criação de campanhas digitais"
    ],
    technologies: ["Adobe Photoshop", "Adobe Premiere", "Canva", "CapCut", "AI Tools"],
    featured: true
  },
  {
    id: 3,
    company: "Instituto Federal de Educação, Ciência e Tecnologia do Sudeste de Minas Gerais",
    companyShort: "IF Sudeste MG",
    position: "Estagiário / Designer Gráfico",
    positionEN: "Intern / Graphic Designer",
    type: "internship",
    startDate: "2023-03",
    endDate: "2025-03",
    current: false,
    duration: "Março 2023 - Março 2025",
    durationEN: "March 2023 - March 2025",
    location: "Rio Pomba, MG",
    category: "Design & Social Media",
    description: "Criação de conteúdo profissional para redes sociais, diagramação de documentos, criação de flyers, campanhas de marketing e logotipos. Colaboração na comunicação institucional.",
    descriptionEN: "Professional content creation for social media, document layout, flyer creation, marketing campaigns, and logo design. Collaboration in institutional communication.",
    responsibilities: [
      "Gestão de redes sociais institucionais",
      "Diagramação de documentos oficiais",
      "Criação de identidade visual",
      "Desenvolvimento de campanhas de marketing",
      "Design de materiais promocionais"
    ],
    technologies: ["Adobe Photoshop", "Canva", "Illustrator", "InDesign"],
    featured: true,
    year: "2023-2025"
  },
  {
    id: 4,
    company: "Metryx Tecnologia Ltda.",
    companyShort: "Metryx Tecnologia",
    position: "Estagiário em Desenvolvimento",
    positionEN: "Development Intern",
    type: "internship",
    startDate: "2024-11",
    endDate: "2025-02",
    current: false,
    duration: "Novembro 2024 - Fevereiro 2025",
    durationEN: "November 2024 - February 2025",
    location: "Remote",
    category: "Web Development",
    description: "Desenvolvimento frontend utilizando Angular.js, análise e produção de código, correção de bugs e melhoria de interface visual.",
    descriptionEN: "Frontend development using Angular.js, code analysis and production, bug fixing, and visual interface improvements.",
    responsibilities: [
      "Desenvolvimento frontend com Angular.js",
      "Análise e refatoração de código",
      "Correção de bugs e melhorias de performance",
      "Aprimoramento de interfaces de usuário"
    ],
    technologies: ["Angular.js", "TypeScript", "HTML5", "CSS3", "JavaScript"],
    featured: true,
    year: "2024-2025"
  }
];
// Fim da parte de experiência

// Educação
export const education = [
  {
    id: 1,
    degree: "Bacharelado em Ciência da Computação",
    degreeEN: "Bachelor's Degree in Computer Science",
    institution: "IF Sudeste MG - Campus Rio Pomba",
    institutionShort: "IF Sudeste MG",
    startDate: "2020-01",
    endDate: "2026-07",
    graduationDate: "Julho 2026",
    graduationDateEN: "July 2026",
    current: true,
    status: "in-progress",
    location: "Rio Pomba, MG",
    duration: "2020 - 2026 (Previsão)",
    durationEN: "2020 - 2026 (Expected)",
    description: "Formação abrangente em desenvolvimento de software, algoritmos, estruturas de dados, banco de dados, e engenharia de software.",
    highlights: [
      "Desenvolvimento Full Stack",
      "Algoritmos e Estruturas de Dados",
      "Banco de Dados",
      "Engenharia de Software"
    ]
  },
  {
    id: 2,
    degree: "Ensino Médio",
    degreeEN: "High School",
    institution: "Colégio Rio Branco",
    institutionShort: "Rio Branco",
    startDate: "2016-01",
    endDate: "2018-12",
    graduationDate: "2018",
    graduationDateEN: "2018",
    current: false,
    status: "completed",
    location: "Rio Pomba, MG",
    duration: "2016 - 2018",
    durationEN: "2016 - 2018"
  }
];

// Projetos
export const projects = [
  {
    id: 1,
    name: "Sistema de Gestão Acadêmica - TCC",
    nameShort: "TCC Sistema",
    category: "desenvolvimento front-end",
    categoryEN: "frontend development",
    year: "2023",
    type: "development",
    description: "Sistema para demonstração de trabalho de conclusão de curso, com interface intuitiva e funcionalidades robustas para marketing digital",
    descriptionEN: "System for demonstrating course completion work, with an intuitive interface and robust features for digital marketing",
    technologies: ["javaScript", "HTML", "CSS3", "UI/UX Design"],
    images: [
      "/src/assets/imagens/projetos de programação/tcc/Captura de tela 2025-11-28 122811.png",
      "/src/assets/imagens/projetos de programação/tcc/Captura de tela 2025-11-28 122847.png",
      "/src/assets/imagens/projetos de programação/tcc/Captura de tela 2025-11-28 122903.png"
    ],
    image: "/src/assets/imagens/projetos de programação/tcc/Captura de tela 2025-11-28 122811.png",
    featured: true,
    link: null
  },
  {
    id: 2,
    name: "Atividade de aprendzagem com JavaScript",
    nameShort: "Atividade JS ",
    category: "Full Stack Development",
    categoryEN: "Full Stack Development",
    year: "2024",
    type: "development",
    description: "Atividade com finalidade de aplicar conhecimentos em desenvolvimento em javaScript, criando uma aplicação web completa.",
    descriptionEN: "Activity aimed at applying knowledge in JavaScript development by creating a complete web application.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Frontend Development"],
    images: [
      "/src/assets/imagens/projetos de programação/1761608192885.jfif",
      "/src/assets/imagens/projetos de programação/1761608242366.jfif",
      "/src/assets/imagens/projetos de programação/1761608262232.jfif",
      "/src/assets/imagens/projetos de programação/1761608272565.jfif"
    ],
    image: "/src/assets/imagens/projetos de programação/1761608192885.jfif",
    featured: true,
    link: null
  },
  {
    id: 6,
    name: "Projetos Avulsos",
    nameShort: "Trabalhos de Desgin",
    category: "Design for Event Promotion",
    categoryEN: "Design for Event Promotion",
    year: "2024",
    type: "design",
    description: "Desenvolvimento de artes em geral para trabalhos freelance.",
    descriptionEN: "",
    technologies: ["Canva", "Figma"],
    image: "/src/assets/imagens/projetos de design/7_Lobo.png",
    featured: true,
    link: null
  },
  {
    id: 7,
    name: "Ebook Digital - Higiene do Sono",
    nameShort: "Higiene do Sono",
    category: "Design for Educational Content",
    categoryEN: "Design for Educational Content",
    year: "2024",
    type: "design",
    description: "Ebook digital feito para projeto de conclusão de curso, focado em higiene do sono com design atraente e informativo.",
    descriptionEN: " Digital ebook created for course completion project, focused on sleep hygiene with attractive and informative design.",
    technologies: ["Canva","Figma"],
    images: [
      "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0001.jpg",
      "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0002.jpg",
      "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0003.jpg",
      "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0004.jpg",
      "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0005.jpg",
      "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0006.jpg"
    ],
    image: "/src/assets/imagens/projetos de design/higiene do sono/Título_page-0001.jpg",
    featured: true,
    link: null
  },
  {
    id: 8,
    name: "Designs para Prefeitura de Rio Pomba",
    nameShort: "Social Media Prefeitura",
    category: "Social Media Design",
    categoryEN: "Social Media Design",
    year: "2025",
    type: "design",
    description: "Projetos desenvolvidos durante estágio na Prefeitura de Rio Pomba, incluindo posts informativos, campanhas digitais e certificados.",
    descriptionEN: "Projects developed during internship at Rio Pomba City Hall, including informative posts, digital campaigns and certificates.",
    technologies: ["Canva", "Photoshop"],
    images: [
      "/src/assets/imagens/projetos de design/5_Cópia de Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/1.png",
      "/src/assets/imagens/projetos de design/5_Cópia de Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/2.png",
      "/src/assets/imagens/projetos de design/4_Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/1.png",
      "/src/assets/imagens/projetos de design/4_Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/2.png",
      "/src/assets/imagens/projetos de design/4_Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/3.png",
      "/src/assets/imagens/projetos de design/4_Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/4.png",
      "/src/assets/imagens/projetos de design/3_Cópia de Cópia de Cópia de Fazer seu orçamento informativo laranja azul construtoras post do instagram/1.png",
      "/src/assets/imagens/projetos de design/1_certificado Edilaine/1.png",
      "/src/assets/imagens/projetos de design/1_certificado Edilaine/2.png",
      "/src/assets/imagens/projetos de design/1_certificado Edilaine/3.png",
      "/src/assets/imagens/projetos de design/1_certificado Edilaine/4.png"
    ],
    image: "/src/assets/imagens/projetos de design/5_Cópia de Cópia de Post Para Instagram Tecnologia no Agronegócio Moderno Verde E Branco/1.png",
    featured: true,
    link: null
  },
  {
    id: 9,
    name: "Artes para o IF Sudeste MG",
    nameShort: "Artes IF",
    category: "Institutional Design",
    categoryEN: "Institutional Design",
    year: "2023-2025",
    type: "design",
    description: "Conjunto de artes desenvolvidas durante estágio na Assessoria de Comunicação do IF Sudeste MG, incluindo posts para redes sociais, materiais de divulgação de eventos, campanhas institucionais e comunicados oficiais.",
    descriptionEN: "Set of artworks developed during internship at IF Sudeste MG Communication Office, including social media posts, event promotional materials, institutional campaigns and official communications.",
    technologies: ["Canva", "Photoshop", "Illustrator"],
    images: [
      "/src/assets/imagens/projetos de design/6_APROVADOS.png",
      "/src/assets/imagens/projetos de design/8_sábado letivo Zootecnia 1.png",
      "/src/assets/imagens/projetos de design/2_Redação.png"
    ],
    image: "/src/assets/imagens/projetos de design/6_APROVADOS.png",
    featured: true,
    link: null
  },
];
//fim da parte de projetos

export const awards = [
  {
    id: 1,
    name: "Formação Acadêmica",
    nameEN: "Academic Achievement",
    category: "IF Sudeste MG",
    year: "2020-2026",
    description: "Bacharelado em Ciência da Computação"
  }
];

export const certificates = [
  {
    id: 1,
    name: "GitHub Certificate",
    nameShort: "GitHub",
    issuer: "GitHub",
    date: "2024",
    category: "Development",
    image: "/src/assets/certificados/GithubCertificate/BBPWC7UD_page-0001.jpg",
    credentialId: "BBPWC7UD",
    description: "Certificação em Git e GitHub"
  },
  {
    id: 2,
    name: "Professional Certificate",
    nameShort: "Certificate",
    issuer: "Instituição",
    date: "2024",
    category: "Professional",
    image: "/src/assets/certificados/NPLEAT9F/NPLEAT9F_page-0001.jpg",
    credentialId: "NPLEAT9F",
    description: "Certificado profissional"
  },
  {
    id: 3,
    name: "Technical Certificate",
    nameShort: "Technical",
    issuer: "Instituição",
    date: "2024",
    category: "Technical",
    image: "/src/assets/certificados/4KHYPEUV/4KHYPEUV_page-0001.jpg",
    credentialId: "4KHYPEUV",
    description: "Certificado técnico"
  }
];

export const services = [
  {
    id: 1,
    name: "Desenvolvimento Web",
    nameEN: "Web Development",
    description: "Desenvolvimento de aplicações web modernas com React, Angular e tecnologias frontend/backend",
    icon: "💻",
    category: "development"
  },
  {
    id: 2,
    name: "Design Gráfico",
    nameEN: "Graphic Design",
    description: "Criação de identidade visual, peças gráficas e materiais para redes sociais",
    icon: "🎨",
    category: "design"
  },
  {
    id: 3,
    name: "Produção Audiovisual",
    nameEN: "Audiovisual Production",
    description: "Edição de vídeos, motion graphics e conteúdo para plataformas digitais",
    icon: "🎬",
    category: "media"
  },
  {
    id: 4,
    name: "Automação com IA",
    nameEN: "AI Automation",
    description: "Implementação de soluções automatizadas utilizando inteligência artificial",
    icon: "🤖",
    category: "automation"
  },
  {
    id: 5,
    name: "Suporte Técnico",
    nameEN: "Technical Support",
    description: "Montagem, manutenção de computadores e instalação de sistemas",
    icon: "🔧",
    category: "support"
  },
  {
    id: 6,
    name: "Consultoria",
    nameEN: "Consulting",
    description: "Consultoria em desenvolvimento de software e estratégias digitais",
    icon: "💡",
    category: "consulting"
  }
];

export const stats = {
  experience: {
    years: "3+",
    label: "Anos de Experiência",
    labelEN: "Years Experience"
  },
  projects: {
    count: "40+",
    label: "Projetos Concluídos",
    labelEN: "Projects Completed"
  },
  clients: {
    count: "15+",
    label: "Clientes Atendidos",
    labelEN: "Clients Served"
  },
  technologies: {
    count: "20+",
    label: "Tecnologias Dominadas",
    labelEN: "Technologies Mastered"
  }
};

// Função helper para obter experiências em ordem cronológica
export const getExperienceByDate = (ascending = false) => {
  return [...experience].sort((a, b) => {
    const dateA = new Date(a.startDate);
    const dateB = new Date(b.startDate);
    return ascending ? dateA - dateB : dateB - dateA;
  });
};

// Função helper para obter apenas experiências em destaque
export const getFeaturedExperience = () => {
  return experience.filter(exp => exp.featured);
};

// Função helper para obter experiências por categoria
export const getExperienceByCategory = (category) => {
  return experience.filter(exp => exp.category === category);
};

// Função helper para obter projetos por tipo
export const getProjectsByType = (type) => {
  return projects.filter(proj => proj.type === type);
};

// Função helper para obter projetos de desenvolvimento
export const getDevelopmentProjects = () => {
  return projects.filter(proj => proj.type === 'development');
};

// Função helper para obter projetos de design
export const getDesignProjects = () => {
  return projects.filter(proj => proj.type === 'design');
};

// Função helper para obter todas as tecnologias únicas
export const getAllTechnologies = () => {
  const techSet = new Set();
  
  Object.values(hardSkills).forEach(category => {
    category.skills.forEach(skill => {
      techSet.add(skill.name);
    });
  });
  
  experience.forEach(exp => {
    exp.technologies?.forEach(tech => {
      techSet.add(tech);
    });
  });
  
  return Array.from(techSet).sort();
};

// Export default com todos os dados
export default {
  personalInfo,
  contactInfo,
  hardSkills,
  softSkills,
  experience,
  education,
  projects,
  awards,
  certificates,
  services,
  stats,
  helpers: {
    getExperienceByDate,
    getFeaturedExperience,
    getExperienceByCategory,
    getProjectsByType,
    getDevelopmentProjects,
    getDesignProjects,
    getAllTechnologies
  }
};
