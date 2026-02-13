import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Home,
  Briefcase,
  User,
  Mail,
  FileText,
  Github,
  Linkedin,
  Settings,
  Search,
} from 'lucide-react';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const commands: CommandItem[] = [
    {
      id: 'home',
      title: 'Home',
      description: 'Go to homepage',
      icon: <Home className="mr-2 h-4 w-4" />,
      action: () => navigate('/'),
      category: 'Navigation',
    },
    {
      id: 'projects',
      title: 'Projects',
      description: 'View all projects',
      icon: <Briefcase className="mr-2 h-4 w-4" />,
      action: () => navigate('/projects'),
      category: 'Navigation',
    },
    {
      id: 'about',
      title: 'About',
      description: 'Learn more about me',
      icon: <User className="mr-2 h-4 w-4" />,
      action: () => navigate('/about'),
      category: 'Navigation',
    },
    {
      id: 'contact',
      title: 'Contact',
      description: 'Get in touch',
      icon: <Mail className="mr-2 h-4 w-4" />,
      action: () => navigate('/contact'),
      category: 'Navigation',
    },
    {
      id: 'search',
      title: 'Search Projects',
      description: 'Search through portfolio',
      icon: <Search className="mr-2 h-4 w-4" />,
      action: () => navigate('/projects'),
      category: 'Actions',
    },
    {
      id: 'theme',
      title: 'Toggle Theme',
      description: 'Change design theme',
      icon: <Settings className="mr-2 h-4 w-4" />,
      action: () => {
        // This will be connected to the theme toggle later
        console.log('Toggle theme');
      },
      category: 'Actions',
    },
  ];

  const handleSelect = (item: CommandItem) => {
    setOpen(false);
    item.action();
  };

  // Group commands by category
  const groupedCommands = commands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        {Object.entries(groupedCommands).map(([category, items]) => (
          <CommandGroup key={category} heading={category}>
            {items.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleSelect(item)}
                className="cursor-pointer"
              >
                {item.icon}
                <div className="flex flex-col">
                  <span>{item.title}</span>
                  {item.description && (
                    <span className="text-xs text-muted-foreground">
                      {item.description}
                    </span>
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  );
};
