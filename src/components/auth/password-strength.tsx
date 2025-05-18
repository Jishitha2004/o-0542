
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const [strength, setStrength] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Calculate password strength
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    // Penalize common patterns
    if (/\b(password|123456|qwerty|admin)\b/i.test(password)) score -= 2;
    
    // Normalize score to be between 0 and 4
    score = Math.max(0, Math.min(4, score));
    setStrength(score);
    
    // Set message based on score
    const messages = [
      "Very weak",
      "Weak",
      "Moderate",
      "Strong",
      "Very strong"
    ];
    
    setMessage(messages[score]);
    
  }, [password]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex w-full space-x-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div 
              key={i}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors duration-300",
                {
                  "bg-destructive": strength > 0 && i === 0,
                  "bg-orange-500": strength > 1 && i === 1,
                  "bg-yellow-500": strength > 2 && i === 2,
                  "bg-green-500": strength > 3 && i === 3,
                  "bg-muted": i >= strength
                }
              )}
            />
          ))}
        </div>
      </div>
      {password && (
        <p className={cn(
          "text-xs",
          {
            "text-destructive": strength <= 1,
            "text-orange-500": strength === 2,
            "text-yellow-500": strength === 3,
            "text-green-500": strength === 4
          }
        )}>
          {message}
        </p>
      )}
    </div>
  );
};

export default PasswordStrength;
