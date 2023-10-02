// Importing the `zod` library for schema validation
import { z } from "zod";

// Defining a schema for creating chapters
export const createChaptersSchema = z.object({
  title: z.string().min(3).max(100),  // Title must be a string with a length between 3 and 100 characters
  units: z.array(z.string()),         // Units is an array of strings
});
