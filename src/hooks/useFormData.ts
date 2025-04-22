
import { useState, useEffect } from "react";
import { FormState } from "@/types/form";

export const useFormData = () => {
  const [formData, setFormData] = useState<FormState>({
    timeline: 'exploring',
    firstTimeBuyer: null,
    employmentType: null,
    otherEmploymentDetails: "",
    selfEmployedYears: null,
    income: null,
    incomeType: 'annual',
    creditCategory: null,
    creditScore: null,
    downPaymentSaved: null,
    downPaymentAmount: null,
    assistanceOpen: null,
    monthlyDebts: "",
    hasCreditIssues: null,
    creditIssueType: null,
    creditIssueYear: null,
    creditIssueAmount: null,
    creditIssues: {},
    idType: null,
    name: "",
    phone: "",
    email: "",
    comments: ""
  });

  const handleFormDataChange = (field: keyof FormState, value: any) => {
    if (field === 'phone') {
      const onlyDigits = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [field]: onlyDigits
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const updateFormData = (newData: Partial<FormState>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  return {
    formData,
    updateFormData,
    handleFormDataChange,
    setFormData
  };
};

export default useFormData;
