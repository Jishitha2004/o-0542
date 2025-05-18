
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Shield, Lock, UserPlus, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: 'welcome',
    title: 'Welcome to VaultBox',
    icon: Shield,
    description: 'Your secure digital vault for all your sensitive information.'
  },
  {
    id: 'security',
    title: 'Bank-Level Security',
    icon: Lock,
    description: 'All your data is encrypted using AES-256 encryption before it leaves your device.'
  },
  {
    id: 'trusted-contacts',
    title: 'Trusted Contacts',
    icon: UserPlus,
    description: 'Designate trusted contacts who can access your vault in case of emergency.'
  }
];

const Onboarding: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [animationDirection, setAnimationDirection] = useState<'next' | 'prev'>('next');

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setAnimationDirection('next');
      setCurrentStep(currentStep + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setAnimationDirection('prev');
      setCurrentStep(currentStep - 1);
    }
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Progress indicator */}
        <div className="flex justify-between mb-8">
          {steps.map((step, index) => (
            <div key={step.id} className="flex flex-col items-center">
              <div 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                  index === currentStep ? 
                    "bg-primary border-primary text-primary-foreground" : 
                    index < currentStep ?
                      "bg-primary/20 border-primary/50 text-primary" :
                      "bg-secondary border-muted text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-24 h-0.5 mt-5 hidden sm:block",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="relative h-80">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={cn(
                "absolute top-0 left-0 w-full transition-all duration-500 ease-in-out",
                index === currentStep ? "opacity-100 translate-x-0" : "opacity-0 pointer-events-none",
                index > currentStep ? "translate-x-full" : "",
                index < currentStep ? "-translate-x-full" : ""
              )}
            >
              <div className="text-center space-y-6">
                <div className="bg-secondary rounded-full w-20 h-20 mx-auto flex items-center justify-center">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold">{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
                
                {step.id === 'welcome' && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm">
                      VaultBox is designed to keep your sensitive information secure. 
                      We use end-to-end encryption to ensure only you can access your data.
                    </p>
                  </div>
                )}
                
                {step.id === 'security' && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm">
                      Your master password is never stored on our servers. 
                      All encryption and decryption happens locally on your device.
                    </p>
                  </div>
                )}
                
                {step.id === 'trusted-contacts' && (
                  <div className="p-4 bg-secondary rounded-lg">
                    <p className="text-sm">
                      You can optionally set up trusted contacts who can request access 
                      to specific parts of your vault in case of emergency.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
          >
            Back
          </Button>
          <Button onClick={nextStep}>
            {isLastStep ? 'Get Started' : 'Next'}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
