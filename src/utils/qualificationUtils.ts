
import { FormState } from "@/types/form";
import { ClientRating } from "@/types/clientRating";
import { calculateClientRating } from "@/utils/ratingCalculator";
import { isQualified, getQualificationCategory } from "@/utils/qualificationChecker";

// Get qualification summary text based on user's form data
export const getQualificationSummary = (state: FormState, language: 'en' | 'es'): string => {
  const qualified = isQualified(state);
  const category = getQualificationCategory(state);
  
  if (language === 'es') {
    if (!qualified) {
      return "⚠️ Basándonos en la información proporcionada, identificamos algunos problemas que necesitan ser abordados antes de calificar.";
    } else if (category === 'fixesNeeded') {
      return "⚡ Basándonos en la información proporcionada, parece que califica con condiciones. Hay algunas áreas que podrían mejorarse.";
    } else {
      return "✅ ¡Según la información proporcionada, parece que califica para un préstamo hipotecario!";
    }
  } else {
    if (!qualified) {
      return "⚠️ Based on the information provided, we've identified some issues that need to be addressed before qualifying.";
    } else if (category === 'fixesNeeded') {
      return "⚡ Based on the information provided, you appear to qualify with conditions. There are some areas that could be improved.";
    } else {
      return "✅ Based on the information provided, you appear to qualify for a mortgage loan!";
    }
  }
};

// Get recommendations based on user's form data
export const getRecommendations = (state: FormState, language: 'en' | 'es'): string[] => {
  const recommendations: string[] = [];
  const rating = calculateClientRating(state);
  
  // Employment recommendations
  if (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears < 2) {
    recommendations.push(
      language === 'es' 
        ? "Continúe manteniendo registros consistentes de su negocio. Los prestamistas generalmente buscan al menos 2 años completos de trabajo por cuenta propia."
        : "Continue maintaining consistent records for your business. Lenders typically look for at least 2 full years of self-employment."
    );
  }
  
  // Credit recommendations
  if (state.creditCategory === 'poor' || state.creditCategory === 'fair') {
    recommendations.push(
      language === 'es'
        ? "Trabaje en mejorar su puntaje crediticio. Puede considerar un préstamo FHA, que tiene requisitos crediticios más flexibles."
        : "Work on improving your credit score. Consider an FHA loan, which has more flexible credit requirements."
    );
  }
  
  // Down payment recommendations
  if (!state.downPaymentSaved || (state.downPaymentAmount && state.downPaymentAmount < 20000)) {
    recommendations.push(
      language === 'es'
        ? "Explore programas de asistencia para el pago inicial. Hay muchos programas federales, estatales y locales disponibles."
        : "Explore down payment assistance programs. There are many federal, state, and local programs available."
    );
  }
  
  // Credit issues recommendations
  if (state.hasCreditIssues) {
    recommendations.push(
      language === 'es'
        ? "Prepare una carta de explicación que detalle las circunstancias de sus problemas crediticios anteriores."
        : "Prepare a letter of explanation detailing the circumstances of your previous credit issues."
    );
  }
  
  // Generic recommendations if none of the above apply
  if (recommendations.length === 0) {
    recommendations.push(
      language === 'es'
        ? "Mantega sus finanzas estables y evite hacer grandes compras antes del cierre."
        : "Keep your finances stable and avoid making large purchases before closing."
    );
  }
  
  return recommendations;
};

// Get positive factors to highlight from user's form data
export const getPositiveFactors = (state: FormState, language: 'en' | 'es'): string[] => {
  const positiveFactors: string[] = [];
  const rating = calculateClientRating(state);
  
  // Income factor
  if (rating.incomeRating >= 8) {
    positiveFactors.push(
      language === 'es'
        ? "Ingresos sólidos que están por encima de los requisitos típicos del prestamista."
        : "Strong income that's above typical lender requirements."
    );
  }
  
  // Credit factor
  if (state.creditCategory === 'excellent' || state.creditCategory === 'good') {
    positiveFactors.push(
      language === 'es'
        ? "Buen historial crediticio que aumentará las probabilidades de aprobación."
        : "Good credit history that will increase approval odds."
    );
  }
  
  // Down payment factor
  if (state.downPaymentSaved && state.downPaymentAmount && state.downPaymentAmount >= 20000) {
    positiveFactors.push(
      language === 'es'
        ? "Pago inicial significativo ahorrado, lo que demuestra capacidad financiera."
        : "Significant down payment saved, demonstrating financial capability."
    );
  }
  
  // Employment factor
  if (state.employmentType === 'W-2') {
    positiveFactors.push(
      language === 'es'
        ? "Empleo estable con ingresos W-2, lo que los prestamistas consideran menos riesgoso."
        : "Stable employment with W-2 income, which lenders consider less risky."
    );
  } else if (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears >= 2) {
    positiveFactors.push(
      language === 'es'
        ? `Historial establecido de trabajo por cuenta propia (${state.selfEmployedYears} años), que cumple con los requisitos del prestamista.`
        : `Established self-employment history (${state.selfEmployedYears} years), which meets lender requirements.`
    );
  }
  
  // First-time homebuyer factor
  if (state.firstTimeBuyer) {
    positiveFactors.push(
      language === 'es'
        ? "Elegible para programas especiales de comprador de primera vivienda."
        : "Eligible for special first-time homebuyer programs."
    );
  }
  
  // No credit issues factor
  if (!state.hasCreditIssues) {
    positiveFactors.push(
      language === 'es'
        ? "Sin problemas crediticios graves recientes (como bancarrota o ejecución hipotecaria)."
        : "No major recent credit issues (like bankruptcy or foreclosure)."
    );
  }
  
  return positiveFactors;
};

// Get next steps prompt
export const getNextStepsPrompt = (language: 'en' | 'es'): string => {
  return language === 'es'
    ? "Estamos listos para continuar con su proceso de preaprobación. Estos son los próximos pasos recomendados:"
    : "We're ready to continue with your pre-approval process. Here are the recommended next steps:";
};

export default {
  getQualificationSummary,
  getRecommendations,
  getPositiveFactors,
  getNextStepsPrompt
};
