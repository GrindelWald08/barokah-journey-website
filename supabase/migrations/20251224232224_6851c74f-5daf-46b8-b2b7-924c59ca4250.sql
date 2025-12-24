-- Create rate_limits table to track request attempts
CREATE TABLE public.rate_limits (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  identifier TEXT NOT NULL, -- IP address or user ID
  action_type TEXT NOT NULL, -- 'registration', 'login', etc.
  attempt_count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(identifier, action_type)
);

-- Enable RLS (service role will bypass this)
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- No public access - only edge functions with service role can access
-- This is intentional for security

-- Create index for fast lookups
CREATE INDEX idx_rate_limits_identifier_action ON public.rate_limits(identifier, action_type);
CREATE INDEX idx_rate_limits_window_start ON public.rate_limits(window_start);

-- Trigger to update updated_at
CREATE TRIGGER update_rate_limits_updated_at
BEFORE UPDATE ON public.rate_limits
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check and update rate limit
CREATE OR REPLACE FUNCTION public.check_rate_limit(
  p_identifier TEXT,
  p_action_type TEXT,
  p_max_attempts INTEGER DEFAULT 5,
  p_window_minutes INTEGER DEFAULT 15
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_record rate_limits%ROWTYPE;
  v_window_start TIMESTAMP WITH TIME ZONE;
  v_is_allowed BOOLEAN;
  v_remaining INTEGER;
BEGIN
  v_window_start := now() - (p_window_minutes || ' minutes')::INTERVAL;
  
  -- Try to get existing record
  SELECT * INTO v_record
  FROM rate_limits
  WHERE identifier = p_identifier 
    AND action_type = p_action_type
  FOR UPDATE;
  
  IF v_record.id IS NULL THEN
    -- No record exists, create one
    INSERT INTO rate_limits (identifier, action_type, attempt_count, window_start)
    VALUES (p_identifier, p_action_type, 1, now())
    RETURNING * INTO v_record;
    
    v_is_allowed := TRUE;
    v_remaining := p_max_attempts - 1;
  ELSIF v_record.window_start < v_window_start THEN
    -- Window has expired, reset
    UPDATE rate_limits
    SET attempt_count = 1, window_start = now(), updated_at = now()
    WHERE id = v_record.id
    RETURNING * INTO v_record;
    
    v_is_allowed := TRUE;
    v_remaining := p_max_attempts - 1;
  ELSIF v_record.attempt_count >= p_max_attempts THEN
    -- Rate limit exceeded
    v_is_allowed := FALSE;
    v_remaining := 0;
  ELSE
    -- Increment attempt count
    UPDATE rate_limits
    SET attempt_count = attempt_count + 1, updated_at = now()
    WHERE id = v_record.id
    RETURNING * INTO v_record;
    
    v_is_allowed := TRUE;
    v_remaining := p_max_attempts - v_record.attempt_count;
  END IF;
  
  RETURN jsonb_build_object(
    'allowed', v_is_allowed,
    'remaining', v_remaining,
    'reset_at', v_record.window_start + (p_window_minutes || ' minutes')::INTERVAL
  );
END;
$$;