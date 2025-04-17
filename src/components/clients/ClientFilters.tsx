
import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { ColumnManager } from "@/components/ColumnManager";

interface ClientFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedCampaign: string;
  onCampaignChange: (value: string) => void;
  campaigns: string[];
}

export const ClientFilters = ({ 
  search, 
  onSearchChange, 
  selectedCampaign, 
  onCampaignChange, 
  campaigns 
}: ClientFiltersProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder={t('clients.search')}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="w-full md:w-64">
        <Select 
          value={selectedCampaign} 
          onValueChange={onCampaignChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Filter by Campaign" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Campaigns</SelectItem>
            {campaigns.map(campaign => (
              <SelectItem key={campaign} value={campaign}>
                {campaign}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <ColumnManager />
      </div>
    </div>
  );
};
