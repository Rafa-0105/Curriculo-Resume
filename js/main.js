/* Mostrar menu */
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)
    
    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show-menu')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/* Remover menu no mobile */
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/* Rolar as seções */
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/* Mostrar scroll top */ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/* Tema light/dark */ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

if (selectedTheme) {
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', () => {
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/* Tamanho e impressão pdf */ 
function scaleCv(){
    document.body.classList.add('scale-cv')
}

/* Remover o tamanho depois do download */ 
function removeScale(){
    document.body.classList.remove('scale-cv')
}

/* Gerar o pdf */ 
// PDF área
let areaCv = document.getElementById('area-cv')
let resumeButton = document.getElementById('resume-button')

// Opção de impressão
let opt = {
  margin:       0,
  filename:     'RafaelGambinCV.pdf',
  image:        { type: 'jpg', quality: 0.98 },
  html2canvas:  { scale: 4 },
  jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
};

// Gerar o pdf com promessa para aguardar conclusao
async function generateResume() {
    try {
        // html2pdf().from(element).set(opt).save() retorna uma Promise
        await html2pdf().set(opt).from(areaCv).save();
    } catch (err) {
        console.error("Erro ao gerar PDF:", err);
    } finally {
        removeScale();
    }
}

// Botao de download
resumeButton.addEventListener('click', () => {
    // 1. Adiciona classe para formatar para PDF
    scaleCv()

    // 2. Gera PDF e remove a classe ao finalizar (no finally)
    generateResume()
})


/* ================= INTERNATIONALIZATION (i18n) ================= */
const translations = {
    'pt': {
        'nav_home': 'Início',
        'nav_profile': 'Perfil',
        'nav_education': 'Formação',
        'nav_skills': 'Habilidades',
        'nav_experience': 'Experiência',
        'nav_certificates': 'Certificações',
        'home_profession': 'Dev Junior',
        'profile_location': 'São Paulo, SP',
        'section_profile': 'Perfil',
        'profile_description': 'Prestativo, Atencioso, Dedicado e Anseio em sempre querer aprender mais.',
        'section_education': 'Formação',
        'edu_1_title': 'Análise de Desenvolvimento de Sistemas',
        'edu_1_school': 'FIAP',
        'edu_1_status': 'Formado',
        'edu_2_school': 'Ensino Médio',
        'section_skills': 'Habilidades',
        'section_experience': 'Experiência',
        'exp_1_title': 'Desenvolvedor de Software - Atualmente',
        'exp_1_desc': '1 ano e 9 meses em desenvolvimento de software. Habilidades em Python, SQL, Docker, Git, RPA e Cloud, com certificação AZ-900. Forte histórico trabalhando com práticas ágeis e resolvendo problemas rapidamente em ambientes de alta pressão.',
        'exp_2_title': 'Suporte Técnico',
        'exp_2_desc': 'Especialista em suporte e implantação de sistemas. Treinamentos, instalações e projetos.',
        'section_certificates': 'Certificações',
        'cert_logic_title': 'Lógica de Programação',
        'cert_logic_desc': 'Senai | Emitido em maio de 2022',
        'cert_web_title': 'Introdução a Websites c/ HTML5 e CSS3',
        'cert_web_desc': 'DIO | Emitido em Jul. de 2022',
        'cert_az900_desc': 'MICROSOFT CLOUD | Emitido em Jul. de 2025',
        'cert_cybray_title': 'Introduction to IT & Cybersecurity',
        'cert_cybray_desc': 'Cybray | Emitido em maio de 2021',
        'section_courses': 'Cursos',
        'course_python_desc': 'Udemy | Cursando',
        'course_powerbi_desc': 'Udemy | Cursando',
        'section_languages': 'Idiomas',
        'lang_pt': 'Português | Nativo',
        'lang_en': 'Inglês | Intermediário',
        'lang_es': 'Espanhol | Básico',
        'section_interests': 'Interesses',
        'int_books': 'Livros',
        'int_games': 'Games',
        'int_music': 'Música',
        'int_sports': 'Esportes',
        'int_coding': 'Codificar',
        'section_objective': 'Objetivo Profissional',
        'objective_desc': 'Desenvolver meus conhecimentos sob a supervisão e estimulo de uma empresa comprometida com a inovação.'
    },
    'en': {
        'nav_home': 'Home',
        'nav_profile': 'Profile',
        'nav_education': 'Education',
        'nav_skills': 'Skills',
        'nav_experience': 'Experience',
        'nav_certificates': 'Certificates',
        'home_profession': 'Junior Dev',
        'profile_location': 'São Paulo, SP - Brazil',
        'section_profile': 'Profile',
        'profile_description': 'Helpful, Attentive, Dedicated and always eager to learn more.',
        'section_education': 'Education',
        'edu_1_title': 'Systems Analysis and Development',
        'edu_1_school': 'FIAP',
        'edu_1_status': 'Graduated',
        'edu_2_school': 'High School',
        'section_skills': 'Skills',
        'section_experience': 'Experience',
        'exp_1_title': 'Software Developer - Current',
        'exp_1_desc': '1 year and 9 months in software development. Skilled in Python, SQL, Docker, Git, RPA, and Cloud, with AZ-900 certification. Strong track record working with agile practices and quickly solving problems in high-pressure environments.',
        'exp_2_title': 'Technical Support',
        'exp_2_desc': 'Specialist in system support and implementation. Training, installations, and projects.',
        'section_certificates': 'Certificates',
        'cert_logic_title': 'Programming Logic',
        'cert_logic_desc': 'Senai | Issued May 2022',
        'cert_web_title': 'Intro to Websites with HTML5 & CSS3',
        'cert_web_desc': 'DIO | Issued Jul 2022',
        'cert_az900_desc': 'MICROSOFT CLOUD | Issued Jul 2025',
        'cert_cybray_title': 'Introduction to IT & Cybersecurity',
        'cert_cybray_desc': 'Cybray | Issued May 2021',
        'section_courses': 'Courses',
        'course_python_desc': 'Udemy | Studying',
        'course_powerbi_desc': 'Udemy | Studying',
        'section_languages': 'Languages',
        'lang_pt': 'Portuguese | Native',
        'lang_en': 'English | Intermediate',
        'lang_es': 'Spanish | Basic',
        'section_interests': 'Interests',
        'int_books': 'Books',
        'int_games': 'Games',
        'int_music': 'Music',
        'int_sports': 'Sports',
        'int_coding': 'Coding',
        'section_objective': 'Professional Objective',
        'objective_desc': 'To develop my knowledge under the supervision and encouragement of a company committed to innovation.'
    },
    'es': {
        'nav_home': 'Inicio',
        'nav_profile': 'Perfil',
        'nav_education': 'Educación',
        'nav_skills': 'Habilidades',
        'nav_experience': 'Experiencia',
        'nav_certificates': 'Certificados',
        'home_profession': 'Desarrollador Junior',
        'profile_location': 'São Paulo, SP - Brasil',
        'section_profile': 'Perfil',
        'profile_description': 'Servicial, Atento, Dedicado y siempre ansioso por aprender más.',
        'section_education': 'Educación',
        'edu_1_title': 'Análisis y Desarrollo de Sistemas',
        'edu_1_school': 'FIAP',
        'edu_1_status': 'Graduado',
        'edu_2_school': 'Bachillerato',
        'section_skills': 'Habilidades',
        'section_experience': 'Experiencia',
        'exp_1_title': 'Desarrollador de Software - Actual',
        'exp_1_desc': '1 año y 9 meses en desarrollo de software. Habilidades en Python, SQL, Docker, Git, RPA y Cloud, con certificación AZ-900. Fuerte historial trabajando con prácticas ágiles y resolviendo problemas rápidamente en entornos de alta presión.',
        'exp_2_title': 'Soporte Técnico',
        'exp_2_desc': 'Especialista en soporte e implementación de sistemas. Capacitación, instalaciones y proyectos.',
        'section_certificates': 'Certificados',
        'cert_logic_title': 'Lógica de Programación',
        'cert_logic_desc': 'Senai | Emitido mayo 2022',
        'cert_web_title': 'Intro a Sitios Web con HTML5 y CSS3',
        'cert_web_desc': 'DIO | Emitido Jul 2022',
        'cert_az900_desc': 'MICROSOFT CLOUD | Emitido Jul 2025',
        'cert_cybray_title': 'Introduction to IT & Cybersecurity',
        'cert_cybray_desc': 'Cybray | Emitido mayo 2021',
        'section_courses': 'Cursos',
        'course_python_desc': 'Udemy | Cursando',
        'course_powerbi_desc': 'Udemy | Cursando',
        'section_languages': 'Idiomas',
        'lang_pt': 'Portugués | Nativo',
        'lang_en': 'Inglés | Intermedio',
        'lang_es': 'Español | Básico',
        'section_interests': 'Intereses',
        'int_books': 'Libros',
        'int_games': 'Juegos',
        'int_music': 'Música',
        'int_sports': 'Deportes',
        'int_coding': 'Codificar',
        'section_objective': 'Objetivo Profesional',
        'objective_desc': 'Desarrollar mis conocimientos bajo la supervisión y el estímulo de una empresa comprometida con la innovación.'
    }
}

function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Save preference
    localStorage.setItem('selected-lang', lang);
}

// Event listeners for flags
const flags = document.querySelectorAll('.flag-icon');
flags.forEach(flag => {
    flag.addEventListener('click', () => {
        const lang = flag.getAttribute('data-lang');
        changeLanguage(lang);
    });
});

// Load saved language or default to pt
const savedLang = localStorage.getItem('selected-lang') || 'pt';
changeLanguage(savedLang);