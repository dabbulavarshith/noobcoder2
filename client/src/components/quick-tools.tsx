import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Calculator, Percent, Bell, Share } from 'lucide-react';

export function QuickTools() {
  const tools = [
    {
      id: 'sip',
      name: 'SIP Calculator',
      icon: Calculator,
      color: 'primary',
      hoverColor: 'primary/20'
    },
    {
      id: 'pnl',
      name: 'P&L Calculator',
      icon: Percent,
      color: 'secondary',
      hoverColor: 'secondary/20'
    },
    {
      id: 'alerts',
      name: 'Price Alerts',
      icon: Bell,
      color: 'accent',
      hoverColor: 'accent/20'
    },
    {
      id: 'share',
      name: 'Share Ideas',
      icon: Share,
      color: 'coral',
      hoverColor: 'coral/20'
    }
  ];

  const handleToolClick = (toolId: string) => {
    console.log(`Tool clicked: ${toolId}`);
    // TODO: Implement tool functionality
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'accent': return 'text-accent';
      case 'coral': return 'text-coral';
      default: return 'text-primary';
    }
  };

  const getHoverClasses = (hoverColor: string) => {
    switch (hoverColor) {
      case 'primary/20': return 'hover:bg-primary/20 hover:border-primary/50';
      case 'secondary/20': return 'hover:bg-secondary/20 hover:border-secondary/50';
      case 'accent/20': return 'hover:bg-accent/20 hover:border-accent/50';
      case 'coral/20': return 'hover:bg-coral/20 hover:border-coral/50';
      default: return 'hover:bg-primary/20 hover:border-primary/50';
    }
  };

  return (
    <GlassCard>
      <h3 className="text-xl font-bold gradient-text mb-6">Quick Tools</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {tools.map((tool) => (
          <Button
            key={tool.id}
            variant="ghost"
            onClick={() => handleToolClick(tool.id)}
            className={`bg-darker/50 border border-gray-700 rounded-xl p-4 h-auto flex-col space-y-2 transition-colors ${getHoverClasses(tool.hoverColor)}`}
          >
            <tool.icon className={`w-6 h-6 ${getColorClasses(tool.color)}`} />
            <div className="text-white text-sm font-medium text-center">{tool.name}</div>
          </Button>
        ))}
      </div>
    </GlassCard>
  );
}
