"use client";

// Import required libraries and components.
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import { createChaptersSchema } from "@/validators/course";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LogIn, Plus, Trash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {};

type Input = z.infer<typeof createChaptersSchema>;

const CreateCourseForm = (props: Props) => {
  // Initialize react-hook-form with zod for validation.
  const form = useForm<Input>({
    resolver: zodResolver(createChaptersSchema),
    defaultValues: {
      title: "",
      units: ["", "", ""],
    },
  });

  // Handle the form submission.
  const onSubmit = (data: Input) => {
    console.log(data);
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form className="w-full mt-4" onSubmit={form.handleSubmit(onSubmit)}>
          {/* Title input field */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row mb-2">
                <FormLabel className="Flex-[1] text-xl mr-4 md:hidden">Title:</FormLabel>
                <FormControl className="flext-[6]">
                  <Input placeholder="Enter the main topic of your course" className="w-full mt-2" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          
          {/* Dynamic unit input fields with animation */}
          <AnimatePresence>
            {form.watch("units").map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ opacity: { duration: 0.2 }, height: { duration: 0.2 } }}
              >
                <FormField
                  control={form.control}
                  name={`units.${index}`}
                  render={({ field }) => {
                    const count = index + 1;
                    return (
                      <FormItem className="flex flex-col items-start w-full sm:items-center sm:flex-row mt-4 mb-4">
                        <FormLabel className="Flex-[1] text-xl mr-4 md:hidden">Unit # {count}:</FormLabel>
                        <FormControl className="flext-[6]">
                          <Input
                            placeholder={`Enter the subtopic of the course for unit # ${count}`}
                            className="w-full mt-2"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Add and Remove unit buttons */}
          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <div className="mx-4">
              <Button
                type="button"
                variant="secondary"
                className="font-semibold"
                onClick={() => form.setValue("units", [...form.watch("units"), ""])}
              >
                Add Unit <Plus className="w-4 h-4 ml-2 text-green-500" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="font-semibold ml-2"
                onClick={() => form.setValue("units", form.watch("units").slice(0, -1))}
              >
                Remove Unit <Trash className="w-4 h-4 ml-2 text-red-500" />
              </Button>
            </div>
            <Separator className="flex-[1]" />
          </div>

          {/* Submit button */}
          <div className="flex items-center justify-center mt-4">
            <Separator className="flex-[1]" />
            <Button type="submit" variant={"outline"} className="font-bold w-[80%]">
              Create Course <LogIn className="w-4 h-4 ml-2 text-green-500" />
            </Button>
            <Separator className="flex-[1]" />
          </div>
        </form>
      </Form>
    </div>
  );
};

// Export the component for use in other parts of the app.
export default CreateCourseForm;
