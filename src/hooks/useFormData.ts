
import { useState, useEffect } from "react";
import { FormState } from "@/types/form";
import { formatPhoneNumber } from "@/utils/formDataTransformer";

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

  useEffect(() => {
    if (formData.phone) {
      const formatted = formatPhoneNumber(formData.phone);
      
      if (formatted !== formData.phone) {
        setFormData(prev => ({ ...prev, phone: formatted }));
      }
    }
  }, [formData.phone]);

  const handleFormDataChange = (field: keyof FormState, value: string) => {
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
