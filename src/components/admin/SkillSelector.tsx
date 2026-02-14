import { useState, useMemo } from 'react';
import { X, Search, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import masterSkillsData from '@/data/masterSkills.json';

interface SkillSelectorProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  label?: string;
}

export function SkillSelector({ selectedSkills, onChange, label = 'Skills' }: SkillSelectorProps) {
  const [open, setOpen] = useState(false);
  const [customSkill, setCustomSkill] = useState('');
  const [showCustomInput, setShowCustomInput] = useState(false);

  const masterSkills = useMemo(() => masterSkillsData.skills, []);

  const handleSelectSkill = (skillName: string) => {
    if (!selectedSkills.includes(skillName)) {
      onChange([...selectedSkills, skillName]);
    }
    setOpen(false);
  };

  const handleRemoveSkill = (skillName: string) => {
    onChange(selectedSkills.filter((s) => s !== skillName));
  };

  const handleAddCustomSkill = () => {
    const trimmedSkill = customSkill.trim();
    if (trimmedSkill && !selectedSkills.includes(trimmedSkill)) {
      onChange([...selectedSkills, trimmedSkill]);
      setCustomSkill('');
      setShowCustomInput(false);
    }
  };

  const filteredSkills = masterSkills.filter(
    (skill) => !selectedSkills.includes(skill.name)
  );

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      
      {/* Selected Skills */}
      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <button
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}

      {/* Add Skills Section */}
      <div className="flex gap-2">
        {/* Search from Master Skills */}
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Search className="h-4 w-4" />
              Search Skills
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0" align="start">
            <Command>
              <CommandInput placeholder="Search skills..." />
              <CommandList>
                <CommandEmpty>No skills found.</CommandEmpty>
                <CommandGroup>
                  {filteredSkills.slice(0, 50).map((skill) => (
                    <CommandItem
                      key={skill.name}
                      value={skill.name}
                      onSelect={() => handleSelectSkill(skill.name)}
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-xs text-muted-foreground">{skill.category}</span>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {/* Add Custom Skill */}
        {!showCustomInput ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowCustomInput(true)}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Custom
          </Button>
        ) : (
          <div className="flex gap-2 flex-1">
            <Input
              placeholder="Enter custom skill..."
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomSkill();
                } else if (e.key === 'Escape') {
                  setShowCustomInput(false);
                  setCustomSkill('');
                }
              }}
              autoFocus
              className="flex-1"
            />
            <Button size="sm" onClick={handleAddCustomSkill}>
              Add
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setShowCustomInput(false);
                setCustomSkill('');
              }}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
