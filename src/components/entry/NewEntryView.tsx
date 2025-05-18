
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format, addDays } from 'date-fns';
import { Calendar as CalendarIcon, FileUp, Lock, Shield, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NewEntryView: React.FC = () => {
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState('password');
  const [fileName, setFileName] = useState<string>('');
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleCancel = () => {
    navigate('/dashboard');
  };
  
  const handleSave = () => {
    toast.success("Entry saved successfully");
    navigate('/dashboard');
  };
  
  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      toast.success(`File selected: ${file.name}`);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">New Entry</h1>
        <p className="text-muted-foreground">
          Add a new entry to your secure vault
        </p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Entry Details</CardTitle>
          <CardDescription>
            Create a new secure entry in your vault
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter a title for this entry" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="password">Password</SelectItem>
                    <SelectItem value="document">Document</SelectItem>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="notes">Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {category === 'password' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="username">Username/Email</Label>
                  <Input id="username" placeholder="Enter username or email address" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" placeholder="Enter password" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="url">Website URL</Label>
                  <Input id="url" placeholder="https://example.com" />
                </div>
              </div>
            )}
            
            {category === 'document' && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type</Label>
                  <Select defaultValue="other">
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">ID Document</SelectItem>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="certificate">Certificate</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Document Upload</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <FileUp className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">
                      {fileName ? `Selected: ${fileName}` : 'Drag and drop your document here, or click to browse'}
                    </p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      className="mt-4" 
                      onClick={handleBrowseClick}
                      type="button"
                    >
                      Browse Files
                    </Button>
                  </div>
                </div>
              </div>
            )}
            
            {(category === 'personal' || category === 'financial' || category === 'notes') && (
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea 
                  id="content" 
                  placeholder="Enter your secure information" 
                  className="min-h-[200px]" 
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Additional Information (Optional)</Label>
              <Textarea 
                placeholder="Add notes or additional details" 
                className="min-h-[100px]" 
              />
            </div>
            
            <div className="space-y-2">
              <Label>Auto-deletion Date (Optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Select a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < addDays(new Date(), 1)}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                If set, this entry will be automatically deleted on the selected date.
              </p>
            </div>
            
            <div className="space-y-2">
              <Label>Security Level</Label>
              <Select defaultValue="standard">
                <SelectTrigger>
                  <SelectValue placeholder="Select security level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="high">High - Require master password to view</SelectItem>
                  <SelectItem value="max">Maximum - Additional verification</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleSave}>
            <Plus className="mr-2 h-4 w-4" />
            Save Entry
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default NewEntryView;
