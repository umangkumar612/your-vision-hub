import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Cpu, Zap, Shield, BarChart3 } from 'lucide-react';

const Index = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center space-y-8">
      <div className="space-y-4">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-4">
            <Cpu className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          AI Task Processing Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Create, run, and monitor AI-powered text processing tasks with real-time status tracking and detailed execution logs.
        </p>
      </div>

      <div className="flex gap-3">
        {isAuthenticated ? (
          <Link to="/dashboard"><Button size="lg">Go to Dashboard</Button></Link>
        ) : (
          <>
            <Link to="/register"><Button size="lg">Get Started</Button></Link>
            <Link to="/login"><Button size="lg" variant="outline">Sign In</Button></Link>
          </>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-3 max-w-3xl w-full pt-8">
        {[
          { icon: Zap, title: 'Fast Processing', desc: 'Async task queue with real-time status updates' },
          { icon: Shield, title: 'Secure', desc: 'JWT auth, bcrypt hashing, and rate limiting' },
          { icon: BarChart3, title: 'Scalable', desc: 'Kubernetes-deployed with horizontal scaling' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-lg border bg-card p-6 text-left">
            <Icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-foreground">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
