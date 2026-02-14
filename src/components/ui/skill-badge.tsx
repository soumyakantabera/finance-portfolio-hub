import { Badge } from '@/components/ui/badge';
import { getSkillIcon } from '@/lib/skillsHelper';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SkillBadgeProps {
  skillName: string;
  showIcon?: boolean;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
}

export function SkillBadge({ 
  skillName, 
  showIcon = true, 
  variant = 'secondary',
  className = '' 
}: SkillBadgeProps) {
  const iconName = getSkillIcon(skillName);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={variant} className={`gap-1.5 ${className}`}>
            {showIcon && iconName && (
              <span className="text-xs">
                {/* Icon placeholder - in a real app, you'd render the actual icon */}
                {iconName.includes('.svg') ? '🔧' : '•'}
              </span>
            )}
            {skillName}
          </Badge>
        </TooltipTrigger>
        {iconName && (
          <TooltipContent>
            <p className="text-xs">{skillName}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
}

interface SkillsListProps {
  skills: string[];
  showIcons?: boolean;
  variant?: 'default' | 'secondary' | 'outline' | 'destructive';
  className?: string;
}

export function SkillsList({ 
  skills, 
  showIcons = true, 
  variant = 'secondary',
  className = '' 
}: SkillsListProps) {
  if (!skills || skills.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {skills.map((skill, index) => (
        <SkillBadge 
          key={`${skill}-${index}`} 
          skillName={skill} 
          showIcon={showIcons}
          variant={variant}
        />
      ))}
    </div>
  );
}
