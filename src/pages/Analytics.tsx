
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  const { t } = useLanguage();
  const { clients } = useData();
  
  // Colors for charts
  const COLORS = ['#9b87f5', '#7E69AB', '#D6BCFA', '#6E59A5', '#E5DEFF'];
  
  // 1. Employment Type Distribution
  const employmentData = [
    { name: t('analytics.w2'), value: clients.filter(c => c.employmentType === 'W-2').length },
    { name: t('analytics.1099'), value: clients.filter(c => c.employmentType === '1099').length }
  ];
  
  // 2. Average Income
  const averageIncome = clients.length > 0 
    ? Math.round(clients.reduce((sum, client) => sum + client.incomeAnnual, 0) / clients.length) 
    : 0;
  
  // 3. Credit Score Distribution
  const creditData = [
    { name: 'Poor', value: clients.filter(c => c.creditCategory === 'Poor').length },
    { name: 'Fair', value: clients.filter(c => c.creditCategory === 'Fair').length },
    { name: 'Good', value: clients.filter(c => c.creditCategory === 'Good').length },
    { name: 'Excellent', value: clients.filter(c => c.creditCategory === 'Excellent').length }
  ].filter(item => item.value > 0);
  
  // 4. Down Payment Savings Rate
  const savingsRate = clients.length > 0 
    ? Math.round((clients.filter(c => c.downPaymentSaved).length / clients.length) * 100) 
    : 0;
  
  // 5. Common Disqualifier Reasons
  const disqualifierData = [
    { 
      name: 'Credit Issues', 
      value: clients.filter(c => c.creditCategory === 'Poor' || c.creditScore === 550).length 
    },
    { 
      name: 'No Legal Status', 
      value: clients.filter(c => c.legalStatus === 'Undocumented').length 
    },
    { 
      name: 'No Down Payment', 
      value: clients.filter(c => !c.downPaymentSaved).length 
    }
  ].filter(item => item.value > 0);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <h1 className="text-3xl font-bold">{t('analytics.title')}</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Employment Type */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.employment')}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={employmentData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {employmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Credit Score Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.credit')}</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={creditData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" name="Clients">
                  {creditData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        {/* Average Income */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.income')}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-muted-foreground">{t('analytics.avgIncome')}</p>
              <p className="text-4xl font-bold text-gallopurple">
                ${averageIncome.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Down Payment Savings Rate */}
        <Card>
          <CardHeader>
            <CardTitle>{t('analytics.savings')}</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center h-40">
            <div className="text-center">
              <p className="text-5xl font-bold text-gallopurple">
                {savingsRate}%
              </p>
              <p className="text-muted-foreground mt-2">{t('analytics.savingsRate')}</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Common Disqualifier Reasons */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>{t('analytics.disqualifiers')}</CardTitle>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={disqualifierData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Clients" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
