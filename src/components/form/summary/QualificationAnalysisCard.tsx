
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormState } from '@/types/form';
import { ClientRating } from '@/types/clientRating';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileCheck, Check, X, AlertTriangle, BarChart3 } from 'lucide-react';

interface QualificationAnalysisCardProps {
  formData: FormState;
  clientRating: ClientRating;
  isQualified: boolean;
}

// Helper to generate analysis based on form data
const useGenerateAnalysis = (formData: FormState, clientRating: ClientRating, isEnglish: boolean) => {
  // Generate detailed analysis based on form data
  const generateAnalysis = () => {
    const analysis = [];
    
    // Income Analysis
    if (clientRating.incomeRating >= 8) {
      analysis.push(isEnglish 
        ? 'Your income is excellent and well above the minimum requirements.'
        : 'Sus ingresos son excelentes y están muy por encima de los requisitos mínimos.');
    } else if (clientRating.incomeRating >= 6) {
      analysis.push(isEnglish 
        ? 'Your income meets our standard qualification requirements.'
        : 'Sus ingresos cumplen con nuestros requisitos de calificación estándar.');
    } else if (clientRating.incomeRating >= 4) {
      analysis.push(isEnglish 
        ? 'Your income is slightly below ideal levels, but may still qualify with compensating factors.'
        : 'Sus ingresos están ligeramente por debajo de los niveles ideales, pero aún puede calificar con factores compensatorios.');
    } else {
      analysis.push(isEnglish 
        ? 'Your income is below our standard requirements. You may need a co-signer or additional income source.'
        : 'Sus ingresos están por debajo de nuestros requisitos estándar. Es posible que necesite un co-firmante o una fuente adicional de ingresos.');
    }
    
    // Credit Analysis
    if (formData.creditCategory === 'excellent') {
      analysis.push(isEnglish 
        ? 'Your excellent credit score will help you qualify for the best interest rates.'
        : 'Su excelente puntuación de crédito le ayudará a calificar para las mejores tasas de interés.');
    } else if (formData.creditCategory === 'good') {
      analysis.push(isEnglish 
        ? 'Your good credit score meets standard qualification requirements.'
        : 'Su buena puntuación de crédito cumple con los requisitos de calificación estándar.');
    } else if (formData.creditCategory === 'fair') {
      analysis.push(isEnglish 
        ? 'Your fair credit score may result in higher interest rates or additional requirements.'
        : 'Su puntuación de crédito regular puede resultar en tasas de interés más altas o requisitos adicionales.');
    } else if (formData.creditCategory === 'poor') {
      analysis.push(isEnglish 
        ? 'Your credit score needs improvement. Consider credit repair options before applying.'
        : 'Su puntuación de crédito necesita mejorar. Considere opciones de reparación de crédito antes de aplicar.');
    }
    
    // Credit Issues Analysis
    if (formData.hasCreditIssues) {
      const issueKeys = Object.keys(formData.creditIssues).filter(key => 
        formData.creditIssues[key] === true && 
        !key.includes('Details')
      );
      
      if (issueKeys.length > 0) {
        const issueText = issueKeys.join(', ').replace(/,([^,]*)$/, isEnglish ? ' and$1' : ' y$1');
        analysis.push(isEnglish 
          ? `Your reported credit issues (${issueText}) may affect your qualification. Seasoning time and explanation letters may be required.`
          : `Sus problemas de crédito reportados (${issueText}) pueden afectar su calificación. Es posible que se requiera tiempo de espera y cartas de explicación.`);
      }
    }
    
    // Down Payment Analysis
    if (formData.downPaymentSaved && formData.downPaymentAmount) {
      const downPaymentPercentage = Math.round((formData.downPaymentAmount / (formData.income ? formData.income * 4 + formData.downPaymentAmount : 200000)) * 100);
      
      if (downPaymentPercentage >= 20) {
        analysis.push(isEnglish 
          ? `Your down payment of ${downPaymentPercentage}% is excellent and eliminates the need for mortgage insurance.`
          : `Su pago inicial del ${downPaymentPercentage}% es excelente y elimina la necesidad de un seguro hipotecario.`);
      } else if (downPaymentPercentage >= 10) {
        analysis.push(isEnglish 
          ? `Your down payment of ${downPaymentPercentage}% is very good but will require mortgage insurance.`
          : `Su pago inicial del ${downPaymentPercentage}% es muy bueno pero requerirá un seguro hipotecario.`);
      } else if (downPaymentPercentage >= 3.5) {
        analysis.push(isEnglish 
          ? `Your down payment of ${downPaymentPercentage}% meets minimum FHA requirements.`
          : `Su pago inicial del ${downPaymentPercentage}% cumple con los requisitos mínimos de FHA.`);
      } else {
        analysis.push(isEnglish 
          ? `Your down payment of ${downPaymentPercentage}% is below standard requirements. You may need down payment assistance.`
          : `Su pago inicial del ${downPaymentPercentage}% está por debajo de los requisitos estándar. Es posible que necesite asistencia para el pago inicial.`);
      }
    } else if (formData.assistanceOpen) {
      analysis.push(isEnglish 
        ? 'You may qualify for down payment assistance programs based on your profile.'
        : 'Puede calificar para programas de asistencia de pago inicial según su perfil.');
    } else {
      analysis.push(isEnglish 
        ? 'Without a down payment saved, you will need to explore down payment assistance programs or gift funds.'
        : 'Sin un pago inicial ahorrado, deberá explorar programas de asistencia para el pago inicial o fondos de regalo.');
    }
    
    // Employment Analysis
    if (formData.employmentType === '1099') {
      if (formData.selfEmployedYears && formData.selfEmployedYears >= 2) {
        analysis.push(isEnglish 
          ? `Your ${formData.selfEmployedYears}+ years of self-employment history meets standard requirements.`
          : `Sus ${formData.selfEmployedYears}+ años de historial de trabajo por cuenta propia cumplen con los requisitos estándar.`);
      } else {
        analysis.push(isEnglish 
          ? 'Your self-employment history is less than 2 years, which may require additional documentation or a co-signer.'
          : 'Su historial de trabajo por cuenta propia es menor a 2 años, lo que puede requerir documentación adicional o un co-firmante.');
      }
    } else if (formData.employmentType === 'W-2') {
      analysis.push(isEnglish 
        ? 'Your W-2 employment status meets standard qualification requirements.'
        : 'Su estado de empleo W-2 cumple con los requisitos de calificación estándar.');
    }
    
    return analysis;
  };

  return generateAnalysis();
};

// Analysis Item Component
const AnalysisItem = ({ item }: { item: string }) => {
  const needsWarning = item.includes('below') || item.includes('needs improvement');
  
  return (
    <li className="flex items-start gap-3 p-3 bg-muted/10 rounded-md">
      {needsWarning ? (
        <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
      ) : (
        <Check className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
      )}
      <span className="text-sm">{item}</span>
    </li>
  );
};

// Qualification Checklist Item
const ChecklistItem = ({ 
  title,
  isValid,
  isEnglish
}: { 
  title: string, 
  isValid: boolean,
  isEnglish: boolean
}) => {
  return (
    <div className="flex items-center gap-2">
      {isValid ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-red-500" />
      )}
      <span className="text-sm">{title}</span>
    </div>
  );
};

const QualificationAnalysisCard = ({ 
  formData, 
  clientRating,
  isQualified 
}: QualificationAnalysisCardProps) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  // Use the helper to generate analysis
  const analysis = useGenerateAnalysis(formData, clientRating, isEnglish);

  console.log("QualificationAnalysisCard rendering with:", {
    isQualified,
    analysis
  });

  return (
    <Card>
      <CardHeader className="bg-muted/10">
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {isEnglish ? 'Detailed Qualification Analysis' : 'Análisis Detallado de Calificación'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-md bg-gradient-to-r from-background to-primary/5">
            <FileCheck className={`h-6 w-6 ${isQualified ? 'text-green-500' : 'text-amber-500'}`} />
            <div>
              <h3 className="font-medium text-lg">
                {isQualified 
                  ? (isEnglish ? 'Preliminary Approval' : 'Aprobación Preliminar') 
                  : (isEnglish ? 'Conditional Review' : 'Revisión Condicional')}
              </h3>
              <p className="text-muted-foreground text-sm">
                {isQualified 
                  ? (isEnglish ? 'Based on the information provided, you appear to meet basic qualification criteria.' : 'Según la información proporcionada, parece cumplir con los criterios básicos de calificación.')
                  : (isEnglish ? 'Some issues need to be addressed before full qualification.' : 'Algunos problemas deben resolverse antes de la calificación completa.')}
              </p>
            </div>
          </div>

          <div className="space-y-3 mt-4">
            <h4 className="font-medium">{isEnglish ? 'Analysis Summary' : 'Resumen de Análisis'}</h4>
            <ul className="space-y-3">
              {analysis.map((item, index) => (
                <AnalysisItem key={index} item={item} />
              ))}
            </ul>
          </div>

          <div className="border-t pt-4 mt-4">
            <h4 className="font-medium mb-2">
              {isEnglish ? 'Qualification Checklist' : 'Lista de Verificación de Calificación'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <ChecklistItem 
                title={isEnglish ? 'Sufficient Income' : 'Ingresos Suficientes'}
                isValid={clientRating.incomeRating >= 6}
                isEnglish={isEnglish}
              />
              <ChecklistItem 
                title={isEnglish ? 'Acceptable Credit' : 'Crédito Aceptable'}
                isValid={clientRating.creditRating >= 6}
                isEnglish={isEnglish}
              />
              <ChecklistItem 
                title={isEnglish ? 'Down Payment/Funds' : 'Pago Inicial/Fondos'}
                isValid={clientRating.downPaymentRating >= 4}
                isEnglish={isEnglish}
              />
              <ChecklistItem 
                title={isEnglish ? 'No Major Credit Issues' : 'Sin Problemas de Crédito Importantes'}
                isValid={!formData.hasCreditIssues}
                isEnglish={isEnglish}
              />
              <ChecklistItem 
                title={isEnglish ? 'SSN Available' : 'SSN Disponible'}
                isValid={formData.idType === 'SSN'}
                isEnglish={isEnglish}
              />
              <ChecklistItem 
                title={isEnglish ? 'Employment History' : 'Historial de Empleo'}
                isValid={(formData.employmentType !== '1099' || (formData.selfEmployedYears && formData.selfEmployedYears >= 2))}
                isEnglish={isEnglish}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QualificationAnalysisCard;
