-- Add RLS policies for rate_limits table so admins can manage it
CREATE POLICY "Admins can view all rate limits"
ON public.rate_limits
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete rate limits"
ON public.rate_limits
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update rate limits"
ON public.rate_limits
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));