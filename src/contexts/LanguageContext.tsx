
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Language type
export type Language = 'en' | 'es';

// Language context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translations
const translations = {
  en: {
    // Login page
    'login.title': 'Sign In',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.error': 'Invalid username or password',
    
    // Navigation
    'nav.home': 'Home',
    'nav.form': 'Form',
    'nav.clients': 'Clients',
    'nav.analytics': 'Analytics',
    'nav.logout': 'Logout',
    
    // Dashboard
    'dashboard.welcome': 'Welcome to Gallo Avión',
    'dashboard.subtitle': 'Prequalification Assistant',
    'dashboard.description': 'Use this application to prequalify clients for home loans.',
    
    // Form Phase 1
    'form.title': 'Loan Prequalification Form',
    'form.progress': 'Question {current} of {total}',
    'form.next': 'Next',
    'form.previous': 'Back',
    'form.complete': 'Complete',
    
    // Timeline
    'q.timeline.title': 'Homebuying Timeline',
    'q.timeline.question': 'How soon are you looking to buy a home?',
    'q.timeline.immediately': 'Immediately (I\'ve found a home)',
    'q.timeline.3months': 'Within 3 months',
    'q.timeline.3to6months': '3-6 months',
    'q.timeline.6to12months': '6-12 months',
    'q.timeline.exploring': 'Just exploring/Not sure',
    
    // First-Time Buyer
    'q.firsttime.title': 'First-Time Homebuyer',
    'q.firsttime.question': 'Have you purchased a home before, or would this be your first time buying?',
    'q.firsttime.yes': 'First-time buyer',
    'q.firsttime.no': 'I\'ve owned a home before',
    'q.firsttime.help': 'Great! There are special programs for first-time buyers that help with low down payments.',
    
    // Employment Questions
    'q1.title': 'Employment Status',
    'q1.question': 'What is your current employment situation?',
    'q1.option1': 'Employed (W-2)',
    'q1.option2': 'Self-employed (1099)',
    'q1.option3': 'Retired',
    'q1.option4': 'Unemployed/No income',
    'q1.option5': 'Other',
    
    // Self-Employment Years
    'q.selfyears.title': 'Self-Employment History',
    'q.selfyears.question': 'How long have you been self-employed? Have you been in business at least two years?',
    'q.selfyears.placeholder': 'Enter number of years',
    'q.selfyears.warning': 'It can be harder to get a loan with less than 2 years of self-employment. You might need a co-signer or a special program.',
    
    // Income
    'q2.title': 'Income Level',
    'q2.question': 'Approximately how much do you earn per year or per month (before taxes)?',
    'q2.annual': 'Annual Income',
    'q2.monthly': 'Monthly Income',
    
    // Credit
    'q3.title': 'Credit Health',
    'q3.question': 'How would you describe your credit?',
    'q3.option1': 'Poor',
    'q3.option2': 'Fair',
    'q3.option3': 'Good',
    'q3.option4': 'Excellent',
    
    'q3a.title': 'Credit Score',
    'q3a.question': 'Do you know your approximate credit score?',
    'q3a.placeholder': 'Enter estimated score',
    'q3a.unknown': 'I don\'t know',
    
    // Down Payment
    'q4.title': 'Down Payment',
    'q4.question': 'Do you have savings set aside for a down payment?',
    'q4.yes': 'Yes',
    'q4.no': 'No',
    
    'q4a.title': 'Down Payment Amount',
    'q4a.question': 'Approximately how much have you saved?',
    
    // ID Type
    'q5.title': 'Legal Status',
    'q5.question': 'What is your legal residency/citizenship status in the US?',
    'q5.option1': 'US Citizen',
    'q5.option2': 'Permanent Resident (Green Card)',
    'q5.option3': 'Work Permit (Employment Authorization)',
    'q5.option4': 'Undocumented',
    
    'form.result.qualified': 'You may qualify for a home loan! 🎉 Let\'s move forward with collecting your documents.',
    'form.result.fixesNeeded': 'With a few improvements, you should be able to qualify! We\'ll help create a plan.',
    'form.result.notqualified': 'Not quite ready to qualify yet. But with a good game plan, you can qualify in the future!',
    
    // Clients page
    'clients.title': 'Client List',
    'clients.search': 'Search clients...',
    'clients.noResults': 'No clients found',
    'clients.column.name': 'Name',
    'clients.column.phone': 'Phone',
    'clients.column.credit': 'Credit',
    'clients.column.status': 'Legal Status',
    'clients.column.downpayment': 'Down Payment',
    'clients.column.date': 'Contact Date',
    'clients.column.comments': 'Comments',
    'clients.export': 'Export to CSV',
    
    // Analytics page
    'analytics.title': 'Analytics',
    'analytics.employment': 'Employment Type Distribution',
    'analytics.income': 'Average Income',
    'analytics.credit': 'Credit Score Distribution',
    'analytics.savings': 'Down Payment Savings Rate',
    'analytics.disqualifiers': 'Common Disqualifier Reasons',
    'analytics.w2': 'W-2 Employees',
    'analytics.1099': '1099 Contractors',
    'analytics.avgIncome': 'Average stated income',
    'analytics.savingsRate': 'of clients have down payment saved',
    
    // Help tooltips
    'help.title': 'Help Information',
    'help.copyLink': 'Copy Link',
    'help.linkCopied': 'Link copied to clipboard!',
    
    // Help content (simplified for demo)
    'help.q1': 'W-2 employees receive a W-2 form from their employer. 1099 contractors are self-employed and receive 1099 forms.',
    'help.q2': 'Higher income may qualify for larger loan amounts. Lenders typically look at annual income.',
    'help.q3': 'Credit scores typically range from 300-850. Most mortgage loans require at least 620.',
    'help.q4': 'Down payments are typically 3.5% to 20% of the home purchase price.',
    'help.q5': 'Legal status affects loan eligibility. Most traditional loans require citizenship or permanent residency.',
  },
  
  es: {
    // Login page
    'login.title': 'Iniciar Sesión',
    'login.username': 'Usuario',
    'login.password': 'Contraseña',
    'login.button': 'Ingresar',
    'login.error': 'Usuario o contraseña inválidos',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.form': 'Formulario',
    'nav.clients': 'Clientes',
    'nav.analytics': 'Análisis',
    'nav.logout': 'Salir',
    
    // Dashboard
    'dashboard.welcome': 'Bienvenido a Gallo Avión',
    'dashboard.subtitle': 'Asistente de Precalificación',
    'dashboard.description': 'Utilice esta aplicación para precalificar clientes para préstamos hipotecarios.',
    
    // Form Phase 1
    'form.title': 'Formulario de Precalificación',
    'form.progress': 'Pregunta {current} de {total}',
    'form.next': 'Siguiente',
    'form.previous': 'Atrás',
    'form.complete': 'Completar',
    
    // Timeline
    'q.timeline.title': 'Plazo para Comprar Casa',
    'q.timeline.question': '¿Qué tan pronto busca comprar una casa?',
    'q.timeline.immediately': 'Inmediatamente (ya encontré una casa)',
    'q.timeline.3months': 'Dentro de 3 meses',
    'q.timeline.3to6months': '3-6 meses',
    'q.timeline.6to12months': '6-12 meses',
    'q.timeline.exploring': 'Solo explorando/No estoy seguro',
    
    // First-Time Buyer
    'q.firsttime.title': 'Comprador de Primera Vez',
    'q.firsttime.question': '¿Ha comprado una casa antes, o esta sería su primera vez comprando?',
    'q.firsttime.yes': 'Comprador de primera vez',
    'q.firsttime.no': 'He tenido casa antes',
    'q.firsttime.help': '¡Genial! Hay programas para compradores primerizos que ayudan con un pago inicial bajo.',
    
    // Employment
    'q1.title': 'Tipo de Empleo',
    'q1.question': '¿Cuál es su situación laboral actual?',
    'q1.option1': 'Empleado (W-2)',
    'q1.option2': 'Trabajador por cuenta propia (1099)',
    'q1.option3': 'Jubilado',
    'q1.option4': 'Desempleado/Sin ingresos',
    'q1.option5': 'Otro',
    
    // Self-Employment Years
    'q.selfyears.title': 'Historial de Autoempleo',
    'q.selfyears.question': '¿Hace cuánto trabaja por cuenta propia? ¿Lleva al menos dos años con su negocio?',
    'q.selfyears.placeholder': 'Ingrese número de años',
    'q.selfyears.warning': 'Con menos de 2 años como autónomo es más difícil calificar. Podría necesitar un co-firmante o un programa especial.',
    
    // Income
    'q2.title': 'Ingresos',
    'q2.question': '¿Aproximadamente cuánto gana al año o al mes (antes de impuestos)?',
    'q2.annual': 'Ingreso Anual',
    'q2.monthly': 'Ingreso Mensual',
    
    // Credit
    'q3.title': 'Estado del Crédito',
    'q3.question': '¿Cómo describirías tu crédito?',
    'q3.option1': 'Malo',
    'q3.option2': 'Regular',
    'q3.option3': 'Bueno',
    'q3.option4': 'Excelente',
    
    'q3a.title': 'Puntaje de Crédito',
    'q3a.question': '¿Sabes tu puntaje de crédito aproximado?',
    'q3a.placeholder': 'Ingrese puntaje estimado',
    'q3a.unknown': 'No lo sé',
    
    // Down Payment
    'q4.title': 'Enganche',
    'q4.question': '¿Tienes dinero ahorrado para el enganche?',
    'q4.yes': 'Sí',
    'q4.no': 'No',
    
    'q4a.title': 'Cantidad de Enganche',
    'q4a.question': '¿Aproximadamente cuánto tienes ahorrado?',
    
    // ID Type
    'q5.title': 'Estatus Migratorio',
    'q5.question': '¿Cuál es tu estatus migratorio o legal en EE.UU.?',
    'q5.option1': 'Ciudadano de EE.UU.',
    'q5.option2': 'Residente Permanente (Green Card)',
    'q5.option3': 'Permiso de Trabajo (Autorización de Empleo)',
    'q5.option4': 'Indocumentado',
    
    'form.result.qualified': '¡Es posible que califique para un préstamo! 🎉 Sigamos adelante reuniendo sus documentos.',
    'form.result.fixesNeeded': '¡Con algunas mejoras, debería poder calificar! Le ayudaremos a crear un plan.',
    'form.result.notqualified': 'Aún no está listo para calificar. ¡Pero con un buen plan de acción, podrá calificar pronto!',
    
    // Clients page
    'clients.title': 'Lista de Clientes',
    'clients.search': 'Buscar clientes...',
    'clients.noResults': 'No se encontraron clientes',
    'clients.column.name': 'Nombre',
    'clients.column.phone': 'Teléfono',
    'clients.column.credit': 'Crédito',
    'clients.column.status': 'Estatus Legal',
    'clients.column.downpayment': 'Enganche',
    'clients.column.date': 'Fecha de Contacto',
    'clients.column.comments': 'Comentarios',
    'clients.export': 'Exportar a CSV',
    
    // Analytics page
    'analytics.title': 'Análisis',
    'analytics.employment': 'Distribución de Tipo de Empleo',
    'analytics.income': 'Ingreso Promedio',
    'analytics.credit': 'Distribución de Puntaje de Crédito',
    'analytics.savings': 'Tasa de Ahorro para Enganche',
    'analytics.disqualifiers': 'Razones Comunes de Descalificación',
    'analytics.w2': 'Empleados W-2',
    'analytics.1099': 'Contratistas 1099',
    'analytics.avgIncome': 'Ingreso promedio declarado',
    'analytics.savingsRate': 'de clientes tienen ahorros para enganche',
    
    // Help tooltips
    'help.title': 'Información de Ayuda',
    'help.copyLink': 'Copiar Enlace',
    'help.linkCopied': '¡Enlace copiado al portapapeles!',
    
    // Help content (simplified for demo)
    'help.q1': 'Los empleados W-2 reciben un formulario W-2 de su empleador. Los contratistas 1099 trabajan por su cuenta y reciben formularios 1099.',
    'help.q2': 'Ingresos más altos pueden calificar para montos de préstamo mayores. Los prestamistas típicamente consideran el ingreso anual.',
    'help.q3': 'Los puntajes de crédito típicamente varían de 300-850. La mayoría de los préstamos hipotecarios requieren al menos 620.',
    'help.q4': 'Los enganches son típicamente del 3.5% al 20% del precio de compra de la vivienda.',
    'help.q5': 'El estatus legal afecta la elegibilidad para préstamos. La mayoría de los préstamos tradicionales requieren ciudadanía o residencia permanente.',
  }
};

// Provider component
export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
