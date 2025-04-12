
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useData } from '@/contexts/DataContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, TrendingDown, Minus, CreditCard, Wallet, BriefcaseBusiness, BadgeCheck, AlertTriangle } from 'lucide-react';
import { AnalyticMetric } from '@/types/form';

// Color palette
const COLORS = ['#690dac', '#9b87f5', '#7E69AB', '#6E59A5', '#1EAEDB'];

const Analytics = () => {
  const { t } = useLanguage();
  const { clients } = useData();
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  
  // Summary metrics
  const metrics: AnalyticMetric[] = [
    {
      key: 'qualified_rate',
      label: t('analytics.qualified_rate'),
      value: '68%',
      trend: 'up',
      percentage: 5
    },
    {
      key: 'avg_credit',
      label: t('analytics.avg_credit'),
      value: '682',
      trend: 'up',
      percentage: 2
    },
    {
      key: 'avg_income',
      label: t('analytics.avgIncome'),
      value: '$58,450',
      trend: 'up',
      percentage: 3
    },
    {
      key: 'savings_rate',
      label: t('analytics.savingsRate'),
      value: '42%',
      trend: 'down',
      percentage: 4
    }
  ];
  
  // Employment type data for pie chart
  const employmentData = [
    { name: t('analytics.w2'), value: 65 },
    { name: t('analytics.1099'), value: 25 },
    { name: 'Retired', value: 5 },
    { name: 'Other', value: 5 }
  ];
  
  // Credit score distribution for bar chart
  const creditScoreData = [
    { range: '500-580', count: 8, category: 'Poor' },
    { range: '580-620', count: 12, category: 'Poor' },
    { range: '620-660', count: 18, category: 'Fair' },
    { range: '660-700', count: 22, category: 'Good' },
    { range: '700-740', count: 25, category: 'Good' },
    { range: '740+', count: 15, category: 'Excellent' }
  ];
  
  // Income bracket distribution
  const incomeData = [
    { range: '<$30k', count: 10 },
    { range: '$30k-$50k', count: 25 },
    { range: '$50k-$75k', count: 35 },
    { range: '$75k-$100k', count: 20 },
    { range: '$100k+', count: 10 }
  ];
  
  // Common disqualifiers
  const disqualifierData = [
    { name: 'Low Credit Score', value: 38 },
    { name: 'No Down Payment', value: 28 },
    { name: 'No SSN/ITIN', value: 15 },
    { name: 'Recent Bankruptcy', value: 10 },
    { name: 'Insufficient Income', value: 9 }
  ];
  
  // Timeline distribution
  const timelineData = [
    { name: 'Immediately', value: 20 },
    { name: '0-3 Months', value: 30 },
    { name: '3-6 Months', value: 25 },
    { name: '6-12 Months', value: 15 },
    { name: 'Just Exploring', value: 10 }
  ];
  
  // Trend analysis data (monthly qualification rates)
  const trendData = [
    { month: 'Jan', qualified: 58, needsWork: 42 },
    { month: 'Feb', qualified: 62, needsWork: 38 },
    { month: 'Mar', qualified: 65, needsWork: 35 },
    { month: 'Apr', qualified: 68, needsWork: 32 },
    { month: 'May', qualified: 72, needsWork: 28 },
    { month: 'Jun', qualified: 68, needsWork: 32 }
  ];
  
  // Geographic data
  const geographicData = [
    { region: 'North', count: 28 },
    { region: 'South', count: 42 },
    { region: 'East', count: 15 },
    { region: 'West', count: 15 }
  ];
  
  // Helper function to render trend icon
  const renderTrendIcon = (trend: 'up' | 'down' | 'neutral', percentage: number) => {
    if (trend === 'up') {
      return (
        <div className="flex items-center text-green-500">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{percentage}%</span>
        </div>
      );
    }
    if (trend === 'down') {
      return (
        <div className="flex items-center text-red-500">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>-{percentage}%</span>
        </div>
      );
    }
    return (
      <div className="flex items-center text-gray-500">
        <Minus className="h-4 w-4 mr-1" />
        <span>0%</span>
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold mb-2">{t('analytics.title')}</h1>
      <p className="text-muted-foreground mb-6">
        {t('analytics.description') || "Insights and trends from client prequalification data"}
      </p>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Overview</h2>
        
        <div className="flex gap-2">
          <Badge 
            variant="outline" 
            className={timeframe === 'week' ? 'bg-secondary' : ''}
            onClick={() => setTimeframe('week')}
          >
            Week
          </Badge>
          <Badge 
            variant="outline"
            className={timeframe === 'month' ? 'bg-secondary' : ''}
            onClick={() => setTimeframe('month')}
          >
            Month
          </Badge>
          <Badge 
            variant="outline"
            className={timeframe === 'quarter' ? 'bg-secondary' : ''}
            onClick={() => setTimeframe('quarter')}
          >
            Quarter
          </Badge>
          <Badge 
            variant="outline"
            className={timeframe === 'year' ? 'bg-secondary' : ''}
            onClick={() => setTimeframe('year')}
          >
            Year
          </Badge>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {metrics.map((metric) => (
          <Card key={metric.key}>
            <CardContent className="pt-6">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">{metric.label}</span>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}</span>
                  {metric.trend && metric.percentage && renderTrendIcon(metric.trend, metric.percentage)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Tabs defaultValue="overview" className="w-full mb-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          {/* Employment Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.employment')}</CardTitle>
              <CardDescription>Distribution of client employment types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={employmentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {employmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Credit Score Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.credit')}</CardTitle>
              <CardDescription>Distribution of client credit scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={creditScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} clients`} />
                    <Bar dataKey="count" fill="#690dac">
                      {creditScoreData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={
                            entry.category === 'Excellent' ? '#10b981' : 
                            entry.category === 'Good' ? '#3b82f6' : 
                            entry.category === 'Fair' ? '#f59e0b' : 
                            '#ef4444'
                          } 
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#ef4444] mr-1"></div>
                  <span className="text-sm">Poor</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-1"></div>
                  <span className="text-sm">Fair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#3b82f6] mr-1"></div>
                  <span className="text-sm">Good</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#10b981] mr-1"></div>
                  <span className="text-sm">Excellent</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Common Disqualifiers */}
          <Card>
            <CardHeader>
              <CardTitle>{t('analytics.disqualifiers')}</CardTitle>
              <CardDescription>Most common reasons clients don't qualify</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={disqualifierData}
                    layout="vertical"
                    barSize={30}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#690dac" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="demographics" className="space-y-6 mt-6">
          {/* Income Bracket Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Income Distribution</CardTitle>
              <CardDescription>Client income bracket breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="range" />
                    <YAxis />
                    <Tooltip formatter={(value) => `${value} clients`} />
                    <Bar dataKey="count" fill="#690dac" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Timeline Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Purchase Timeline</CardTitle>
              <CardDescription>When clients are looking to buy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timelineData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {timelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Down Payment Readiness */}
          <Card>
            <CardHeader>
              <CardTitle>Down Payment Readiness</CardTitle>
              <CardDescription>Client down payment situation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-green-500 mb-2">42%</div>
                  <div className="text-sm">Have down payment saved</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">35%</div>
                  <div className="text-sm">Open to assistance programs</div>
                </div>
                <div className="bg-muted p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-red-500 mb-2">23%</div>
                  <div className="text-sm">No savings or assistance</div>
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Average Down Payment Amount</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <div className="text-2xl font-bold mb-1">$15,280</div>
                  <div className="text-xs text-muted-foreground">
                    Among clients who have savings (42%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6 mt-6">
          {/* Qualification Rate Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Qualification Rate Trends</CardTitle>
              <CardDescription>Monthly trend of qualified vs. needs work clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={trendData}
                    stackOffset="expand"
                    barSize={30}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(tick) => `${tick}%`} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                    <Bar dataKey="qualified" name="Qualified" stackId="a" fill="#10b981" />
                    <Bar dataKey="needsWork" name="Needs Work" stackId="a" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Key Metrics Over Time */}
          <Card>
            <CardHeader>
              <CardTitle>Key Metrics Over Time</CardTitle>
              <CardDescription>Important trends in the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Average Credit Score</span>
                    <span className="text-green-500 flex items-center text-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +2.5%
                    </span>
                  </div>
                  <div className="w-full bg-muted h-3 rounded-full">
                    <div className="bg-blue-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>670 (Jan)</span>
                    <span>682 (Current)</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Average Income</span>
                    <span className="text-green-500 flex items-center text-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +3.2%
                    </span>
                  </div>
                  <div className="w-full bg-muted h-3 rounded-full">
                    <div className="bg-green-500 h-3 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>$56,600 (Jan)</span>
                    <span>$58,450 (Current)</span>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Down Payment Readiness</span>
                    <span className="text-red-500 flex items-center text-sm">
                      <TrendingDown className="h-3 w-3 mr-1" />
                      -4.1%
                    </span>
                  </div>
                  <div className="w-full bg-muted h-3 rounded-full">
                    <div className="bg-amber-500 h-3 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>46% (Jan)</span>
                    <span>42% (Current)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="geographic" className="space-y-6 mt-6">
          {/* Geographic Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Client distribution by region</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geographicData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#8884d8"
                      paddingAngle={2}
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h4 className="font-medium mb-3">Top Regions by Qualification Rate</h4>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="flex items-center justify-between">
                    <span>South Region</span>
                    <Badge variant="success">72% Qualified</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>West Region</span>
                    <Badge variant="success">68% Qualified</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>North Region</span>
                    <Badge variant="warning">62% Qualified</Badge>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>East Region</span>
                    <Badge variant="warning">60% Qualified</Badge>
                  </li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
