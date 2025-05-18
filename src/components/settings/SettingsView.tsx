
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Settings as SettingsIcon, User, Lock, Mail, Bell, Globe, Trash, Download, Language, Moon, Sun, Monitor } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const SettingsView: React.FC = () => {
  const [theme, setTheme] = useState<string>('dark');
  const [language, setLanguage] = useState<string>('en-US');
  
  // Apply theme on change
  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    
    localStorage.setItem('vaultbox-theme', theme);
    toast.success(`Theme changed to ${theme} mode`);
  }, [theme]);
  
  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('vaultbox-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
    
    const savedLanguage = localStorage.getItem('vaultbox-language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profile updated successfully");
  };

  const handleExportData = () => {
    toast.success("Your data export is being prepared");
  };
  
  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    localStorage.setItem('vaultbox-language', value);
    toast.success(`Language changed to ${value}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your account profile information
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" defaultValue="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" defaultValue="Doe" />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane@example.com" />
              </div>
            </div>
            <Button className="mt-4" type="submit">
              Update Profile
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interface Settings</CardTitle>
          <CardDescription>
            Customize how VaultBox looks and behaves
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label>Theme</Label>
              <ToggleGroup 
                type="single" 
                value={theme} 
                onValueChange={(value) => value && setTheme(value)}
                className="justify-start"
              >
                <ToggleGroupItem value="light" aria-label="Light mode">
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </ToggleGroupItem>
                <ToggleGroupItem value="dark" aria-label="Dark mode">
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </ToggleGroupItem>
                <ToggleGroupItem value="system" aria-label="System mode">
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            
            <Separator />
            
            <div className="space-y-3">
              <Label>Language</Label>
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-[240px]">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en-US">English (US)</SelectItem>
                  <SelectItem value="en-GB">English (UK)</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="show-vault-count">Show vault entry count</Label>
                <p className="text-sm text-muted-foreground">Display the number of entries in each category</p>
              </div>
              <Switch id="show-vault-count" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-save">Auto-save entries</Label>
                <p className="text-sm text-muted-foreground">Automatically save entries while editing</p>
              </div>
              <Switch id="auto-save" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>
            Configure how you receive notifications from VaultBox
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <p className="text-sm text-muted-foreground">Notify about suspicious activity</p>
            </div>
            <Switch id="security-alerts" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="entry-expiration">Entry Expiration</Label>
              <p className="text-sm text-muted-foreground">Notify before entries expire</p>
            </div>
            <Switch id="entry-expiration" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-devices">New Device Logins</Label>
              <p className="text-sm text-muted-foreground">Notify when you log in from a new device</p>
            </div>
            <Switch id="new-devices" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing">Marketing & Updates</Label>
              <p className="text-sm text-muted-foreground">Receive product updates and news</p>
            </div>
            <Switch id="marketing" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>
            Export or delete your vault data
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-primary/10 p-2 rounded-full">
                <Download className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Export Your Data</p>
                <p className="text-xs text-muted-foreground">Download an encrypted copy of your entire vault</p>
              </div>
            </div>
            <Button onClick={handleExportData} variant="outline" className="w-full">
              Export Data
            </Button>
          </div>
          
          <div className="p-4 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-destructive/10 p-2 rounded-full">
                <Trash className="h-4 w-4 text-destructive" />
              </div>
              <div>
                <p className="font-medium">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
              </div>
            </div>
            <Button variant="destructive" className="w-full">
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsView;
