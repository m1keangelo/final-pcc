
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, Upload, FileText, CreditCard, UserRound } from "lucide-react";
import { toast } from "sonner";

const DocumentSelection = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [uploadedDocs, setUploadedDocs] = useState<{[key: string]: boolean}>({
    preapproval: false,
    credit: false,
    id: false,
    socialSecurity: false
  });

  const handleDocUpload = (docType: string) => {
    // This would typically be connected to a file upload component
    // For now, we'll just simulate the upload process
    toast.success(language === 'en' 
      ? `${docType} document uploaded successfully` 
      : `Documento ${docType} subido con éxito`);
    
    setUploadedDocs(prev => ({
      ...prev,
      [docType.toLowerCase()]: true
    }));
  };

  const handleComplete = () => {
    toast.success(language === 'en'
      ? "All documents submitted successfully. An agent will contact you shortly."
      : "Todos los documentos enviados con éxito. Un agente se pondrá en contacto contigo pronto.");
    
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-3 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-600">
          {language === 'en' ? 'Required Documentation' : 'Documentación Requerida'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'en' 
            ? 'Please upload the following documents to proceed with your application' 
            : 'Por favor sube los siguientes documentos para continuar con tu solicitud'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className={`border-2 ${uploadedDocs.preapproval ? 'border-green-500' : 'border-muted'} transition-colors`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              {language === 'en' ? 'Pre-Approval Letter' : 'Carta de Pre-Aprobación'}
              {uploadedDocs.preapproval && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {language === 'en' 
                ? 'A pre-approval letter from your lender showing how much you can afford.'
                : 'Una carta de pre-aprobación de su prestamista que muestra cuánto puede pagar.'}
            </p>
            <Button 
              onClick={() => handleDocUpload('PreApproval')}
              className="w-full"
              variant={uploadedDocs.preapproval ? "outline" : "default"}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploadedDocs.preapproval 
                ? (language === 'en' ? 'Replace Document' : 'Reemplazar Documento') 
                : (language === 'en' ? 'Upload Document' : 'Subir Documento')}
            </Button>
          </CardContent>
        </Card>

        <Card className={`border-2 ${uploadedDocs.credit ? 'border-green-500' : 'border-muted'} transition-colors`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-purple-500" />
              {language === 'en' ? 'Credit Report Authorization' : 'Autorización de Informe de Crédito'}
              {uploadedDocs.credit && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {language === 'en' 
                ? 'Authorization form allowing us to check your credit score.'
                : 'Formulario de autorización que nos permite verificar su puntaje de crédito.'}
            </p>
            <Button 
              onClick={() => handleDocUpload('Credit')}
              className="w-full"
              variant={uploadedDocs.credit ? "outline" : "default"}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploadedDocs.credit 
                ? (language === 'en' ? 'Replace Document' : 'Reemplazar Documento') 
                : (language === 'en' ? 'Upload Document' : 'Subir Documento')}
            </Button>
          </CardContent>
        </Card>

        <Card className={`border-2 ${uploadedDocs.id ? 'border-green-500' : 'border-muted'} transition-colors`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-purple-500" />
              {language === 'en' ? 'Photo ID' : 'Identificación con Foto'}
              {uploadedDocs.id && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {language === 'en' 
                ? 'A government-issued photo ID (driver's license or passport).'
                : 'Una identificación con foto emitida por el gobierno (licencia de conducir o pasaporte).'}
            </p>
            <Button 
              onClick={() => handleDocUpload('ID')}
              className="w-full"
              variant={uploadedDocs.id ? "outline" : "default"}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploadedDocs.id 
                ? (language === 'en' ? 'Replace Document' : 'Reemplazar Documento') 
                : (language === 'en' ? 'Upload Document' : 'Subir Documento')}
            </Button>
          </CardContent>
        </Card>

        <Card className={`border-2 ${uploadedDocs.socialSecurity ? 'border-green-500' : 'border-muted'} transition-colors`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-500" />
              {language === 'en' ? 'Social Security Card/ITIN' : 'Tarjeta de Seguro Social/ITIN'}
              {uploadedDocs.socialSecurity && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {language === 'en' 
                ? 'A copy of your Social Security Card or Individual Taxpayer Identification Number.'
                : 'Una copia de su tarjeta de Seguro Social o Número de Identificación de Contribuyente Individual.'}
            </p>
            <Button 
              onClick={() => handleDocUpload('SocialSecurity')}
              className="w-full"
              variant={uploadedDocs.socialSecurity ? "outline" : "default"}
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploadedDocs.socialSecurity 
                ? (language === 'en' ? 'Replace Document' : 'Reemplazar Documento') 
                : (language === 'en' ? 'Upload Document' : 'Subir Documento')}
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end mt-8">
        <Button
          onClick={handleComplete}
          size="lg"
          className="bg-purple-600 hover:bg-purple-700 transition-colors"
        >
          {language === 'en' ? 'Submit Documents' : 'Enviar Documentos'}
        </Button>
      </div>
    </div>
  );
};

export default DocumentSelection;
