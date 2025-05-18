
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Shield, Lock, Bell, Key } from 'lucide-react';
import { toast } from 'sonner';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const SecurityView: React.FC = () => {
  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Password updated successfully");
  };

  const handleEnable2FA = () => {
    toast("2FA setup would start here");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Security Settings</h1>
        <p className="text-muted-foreground">
          Manage your account security and vault protection settings.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Update your account password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </div>
              <Button className="mt-4" type="submit">
                Update Password
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Two-Factor Authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-6">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Enhance Your Security</h3>
              <p className="text-sm text-center text-muted-foreground mb-6">
                Two-factor authentication adds an additional layer of security to your account by requiring access to your phone.
              </p>
              <Button onClick={handleEnable2FA}>
                Enable 2FA
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Session Management</CardTitle>
            <CardDescription>
              Manage your active sessions and devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Current Session</p>
                    <p className="text-xs text-muted-foreground">Chrome on Windows • Active now</p>
                  </div>
                </div>
                <span className="text-xs bg-green-500/20 text-green-500 px-2 py-1 rounded-full">Current</span>
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">iPhone 12</p>
                    <p className="text-xs text-muted-foreground">Safari • Last active 2 days ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Revoke</Button>
              </div>
              <div className="p-4 border rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Key className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">MacBook Pro</p>
                    <p className="text-xs text-muted-foreground">Chrome • Last active 5 days ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline">Revoke</Button>
              </div>
              <Button variant="outline" className="w-full">
                Sign out all other sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Vault Timeout</CardTitle>
            <CardDescription>
              Configure when your vault should automatically lock
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-lock">Auto-lock vault</Label>
                <Switch id="auto-lock" defaultChecked />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="timeout">Lock after inactivity</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="timeout" 
                    type="number" 
                    min="1" 
                    max="60" 
                    defaultValue="15" 
                    className="w-20" 
                  />
                  <span className="text-sm">minutes</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="lock-on-exit">Lock on browser exit</Label>
                <Switch id="lock-on-exit" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="biometrics">Use biometrics when available</Label>
                <Switch id="biometrics" defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SecurityView;
