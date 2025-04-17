
import { FormState } from '../types/formState';
import { isQualified, getQualificationCategory } from './qualificationChecker';

export type Language = 'en' | 'es';

export type RecommendationPriority = 'high' | 'medium' | 'low';

export type RecommendationType = 'credit' | 'downPayment' | 'employment' | 'identity' | 'documentation' | 'timeline' | 'general';

export interface Recommendation {
  type: RecommendationType;
  title: string;
  description: string;
  priority?: RecommendationPriority;
}

export const getQualificationSummary = (state: FormState, language: Language): string => {
  const qualificationCategory = getQualificationCategory(state);
  
  if (qualificationCategory === 'ready') {
    return language === 'en' 
      ? '✅ Based on the information provided, you appear to qualify for a mortgage loan!'
      : '✅ ¡Según la información proporcionada, parece calificar para un préstamo hipotecario!';
  }
  else if (qualificationCategory === 'fixesNeeded') {
    return language === 'en'
      ? '⚠️ You may qualify with some adjustments or additional documentation.'
      : '⚠️ Puede calificar con algunos ajustes o documentación adicional.';
  }
  else {
    return language === 'en'
      ? '❌ Based on the information provided, you do not currently qualify for a mortgage loan.'
      : '❌ Según la información proporcionada, actualmente no califica para un préstamo hipotecario.';
  }
};

export const getPositiveFactors = (state: FormState, language: Language): string[] => {
  const factors: string[] = [];
  
  // Credit-related positive factors
  if (state.creditCategory === 'excellent' || state.creditCategory === 'good') {
    factors.push(language === 'en' 
      ? `Your ${state.creditCategory} credit score is a significant strength.` 
      : `Su puntuación de crédito ${state.creditCategory === 'excellent' ? 'excelente' : 'buena'} es una fortaleza significativa.`);
  }
  
  // Income-related positive factors
  if (state.income) {
    const annualIncome = state.incomeType === 'monthly' ? state.income * 12 : state.income;
    if (annualIncome > 75000) {
      factors.push(language === 'en'
        ? 'Your income level is strong, which supports a higher loan amount.'
        : 'Su nivel de ingresos es fuerte, lo que respalda un monto de préstamo más alto.');
    } else if (annualIncome > 50000) {
      factors.push(language === 'en'
        ? 'Your income meets standard qualification requirements.'
        : 'Sus ingresos cumplen con los requisitos de calificación estándar.');
    }
  }
  
  // Employment stability
  if (state.employmentType === 'W-2') {
    factors.push(language === 'en'
      ? 'Your W-2 employment provides stability that lenders value.'
      : 'Su empleo W-2 proporciona estabilidad que los prestamistas valoran.');
  } else if (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears >= 2) {
    factors.push(language === 'en'
      ? `Your ${state.selfEmployedYears}+ years of self-employment history meets lender requirements.`
      : `Sus ${state.selfEmployedYears}+ años de historial de trabajo por cuenta propia cumple con los requisitos del prestamista.`);
  }
  
  // Down payment
  if (state.downPaymentSaved && state.downPaymentAmount) {
    if (state.downPaymentAmount >= 50000) {
      factors.push(language === 'en'
        ? 'Your substantial down payment is a significant strength.'
        : 'Su pago inicial sustancial es una fortaleza significativa.');
    } else if (state.downPaymentAmount >= 20000) {
      factors.push(language === 'en'
        ? 'Your down payment amount is favorable for lenders.'
        : 'Su monto de pago inicial es favorable para los prestamistas.');
    } else if (state.downPaymentAmount >= 10000) {
      factors.push(language === 'en'
        ? 'Your saved down payment meets minimum requirements.'
        : 'Su pago inicial ahorrado cumple con los requisitos mínimos.');
    }
  }
  
  // ID type
  if (state.idType === 'SSN') {
    factors.push(language === 'en'
      ? 'Having a Social Security Number opens up more loan options.'
      : 'Tener un Número de Seguro Social abre más opciones de préstamos.');
  }
  
  // First-time buyer
  if (state.firstTimeBuyer) {
    factors.push(language === 'en'
      ? 'As a first-time buyer, you may qualify for special programs and assistance.'
      : 'Como comprador por primera vez, puede calificar para programas especiales y asistencia.');
  }
  
  // No credit issues
  if (!state.hasCreditIssues) {
    factors.push(language === 'en'
      ? 'Having no recent major credit issues is favorable for lenders.'
      : 'No tener problemas de crédito importantes recientes es favorable para los prestamistas.');
  }
  
  return factors;
};

export const getRecommendations = (state: FormState, language: Language): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  
  // Credit recommendations
  if (state.creditCategory === 'poor') {
    recommendations.push({
      type: 'credit',
      title: language === 'en' ? 'Improve Credit Score' : 'Mejorar Puntuación de Crédito',
      description: language === 'en' 
        ? 'Work on improving your credit score before applying. Consider credit repair services or debt consolidation.'
        : 'Trabaje en mejorar su puntuación de crédito antes de aplicar. Considere servicios de reparación de crédito o consolidación de deudas.',
      priority: 'high'
    });
  } else if (state.creditCategory === 'fair') {
    recommendations.push({
      type: 'credit',
      title: language === 'en' ? 'Strengthen Credit Profile' : 'Fortalecer Perfil de Crédito',
      description: language === 'en' 
        ? 'Pay down revolving debt and avoid new credit inquiries for at least 6 months before applying.'
        : 'Pague la deuda rotativa y evite nuevas consultas de crédito durante al menos 6 meses antes de aplicar.',
      priority: 'medium'
    });
  }
  
  // Credit issues recommendations
  if (state.hasCreditIssues) {
    const issueKeys = Object.keys(state.creditIssues).filter(key => 
      state.creditIssues[key] === true && 
      !key.includes('Details')
    );
    
    if (issueKeys.includes('bankruptcy') || issueKeys.includes('foreclosure')) {
      recommendations.push({
        type: 'credit',
        title: language === 'en' ? 'Address Major Credit Issues' : 'Abordar Problemas de Crédito Importantes',
        description: language === 'en' 
          ? 'Wait the required seasoning period after bankruptcy/foreclosure. Prepare a letter of explanation for your application.'
          : 'Espere el período de espera requerido después de la bancarrota/ejecución hipotecaria. Prepare una carta de explicación para su solicitud.',
        priority: 'high'
      });
    } else if (issueKeys.includes('collections')) {
      recommendations.push({
        type: 'credit',
        title: language === 'en' ? 'Resolve Collections' : 'Resolver Colecciones',
        description: language === 'en' 
          ? 'Pay off or settle collection accounts before applying. Request a "pay for delete" when possible.'
          : 'Pague o resuelva las cuentas en cobro antes de aplicar. Solicite un "pago por eliminación" cuando sea posible.',
        priority: 'medium'
      });
    }
  }
  
  // Down payment recommendations
  if (!state.downPaymentSaved && !state.assistanceOpen) {
    recommendations.push({
      type: 'downPayment',
      title: language === 'en' ? 'Save for Down Payment' : 'Ahorrar para el Pago Inicial',
      description: language === 'en' 
        ? 'Begin saving at least 3.5% of your target home price for an FHA loan, or explore down payment assistance programs.'
        : 'Comience a ahorrar al menos el 3.5% del precio objetivo de su casa para un préstamo FHA, o explore programas de asistencia para el pago inicial.',
      priority: 'high'
    });
  } else if (state.downPaymentAmount && state.downPaymentAmount < 10000) {
    recommendations.push({
      type: 'downPayment',
      title: language === 'en' ? 'Increase Down Payment' : 'Aumentar el Pago Inicial',
      description: language === 'en' 
        ? 'Continue saving to reach at least 3.5-5% of your target home price to qualify for more loan options.'
        : 'Continúe ahorrando para alcanzar al menos el 3.5-5% del precio objetivo de su casa para calificar para más opciones de préstamos.',
      priority: 'medium'
    });
  }
  
  // Employment recommendations
  if (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears < 2) {
    recommendations.push({
      type: 'employment',
      title: language === 'en' ? 'Establish Longer Self-Employment History' : 'Establecer un Historial de Trabajo por Cuenta Propia más Largo',
      description: language === 'en' 
        ? 'Wait until you have 2+ years of self-employment for better loan options, or consider applying with a W-2 co-borrower.'
        : 'Espere hasta tener 2+ años de trabajo por cuenta propia para mejores opciones de préstamos, o considere aplicar con un co-prestatario W-2.',
      priority: 'medium'
    });
  } else if (state.employmentType === 'unemployed') {
    recommendations.push({
      type: 'employment',
      title: language === 'en' ? 'Establish Stable Employment' : 'Establecer un Empleo Estable',
      description: language === 'en' 
        ? 'Secure stable employment and maintain it for at least 6 months before applying for a mortgage.'
        : 'Asegure un empleo estable y manténgalo durante al menos 6 meses antes de solicitar una hipoteca.',
      priority: 'high'
    });
  }
  
  // ID recommendations
  if (state.idType === 'ITIN') {
    recommendations.push({
      type: 'identity',
      title: language === 'en' ? 'Explore ITIN Mortgage Options' : 'Explorar Opciones de Hipoteca con ITIN',
      description: language === 'en' 
        ? 'Work with lenders who specialize in ITIN mortgages. Be prepared for higher down payment requirements.'
        : 'Trabaje con prestamistas que se especialicen en hipotecas con ITIN. Esté preparado para requisitos de pago inicial más altos.',
      priority: 'medium'
    });
  } else if (state.idType === 'none') {
    recommendations.push({
      type: 'identity',
      title: language === 'en' ? 'Obtain ITIN or Other Documentation' : 'Obtener ITIN u Otra Documentación',
      description: language === 'en' 
        ? 'Apply for an Individual Taxpayer Identification Number (ITIN) to access more mortgage options.'
        : 'Solicite un Número de Identificación Personal del Contribuyente (ITIN) para acceder a más opciones de hipoteca.',
      priority: 'high'
    });
  }
  
  // Timeline recommendations
  if (state.timeline === 'immediately' && (
    state.creditCategory === 'poor' || 
    state.hasCreditIssues || 
    (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears < 2) ||
    !state.downPaymentSaved
  )) {
    recommendations.push({
      type: 'timeline',
      title: language === 'en' ? 'Adjust Timeline Expectations' : 'Ajustar Expectativas de Tiempo',
      description: language === 'en' 
        ? 'Consider extending your timeline to address qualification issues before applying.'
        : 'Considere extender su línea de tiempo para abordar problemas de calificación antes de aplicar.',
      priority: 'medium'
    });
  }
  
  return recommendations;
};

export const getNextStepsPrompt = (language: Language): string => {
  return language === 'en' 
    ? 'Based on your prequalification results, we recommend proceeding with document collection for formal loan application. Our team will guide you through the next steps.'
    : 'Según sus resultados de precalificación, recomendamos proceder con la recopilación de documentos para la solicitud formal de préstamo. Nuestro equipo le guiará a través de los próximos pasos.';
};

export { calculateClientRating } from './ratingCalculator';
export { isQualified, getQualificationCategory };
