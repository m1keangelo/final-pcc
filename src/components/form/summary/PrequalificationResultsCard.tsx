
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormState } from '@/types/form';
import { ClientRating } from '@/types/clientRating';
import { useLanguage } from '@/contexts/LanguageContext';
import { Badge } from '@/components/ui/badge';
import { Sheet } from 'lucide-react';

interface PrequalificationResultsCardProps {
  formData: FormState;
  clientRating: ClientRating;
}

const PrequalificationResultsCard: React.FC<PrequalificationResultsCardProps> = ({ 
  formData, 
  clientRating 
}) => {
  const { language } = useLanguage();
  const isEnglish = language === 'en';

  const formatCurrency = (amount: number | null) => {
    if (amount === null) return '--';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate estimated loan amount based on income
  const annualIncome = formData.income 
    ? (formData.incomeType === 'monthly' ? formData.income * 12 : formData.income) 
    : 0;
  const estimatedLoanAmount = Math.round(annualIncome * 4);
  
  // Calculate estimated monthly payment (simplified)
  const interestRate = 0.06; // 6% annual rate
  const loanTermYears = 30;
  const monthlyRate = interestRate / 12;
  const numberOfPayments = loanTermYears * 12;
  
  const estimatedMonthlyPayment = estimatedLoanAmount * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Calculate maximum purchase price
  const downPaymentAmount = formData.downPaymentAmount || 0;
  const maxPurchasePrice = estimatedLoanAmount + downPaymentAmount;

  console.log("PrequalificationResultsCard rendering with:", {
    annualIncome,
    estimatedLoanAmount,
    estimatedMonthlyPayment,
    maxPurchasePrice,
    clientRating
  });
  
  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="flex items-center gap-2">
          <Sheet className="h-5 w-5" />
          {isEnglish ? 'Prequalification Results' : 'Resultados de Precalificación'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">
                {isEnglish ? 'Estimated Loan Amount' : 'Monto Estimado del Préstamo'}
              </p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(estimatedLoanAmount)}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">
                {isEnglish ? 'Est. Monthly Payment' : 'Pago Mensual Est.'}
              </p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(estimatedMonthlyPayment)}</p>
            </div>
            <div className="bg-muted/30 p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">
                {isEnglish ? 'Max Purchase Price' : 'Precio Máximo de Compra'}
              </p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(maxPurchasePrice)}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">
              {isEnglish ? 'Key Qualification Factors' : 'Factores Clave de Calificación'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                <span>{isEnglish ? 'Income' : 'Ingresos'}</span>
                <Badge variant={clientRating.incomeRating >= 6 ? "success" : "warning"}>
                  {formatCurrency(annualIncome)}/year
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                <span>{isEnglish ? 'Credit Score' : 'Puntuación de Crédito'}</span>
                <Badge variant={clientRating.creditRating >= 6 ? "success" : "warning"}>
                  {formData.creditScore || '—'}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                <span>{isEnglish ? 'Down Payment' : 'Pago Inicial'}</span>
                <Badge variant={clientRating.downPaymentRating >= 6 ? "success" : "warning"}>
                  {formatCurrency(formData.downPaymentAmount)}
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/20 rounded-md">
                <span>{isEnglish ? 'Monthly Debts' : 'Deudas Mensuales'}</span>
                <Badge variant="outline">{formData.monthlyDebts || 'None reported'}</Badge>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrequalificationResultsCard;
