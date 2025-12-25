import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const useProgrammerCheck = () => {
  const { user } = useAuth();
  const [isProgrammer, setIsProgrammer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkProgrammerRole = async () => {
      if (!user) {
        setIsProgrammer(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .rpc('has_role', { _user_id: user.id, _role: 'programmer' });

      if (error) {
        setIsProgrammer(false);
      } else {
        setIsProgrammer(data === true);
      }
      setLoading(false);
    };

    checkProgrammerRole();
  }, [user]);

  return { isProgrammer, loading };
};
