import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

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

// Define the translations
const translations = {
  en: {
    // Login page
    'login.title': 'Sign In',
    'login.username': 'Username',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.error': 'Invalid username or password',
    'login.forgotPassword': 'Forgot password?',
    
    // Navigation
    'nav.home': 'Home',
    'nav.form': 'Form',
    'nav.clients': 'Clients',
    'nav.analytics': 'Analytics',
    'nav.logout': 'Logout',
    'nav.menu': 'Open menu',
    'nav.reportBug': 'Report Bug',
    'nav.suggestions': 'Suggestions',
    
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
    'form.subtitle': 'Fill out the form below to prequalify',
    'form.backToContactInfo': 'Back to Contact Info',
    
    // Timeline
    'q.timeline.title': 'Homebuying Timeline',
    'q.timeline.question': 'How soon are you looking to buy a home?',
    'q.timeline.immediately': 'Immediately (I\'ve found a home)',
    'q.timeline.lessThan3Months': 'Within 3 months',
    'q.timeline.3to6Months': '3-6 months',
    'q.timeline.6to12Months': '6-12 months',
    'q.timeline.justExploring': 'Just exploring/Not sure',
    
    // First-Time Buyer
    'q.firsttime.title': 'First-Time Homebuyer',
    'q.firsttime.question': 'Have you purchased a home before, or would this be your first time buying?',
    'q.firsttime.yes': 'First-time buyer',
    'q.firsttime.no': 'I\'ve owned a home before',
    'q.firsttime.help': 'Great! There are special programs for first-time buyers that help with low down payments.',
    
    // Employment Questions
    'q.employment.title': 'Employment Status',
    'q.employment.question': 'What is your current employment situation?',
    'q.employment.w2': 'W-2 Employee',
    'q.employment.1099': '1099 Contractor',
    'q.employment.selfEmployed': 'Self-Employed',
    'q.employment.retired': 'Retired',
    'q.employment.unemployed': 'Unemployed',
    'q.employment.other': 'Other',
    'q.employment.otherPlaceholder': 'Please specify your employment situation',
    
    // Self-Employment Years
    'q.selfEmployedYears.title': 'Self-Employment History',
    'q.selfEmployedYears.question': 'How long have you been self-employed?',
    'q.selfEmployedYears.year': 'year',
    'q.selfEmployedYears.years': 'years',
    
    // Income
    'q.income.title': 'Income',
    'q.income.question': 'How much is your income?',
    'q.income.typeLabel': 'Income Type',
    'q.income.annual': 'Annual Income',
    'q.income.monthly': 'Monthly Income',
    'q.income.amountLabel': 'Income Amount',
    'q.income.placeholder': 'Enter your income',
    'q.income.annualLabel': 'Annual Income Amount',
    'q.income.annualPlaceholder': 'Enter your annual income',
    'q.income.monthlyLabel': 'Monthly Income Amount',
    'q.income.monthlyPlaceholder': 'Enter your monthly income',
    
    // Credit
    'q.credit.title': 'Credit Health',
    'q.credit.question': 'How would you describe your credit?',
    'q.credit.excellent': 'Excellent',
    'q.credit.good': 'Good',
    'q.credit.fair': 'Fair',
    'q.credit.poor': 'Poor',
    'q.credit.unknown': 'I don\'t know',
    
    // Credit Score
    'q.creditScore.title': 'Credit Score',
    'q.creditScore.question': 'Do you know your approximate credit score?',
    'q.creditScore.scoreLabel': 'Your Estimated Credit Score',
    'q.creditScore.placeholder': 'Enter score (300-850)',
    'q.creditScore.excellent': 'Excellent (750+)',
    'q.creditScore.good': 'Good (700-749)',
    'q.creditScore.fair': 'Fair (650-699)',
    'q.creditScore.needsWork': 'Needs Work (600-649)',
    'q.creditScore.poor': 'Poor (below 600)',
    
    // Down Payment
    'q.downPayment.title': 'Down Payment',
    'q.downPayment.question': 'Do you have savings set aside for a down payment?',
    'q.downPayment.yes': 'Yes',
    'q.downPayment.no': 'No',
    
    // Down Payment Amount
    'q.downPaymentAmount.title': 'Down Payment Amount',
    'q.downPaymentAmount.question': 'Approximately how much have you saved?',
    'q.downPaymentAmount.amountLabel': 'Amount Saved',
    'q.downPaymentAmount.placeholder': 'Enter amount',
    
    // Down Payment Assistance
    'q.assistance.title': 'Down Payment Assistance',
    'q.assistance.question': 'Would you be open to down payment assistance programs?',
    'q.assistance.yes': 'Yes, I\'m interested',
    'q.assistance.no': 'No, I prefer to use my own funds',
    'q.assistance.info': 'There are many programs available that can help with down payment costs, especially for first-time homebuyers.',
    
    // Monthly Debts
    'q.monthlyDebts.title': 'Monthly Debts',
    'q.monthlyDebts.question': 'What are your approximate monthly debt payments (excluding housing)?',
    'q.monthlyDebts.amountLabel': 'Monthly Debt Payments',
    'q.monthlyDebts.placeholder': 'Enter monthly debt amount',
    'q.monthlyDebts.helper': 'Include car loans, student loans, credit cards, personal loans, etc.',
    
    // Credit Issues
    'q.creditIssues.title': 'Credit Issues',
    'q.creditIssues.question': 'Have you had any significant credit issues in the past?',
    'q.creditIssues.yes': 'Yes',
    'q.creditIssues.no': 'No',
    'q.creditIssues.followUp': 'We\'ll need some additional details to provide the best assistance.',
    
    // Credit Issue Details
    'q.creditIssueDetails.title': 'Credit Issue Details',
    'q.creditIssueDetails.question': 'Please provide some details about the credit issue:',
    'q.creditIssueDetails.typeLabel': 'Type of Issue',
    'q.creditIssueDetails.typePlaceholder': 'Select issue type',
    'q.creditIssueDetails.bankruptcy': 'Bankruptcy',
    'q.creditIssueDetails.foreclosure': 'Foreclosure',
    'q.creditIssueDetails.collections': 'Collections',
    'q.creditIssueDetails.other': 'Other',
    'q.creditIssueDetails.yearLabel': 'Year it Occurred',
    'q.creditIssueDetails.yearPlaceholder': 'Enter year',
    'q.creditIssueDetails.amountLabel': 'Amount (if collections)',
    'q.creditIssueDetails.amountPlaceholder': 'Enter amount',
    
    // ID Type
    'q.idType.title': 'ID Type',
    'q.idType.question': 'What type of government-issued ID do you have?',
    'q.idType.ssn': 'Social Security Number (SSN)',
    'q.idType.itin': 'Individual Taxpayer ID (ITIN)',
    'q.idType.none': 'I don\'t have either',
    'q.idType.itinInfo': 'Having an ITIN means you might qualify for certain loan programs, though options may be more limited than with an SSN.',
    'q.idType.noneWarning': 'Without an SSN or ITIN, traditional mortgage options are very limited. Alternative financing might be necessary.',
    
    // Contact Info
    'q.contactInfo.title': 'Contact Information',
    'q.contactInfo.question': 'How can we reach you with more information?',
    'q.contactInfo.nameLabel': 'Full Name',
    'q.contactInfo.namePlaceholder': 'Enter your full name',
    'q.contactInfo.phoneLabel': 'Phone Number',
    'q.contactInfo.phonePlaceholder': 'Enter your phone number',
    'q.contactInfo.emailLabel': 'Email Address',
    'q.contactInfo.emailPlaceholder': 'Enter your email address',
    'q.contactInfo.commentsLabel': 'Additional Comments',
    'q.contactInfo.commentsPlaceholder': 'Any additional information you\'d like to share',
    
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
    
    // Suggestion Dialog
    'suggestion.title': 'Submit Suggestion',
    'suggestion.description': 'Share your ideas for improving the application',
    'suggestion.descriptionPlaceholder': 'Describe your suggestion in detail...',
    'suggestion.screenshot': 'Screenshot (Optional)',
    'suggestion.uploadImage': 'Upload Image',
    'suggestion.submitted': 'Suggestion Submitted',
    'suggestion.thankYou': 'Thank you for your suggestion!',
    'suggestion.submitError': 'There was an error submitting your suggestion. Please try again.',
    'suggestion.descriptionRequired': 'Please provide a description for your suggestion.',
    
    // Bug Report Dialog
    'bugReport.title': 'Report a Bug',
    'bugReport.description': 'Help us improve by reporting any issues you encounter',
    'bugReport.descriptionPlaceholder': 'Describe the bug and steps to reproduce it...',
    'bugReport.screenshot': 'Screenshot (Optional)',
    'bugReport.uploadImage': 'Upload Image',
    'bugReport.submitted': 'Bug Report Submitted',
    'bugReport.thankYou': 'Thank you for helping us improve!',
    'bugReport.submitError': 'There was an error submitting your bug report. Please try again.',
    'bugReport.descriptionRequired': 'Please provide a description of the bug.',
    
    // Common
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.submitting': 'Submitting...',
    'common.error': 'Error',
  },
  
  es: {
    // Login page
    'login.title': 'Iniciar Sesión',
    'login.username': 'Usuario',
    'login.password': 'Contraseña',
    'login.button': 'Iniciar',
    'login.error': 'Usuario o contraseña inválidos',
    'login.forgotPassword': '¿Olvidó su contraseña?',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.form': 'Formulario',
    'nav.clients': 'Clientes',
    'nav.analytics': 'Análisis',
    'nav.logout': 'Salir',
    'nav.menu': 'Abrir menú',
    'nav.reportBug': 'Reportar Error',
    'nav.suggestions': 'Sugerencias',
    
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
    'form.subtitle': 'Complete el formulario a continuación para precalificar',
    'form.backToContactInfo': 'Volver a Información de Contacto',
    
    // Timeline
    'q.timeline.title': 'Plazo para Comprar Casa',
    'q.timeline.question': '¿Qué tan pronto busca comprar una casa?',
    'q.timeline.immediately': 'Inmediatamente (ya encontré una casa)',
    'q.timeline.lessThan3Months': 'Dentro de 3 meses',
    'q.timeline.3to6Months': '3-6 meses',
    'q.timeline.6to12Months': '6-12 meses',
    'q.timeline.justExploring': 'Solo explorando/No estoy seguro',
    
    // First-Time Buyer
    'q.firsttime.title': 'Comprador de Primera Vez',
    'q.firsttime.question': '¿Ha comprado una casa antes, o esta sería su primera vez comprando?',
    'q.firsttime.yes': 'Comprador de primera vez',
    'q.firsttime.no': 'He tenido casa antes',
    'q.firsttime.help': '¡Genial! Hay programas para compradores primerizos que ayudan con un pago inicial bajo.',
    
    // Employment
    'q.employment.title': 'Tipo de Empleo',
    'q.employment.question': '¿Cuál es su situación laboral actual?',
    'q.employment.w2': 'Empleado W-2',
    'q.employment.1099': 'Contratista 1099',
    'q.employment.selfEmployed': 'Trabajador Independiente',
    'q.employment.retired': 'Jubilado',
    'q.employment.unemployed': 'Desempleado',
    'q.employment.other': 'Otro',
    'q.employment.otherPlaceholder': 'Por favor, especifique su situación laboral',
    
    // Self-Employment Years
    'q.selfEmployedYears.title': 'Historial de Autoempleo',
    'q.selfEmployedYears.question': '¿Hace cuánto trabajas por cuenta propia?',
    'q.selfEmployedYears.year': 'año',
    'q.selfEmployedYears.years': 'años',
    
    // Income
    'q.income.title': 'Ingresos',
    'q.income.question': '¿Cuántos son sus ingresos?',
    'q.income.typeLabel': 'Tipo de Ingreso',
    'q.income.annual': 'Ingreso Anual',
    'q.income.monthly': 'Ingreso Mensual',
    'q.income.amountLabel': 'Monto de Ingresos',
    'q.income.placeholder': 'Ingrese sus ingresos',
    'q.income.annualLabel': 'Monto de Ingreso Anual',
    'q.income.annualPlaceholder': 'Ingrese su ingreso anual',
    'q.income.monthlyLabel': 'Monto de Ingreso Mensual',
    'q.income.monthlyPlaceholder': 'Ingrese su ingreso mensual',
    
    // Credit
    'q.credit.title': 'Estado del Crédito',
    'q.credit.question': '¿Cómo describirías tu crédito?',
    'q.credit.excellent': 'Excelente',
    'q.credit.good': 'Bueno',
    'q.credit.fair': 'Regular',
    'q.credit.poor': 'Malo',
    'q.credit.unknown': 'No lo sé',
    
    // Credit Score
    'q.creditScore.title': 'Puntaje de Crédito',
    'q.creditScore.question': '¿Sabes tu puntaje de crédito aproximado?',
    'q.creditScore.scoreLabel': 'Tu Puntaje de Crédito Estimado',
    'q.creditScore.placeholder': 'Ingrese puntaje (300-850)',
    'q.creditScore.excellent': 'Excelente (750+)',
    'q.creditScore.good': 'Bueno (700-749)',
    'q.creditScore.fair': 'Regular (650-699)',
    'q.creditScore.needsWork': 'Necesita Mejoras (600-649)',
    'q.creditScore.poor': 'Bajo (menos de 600)',
    
    // Down Payment
    'q.downPayment.title': 'Enganche',
    'q.downPayment.question': '¿Tienes dinero ahorrado para el enganche?',
    'q.downPayment.yes': 'Sí',
    'q.downPayment.no': 'No',
    
    // Down Payment Amount
    'q.downPaymentAmount.title': 'Cantidad de Enganche',
    'q.downPayment.question': '¿Aproximadamente cuánto tienes ahorrado?',
    'q.downPaymentAmount.amountLabel': 'Amount Saved',
    'q.downPaymentAmount.placeholder': 'Ingrese cantidad',
    
    // Down Payment Assistance
    'q.assistance.title': 'Asistencia para el Enganche',
    'q.assistance.question': '¿Estarías interesado en programas de asistencia para el enganche?',
    'q.assistance.yes': 'Sí, estoy interesado',
    'q.assistance.no': 'No, prefiero usar mis propios fondos',
    'q.assistance.info': 'Hay muchos programas disponibles que pueden ayudar con los costos del enganche, especialmente para compradores de primera vivienda.',
    
    // Monthly Debts
    'q.monthlyDebts.title': 'Deudas Mensuales',
    'q.monthlyDebts.question': '¿Cuáles son sus pagos mensuales aproximados de deudas (excluyendo vivienda)?',
    'q.monthlyDebts.amountLabel': 'Monthly Debt Payments',
    'q.monthlyDebts.placeholder': 'Ingrese monto mensual de deudas',
    'q.monthlyDebts.helper': 'Incluya préstamos de auto, préstamos estudiantiles, tarjetas de crédito, préstamos personales, etc.',
    
    // Credit Issues
    'q.creditIssues.title': 'Problemas de Crédito',
    'q.creditIssues.question': '¿Ha tenido algún problema significativo de crédito en el pasado?',
    'q.creditIssues.yes': 'Sí',
    'q.creditIssues.no': 'No',
    'q.creditIssues.followUp': 'Necesitaremos algunos detalles adicionales para brindarle la mejor asistencia.',
    
    // Credit Issue Details
    'q.creditIssueDetails.title': 'Detalles de Problemas de Crédito',
    'q.creditIssueDetails.question': 'Por favor, proporcione algunos detalles sobre el problema de crédito:',
    'q.creditIssueDetails.typeLabel': 'Tipo de Problema',
    'q.creditIssueDetails.typePlaceholder': 'Seleccione tipo de problema',
    'q.creditIssueDetails.bankruptcy': 'Bancarrota',
    'q.creditIssueDetails.foreclosure': 'Ejecución Hipotecaria',
    'q.creditIssueDetails.collections': 'Cobros',
    'q.creditIssueDetails.other': 'Otro',
    'q.creditIssueDetails.yearLabel': 'Año en que Ocurrió',
    'q.creditIssueDetails.yearPlaceholder': 'Ingrese año',
    'q.creditIssueDetails.amountLabel': 'Cantidad (si es cobros)',
    'q.creditIssueDetails.amountPlaceholder': 'Ingrese cantidad',
    
    // ID Type
    'q.idType.title': 'Tipo de Identificación',
    'q.idType.question': '¿Qué tipo de identificación emitida por el gobierno tiene?',
    'q.idType.ssn': 'Número de Seguro Social (SSN)',
    'q.idType.itin': 'Número de Identificación Personal del Contribuyente (ITIN)',
    'q.idType.none': 'No tengo ninguno',
    'q.idType.itinInfo': 'Tener un ITIN significa que podría calificar para ciertos programas de préstamos, aunque las opciones pueden ser más limitadas que con un SSN.',
    'q.idType.noneWarning': 'Sin un SSN o ITIN, las opciones tradicionales de hipoteca son muy limitadas. Podría ser necesario un financiamiento alternativo.',
    
    // Contact Info
    'q.contactInfo.title': 'Información de Contacto',
    'q.contactInfo.question': '¿Cómo podemos comunicarnos con usted para brindarle más información?',
    'q.contactInfo.nameLabel': 'Full Name',
    'q.contactInfo.namePlaceholder': 'Ingrese su nombre completo',
    'q.contactInfo.phoneLabel': 'Número de Teléfono',
    'q.contactInfo.phonePlaceholder': 'Ingrese su número de teléfono',
    'q.contactInfo.emailLabel': 'Correo Electrónico',
    'q.contactInfo.emailPlaceholder': 'Ingrese su correo electrónico',
    'q.contactInfo.commentsLabel': 'Comentarios Adicionales',
    'q.contactInfo.commentsPlaceholder': 'Cualquier información adicional que desee compartir',
    
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
    
    // Suggestion Dialog
    'suggestion.title': 'Enviar Sugerencia',
    'suggestion.description': 'Comparta sus ideas para mejorar la aplicación',
    'suggestion.descriptionPlaceholder': 'Describa su sugerencia en detalle...',
    'suggestion.screenshot': 'Captura de Pantalla (Opcional)',
    'suggestion.uploadImage': 'Subir Imagen',
    'suggestion.submitted': 'Sugerencia Enviada',
    'suggestion.thankYou': '¡Gracias por su sugerencia!',
    'suggestion.submitError': 'Hubo un error al enviar su sugerencia. Por favor intente de nuevo.',
    'suggestion.descriptionRequired': 'Por favor proporcione una descripción para su sugerencia.',
    
    // Bug Report Dialog
    'bugReport.title': 'Reportar un Error',
    'bugReport.description': 'Ayúdenos a mejorar reportando cualquier problema que encuentre',
    'bugReport.descriptionPlaceholder': 'Describa el error y los pasos para reproducirlo...',
    'suggestion.screenshot': 'Captura de Pantalla (Opcional)',
    'suggestion.uploadImage': 'Subir Imagen',
    'suggestion.submitted': 'Bug Report Submitted',
    'suggestion.thankYou': '¡Gracias por ayudarnos a mejorar!',
    'suggestion.submitError': 'Hubo un error al enviar su informe de error. Por favor intente de nuevo.',
    'suggestion.descriptionRequired': 'Por favor proporcione una descripción del error.',
    
    // Common
    'common.cancel': 'Cancelar',
    'common.submit': 'Enviar',
    'common.submitting': 'Enviando...',
    'common.error': 'Error',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addSystemLog } = useAuth();
  
  const [language, setLanguage] = useState<Language>('en');

  // Save language preference to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('preferredLanguage', language);
      // Force re-render of all components when language changes
      document.documentElement.lang = language;
      console.log(`Language changed to: ${language}`);
    } catch (e) {
      console.error("Failed to save language preference to localStorage", e);
    }
  }, [language]);

  // Load language preference from localStorage on mount
  useEffect(() => {
    try {
      const savedLanguage = localStorage.getItem('preferredLanguage') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
        setLanguage(savedLanguage);
        document.documentElement.lang = savedLanguage;
      }
    } catch (e) {
      console.error("Failed to load language preference from localStorage", e);
    }
  }, []);

  // Translation function
  const t = (key: string): string => {
    const translationSet = translations[language];
    
    // Fix: Convert the object to a JSON string for logging
    addSystemLog('translation', JSON.stringify({
      key,
      language,
      found: !!translationSet?.[key as keyof typeof translationSet]
    }));
    
    if (!translationSet) return key;
    
    return translationSet[key as keyof typeof translationSet] || key;
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
