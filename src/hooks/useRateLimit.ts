import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  reset_at: string;
  error?: string;
}

interface UseRateLimitOptions {
  action_type: 'registration' | 'login' | 'password_reset';
  max_attempts?: number;
  window_minutes?: number;
}

export const useRateLimit = () => {
  const [isChecking, setIsChecking] = useState(false);

  const checkRateLimit = useCallback(async (options: UseRateLimitOptions): Promise<RateLimitResult> => {
    setIsChecking(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('check-rate-limit', {
        body: {
          action_type: options.action_type,
          max_attempts: options.max_attempts ?? 5,
          window_minutes: options.window_minutes ?? 15,
        },
      });

      if (error) {
        console.error('Rate limit check failed:', error);
        // On error, allow the request to proceed
        return { allowed: true, remaining: 5, reset_at: new Date().toISOString() };
      }

      // Handle 429 response
      if (data?.error && data?.reset_at) {
        return {
          allowed: false,
          remaining: 0,
          reset_at: data.reset_at,
          error: data.error,
        };
      }

      return data as RateLimitResult;
    } catch (err) {
      console.error('Rate limit check error:', err);
      // On error, allow the request to proceed
      return { allowed: true, remaining: 5, reset_at: new Date().toISOString() };
    } finally {
      setIsChecking(false);
    }
  }, []);

  const formatTimeRemaining = useCallback((resetAt: string): string => {
    const resetTime = new Date(resetAt);
    const now = new Date();
    const diffMs = resetTime.getTime() - now.getTime();
    
    if (diffMs <= 0) return 'now';
    
    const diffMins = Math.ceil(diffMs / 60000);
    if (diffMins === 1) return '1 minute';
    return `${diffMins} minutes`;
  }, []);

  return {
    checkRateLimit,
    isChecking,
    formatTimeRemaining,
  };
};
