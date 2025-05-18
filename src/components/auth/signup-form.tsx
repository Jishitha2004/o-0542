
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, User, Loader, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";
import PasswordStrength from './password-strength';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';
import {
  Alert,
  AlertDescription,
} from "@/components/ui/alert";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (!agreeTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Successful signup
      toast.success("Account created successfully");
      navigate('/onboarding');
      
    } catch (error) {
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create your vault</h1>
        <p className="text-muted-foreground">
          Sign up to secure your digital assets
        </p>
      </div>
      
      <Alert variant="default" className="bg-secondary border-primary/20">
        <AlertCircle className="h-4 w-4 text-primary" />
        <AlertDescription>
          VaultBox uses client-side encryption. Your master password cannot be recovered if lost.
        </AlertDescription>
      </Alert>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              id="name"
              placeholder="Jane Doe"
              className="pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <Input 
              id="email"
              type="email"
              placeholder="name@example.com"
              className="pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <PasswordInput 
              id="password"
              placeholder="Create a strong password"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          <PasswordStrength password={password} />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <PasswordInput 
              id="confirmPassword"
              placeholder="Confirm password"
              className={cn(
                "pl-10",
                confirmPassword && password !== confirmPassword ? "border-destructive" : ""
              )}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              required
            />
          </div>
          {confirmPassword && password !== confirmPassword && (
            <p className="text-xs text-destructive">Passwords do not match</p>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="terms" 
            checked={agreeTerms}
            onCheckedChange={(checked) => setAgreeTerms(!!checked)}
            disabled={isLoading}
          />
          <Label htmlFor="terms" className="text-sm font-normal">
            I agree to the{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal" 
              type="button" 
              onClick={() => window.open('/terms', '_blank')}
            >
              Terms of Service
            </Button>
            {" "}and{" "}
            <Button 
              variant="link" 
              className="p-0 h-auto font-normal" 
              type="button" 
              onClick={() => window.open('/privacy', '_blank')}
            >
              Privacy Policy
            </Button>
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Already have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 font-normal" 
            onClick={() => navigate('/login')}
          >
            Login
          </Button>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
