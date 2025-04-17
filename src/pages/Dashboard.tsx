
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, BarChart, ExternalLink } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { clients } = useData();
  const [selectedCampaign, setSelectedCampaign] = useState<string>("");
  
  // Mock user campaigns data (in a real app this would come from user context/API)
  const userCampaigns = user?.role === 'assistant' 
    ? ['Dennis', 'Tito', 'Michael'] // Example for assistants with multiple campaigns
    : ['All'];
    
  useEffect(() => {
    if (userCampaigns && userCampaigns.length > 0) {
      setSelectedCampaign(userCampaigns[0]);
    }
  }, [userCampaigns]);

  const currentDate = new Date().toLocaleDateString(
    t('language') === 'es' ? 'es-ES' : 'en-US', 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  const handleCampaignChange = (value: string) => {
    setSelectedCampaign(value);
    // In a real app, this would trigger data fetching for the selected campaign
    console.log(`Switched to campaign: ${value}`);
  };

  // Get client statistics based on the selected campaign
  const getClientStats = () => {
    if (selectedCampaign === 'Dennis') {
      return { newClients: 12, qualifiedLeads: '68%' };
    } else if (selectedCampaign === 'Tito') {
      return { newClients: 8, qualifiedLeads: '72%' };
    } else if (selectedCampaign === 'Michael') {
      return { newClients: 10, qualifiedLeads: '64%' };
    } else {
      // For 'All' or default case
      return { 
        newClients: clients.filter(c => {
          const oneWeekAgo = new Date();
          oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
          return new Date(c.createdDate) >= oneWeekAgo;
        }).length,
        qualifiedLeads: `${Math.round((clients.filter(c => c.qualified).length / Math.max(clients.length, 1)) * 100)}%`
      };
    }
  };

  const stats = getClientStats();

  return (
    <div className="space-y-8 animate-fade-in max-w-[1200px] mx-auto px-4 md:px-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2 text-shadow-sm">{t('dashboard.welcome')}</h1>
          <p className="text-xl text-white/80">
            {t('dashboard.subtitle')}
          </p>
        </div>
        
        {user?.role === 'assistant' && userCampaigns.length > 1 && (
          <div className="w-full sm:w-64">
            <Select 
              value={selectedCampaign} 
              onValueChange={handleCampaignChange}
            >
              <SelectTrigger className="bg-black/50 border-purple-500/30 focus:ring-purple-400">
                <SelectValue placeholder="Select campaign" />
              </SelectTrigger>
              <SelectContent>
                {userCampaigns.map((campaign) => (
                  <SelectItem key={campaign} value={campaign}>
                    {campaign} Campaign
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <Card className="col-span-2 interactive-card">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hola, {user?.name}</span>
              <span className="text-base font-normal text-white/80">
                {currentDate}
              </span>
            </CardTitle>
            <CardDescription className="text-white/70">
              {selectedCampaign !== 'All' 
                ? `You are currently viewing the ${selectedCampaign} campaign` 
                : t('dashboard.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/form">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 border-2 border-white/10 hover:border-gallomodern-500/50">
                  <FileText size={24} className="text-neon-purple" />
                  <span className="text-high-contrast">{t('nav.form')}</span>
                </Button>
              </Link>
              
              <Link to="/clients">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 border-2 border-white/10 hover:border-gallomodern-500/50">
                  <Users size={24} className="text-neon-blue" />
                  <span className="text-high-contrast">{t('nav.clients')}</span>
                </Button>
              </Link>
              
              <Link to="/analytics">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 border-2 border-white/10 hover:border-gallomodern-500/50">
                  <BarChart size={24} className="text-neon-green" />
                  <span className="text-high-contrast">{t('nav.analytics')}</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="text-gradient">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-neon-purple/20 p-2 rounded">
                  <Users size={20} className="text-neon-purple" />
                </div>
                <div>
                  <p className="text-sm text-white/70">New Clients (This Week)</p>
                  <p className="text-2xl font-semibold text-high-contrast">
                    {stats.newClients}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-neon-blue/20 p-2 rounded">
                  <FileText size={20} className="text-neon-blue" />
                </div>
                <div>
                  <p className="text-sm text-white/70">Qualified Leads</p>
                  <p className="text-2xl font-semibold text-high-contrast">
                    {stats.qualifiedLeads}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resources Card */}
        <Card className="interactive-card">
          <CardHeader>
            <CardTitle className="text-gradient">Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2 text-neon-purple hover:text-neon-pink transition-colors">
                <ExternalLink size={16} />
                <span className="text-shadow-sm">Loan Processing Guidelines</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-neon-blue hover:text-neon-purple transition-colors">
                <ExternalLink size={16} />
                <span className="text-shadow-sm">Credit Score Information</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-neon-green hover:text-neon-blue transition-colors">
                <ExternalLink size={16} />
                <span className="text-shadow-sm">Down Payment Assistance Programs</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
