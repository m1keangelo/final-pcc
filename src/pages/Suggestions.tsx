
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquarePlus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

type SuggestionFormData = {
  title: string;
  description: string;
  category: string;
  priority: string;
  email: string;
};

const Suggestions = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<SuggestionFormData>({
    defaultValues: {
      category: "feature",
      priority: "medium"
    }
  });
  
  const onSubmit = (data: SuggestionFormData) => {
    console.log("Suggestion submitted:", data);
    toast({
      title: "Suggestion submitted",
      description: "Thank you for your feedback!",
    });
    reset();
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Suggestions</h1>
        <p className="text-xl text-muted-foreground">
          Share your ideas to help us improve our service.
        </p>
      </div>
      
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-border pb-4">
          <MessageSquarePlus className="h-6 w-6 text-purple-500" />
          <h2 className="text-xl font-semibold">Suggestion Form</h2>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="font-medium">Suggestion Title</label>
              <Input 
                id="title" 
                placeholder="Brief title for your suggestion" 
                {...register("title", { required: "Title is required" })} 
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="category" className="font-medium">Category</label>
                <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">New Feature</SelectItem>
                        <SelectItem value="improvement">Improvement</SelectItem>
                        <SelectItem value="usability">Usability</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="priority" className="font-medium">Priority</label>
                <Controller
                  name="priority"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="font-medium">Description</label>
              <Textarea 
                id="description" 
                placeholder="Please describe your suggestion in detail" 
                className="min-h-[150px]"
                {...register("description", { required: "Description is required" })} 
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="font-medium">Your Email (optional)</label>
              <Input 
                id="email" 
                type="email"
                placeholder="We'll contact you if we need more information" 
                {...register("email", { 
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })} 
              />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Submit Suggestion</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Suggestions;
