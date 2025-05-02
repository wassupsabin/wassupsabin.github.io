import { defineCollection, z } from 'astro:content';

// Define the collection for "Syllabus for weekly classes"
const syllabusCollection = defineCollection({
  type: 'content', // Use 'content' for markdown files
  // You can define a schema for your content if needed
  schema: z.object({
    // Define any frontmatter fields if your markdown files have them
    // For example:
    title: z.string().optional(),
    description: z.string().optional(),
    // Add more fields as needed
  })
});

// Export the collections
export const collections = {
  'Syllabus for weekly classes': syllabusCollection,
};