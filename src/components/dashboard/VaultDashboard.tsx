
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Plus, Shield, User, Calendar, FileText, Clock } from 'lucide-react';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', name: 'All', count: 16 },
  { id: 'passwords', name: 'Passwords', icon: Lock, count: 8 },
  { id: 'documents', name: 'Documents', icon: FileText, count: 3 },
  { id: 'personal', name: 'Personal', icon: User, count: 4 },
  { id: 'financial', name: 'Financial', icon: Shield, count: 1 }
];

interface VaultActivityProps {
  timestamp: string;
  action: string;
  detail: string;
}

const activities: VaultActivityProps[] = [
  {
    timestamp: 'Today, 11:45 AM',
    action: 'Entry updated',
    detail: 'Updated password for "Amazon Account"',
  },
  {
    timestamp: 'Yesterday, 3:20 PM',
    action: 'New entry added',
    detail: 'Added "Work Insurance Documents" to Documents',
  },
  {
    timestamp: '3 days ago',
    action: 'Login detected',
    detail: 'New device login from Chrome on Windows',
  },
  {
    timestamp: '1 week ago',
    action: 'Entry shared',
    detail: 'Shared "Emergency Contacts" with Trusted Contact',
  },
];

const VaultActivity: React.FC<VaultActivityProps> = ({ timestamp, action, detail }) => {
  return (
    <div className="flex items-start py-3 border-b last:border-b-0">
      <div className="bg-primary/10 rounded-full p-2">
        <Clock className="h-4 w-4 text-primary" />
      </div>
      <div className="ml-3">
        <div className="flex items-center">
          <p className="text-sm font-medium">{action}</p>
          <span className="text-xs text-muted-foreground ml-2">{timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground">{detail}</p>
      </div>
    </div>
  );
};

const VaultDashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const handleNewEntry = () => {
    toast("Create a new vault entry");
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <p className="text-muted-foreground">
            Your vault is securely locked. Last login: Today, 08:23 AM
          </p>
        </div>
        
        <Button onClick={handleNewEntry} className="mt-4 md:mt-0">
          <Plus className="mr-2 h-4 w-4" />
          New Entry
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">
              +2 entries this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weak Passwords</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">3</div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Expires in 5 days
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trusted Contact</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">Active</div>
            <p className="text-xs text-muted-foreground">
              Emily Johnson
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-6">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Vault Contents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex overflow-x-auto space-x-2 pb-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  className="flex items-center space-x-1"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.icon && <category.icon className="h-4 w-4 mr-1" />}
                  <span>{category.name}</span>
                  <span className={cn(
                    "ml-1 rounded-full px-2 py-0.5 text-xs",
                    selectedCategory === category.id
                      ? "bg-primary-foreground text-primary"
                      : "bg-secondary text-secondary-foreground"
                  )}>
                    {category.count}
                  </span>
                </Button>
              ))}
            </div>
            
            <div className="pt-4 border-t">
              {/* Placeholder for vault entries */}
              <div className="py-8 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-medium">Your vault entries appear here</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Add your first entry to start building your secure vault.
                </p>
                <Button className="mt-4" onClick={handleNewEntry}>
                  <Plus className="mr-2 h-4 w-4" />
                  New Entry
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="max-h-96 overflow-auto">
            {activities.map((activity, index) => (
              <VaultActivity 
                key={index}
                timestamp={activity.timestamp}
                action={activity.action}
                detail={activity.detail}
              />
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VaultDashboard;
