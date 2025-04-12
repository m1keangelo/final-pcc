
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

const Index = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">{t('dashboard.welcome')}</h1>
          <p className="text-xl text-muted-foreground">
            {t('dashboard.subtitle')}
          </p>
        </div>
        
        <div className="bg-card rounded-lg p-6 border">
          <p className="text-lg">{t('dashboard.description')}</p>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
