
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, BarChart, ExternalLink } from "lucide-react";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const currentDate = new Date().toLocaleDateString(
    t('language') === 'es' ? 'es-ES' : 'en-US', 
    { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="space-y-8 animate-fade-in max-w-[1200px] mx-auto px-4 md:px-6">
      <div>
        <h1 className="text-5xl font-bold mb-3 text-balance">{t('dashboard.welcome')}</h1>
        <p className="text-xl text-muted-foreground leading-relaxed tracking-wide">
          {t('dashboard.subtitle')}
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Welcome Card */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Hola, {user?.name}</span>
              <span className="text-base font-normal text-muted-foreground">
                {currentDate}
              </span>
            </CardTitle>
            <CardDescription>
              {t('dashboard.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Link to="/form">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 border-2">
                  <FileText size={24} className="text-gallopurple" />
                  <span>{t('nav.form')}</span>
                </Button>
              </Link>
              
              <Link to="/clients">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 border-2">
                  <Users size={24} className="text-gallopurple" />
                  <span>{t('nav.clients')}</span>
                </Button>
              </Link>
              
              <Link to="/analytics">
                <Button variant="outline" className="w-full h-24 flex flex-col items-center justify-center gap-2 hover:bg-secondary/50 border-2">
                  <BarChart size={24} className="text-gallopurple" />
                  <span>{t('nav.analytics')}</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-gallopurple/20 p-2 rounded">
                  <Users size={20} className="text-gallopurple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">New Clients (This Week)</p>
                  <p className="text-2xl font-semibold">12</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-gallopurple/20 p-2 rounded">
                  <FileText size={20} className="text-gallopurple" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Qualified Leads</p>
                  <p className="text-2xl font-semibold">68%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Resources Card */}
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <a href="#" className="flex items-center gap-2 text-gallopurple hover:text-gallopurple-dark">
                <ExternalLink size={16} />
                <span>Loan Processing Guidelines</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gallopurple hover:text-gallopurple-dark">
                <ExternalLink size={16} />
                <span>Credit Score Information</span>
              </a>
              <a href="#" className="flex items-center gap-2 text-gallopurple hover:text-gallopurple-dark">
                <ExternalLink size={16} />
                <span>Down Payment Assistance Programs</span>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
