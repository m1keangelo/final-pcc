
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { UserPlus, Edit, Trash2, Search, Shield } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/lib/toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

const AdminDashboard = () => {
  const { t } = useLanguage();
  const { user, isSuperAdmin, updateUserPermissions } = useAuth();
  const [activeTab, setActiveTab] = useState("users");
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [showAddCampaignDialog, setShowAddCampaignDialog] = useState(false);
  const [showPermissionsDialog, setShowPermissionsDialog] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newRole, setNewRole] = useState("assistant");
  const [selectedCampaigns, setSelectedCampaigns] = useState<string[]>([]);
  const [campaignName, setCampaignName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [selectedUserPermissions, setSelectedUserPermissions] = useState<string[]>([]);

  const mockUsers = [
    { id: '1', username: 'admin', name: 'Admin User', role: 'admin', campaigns: ['All'], permissions: ['MANAGE_USERS', 'MANAGE_FORMS', 'ACCESS_ANALYTICS', 'DELETE_CLIENTS'] },
    { id: '2', username: 'maria', name: 'Maria Rodriguez', role: 'assistant', campaigns: ['Dennis', 'Tito'], permissions: [] },
    { id: '3', username: 'juan', name: 'Juan Perez', role: 'assistant', campaigns: ['Michael'], permissions: [] },
    { id: '0', username: 'm1keangelo', name: 'Super Admin', role: 'superadmin', campaigns: ['All'], permissions: ['MANAGE_USERS', 'MANAGE_FORMS', 'ACCESS_ANALYTICS', 'DELETE_CLIENTS', 'VIEW_ALL_CAMPAIGNS', 'MANAGE_TRAINING', 'MANAGE_ANIMATIONS'] }
  ];

  const mockCampaigns = [
    { id: '1', name: 'Dennis', activeLeads: 42, qualifiedLeads: 18 },
    { id: '2', name: 'Michael', activeLeads: 36, qualifiedLeads: 15 },
    { id: '3', name: 'Tito', activeLeads: 29, qualifiedLeads: 12 },
    { id: '4', name: 'Alvaro', activeLeads: 33, qualifiedLeads: 14 }
  ];

  const availablePermissions = [
    { id: 'DELETE_CLIENTS', label: 'Delete Clients', description: 'Can permanently delete client records' },
    { id: 'MANAGE_FORMS', label: 'Manage Forms', description: 'Can configure and edit client intake forms' },
    { id: 'ACCESS_ANALYTICS', label: 'Access Analytics', description: 'Can view analytics and reports' }
  ];

  const handleAddUser = () => {
    if (!newUsername) {
      toast.error("Username is required");
      return;
    }

    if (newRole === 'assistant' && selectedCampaigns.length === 0) {
      toast.error("Please select at least one campaign");
      return;
    }

    // In a real app, this would make an API call to create the user
    toast.success(`User ${newUsername} added successfully`);
    setNewUsername("");
    setNewRole("assistant");
    setSelectedCampaigns([]);
    setShowAddUserDialog(false);
  };

  const handleAddCampaign = () => {
    if (!campaignName) {
      toast.error("Campaign name is required");
      return;
    }

    // In a real app, this would make an API call to create the campaign
    toast.success(`Campaign ${campaignName} added successfully`);
    setCampaignName("");
    setShowAddCampaignDialog(false);
  };

  const toggleCampaign = (campaign: string) => {
    setSelectedCampaigns(prev => 
      prev.includes(campaign) 
        ? prev.filter(c => c !== campaign) 
        : [...prev, campaign]
    );
  };

  const openPermissionsDialog = (user: any) => {
    setSelectedUserId(user.id);
    setSelectedUserPermissions(user.permissions || []);
    setShowPermissionsDialog(true);
  };

  const handleSavePermissions = () => {
    if (selectedUserId) {
      updateUserPermissions(selectedUserId, selectedUserPermissions);
      toast.success("User permissions updated successfully");
      setShowPermissionsDialog(false);
    }
  };

  const togglePermission = (permission: string) => {
    setSelectedUserPermissions(prev => 
      prev.includes(permission)
        ? prev.filter(p => p !== permission)
        : [...prev, permission]
    );
  };

  // Filter users based on search query
  const filteredUsers = mockUsers.filter(user => 
    user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.campaigns.some(campaign => campaign.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="container py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage users, campaigns, and system settings
          </p>
        </div>
        {isSuperAdmin && (
          <Badge variant="secondary" className="text-sm py-1">
            Super Admin
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md mb-4">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* USERS TAB */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>User Management</CardTitle>
                <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
                  <DialogTrigger asChild>
                    <Button>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>
                        Create a new user account for the system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="username"
                          value={newUsername}
                          onChange={(e) => setNewUsername(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">
                          Role
                        </Label>
                        <Select
                          value={newRole}
                          onValueChange={setNewRole}
                        >
                          <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="assistant">Assistant</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                            {isSuperAdmin && (
                              <SelectItem value="superadmin">Super Admin</SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      {newRole === 'assistant' && (
                        <div className="grid grid-cols-4 items-start gap-4">
                          <Label className="text-right mt-2">
                            Campaigns
                          </Label>
                          <div className="col-span-3 space-y-3">
                            {mockCampaigns.map(campaign => (
                              <div key={campaign.id} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`campaign-${campaign.id}`}
                                  checked={selectedCampaigns.includes(campaign.name)}
                                  onCheckedChange={() => toggleCampaign(campaign.name)}
                                />
                                <label 
                                  htmlFor={`campaign-${campaign.id}`}
                                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {campaign.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddUser}>Create User</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Manage user accounts and their permissions.
              </CardDescription>
              <div className="relative max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Username</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Campaigns</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map(user => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.username}</TableCell>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            user.role === 'superadmin' 
                              ? "destructive" 
                              : user.role === 'admin' 
                                ? "default" 
                                : "secondary"
                          }
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {user.campaigns.map(campaign => (
                            <Badge key={campaign} variant="outline" className="bg-black/30">
                              {campaign}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => openPermissionsDialog(user)}
                            title="Edit Permissions"
                          >
                            <Shield className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="ghost"
                            title="Edit User"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          {user.username !== 'm1keangelo' && (
                            <Button 
                              size="sm" 
                              variant="ghost"
                              title="Delete User"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CAMPAIGNS TAB */}
        <TabsContent value="campaigns" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Campaign Management</CardTitle>
                <Dialog open={showAddCampaignDialog} onOpenChange={setShowAddCampaignDialog}>
                  <DialogTrigger asChild>
                    <Button>Add Campaign</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Campaign</DialogTitle>
                      <DialogDescription>
                        Create a new marketing campaign.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="campaignName" className="text-right">
                          Campaign Name
                        </Label>
                        <Input
                          id="campaignName"
                          value={campaignName}
                          onChange={(e) => setCampaignName(e.target.value)}
                          className="col-span-3"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setShowAddCampaignDialog(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddCampaign}>Create Campaign</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              <CardDescription>
                Manage marketing campaigns and their performance.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Active Leads</TableHead>
                    <TableHead>Qualified Leads</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCampaigns.map(campaign => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.activeLeads}</TableCell>
                      <TableCell>{campaign.qualifiedLeads}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="ghost">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SETTINGS TAB */}
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure global system settings and preferences.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">General Settings</h3>
                <p className="text-sm text-muted-foreground">
                  These settings will apply to all users of the system.
                </p>
              </div>
              
              <div className="border rounded-md p-4">
                <h4 className="font-medium mb-2">Coming Soon</h4>
                <p className="text-sm text-muted-foreground">
                  Additional system configuration options will be available here in future updates.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Permissions Dialog */}
      <Dialog open={showPermissionsDialog} onOpenChange={setShowPermissionsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User Permissions</DialogTitle>
            <DialogDescription>
              Select the permissions you want to grant to this user.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {availablePermissions.map(permission => (
              <div key={permission.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={`perm-${permission.id}`}
                  checked={selectedUserPermissions.includes(permission.id)}
                  onCheckedChange={() => togglePermission(permission.id)}
                />
                <div className="grid gap-0.5">
                  <label 
                    htmlFor={`perm-${permission.id}`}
                    className="text-sm font-medium leading-none"
                  >
                    {permission.label}
                  </label>
                  <p className="text-xs text-muted-foreground">
                    {permission.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePermissions}>Save Permissions</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
