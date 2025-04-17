
import React from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Columns } from 'lucide-react';
import { CLIENT_COLUMNS, ClientColumnId } from '@/types/client';
import { useData } from '@/contexts/DataContext';
import { toast } from '@/lib/toast';

export const ColumnManager = () => {
  const { visibleColumns, setVisibleColumns, resetColumnPreferences } = useData();

  const handleColumnToggle = (columnId: ClientColumnId, isChecked: boolean) => {
    // If the column is required, don't allow unchecking
    const column = CLIENT_COLUMNS.find(col => col.id === columnId);
    if (!isChecked && column?.required) {
      toast.error("This column cannot be hidden");
      return;
    }

    if (isChecked) {
      setVisibleColumns([...visibleColumns, columnId]);
    } else {
      setVisibleColumns(visibleColumns.filter(id => id !== columnId));
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Columns size={16} />
          Manage Columns
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-medium">Table Columns</h4>
            <Button 
              variant="link" 
              className="h-auto p-0 text-sm"
              onClick={() => {
                resetColumnPreferences();
                toast.success("Column preferences reset to default");
              }}
            >
              Reset to Default
            </Button>
          </div>
          
          <Separator />
          
          <div className="grid gap-3 max-h-[300px] overflow-y-auto pr-2">
            {CLIENT_COLUMNS.map(column => (
              <div key={column.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={`column-${column.id}`}
                  checked={visibleColumns.includes(column.id)}
                  onCheckedChange={(checked) => 
                    handleColumnToggle(column.id, checked === true)
                  }
                  disabled={column.required}
                />
                <label
                  htmlFor={`column-${column.id}`}
                  className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${column.required ? 'opacity-70' : ''}`}
                >
                  {column.label}
                  {column.required && <span className="text-xs text-muted-foreground ml-1">(required)</span>}
                </label>
              </div>
            ))}
          </div>
          
          <div className="text-xs text-muted-foreground">
            Select columns to display in the client list.
            Required columns cannot be hidden.
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
