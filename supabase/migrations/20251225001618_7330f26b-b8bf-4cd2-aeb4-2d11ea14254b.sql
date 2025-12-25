-- Add RLS policies for programmers to manage rate limits
CREATE POLICY "Programmers can view all rate limits" 
ON public.rate_limits 
FOR SELECT 
USING (has_role(auth.uid(), 'programmer'::app_role));

CREATE POLICY "Programmers can update rate limits" 
ON public.rate_limits 
FOR UPDATE 
USING (has_role(auth.uid(), 'programmer'::app_role));

CREATE POLICY "Programmers can delete rate limits" 
ON public.rate_limits 
FOR DELETE 
USING (has_role(auth.uid(), 'programmer'::app_role));