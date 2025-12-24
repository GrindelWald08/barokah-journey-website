import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface RateLimitRequest {
  action_type: 'registration' | 'login' | 'password_reset';
  max_attempts?: number;
  window_minutes?: number;
}

interface RateLimitResponse {
  allowed: boolean;
  remaining: number;
  reset_at: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP from headers
    const forwardedFor = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const clientIp = forwardedFor?.split(',')[0]?.trim() || realIp || 'unknown';

    console.log(`Rate limit check from IP: ${clientIp}`);

    const { action_type, max_attempts = 5, window_minutes = 15 }: RateLimitRequest = await req.json();

    if (!action_type) {
      return new Response(
        JSON.stringify({ error: 'action_type is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Create Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Check rate limit using the database function
    const { data, error } = await supabase.rpc('check_rate_limit', {
      p_identifier: clientIp,
      p_action_type: action_type,
      p_max_attempts: max_attempts,
      p_window_minutes: window_minutes,
    });

    if (error) {
      console.error('Rate limit check error:', error);
      // On error, allow the request but log the issue
      return new Response(
        JSON.stringify({ allowed: true, remaining: max_attempts, reset_at: new Date().toISOString() }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const result: RateLimitResponse = data;
    
    console.log(`Rate limit result for ${action_type}: allowed=${result.allowed}, remaining=${result.remaining}`);

    if (!result.allowed) {
      return new Response(
        JSON.stringify({
          error: 'Too many attempts. Please try again later.',
          reset_at: result.reset_at,
          remaining: 0,
        }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
