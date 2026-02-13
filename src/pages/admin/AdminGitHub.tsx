import { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  getGitHubConfig, 
  saveGitHubConfig, 
  clearGitHubConfig, 
  GitHubAPIClient,
  type GitHubConfig 
} from '@/lib/github-api';
import { Github, CheckCircle2, XCircle, Loader2 } from 'lucide-react';

/**
 * Admin page for configuring GitHub API integration
 * Allows setting up Personal Access Token for DB-less content persistence
 */
const AdminGitHub = () => {
  const { toast } = useToast();
  const [config, setConfig] = useState<GitHubConfig>({
    token: '',
    owner: 'soumyakantabera',
    repo: 'finance-portfolio-hub',
    branch: 'main',
  });
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSaving, setIsSaving] = useState(false);

  // Load saved configuration on mount
  useEffect(() => {
    const savedConfig = getGitHubConfig();
    if (savedConfig) {
      setConfig(savedConfig);
      setConnectionStatus('success');
    }
  }, []);

  const handleTestConnection = async () => {
    if (!config.token) {
      toast({
        title: 'Missing Token',
        description: 'Please enter a GitHub Personal Access Token',
        variant: 'destructive',
      });
      return;
    }

    setIsTestingConnection(true);
    setConnectionStatus('idle');

    try {
      const client = new GitHubAPIClient(config);
      const result = await client.testConnection();

      if (result.success) {
        setConnectionStatus('success');
        toast({
          title: 'Connection Successful',
          description: 'Successfully connected to GitHub repository',
        });
      } else {
        setConnectionStatus('error');
        toast({
          title: 'Connection Failed',
          description: result.error || 'Failed to connect to GitHub',
          variant: 'destructive',
        });
      }
    } catch (error) {
      setConnectionStatus('error');
      toast({
        title: 'Connection Error',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const handleSave = () => {
    if (!config.token || !config.owner || !config.repo || !config.branch) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      saveGitHubConfig(config);
      toast({
        title: 'Configuration Saved',
        description: 'GitHub configuration has been saved successfully',
      });
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: error instanceof Error ? error.message : 'Failed to save configuration',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = () => {
    clearGitHubConfig();
    setConfig({
      token: '',
      owner: 'soumyakantabera',
      repo: 'finance-portfolio-hub',
      branch: 'main',
    });
    setConnectionStatus('idle');
    toast({
      title: 'Configuration Cleared',
      description: 'GitHub configuration has been removed',
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">GitHub Integration</h1>
          <p className="text-muted-foreground">
            Configure GitHub API access for DB-less content persistence
          </p>
        </div>

        {/* Information Card */}
        <Alert>
          <Github className="h-4 w-4" />
          <AlertDescription>
            <strong>How it works:</strong> When you save content changes in the admin panel, 
            they will be committed directly to your GitHub repository. This enables dynamic 
            updates without a database. You'll need a Personal Access Token with repository write permissions.
          </AlertDescription>
        </Alert>

        {/* Configuration Form */}
        <Card>
          <CardHeader>
            <CardTitle>GitHub Configuration</CardTitle>
            <CardDescription>
              Enter your GitHub repository details and Personal Access Token
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="token">Personal Access Token *</Label>
              <Input
                id="token"
                type="password"
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                value={config.token}
                onChange={(e) => setConfig({ ...config, token: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                Create a token at{' '}
                <a
                  href="https://github.com/settings/tokens"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-foreground"
                >
                  GitHub Settings → Developer settings → Personal access tokens
                </a>
                . Required scopes: <code className="text-xs bg-muted px-1 py-0.5 rounded">repo</code>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner">Repository Owner *</Label>
                <Input
                  id="owner"
                  placeholder="username or organization"
                  value={config.owner}
                  onChange={(e) => setConfig({ ...config, owner: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="repo">Repository Name *</Label>
                <Input
                  id="repo"
                  placeholder="repository-name"
                  value={config.repo}
                  onChange={(e) => setConfig({ ...config, repo: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="branch">Branch *</Label>
              <Input
                id="branch"
                placeholder="main"
                value={config.branch}
                onChange={(e) => setConfig({ ...config, branch: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">
                The branch where content changes will be committed (usually 'main' or 'gh-pages')
              </p>
            </div>

            {/* Connection Status */}
            {connectionStatus !== 'idle' && (
              <Alert variant={connectionStatus === 'success' ? 'default' : 'destructive'}>
                {connectionStatus === 'success' ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <XCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  {connectionStatus === 'success'
                    ? 'Connection successful! You can now commit content changes.'
                    : 'Connection failed. Please check your configuration.'}
                </AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button onClick={handleTestConnection} disabled={isTestingConnection}>
                {isTestingConnection ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Testing...
                  </>
                ) : (
                  <>
                    <Github className="mr-2 h-4 w-4" />
                    Test Connection
                  </>
                )}
              </Button>

              <Button onClick={handleSave} disabled={isSaving} variant="default">
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Configuration'
                )}
              </Button>

              <Button onClick={handleClear} variant="outline">
                Clear Configuration
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <Alert>
          <AlertDescription>
            <strong>Security Note:</strong> Your Personal Access Token is stored locally in your browser's 
            localStorage. Never share your token or commit it to version control. Keep it secure like a password.
          </AlertDescription>
        </Alert>
      </div>
    </AdminLayout>
  );
};

export default AdminGitHub;
