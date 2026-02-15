import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { PageTransition } from '@/components/motion/PageTransition';
import { FadeIn } from '@/components/motion/FadeIn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useProfile, useSiteSettings } from '@/hooks/usePortfolioData';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email address').max(255),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { data: profile } = useProfile();
  const { data: settings } = useSiteSettings();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    // Simulate sending - no DB
    setTimeout(() => {
      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });
      form.reset();
      setIsSubmitting(false);
    }, 800);
  };

  const contactLinks = [
    ...(profile?.email ? [{ icon: Mail, label: 'Email', value: profile.email, href: `mailto:${profile.email}` }] : []),
    ...(profile?.linkedin_url ? [{ icon: Linkedin, label: 'LinkedIn', value: 'Connect with me', href: profile.linkedin_url }] : []),
    ...(profile?.github_url ? [{ icon: Github, label: 'GitHub', value: 'View my code', href: profile.github_url }] : []),
  ];

  return (
    <Layout>
      <PageTransition>
        <div className="py-20 md:py-32">
          <div className="container max-w-4xl">
            <FadeIn>
              <div className="mb-16">
                <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground mb-4">
                  Connect
                </p>
                <h1 className="text-5xl md:text-7xl font-bold font-display leading-[0.9] mb-6">
                  Get in Touch
                </h1>
                <div className="w-16 h-px bg-foreground" />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <FadeIn delay={0.1}>
                <div>
                  <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    Send a Message
                  </h2>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField control={form.control} name="name" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.15em]">Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" className="border-0 border-b border-border bg-transparent focus-visible:ring-0 focus-visible:border-foreground px-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.15em]">Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your@email.com" className="border-0 border-b border-border bg-transparent focus-visible:ring-0 focus-visible:border-foreground px-0" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-xs uppercase tracking-[0.15em]">Message</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Your message..." className="min-h-[150px] border-0 border-b border-border bg-transparent focus-visible:ring-0 focus-visible:border-foreground px-0 resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" className="w-full uppercase tracking-wider text-xs" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : (<><Send className="mr-2 h-3 w-3" />Send Message</>)}
                      </Button>
                    </form>
                  </Form>
                </div>
              </FadeIn>

              <FadeIn delay={0.2}>
                <div>
                  <h2 className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
                    Other Ways to Connect
                  </h2>
                  <div className="space-y-0">
                    {contactLinks.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target={link.href.startsWith('mailto:') ? undefined : '_blank'}
                        rel="noopener noreferrer"
                        className="flex items-center justify-between py-5 border-t border-border group transition-colors hover:bg-secondary/50"
                      >
                        <div className="flex items-center gap-4">
                          <link.icon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{link.label}</p>
                            <p className="text-xs text-muted-foreground">{link.value}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </PageTransition>
    </Layout>
  );
};

export default Contact;
