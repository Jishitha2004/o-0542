
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UserPlus, Mail, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';

const TrustedContactsView: React.FC = () => {
  const [email, setEmail] = useState('');
  const [contacts, setContacts] = useState<string[]>(['emily.johnson@example.com']);
  const [inactivityPeriod, setInactivityPeriod] = useState(30);

  const handleAddContact = () => {
    if (!email) {
      toast.error("Please enter an email address");
      return;
    }

    if (!email.includes('@') || !email.includes('.')) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (contacts.includes(email)) {
      toast.error("This contact is already in your trusted contacts");
      return;
    }

    setContacts([...contacts, email]);
    setEmail('');
    toast.success("Trusted contact added successfully");
  };

  const handleRemoveContact = (contactEmail: string) => {
    setContacts(contacts.filter(c => c !== contactEmail));
    toast.success("Trusted contact removed");
  };

  const handleSendTestNotification = (contactEmail: string) => {
    toast.success(`Test notification sent to ${contactEmail}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Trusted Contacts</h1>
        <p className="text-muted-foreground">
          Trusted contacts can request access to your vault in case of emergency.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add a Trusted Contact</CardTitle>
          <CardDescription>
            Trusted contacts can request access to your vault if you're inactive for an extended period.
            You'll be notified and can deny the request.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input 
                type="email" 
                placeholder="Email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button onClick={handleAddContact}>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium mb-2">Inactivity Period</h3>
            <div className="flex items-center gap-4">
              <Input
                type="number"
                min="1"
                max="365"
                value={inactivityPeriod}
                onChange={(e) => setInactivityPeriod(Number(e.target.value))}
                className="w-24"
              />
              <span className="text-sm text-muted-foreground">days of inactivity before contacts can request access</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Trusted Contacts</CardTitle>
          <CardDescription>
            Manage your current trusted contacts
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contacts.length === 0 ? (
            <div className="text-center py-6">
              <UserPlus className="mx-auto h-10 w-10 text-muted-foreground" />
              <p className="mt-2 text-muted-foreground">No trusted contacts added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{contact}</p>
                      <p className="text-xs text-muted-foreground">Added {index === 0 ? '34 days ago' : 'just now'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Shield className="mr-1 h-4 w-4" />
                          Test
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Send Test Notification?</DialogTitle>
                          <DialogDescription>
                            This will send a test notification to {contact} to confirm they can receive emergency access requests.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button onClick={() => handleSendTestNotification(contact)}>
                            Send Test
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Remove
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Remove Trusted Contact</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to remove {contact} from your trusted contacts?
                            They will no longer be able to request access to your vault.
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <Button variant="destructive" onClick={() => handleRemoveContact(contact)}>
                            Remove Contact
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Access Settings</CardTitle>
          <CardDescription>
            Configure what happens when a trusted contact requests emergency access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Waiting Period</p>
                  <p className="text-xs text-muted-foreground">How long before access is granted if you don't respond</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  min="1"
                  max="30"
                  defaultValue="3"
                  className="w-20"
                />
                <span className="text-sm">days</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Access Level</p>
                  <p className="text-xs text-muted-foreground">What trusted contacts can access in emergency</p>
                </div>
              </div>
              <div>
                <Button variant="outline">Configure Access</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrustedContactsView;
