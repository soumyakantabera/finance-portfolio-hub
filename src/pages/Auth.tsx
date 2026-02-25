import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { supabase } from '@/integrations/supabase/client';

const ADMIN_EMAIL = 'admin@portfolio.local';
const ADMIN_PASSWORD = 'soumya01';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) navigate('/admin');
    });
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== ADMIN_PASSWORD) {
      toast({ title: 'Access denied', description: 'Incorrect password.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      // Try sign in first
      let { error } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
      
      if (error && error.message.includes('Invalid login credentials')) {
        // First time: create the admin user
        const { error: signUpError } = await supabase.auth.signUp({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
        if (signUpError) throw signUpError;
        // Sign in after signup
        const { error: retryError } = await supabase.auth.signInWithPassword({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
        if (retryError) throw retryError;
      } else if (error) {
        throw error;
      }

      toast({ title: 'Welcome back.', description: 'Admin access granted.' });
      navigate('/admin');
    } catch (err: any) {
      toast({ title: 'Login failed', description: err.message || 'Something went wrong.', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-sm px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-12 h-12 border border-border mb-6">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <h1 className="text-3xl font-display font-bold tracking-tight mb-2">Admin</h1>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Enter password to continue</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-2 block">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border-0 border-b border-border bg-transparent focus-visible:ring-0 focus-visible:border-foreground px-0 h-12 text-lg"
                  autoFocus
                />
              </div>
              <Button type="submit" className="w-full h-12 uppercase tracking-wider text-xs" disabled={isLoading || !password}>
                {isLoading ? 'Verifying...' : (<>Enter<ArrowRight className="ml-2 h-3 w-3" /></>)}
              </Button>
            </form>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-12 text-center">
              <a href="/" className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors">← Back to site</a>
            </div>
          </FadeIn>
        </div>
      </div>
    </PageTransition>
  );
};

export default Auth;
