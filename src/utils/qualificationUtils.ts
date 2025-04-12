
import { FormState, getQualificationCategory, isQualified } from '@/types/form';

export type RecommendationType = 'credit' | 'income' | 'downPayment' | 'employment' | 'documentation' | 'timeline' | 'identity';

export interface Recommendation {
  type: RecommendationType;
  title: string; 
  description: string;
  actionable: boolean;
}

export const getRecommendations = (formState: FormState, language: 'en' | 'es'): Recommendation[] => {
  const recommendations: Recommendation[] = [];
  
  // Credit recommendations
  if (formState.creditCategory === 'poor' || formState.creditCategory === 'fair') {
    recommendations.push({
      type: 'credit',
      title: language === 'en' 
        ? 'Credit Score Improvement' 
        : 'Mejora de Puntaje de Crédito',
      description: language === 'en'
        ? 'Your credit score is a bit low. Consider becoming an authorized user on a family member\'s credit card to boost your score faster. You can also use a rent-reporting service so your on-time rent payments count towards building credit.' 
        : 'Su puntaje de crédito es un poco bajo. Considere añadirse como usuario autorizado en la tarjeta de crédito de un familiar para ayudar a subir su puntaje más rápido. También puede usar un servicio de reportar su renta a las agencias de crédito.',
      actionable: true
    });
  }
  
  // Down payment recommendations
  if (!formState.downPaymentSaved) {
    recommendations.push({
      type: 'downPayment',
      title: language === 'en' 
        ? 'Down Payment Assistance' 
        : 'Asistencia para el Enganche',
      description: language === 'en'
        ? 'You indicated you don\'t have savings for a down payment. There are assistance programs that can help with this, including grants and loans for first-time buyers. We can connect you with local resources.' 
        : 'Indicó que no tiene ahorros para el enganche. Existen programas de asistencia que pueden ayudar, incluyendo subvenciones y préstamos para compradores primerizos. Podemos conectarle con recursos locales.',
      actionable: true
    });
  }
  
  // Self-employment recommendations
  if (formState.employmentType === '1099' && formState.selfEmployedYears && formState.selfEmployedYears < 2) {
    recommendations.push({
      type: 'employment',
      title: language === 'en' 
        ? 'Self-Employment History' 
        : 'Historial de Auto-Empleo',
      description: language === 'en'
        ? 'Lenders typically require at least 2 years of self-employment history. You might need a co-signer or to wait until you have a longer track record.' 
        : 'Los prestamistas normalmente requieren al menos 2 años de historial de auto-empleo. Es posible que necesite un co-firmante o esperar hasta tener un historial más largo.',
      actionable: false
    });
  }
  
  // Identity/SSN recommendations
  if (formState.idType === 'none') {
    recommendations.push({
      type: 'identity',
      title: language === 'en' 
        ? 'Alternative Documentation Options' 
        : 'Opciones de Documentación Alternativa',
      description: language === 'en' 
        ? 'Without an SSN or ITIN, you\'ll need a co-signer with established credit. Alternatively, you can explore obtaining an ITIN which would allow you to apply for certain mortgage programs.' 
        : 'Sin un SSN o ITIN, necesitará un co-firmante con crédito establecido. Alternativamente, puede explorar obtener un ITIN que le permitiría solicitar ciertos programas hipotecarios.',
      actionable: true
    });
  } else if (formState.idType === 'ITIN') {
    recommendations.push({
      type: 'identity',
      title: language === 'en' 
        ? 'ITIN Mortgage Options' 
        : 'Opciones de Hipoteca con ITIN',
      description: language === 'en'
        ? 'With an ITIN, you can qualify for certain mortgage programs, though they typically require a larger down payment. We\'ll help you find lenders who work with ITIN borrowers.' 
        : 'Con un ITIN, puede calificar para ciertos programas hipotecarios, aunque típicamente requieren un enganche mayor. Le ayudaremos a encontrar prestamistas que trabajen con prestatarios con ITIN.',
      actionable: true
    });
  }
  
  // Credit issues recommendations
  if (formState.hasCreditIssues) {
    if (formState.creditIssueType === 'bankruptcy' || formState.creditIssueType === 'foreclosure') {
      const currentYear = new Date().getFullYear();
      const yearsSinceIssue = formState.creditIssueYear ? currentYear - formState.creditIssueYear : null;
      
      if (yearsSinceIssue !== null && yearsSinceIssue < 4) {
        recommendations.push({
          type: 'credit',
          title: language === 'en' 
            ? 'Credit Event Recovery' 
            : 'Recuperación de Evento de Crédito',
          description: language === 'en'
            ? `Most lenders require a waiting period of 2-7 years after a ${formState.creditIssueType}. You may need to wait ${Math.max(0, 4 - yearsSinceIssue)} more years while rebuilding your credit.` 
            : `La mayoría de los prestamistas requieren un período de espera de 2-7 años después de una ${formState.creditIssueType === 'bankruptcy' ? 'bancarrota' : 'ejecución hipotecaria'}. Es posible que necesite esperar ${Math.max(0, 4 - yearsSinceIssue)} años más mientras reconstruye su crédito.`,
          actionable: false
        });
      }
    } else if (formState.creditIssueType === 'collections' && (formState.creditIssueAmount || 0) > 500) {
      recommendations.push({
        type: 'credit',
        title: language === 'en' 
          ? 'Collections Resolution' 
          : 'Resolución de Colecciones',
        description: language === 'en'
          ? 'You have significant collections that may impact loan approval. Consider setting up payment plans or negotiating settlements for these accounts before applying.' 
          : 'Tiene colecciones significativas que pueden afectar la aprobación del préstamo. Considere establecer planes de pago o negociar acuerdos para estas cuentas antes de aplicar.',
        actionable: true
      });
    }
  }
  
  return recommendations;
};

export const getQualificationSummary = (formState: FormState, language: 'en' | 'es'): string => {
  const category = getQualificationCategory(formState);
  
  if (category === 'ready') {
    return language === 'en'
      ? '✅ Based on what you\'ve told me, you can likely qualify to buy a home!'
      : '✅ Basado en lo que me has contado, ¡es muy probable que califiques para comprar una casa!';
  } else if (category === 'fixesNeeded') {
    return language === 'en'
      ? '⚠️ Based on what you\'ve told me, with a few improvements, you should be able to qualify for a home loan.'
      : '⚠️ Basado en lo que me has contado, con algunas mejoras, deberías poder calificar para un préstamo hipotecario.';
  } else {
    return language === 'en'
      ? '⚠️ Based on what you\'ve told me, it seems you need to resolve some issues before you can buy a home.'
      : '⚠️ Basado en lo que me has contado, parece que necesitas resolver algunos puntos antes de poder comprar una casa.';
  }
};

export const getPositiveFactors = (formState: FormState, language: 'en' | 'es'): string[] => {
  const factors: string[] = [];
  
  // First time buyer advantage
  if (formState.firstTimeBuyer) {
    factors.push(language === 'en' 
      ? 'You\'re a first-time buyer, which means you might qualify for special programs.'
      : 'Eres comprador de primera vez, lo que significa que podrías calificar para programas especiales.');
  }
  
  // Stable employment
  if (formState.employmentType === 'W-2') {
    factors.push(language === 'en'
      ? 'You have stable employment, which is great for qualifying.'
      : 'Tienes un empleo estable, lo cual es excelente para calificar.');
  }
  
  // Good credit
  if (formState.creditCategory === 'good' || formState.creditCategory === 'excellent') {
    factors.push(language === 'en'
      ? 'You have good credit, which will help you get better loan terms.'
      : 'Tienes buen crédito, lo que te ayudará a obtener mejores términos de préstamo.');
  }
  
  // Down payment saved
  if (formState.downPaymentSaved) {
    factors.push(language === 'en'
      ? 'You already have savings for a down payment, which is a big step toward homeownership.'
      : 'Ya tienes ahorros para el enganche, lo cual es un gran paso hacia la propiedad de vivienda.');
  }
  
  return factors;
};

export const getNextStepsPrompt = (language: 'en' | 'es'): string => {
  return language === 'en'
    ? 'Would you like us to help you put a plan together and officially check your qualification?'
    : '¿Le gustaría que le ayudemos a armar un plan y verificar oficialmente su calificación?';
};
