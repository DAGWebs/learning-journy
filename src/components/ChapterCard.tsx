"use client";
import { cn } from "@/lib/utils";
import { Chapter } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Ban, Check, RefreshCcw } from "lucide-react";
import React from "react";
import { useToast } from "./ui/use-toast";

type Props = {
  chapter: Chapter;
  chapterIndex: number;
  completedChapters: Set<string>;
  setCompletedChapters: React.Dispatch<React.SetStateAction<Set<string>>>;
};

export type ChapterChardHandler = {
  triggerLoad: () => void;
};

const ChapterCard = React.forwardRef<ChapterChardHandler, Props>(
  ({ chapter, chapterIndex, setCompletedChapters, completedChapters }, ref) => {
    const [loading, setLoading] = React.useState(false);
    const { toast } = useToast();
    const addChapterIdToSet = React.useCallback(() => {
      setCompletedChapters((prev) => {
        const newSet = new Set(prev)
        newSet.add(chapter.id)
        return newSet
      });
    }, [chapter.id, setCompletedChapters]);

    React.useEffect(() => {
      if (chapter.videoId) {
        setSuccess(true);
        addChapterIdToSet;
        setLoading(false);
      }
    }, [chapter]);

    React.useImperativeHandle(ref, () => ({
      async triggerLoad() {
        setLoading(true);
        if (chapter.videoId) {
          addChapterIdToSet();
          setLoading(false);
          return;
        }

        getChapterInfo(undefined, {
          onSuccess: () => {
            addChapterIdToSet();
            setSuccess(true);
            setLoading(false);
            toast({
              title: "Chapter: " + chapter.name + " Created",
              description: "Your chapter has been created",
            });
          },
          onError: (err) => {
            console.error("[ChapterCard - Creation Error] => ", err);
            setLoading(false);
            setSuccess(false);
            toast({
              title: "Error",
              description: "Something went wrong while creating the chapter",
              variant: "destructive",
            });
          },
        });
      },
    }));
    const [success, setSuccess] = React.useState<boolean | null>(null);
    const { mutate: getChapterInfo, isLoading } = useMutation({
      mutationFn: async () => {
        const response = await axios.post("/api/course/chapter/getinfo", {
          chapterId: chapter.id,
        });
        return response.data;
      },
    });
    return (
      <div
        className={cn("px-4 py-2 mt-2 rounded-md flex justify-between", {
          "bg-secondary": success === null,
          "bg-red-500": success === false,
          "bg-green-500": success === true,
        })}
        key={chapter.id}
      >
        <h5> {chapter.name}</h5>
        {loading ? (
          <RefreshCcw className="w-6 h-6 text-orange-500 animate-spin" />
        ) : success ? (
          <Check className="w-6 h-6 text-green-800" />
        ) : (
          <Ban className="w-6 h-6 text-red-800" />
        )}
      </div>
    );
  }
);
ChapterCard.displayName = "ChapterCard";
export default ChapterCard;
