import { useState } from 'react';
import { format } from 'date-fns';
import { Mail, MailOpen, Trash2, ExternalLink } from 'lucide-react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useLocalCrud } from '@/hooks/useLocalStorage';
import type { ContactMessage } from '@/types/portfolio';

const AdminMessages = () => {
  const { data: messages, update, remove } = useLocalCrud<ContactMessage>('portfolio_messages', []);
  const { toast } = useToast();
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const openMessage = (message: ContactMessage) => {
    setSelectedMessage(message);
    if (!message.is_read) {
      update(message.id, { is_read: true });
    }
  };

  const handleDelete = (id: string) => {
    remove(id);
    toast({ title: 'Message deleted' });
    setSelectedMessage(null);
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">
            Contact form submissions
            {unreadCount > 0 && <Badge className="ml-2">{unreadCount} unread</Badge>}
          </p>
        </div>

        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message) => (
              <Card key={message.id} className={`cursor-pointer transition-colors hover:bg-muted/50 ${!message.is_read ? 'border-primary' : ''}`} onClick={() => openMessage(message)}>
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex-shrink-0">{message.is_read ? <MailOpen className="h-5 w-5 text-muted-foreground" /> : <Mail className="h-5 w-5 text-primary" />}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className={`truncate ${!message.is_read ? 'font-semibold' : ''}`}>{message.name}</h3>
                      {!message.is_read && <Badge variant="secondary" className="text-xs">New</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{message.email}</p>
                    <p className="text-sm text-muted-foreground truncate mt-1">{message.message}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">{format(new Date(message.created_at), 'MMM d, yyyy')}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card><CardContent className="flex flex-col items-center justify-center py-12"><Mail className="h-12 w-12 text-muted-foreground mb-4" /><p className="text-muted-foreground">No messages yet</p></CardContent></Card>
        )}

        <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
          <DialogContent className="max-w-lg">
            {selectedMessage && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedMessage.name}</DialogTitle>
                  <DialogDescription>
                    <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline inline-flex items-center gap-1">{selectedMessage.email}<ExternalLink className="h-3 w-3" /></a>
                    <span className="block mt-1 text-muted-foreground">{format(new Date(selectedMessage.created_at), 'MMMM d, yyyy at h:mm a')}</span>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4"><p className="whitespace-pre-wrap">{selectedMessage.message}</p></div>
                <div className="flex justify-between mt-6">
                  <Button variant="destructive" onClick={() => handleDelete(selectedMessage.id)}><Trash2 className="mr-2 h-4 w-4" />Delete</Button>
                  <Button asChild><a href={`mailto:${selectedMessage.email}`}>Reply via Email</a></Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default AdminMessages;
