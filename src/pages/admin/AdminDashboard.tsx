import { FolderKanban, User, Briefcase, Mail, Eye, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useProjects, useExperience, useEducation, useSkills } from '@/hooks/usePortfolioData';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { data: projects } = useProjects();
  const { data: experience } = useExperience();
  const { data: education } = useEducation();
  const { data: skills } = useSkills();

  const { data: messages } = useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const unreadMessages = messages?.filter((m) => !m.is_read).length ?? 0;

  const stats = [
    {
      label: 'Projects',
      value: projects?.length ?? 0,
      icon: FolderKanban,
      href: '/admin/projects',
    },
    {
      label: 'Experience',
      value: experience?.length ?? 0,
      icon: Briefcase,
      href: '/admin/experience',
    },
    {
      label: 'Skills',
      value: skills?.length ?? 0,
      icon: User,
      href: '/admin/skills',
    },
    {
      label: 'Unread Messages',
      value: unreadMessages,
      icon: Mail,
      href: '/admin/messages',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to your portfolio admin panel</p>
          </div>
          <Button asChild>
            <Link to="/" target="_blank">
              <Eye className="mr-2 h-4 w-4" />
              View Site
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} to={stat.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks to manage your portfolio</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/admin/projects" className="flex flex-col items-center gap-2">
                <FolderKanban className="h-6 w-6" />
                <span>Add New Project</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/admin/blog" className="flex flex-col items-center gap-2">
                <FileText className="h-6 w-6" />
                <span>New Blog Post</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/admin/profile" className="flex flex-col items-center gap-2">
                <User className="h-6 w-6" />
                <span>Update Profile</span>
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-auto py-4">
              <Link to="/admin/messages" className="flex flex-col items-center gap-2">
                <Mail className="h-6 w-6" />
                <span>View Messages</span>
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Messages */}
        {messages && messages.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest contact form submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {messages.slice(0, 5).map((message) => (
                  <div
                    key={message.id}
                    className="flex items-start gap-4 p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium truncate">{message.name}</p>
                        {!message.is_read && (
                          <span className="px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                      <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link to="/admin/messages">View all messages →</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
