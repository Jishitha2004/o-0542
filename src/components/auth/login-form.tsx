
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Shield, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberDevice, setRememberDevice] = useState(false);
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter your email and password");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, simulate 2FA requirement
      if (!showTwoFactor) {
        setShowTwoFactor(true);
        setIsLoading(false);
        return;
      }
      
      if (showTwoFactor && !twoFactorCode) {
        toast.error("Please enter your verification code");
        setIsLoading(false);
        return;
      }
      
      // Successful login
      toast.success("Login successful");
      navigate('/dashboard');
      
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6 w-full max-w-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome back</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your vault
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
              disabled={isLoading || showTwoFactor}
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Button 
              variant="link" 
              size="sm" 
              className="px-0 font-normal text-xs" 
              type="button"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot password?
            </Button>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
            <PasswordInput 
              id="password"
              placeholder="••••••••"
              className="pl-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || showTwoFactor}
              required
            />
          </div>
        </div>
        
        {showTwoFactor && (
          <div className={cn("space-y-2", showTwoFactor ? "animate-fade-in" : "")}>
            <Label htmlFor="twoFactorCode">Verification Code</Label>
            <div className="relative">
              <Shield className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input 
                id="twoFactorCode"
                placeholder="123456"
                className="pl-10"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                disabled={isLoading}
                maxLength={6}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the verification code sent to your device
            </p>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="remember" 
            checked={rememberDevice}
            onCheckedChange={(checked) => setRememberDevice(!!checked)}
            disabled={isLoading}
          />
          <Label htmlFor="remember" className="text-sm font-normal">Remember this device</Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" />
              Securing connection...
            </>
          ) : (
            showTwoFactor ? "Verify & Login" : "Login"
          )}
        </Button>
      </form>
      
      <div className="text-center text-sm">
        <p className="text-muted-foreground">
          Don't have an account?{' '}
          <Button 
            variant="link" 
            className="p-0 font-normal" 
            onClick={() => navigate('/signup')}
          >
            Create one
          </Button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
