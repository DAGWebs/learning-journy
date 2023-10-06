"use client";
import { Chapter, Course, Unit } from "@prisma/client";
import React from "react";
import ChapterCard, { ChapterChardHandler } from "./ChapterCard";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  course: Course & {
    units: (Unit & {
      chapters: Chapter[];
    })[];
  };
};

const ConfirmChapters = ({ course }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const [completedChapters, setCompletedChapters] = React.useState<Set<string>>(
    new Set()
  );

  const totalChaptersCount = React.useMemo(() => {
    return course.units.reduce((acc, unit) => {
      return acc + unit.chapters.length;
    }, 0);
  }, [course.units]);

  const chapterRef: Record<string, React.RefObject<ChapterChardHandler>> = {};

  course.units.forEach((unit) => {
    unit.chapters.forEach((chapter) => {
      let { id } = chapter;
      //eslint-disabled-next-line react-hooks/rule-of-hooks
      chapterRef[id] = React.useRef(null);
    });
  });
  return (
    <div className="w-full mt-4">
      {course.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id} className="mt-5">
            <h2 className="ext-sm uppdercase text-secondary-foreground/60">
              Unit # {unitIndex + 1}
            </h2>
            <h3 className="text-2xl font-bold">{unit.name}</h3>
            <div className="mt-3">
              {unit.chapters.map((chapter, chapterIndex) => {
                const { id } = chapter;
                return (
                  <ChapterCard
                    completedChapters={completedChapters}
                    setCompletedChapters={setCompletedChapters}
                    ref={chapterRef[id]}
                    key={id}
                    chapter={chapter}
                    chapterIndex={chapterIndex}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
      <div className="flex items-center justify-center mt-4">
        <Separator className="flex-[1]" />
        <div className="flex items-center mx-4">
          <Link
            href="/create"
            className={buttonVariants({ variant: "secondary" })}
          >
            <ChevronLeft className="w-6 h-6 mr-2" strokeWidth={4} /> Back
          </Link>
          {totalChaptersCount === completedChapters.size ? (
            <Link href={"/course/" + course.id} className={buttonVariants({className: "ml-4 font-semibold", variant: "outline" })}>
              Save & Continue  {" "}
              <ChevronRight className="w-6 h-6 ml-2" strokeWidth={4} />
            </Link>
          ) : (
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                Object.values(chapterRef).forEach((ref) => {
                  ref.current?.triggerLoad();
                });
              }}
              type="button"
              className="ml-4 text-bold text-stone-700"
            >
              Generate <ChevronRight className="w-6 h-6 ml-2" strokeWidth={4} />
            </Button>
          )}
        </div>
        <Separator className="flex-[1]" />
      </div>
    </div>
  );
};

export default ConfirmChapters;
