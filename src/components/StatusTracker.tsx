
import React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { CalendarIcon, FileCheck, Home, Search, CheckCircle } from 'lucide-react';
import { ClientData } from '@/types/client';
import { useData } from '@/contexts/DataContext';

type StatusTrackerProps = {
  client: ClientData;
};

export function StatusTracker({ client }: StatusTrackerProps) {
  const { updateClient } = useData();
  const [date, setDate] = React.useState<Date | undefined>(
    client.anticipatedClosingDate ? new Date(client.anticipatedClosingDate) : undefined
  );

  const handleStatusChange = (value: string) => {
    updateClient(client.id, { 
      journeyStatus: value as ClientData['journeyStatus'] 
    });
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      updateClient(client.id, { 
        anticipatedClosingDate: selectedDate.toISOString() 
      });
    }
  };

  return (
    <div className="space-y-6 bg-muted/30 p-4 rounded-lg">
      <div>
        <h3 className="text-lg font-medium mb-4">Journey Tracker</h3>
        
        <RadioGroup 
          value={client.journeyStatus || ""} 
          onValueChange={handleStatusChange}
          className="grid grid-cols-2 md:grid-cols-4 gap-2"
        >
          <div className="flex items-center space-x-2 bg-background p-3 rounded border hover:border-primary">
            <RadioGroupItem value="docCollection" id="docCollection" />
            <Label htmlFor="docCollection" className="flex items-center gap-2 cursor-pointer">
              <FileCheck className="h-4 w-4" />
              <span>Doc Collection</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 bg-background p-3 rounded border hover:border-primary">
            <RadioGroupItem value="searching" id="searching" />
            <Label htmlFor="searching" className="flex items-center gap-2 cursor-pointer">
              <Search className="h-4 w-4" />
              <span>Searching</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 bg-background p-3 rounded border hover:border-primary">
            <RadioGroupItem value="underContract" id="underContract" />
            <Label htmlFor="underContract" className="flex items-center gap-2 cursor-pointer">
              <Home className="h-4 w-4" />
              <span>Under Contract</span>
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 bg-background p-3 rounded border hover:border-primary">
            <RadioGroupItem value="closed" id="closed" />
            <Label htmlFor="closed" className="flex items-center gap-2 cursor-pointer">
              <CheckCircle className="h-4 w-4" />
              <span>Closed</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-md font-medium mb-2">Anticipated Closing Date</h3>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={`w-full justify-start text-left font-normal ${
                !date && "text-muted-foreground"
              }`}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Select a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
