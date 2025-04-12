import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormState } from "@/types/form";
import { useData } from "@/contexts/DataContext";
import { 
  PlusCircle, Trash2, Upload, Users, School, 
  HelpCircle, FileText, Shield, User 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const AdminDashboard = () => {
  const { user, hasPermission } = useAuth();
  const { t } = useLanguage();
  const { clients } = useData();
  const [activeTab, setActiveTab] = useState("users");
  
  // Check if user has admin access
  if (!hasPermission("VIEW_ADMIN_DASHBOARD")) {
    return (
      <div className="max-w-3xl mx-auto p-6 text-center">
        <Shield className="w-12 h-12 mx-auto mb-4 text-red-500" />
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p>You do not have permission to view this page. Please contact an administrator.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Badge variant={user?.role === 'superadmin' ? 'destructive' : 'outline'} className="text-sm">
          {user?.role === 'superadmin' ? 'Super Admin' : 'Admin'}
        </Badge>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>User Management</span>
          </TabsTrigger>
          <TabsTrigger value="form" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Form Builder</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <School className="h-4 w-4" />
            <span>Training Materials</span>
          </TabsTrigger>
          <TabsTrigger value="animations" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Animations</span>
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span>Campaigns</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-6">
          <UserManagementTab />
        </TabsContent>
        
        <TabsContent value="form" className="space-y-6">
          <FormBuilderTab />
        </TabsContent>
        
        <TabsContent value="training" className="space-y-6">
          <TrainingMaterialsTab />
        </TabsContent>
        
        <TabsContent value="animations" className="space-y-6">
          <AnimationsTab />
        </TabsContent>
        
        <TabsContent value="campaigns" className="space-y-6">
          <CampaignsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

// User Management Tab
const UserManagementTab = () => {
  const { user: currentUser, hasPermission } = useAuth();
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    name: "",
    role: "assistant",
    campaign: "Dennis"
  });
  const [showUserDialog, setShowUserDialog] = useState(false);
  
  const mockUsers = [
    { id: '0', username: 'm1keangelo', name: 'Super Admin', role: 'superadmin', email: 'm1keangelo@icloud.com' },
    { id: '1', username: 'admin', name: 'Admin User', role: 'admin', email: 'admin@galloavion.com' },
    { id: '2', username: 'maria', name: 'Maria Rodriguez', role: 'assistant', campaign: 'Dennis' },
    { id: '3', username: 'juan', name: 'Juan Perez', role: 'assistant', campaign: 'Michael' },
    { id: '4', username: 'sophia', name: 'Sophia Garcia', role: 'assistant', campaign: 'Tito' },
    { id: '5', username: 'carlos', name: 'Carlos Mendez', role: 'assistant', campaign: 'Alvaro' }
  ];
  
  // Check if current user can manage users
  const canManageUsers = hasPermission("MANAGE_USERS");

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New User</CardTitle>
          <CardDescription>Create a new account for staff members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Username</label>
              <Input
                value={newUser.username}
                onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                placeholder="username"
                disabled={!canManageUsers}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Password</label>
              <Input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                placeholder="••••••••"
                disabled={!canManageUsers}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Full Name</label>
              <Input
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                placeholder="Full Name"
                disabled={!canManageUsers}
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Role</label>
              <select
                className="w-full p-2 border rounded"
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                disabled={!canManageUsers}
              >
                <option value="assistant">Assistant</option>
                <option value="admin">Admin</option>
                {currentUser?.role === 'superadmin' && <option value="superadmin">Super Admin</option>}
              </select>
            </div>
            {newUser.role === 'assistant' && (
              <div>
                <label className="block mb-2 text-sm font-medium">Campaign</label>
                <select
                  className="w-full p-2 border rounded"
                  value={newUser.campaign}
                  onChange={(e) => setNewUser({...newUser, campaign: e.target.value})}
                  disabled={!canManageUsers}
                >
                  <option value="Dennis">Dennis</option>
                  <option value="Michael">Michael</option>
                  <option value="Tito">Tito</option>
                  <option value="Alvaro">Alvaro</option>
                </select>
              </div>
            )}
          </div>
          <Button 
            className="w-full" 
            disabled={!canManageUsers}
            onClick={() => canManageUsers && setShowUserDialog(true)}
          >
            Add User
          </Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Manage Users</CardTitle>
          <CardDescription>View, edit, or delete existing users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Username</th>
                  <th className="text-left p-2">Role</th>
                  <th className="text-left p-2">Campaign</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => (
                  <tr key={user.id} className="border-b">
                    <td className="p-2">{user.name}</td>
                    <td className="p-2">{user.username}</td>
                    <td className="p-2">
                      <Badge variant={
                        user.role === 'superadmin' ? 'destructive' : 
                        user.role === 'admin' ? 'default' : 'outline'
                      }>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-2">{user.campaign || 'All Campaigns'}</td>
                    <td className="p-2">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" disabled={!canManageUsers || user.role === 'superadmin'}>
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-red-500" 
                          disabled={!canManageUsers || user.role === 'superadmin'}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add User Confirmation Dialog */}
      <Dialog open={showUserDialog} onOpenChange={setShowUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              This will create a new user account with the following details:
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="font-medium">Username:</div>
              <div>{newUser.username}</div>
              <div className="font-medium">Name:</div>
              <div>{newUser.name}</div>
              <div className="font-medium">Role:</div>
              <div>{newUser.role}</div>
              {newUser.role === 'assistant' && (
                <>
                  <div className="font-medium">Campaign:</div>
                  <div>{newUser.campaign}</div>
                </>
              )}
            </div>
          </div>
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setShowUserDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              // Here we would add user to the database
              toast.success(`User ${newUser.username} added successfully!`);
              setShowUserDialog(false);
              // Reset the form
              setNewUser({
                username: "",
                password: "",
                name: "",
                role: "assistant",
                campaign: "Dennis"
              });
            }}>
              Add User
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Form Builder Tab
const FormBuilderTab = () => {
  // Mock questions data structure
  const mockQuestions = [
    {
      id: "timeline",
      title_en: "Homebuying Timeline",
      title_es: "Plazo para Comprar Casa",
      question_en: "How soon are you looking to buy a home?",
      question_es: "¿Qué tan pronto busca comprar una casa?",
      type: "choice",
      options: [
        { value: "immediately", label_en: "Immediately (I've found a home)", label_es: "Inmediatamente (ya encontré una casa)" },
        { value: "3months", label_en: "Within 3 months", label_es: "Dentro de 3 meses" },
        { value: "3to6months", label_en: "3-6 months", label_es: "3-6 meses" },
        { value: "6to12months", label_en: "6-12 months", label_es: "6-12 meses" },
        { value: "exploring", label_en: "Just exploring/Not sure", label_es: "Solo explorando/No estoy seguro" }
      ],
      help_en: "This helps determine how urgent the purchase is. If only exploring, explore their doubts or barriers.",
      help_es: "Esto determina qué tan urgente es la compra. Si solo está explorando, indague sus dudas o barreras.",
      conditional_questions: [
        {
          trigger_value: ["3to6months", "6to12months"],
          question_id: "lease_end",
          title_en: "Lease End Date",
          title_es: "Fin de Contrato de Renta",
          question_en: "Are you renting currently? When does your lease end?",
          question_es: "¿Está rentando actualmente? ¿Cuándo termina su contrato de renta?",
          type: "text"
        },
        {
          trigger_value: ["exploring"],
          question_id: "buying_barriers",
          title_en: "Buying Barriers",
          title_es: "Barreras para Comprar",
          question_en: "What is holding you back from buying now?",
          question_es: "¿Qué le impide comprar ahora?",
          type: "text"
        }
      ]
    },
    {
      id: "firstTimeBuyer",
      title_en: "First-Time Homebuyer",
      title_es: "Comprador de Primera Vez",
      question_en: "Have you purchased a home before, or would this be your first time buying?",
      question_es: "¿Ha comprado una casa antes, o esta sería su primera vez comprando?",
      type: "boolean",
      help_en: "First-time buyers may qualify for special programs with lower down payments.",
      help_es: "Los compradores primerizos pueden calificar para programas especiales con pagos iniciales más bajos."
    }
  ];

  return (
    <div>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Form Questions</CardTitle>
            <CardDescription>Manage and edit prequalification form questions</CardDescription>
          </div>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Question
          </Button>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {mockQuestions.map((question) => (
              <AccordionItem key={question.id} value={question.id}>
                <AccordionTrigger className="font-medium">
                  {question.title_en} / {question.title_es}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 p-4 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block mb-1 text-sm font-medium">English Title</label>
                        <Input defaultValue={question.title_en} />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium">Spanish Title</label>
                        <Input defaultValue={question.title_es} />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium">English Question</label>
                        <Input defaultValue={question.question_en} />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium">Spanish Question</label>
                        <Input defaultValue={question.question_es} />
                      </div>
                      <div>
                        <label className="block mb-1 text-sm font-medium">Question Type</label>
                        <select className="w-full p-2 border rounded" defaultValue={question.type}>
                          <option value="choice">Multiple Choice</option>
                          <option value="boolean">Yes/No</option>
                          <option value="text">Text Input</option>
                          <option value="number">Number Input</option>
                        </select>
                      </div>
                    </div>
                    
                    {question.type === "choice" && (
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium">Options</label>
                        <div className="space-y-2">
                          {question.options?.map((option, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <Input className="w-[120px]" defaultValue={option.value} placeholder="Value" />
                              <Input defaultValue={option.label_en} placeholder="English Label" />
                              <Input defaultValue={option.label_es} placeholder="Spanish Label" />
                              <Button size="icon" variant="outline">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                          <Button size="sm" variant="outline" className="mt-2">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Option
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-4">
                      <label className="block mb-2 text-sm font-medium">Help Text</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <textarea
                          className="w-full p-2 border rounded"
                          rows={3}
                          defaultValue={question.help_en}
                          placeholder="English Help Text"
                        />
                        <textarea
                          className="w-full p-2 border rounded"
                          rows={3}
                          defaultValue={question.help_es}
                          placeholder="Spanish Help Text"
                        />
                      </div>
                    </div>
                    
                    {question.conditional_questions && question.conditional_questions.length > 0 && (
                      <div className="mt-4">
                        <label className="block mb-2 text-sm font-medium">Conditional Questions</label>
                        <div className="space-y-4">
                          {question.conditional_questions.map((condQ, index) => (
                            <div key={index} className="p-3 border rounded bg-white">
                              <div className="mb-2">
                                <span className="font-medium">Triggers on: </span>
                                {Array.isArray(condQ.trigger_value) 
                                  ? condQ.trigger_value.join(", ")
                                  : condQ.trigger_value}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <Input defaultValue={condQ.title_en} placeholder="English Title" />
                                <Input defaultValue={condQ.title_es} placeholder="Spanish Title" />
                                <Input defaultValue={condQ.question_en} placeholder="English Question" />
                                <Input defaultValue={condQ.question_es} placeholder="Spanish Question" />
                              </div>
                            </div>
                          ))}
                          <Button size="sm" variant="outline">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add Conditional Question
                          </Button>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="outline" size="sm">Cancel</Button>
                      <Button size="sm">Save Changes</Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

// Training Materials Tab
const TrainingMaterialsTab = () => {
  const trainingCategories = [
    {
      id: "loan_docs",
      title: "Loan Documentation",
      materials: [
        { id: "1", title: "W-2 Form Guide", type: "pdf", description: "How to read and verify W-2 forms" },
        { id: "2", title: "Paystub Verification", type: "pdf", description: "Key elements to verify on pay stubs" },
        { id: "3", title: "Tax Return Analysis", type: "video", description: "How to analyze self-employed tax returns" }
      ]
    },
    {
      id: "loan_programs",
      title: "Loan Programs",
      materials: [
        { id: "4", title: "FHA Loan Requirements", type: "pdf", description: "Complete guide to FHA loan requirements" },
        { id: "5", title: "Conventional vs USDA", type: "pdf", description: "Comparison between loan types" }
      ]
    },
    {
      id: "client_scenarios",
      title: "Client Scenarios",
      materials: [
        { id: "6", title: "Working with ITIN Borrowers", type: "video", description: "How to help clients without SSN" },
        { id: "7", title: "Credit Repair Guide", type: "pdf", description: "Tips for clients with poor credit" }
      ]
    }
  ];

  return (
    <div>
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Upload Training Material</CardTitle>
            <CardDescription>Add new training documents, videos or guides</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Title</label>
              <Input placeholder="Title of training material" />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">Category</label>
              <select className="w-full p-2 border rounded">
                <option value="">Select a category</option>
                <option value="loan_docs">Loan Documentation</option>
                <option value="loan_programs">Loan Programs</option>
                <option value="client_scenarios">Client Scenarios</option>
                <option value="new">Create New Category</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">Description</label>
              <textarea 
                className="w-full p-2 border rounded"
                rows={3}
                placeholder="Brief description of this training material"
              />
            </div>
          </div>
          
          <div className="border-2 border-dashed border-gray-300 rounded-md p-6 mb-4 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="mb-2 text-sm font-medium">Drag and drop file or</p>
            <Button>Select File</Button>
            <p className="mt-1 text-xs text-gray-500">PDF, MP4, JPEG or PNG (Max. 20MB)</p>
          </div>
          
          <Button className="w-full">Upload Material</Button>
        </CardContent>
      </Card>
      
      <div className="space-y-6">
        {trainingCategories.map(category => (
          <Card key={category.id}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="divide-y">
                {category.materials.map(material => (
                  <li key={material.id} className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{material.title}</h4>
                      <p className="text-sm text-muted-foreground">{material.description}</p>
                      <Badge variant="outline" className="mt-1">
                        {material.type.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm" variant="outline">Edit</Button>
                      <Button size="sm" variant="outline" className="text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Animations Tab
const AnimationsTab = () => {
  const qualificationStatuses = [
    { id: "qualified", name: "Qualified", description: "Client is ready to move forward" },
    { id: "fixesNeeded", name: "Fixes Needed", description: "Client needs to address some issues" },
    { id: "notReady", name: "Not Ready", description: "Client is not currently qualified" }
  ];
  
  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Outcome Animations</CardTitle>
          <CardDescription>Upload animations for different qualification outcomes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {qualificationStatuses.map(status => (
              <div key={status.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">{status.name}</h3>
                <p className="text-muted-foreground mb-4">{status.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Current Animation</h4>
                    <div className="h-40 bg-gray-100 rounded flex items-center justify-center">
                      <p className="text-sm text-gray-500">No animation set</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Upload New</h4>
                    <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center h-40 flex flex-col items-center justify-center">
                      <Upload className="h-6 w-6 mb-2 text-gray-400" />
                      <p className="text-xs">Drag GIF/MP4 or</p>
                      <Button size="sm" className="mt-2">Browse</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Custom Response Animations</CardTitle>
          <CardDescription>Upload custom animations for specific scenarios</CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="mb-4">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Custom Animation
          </Button>
          
          <div className="text-center p-8 text-muted-foreground">
            <p>No custom animations added yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Campaigns Tab
const CampaignsTab = () => {
  const { hasPermission } = useAuth();
  const canManageCampaigns = hasPermission("VIEW_ALL_CAMPAIGNS");
  const [newCampaign, setNewCampaign] = useState("");
  
  const campaigns = [
    { id: '1', name: 'Dennis', leadsCount: 42, qualifiedCount: 18 },
    { id: '2', name: 'Michael', leadsCount: 36, qualifiedCount: 15 },
    { id: '3', name: 'Tito', leadsCount: 28, qualifiedCount: 12 },
    { id: '4', name: 'Alvaro', leadsCount: 22, qualifiedCount: 8 },
  ];

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Campaign Management</CardTitle>
          <CardDescription>Manage marketing campaigns and track performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Input 
              placeholder="New campaign name" 
              value={newCampaign}
              onChange={(e) => setNewCampaign(e.target.value)}
              disabled={!canManageCampaigns}
            />
            <Button disabled={!canManageCampaigns || !newCampaign}>Add Campaign</Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Campaign Name</th>
                  <th className="text-left p-2">Total Leads</th>
                  <th className="text-left p-2">Qualified Leads</th>
                  <th className="text-left p-2">Qualification Rate</th>
                  <th className="text-left p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map(campaign => {
                  const qualRate = ((campaign.qualifiedCount / campaign.leadsCount) * 100).toFixed(1);
                  return (
                    <tr key={campaign.id} className="border-b">
                      <td className="p-2 font-medium">{campaign.name}</td>
                      <td className="p-2">{campaign.leadsCount}</td>
                      <td className="p-2">{campaign.qualifiedCount}</td>
                      <td className="p-2">{qualRate}%</td>
                      <td className="p-2">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            disabled={!canManageCampaigns}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500"
                            disabled={!canManageCampaigns}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
          <CardDescription>Comparative analysis of campaign effectiveness</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
            <p className="text-gray-500">Campaign performance charts will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
