
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Lock } from 'lucide-react';
import LoginForm from '@/components/auth/login-form';
import SignupForm from '@/components/auth/signup-form';

const Auth: React.FC = () => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  
  return (
    <div className="flex min-h-screen">
      {/* Left panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="mb-8 flex flex-col items-center">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">VaultBox</h2>
          <p className="text-sm text-muted-foreground">Your secure digital vault</p>
        </div>
        
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
      
      {/* Right panel - Image and information */}
      <div className="hidden lg:block lg:w-1/2 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background to-background/0 z-10" />
        
        <div className="absolute inset-0 z-0">
          <svg
            className="w-full h-full text-primary/5"
            xmlns="http://www.w3.org/2000/svg"
            width="800"
            height="800"
            viewBox="0 0 800 800"
          >
            <rect width="800" height="800" fill="currentColor" />
            <g fill="none" stroke="hsl(var(--primary))" strokeWidth="1">
              <path d="M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63" />
              <path d="M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764" />
              <path d="M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880" />
              <path d="M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382" />
              <path d="M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269" />
            </g>
            <g fill="hsl(var(--primary))">
              <circle cx="769" cy="229" r="5" />
              <circle cx="539" cy="269" r="5" />
              <circle cx="603" cy="493" r="5" />
              <circle cx="731" cy="737" r="5" />
              <circle cx="520" cy="660" r="5" />
              <circle cx="309" cy="538" r="5" />
              <circle cx="295" cy="764" r="5" />
              <circle cx="40" cy="599" r="5" />
              <circle cx="102" cy="382" r="5" />
              <circle cx="127" cy="80" r="5" />
              <circle cx="370" cy="105" r="5" />
              <circle cx="578" cy="42" r="5" />
              <circle cx="237" cy="261" r="5" />
              <circle cx="390" cy="382" r="5" />
            </g>
          </svg>
        </div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-20">
          <div className="bg-background/60 backdrop-blur-md p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-4">Your Data. Your Control.</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <span className="ml-2 text-sm">End-to-end encryption protects your data</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <span className="ml-2 text-sm">Your master password never leaves your device</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <span className="ml-2 text-sm">Custom trust delegation for emergency access</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-primary text-sm">✓</span>
                </div>
                <span className="ml-2 text-sm">Automatic security alerts and monitoring</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
