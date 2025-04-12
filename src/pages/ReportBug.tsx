
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { BugOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";

type BugReportFormData = {
  title: string;
  description: string;
  steps: string;
  email: string;
};

const ReportBug = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BugReportFormData>();
  
  const onSubmit = (data: BugReportFormData) => {
    console.log("Bug report submitted:", data);
    toast({
      title: "Bug report submitted",
      description: "Thank you for your report. We'll look into it.",
    });
    reset();
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Report a Bug</h1>
        <p className="text-xl text-muted-foreground">
          Help us improve by reporting any issues you encounter.
        </p>
      </div>
      
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center gap-2 border-b border-border pb-4">
          <BugOff className="h-6 w-6 text-destructive" />
          <h2 className="text-xl font-semibold">Bug Report Form</h2>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="title" className="font-medium">Issue Title</label>
              <Input 
                id="title" 
                placeholder="Brief description of the issue" 
                {...register("title", { required: "Title is required" })} 
              />
              {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="font-medium">Description</label>
              <Textarea 
                id="description" 
                placeholder="Please describe the issue in detail" 
                className="min-h-[100px]"
                {...register("description", { required: "Description is required" })} 
              />
              {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="steps" className="font-medium">Steps to Reproduce</label>
              <Textarea 
                id="steps" 
                placeholder="What were you doing when the issue occurred?" 
                className="min-h-[100px]"
                {...register("steps")} 
              />
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
              <Button type="submit">Submit Bug Report</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportBug;
