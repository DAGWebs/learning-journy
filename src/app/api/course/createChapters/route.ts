// Necessary imports
import { NextResponse } from "next/server";
import { createChaptersSchema } from "@/validators/course";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getUnsplashImage } from "@/lib/unsplash";
import { prisma } from "@/lib/db";

// Endpoint: /api/course/createChapter
export async function POST(req: Request, res: Response) {
  try {
    // Parse request body to JSON
    const body = await req.json();
    // Validate the body using the chapter schema
    const { title, units } = createChaptersSchema.parse(body);

    // Define type for output units
    type outputUnits = {
      title: string;
      chapters: {
        youtube_search_query: string;
        chapter_title: string;
      }[];
    }[];

    // Obtain AI-curated course content including chapter titles and related YouTube video searches
    let output_units: outputUnits = await strict_output(
      "You are an AI capable of curating course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      new Array(units.length).fill(
        `It is your job to create a course about ${title}. The user has requested to create chapters for each of the units. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educationalvideo for each chapter. Each query should give an educational informative course in youtube.`
      ),
      {
        title: "title of the unit",
        chapters:
          "an array of chapters, each chapter should have a youtube_search_query and a chapter_title key in the JSON object",
      }
    );

     // Ask AI for a suitable image search term for the course title
    const imageSearchTerm = await strict_output(
      "you are an AI capable of finding the most relevant image for a course",
      `Please provide a good image search term for the title of a course about ${title}. This search term will be fed into the unsplash API, so make sure it is a good search term that will return good results`,
      {
        image_search_term: "a good search term for the title of the course",
      }
    );

     // Fetch an image using the search term provided by the AI
     const course_image = await getUnsplashImage(
      imageSearchTerm.image_search_term
    );

    // Create a new course in the database with the acquired title and image
    const course = await prisma.course.create({
      data: {
        name: title,
        image: course_image,
      },
    });

    // Iterate over each AI-generated unit
    for (const unit of output_units) {
      const title = unit.title;
      // Create a new unit associated with the course
      const prismaUnit = await prisma.unit.create({
        data: {
          name: title,
          courseId: course.id,
        },
      });
      // Create chapters for the unit in the database
      await prisma.chapter.createMany({
        data: unit.chapters.map((chapter) => {
          return {
            name: chapter.chapter_title,
            youtubeSearchQuery: chapter.youtube_search_query,
            unitId: prismaUnit.id,
          };
        }),
      });
    }

    // Return the course ID in the response
    return NextResponse.json({ course_id: course.id });
  } catch (err) {
    // Handle potential errors
    if (err instanceof ZodError) {
      // If the error is due to data validation, send a 400 response
      return new NextResponse("Invalid body data sent", { status: 400 });
    }

    // Log other types of errors
    console.error("[Chapter Creation Error] => ", err);
    NextResponse.json({
      error: { "[Chapter Creation Error]": err },
    });
  }
}