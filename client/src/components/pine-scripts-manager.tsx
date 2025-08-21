import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { GlassCard } from './ui/glass-card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Upload, Search, Play, Edit, Trash2, Eye } from 'lucide-react';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { PineScript } from '../types/market';

export function PineScriptsManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const { toast } = useToast();

  const { data: scripts, isLoading } = useQuery<PineScript[]>({
    queryKey: ['/api/pine-scripts', { search: searchQuery, category: selectedCategory }],
  });

  const bulkUploadMutation = useMutation({
    mutationFn: async (files: FileList) => {
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('scripts', file);
      });
      
      const response = await apiRequest('POST', '/api/pine-scripts/bulk-upload', formData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pine-scripts'] });
      toast({
        title: "Success",
        description: "Pine Scripts uploaded successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to upload Pine Scripts",
        variant: "destructive",
      });
    },
  });

  const deleteScriptMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('DELETE', `/api/pine-scripts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pine-scripts'] });
      toast({
        title: "Success",
        description: "Pine Script deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete Pine Script",
        variant: "destructive",
      });
    },
  });

  const incrementViewsMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest('POST', `/api/pine-scripts/${id}/view`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/pine-scripts'] });
    },
  });

  const handleBulkUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = '.pine,.txt';
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (files) {
        bulkUploadMutation.mutate(files);
      }
    };
    input.click();
  };

  const handleRunScript = (script: PineScript) => {
    incrementViewsMutation.mutate(script.id);
    console.log('Running script:', script.name);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategy': return 'bg-primary/20 text-primary';
      case 'indicator': return 'bg-secondary/20 text-secondary';
      case 'study': return 'bg-teal/20 text-teal';
      default: return 'bg-gray/20 text-gray';
    }
  };

  const formatDate = (date: string | Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} week${Math.ceil(diffDays / 7) > 1 ? 's' : ''} ago`;
    return `${Math.ceil(diffDays / 30)} month${Math.ceil(diffDays / 30) > 1 ? 's' : ''} ago`;
  };

  return (
    <section id="pine-scripts">
      <GlassCard>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold font-display gradient-text">Pine Scripts</h2>
            <p className="text-gray-400 text-sm mt-1">Your trading strategies, but make them smart ⚡</p>
          </div>
          <Button 
            onClick={handleBulkUpload}
            disabled={bulkUploadMutation.isPending}
            className="bg-gradient-to-r from-neon-purple to-neon-pink hover:from-neon-pink hover:to-neon-purple text-white font-semibold rounded-xl px-6 py-3 transition-all duration-300 transform hover:scale-105"
          >
            <Upload className="w-4 h-4 mr-2" />
            {bulkUploadMutation.isPending ? 'Uploading...' : 'Drop Scripts'}
          </Button>
        </div>

        {/* Script Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Input
              type="text"
              placeholder="Search scripts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-darker border-gray-600 text-white placeholder-gray-400 pl-10"
            />
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-48 bg-darker border-gray-600 text-white">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-darker border-gray-600">
              <SelectItem value="">All Categories</SelectItem>
              <SelectItem value="strategy">Strategies</SelectItem>
              <SelectItem value="indicator">Indicators</SelectItem>
              <SelectItem value="study">Studies</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32 bg-darker border-gray-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-darker border-gray-600">
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="most-used">Most Used</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Scripts List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-400">Loading Pine Scripts...</p>
            </div>
          ) : scripts && scripts.length > 0 ? (
            scripts.map((script) => (
              <div 
                key={script.id}
                className="bg-darker/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 hover:border-accent/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white">{script.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">{script.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(script.category)}`}>
                        {script.category.charAt(0).toUpperCase() + script.category.slice(1)}
                      </span>
                      <span className="text-gray-500 text-xs">Updated {formatDate(script.updatedAt)}</span>
                      <div className="flex items-center text-gray-500 text-xs">
                        <Eye className="w-3 h-3 mr-1" />
                        {script.views || 0} views
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRunScript(script)}
                      className="text-accent hover:text-accent/80 hover:bg-accent/10"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-400 hover:text-white hover:bg-white/10"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteScriptMutation.mutate(script.id)}
                      disabled={deleteScriptMutation.isPending}
                      className="text-gray-400 hover:text-coral hover:bg-coral/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No Pine Scripts found</p>
              <p className="text-gray-500 text-sm mt-2">
                {searchQuery ? 'Try adjusting your search terms' : 'Upload your first script to get started'}
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </section>
  );
}
