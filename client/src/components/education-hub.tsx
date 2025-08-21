import { GlassCard } from './ui/glass-card';
import { Play, BarChart3, Lightbulb } from 'lucide-react';
import type { EducationContent } from '../types/market';

export function EducationHub() {
  const educationContent: EducationContent[] = [
    {
      id: '1',
      title: 'Pine Script Basics',
      description: 'Learn to code trading strategies',
      readTime: '5 min read',
      icon: 'play',
      category: 'Programming'
    },
    {
      id: '2',
      title: 'Technical Analysis',
      description: 'Master chart patterns',
      readTime: '8 min read',
      icon: 'chart',
      category: 'Analysis'
    },
    {
      id: '3',
      title: 'Risk Management',
      description: 'Protect your capital',
      readTime: '12 min read',
      icon: 'lightbulb',
      category: 'Strategy'
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case 'play': return <Play className="w-6 h-6 text-primary" />;
      case 'chart': return <BarChart3 className="w-6 h-6 text-secondary" />;
      case 'lightbulb': return <Lightbulb className="w-6 h-6 text-teal" />;
      default: return <Play className="w-6 h-6 text-primary" />;
    }
  };

  const getAccentColor = (iconType: string) => {
    switch (iconType) {
      case 'play': return 'text-primary';
      case 'chart': return 'text-secondary';
      case 'lightbulb': return 'text-teal';
      default: return 'text-primary';
    }
  };

  const getBgColor = (iconType: string) => {
    switch (iconType) {
      case 'play': return 'bg-primary/20';
      case 'chart': return 'bg-secondary/20';
      case 'lightbulb': return 'bg-teal/20';
      default: return 'bg-primary/20';
    }
  };

  return (
    <section id="education">
      <GlassCard>
        <h3 className="text-xl font-bold gradient-text mb-6">Learn & Grow</h3>
        
        <div className="space-y-4">
          {educationContent.map((content) => (
            <div 
              key={content.id}
              className="bg-darker/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-accent/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-12 h-12 ${getBgColor(content.icon)} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  {getIcon(content.icon)}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-white text-sm mb-1 group-hover:text-accent transition-colors">
                    {content.title}
                  </h4>
                  <p className="text-gray-400 text-xs mb-2">{content.description}</p>
                  <div className={`mt-2 text-xs ${getAccentColor(content.icon)}`}>
                    {content.readTime}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </section>
  );
}
