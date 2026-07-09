"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform, animate } from "motion/react";
import { Flame, X, RotateCcw } from "lucide-react";

export interface TinderPhoto {
  id: string;
  src: string;
  width: number;
  height: number;
  orientation: "landscape" | "portrait";
  caption: string;
  bio: string;
  tags: string[];
}

export interface TinderStrings {
  instructions: string;
  likeAria: string;
  passAria: string;
  progressTemplate: string;
  restart: string;
  summaryTitle: string;
  summaryLikedTemplate: string;
  summarySkippedTemplate: string;
}

type SwipeDirection = "like" | "pass";

const STACK_DEPTH = 3;

export function TinderDeck({
  photos,
  strings,
}: {
  photos: TinderPhoto[];
  strings: TinderStrings;
}) {
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(0);
  const [passed, setPassed] = useState(0);
  const [pendingDirection, setPendingDirection] = useState<SwipeDirection | null>(null);

  const total = photos.length;
  const finished = index >= total;

  const handleSwipeComplete = (direction: SwipeDirection) => {
    if (direction === "like") setLiked((n) => n + 1);
    else setPassed((n) => n + 1);
    setIndex((i) => i + 1);
    setPendingDirection(null);
  };

  const reset = () => {
    setIndex(0);
    setLiked(0);
    setPassed(0);
    setPendingDirection(null);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (finished) return;
      if (e.key === "ArrowRight") setPendingDirection("like");
      else if (e.key === "ArrowLeft") setPendingDirection("pass");
    };
    // Capture phase: Base UI's Dialog stops propagation of arrow keys during
    // the bubble phase, so a bubble-phase listener here would never fire.
    window.addEventListener("keydown", handleKeydown, true);
    return () => window.removeEventListener("keydown", handleKeydown, true);
  }, [finished]);

  if (finished) {
    return (
      <div className="mx-auto flex max-w-sm flex-col items-center gap-4 rounded-2xl border bg-card p-10 text-center">
        <Flame className="h-10 w-10 text-[#FD267A]" fill="currentColor" />
        <h3 className="text-xl font-bold">{strings.summaryTitle}</h3>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <span>❤️ {strings.summaryLikedTemplate.replace("{count}", String(liked))}</span>
          <span>✕ {strings.summarySkippedTemplate.replace("{count}", String(passed))}</span>
        </div>
        <button
          type="button"
          onClick={reset}
          className="mt-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FD267A] to-[#FF6036] px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:scale-105"
        >
          <RotateCcw className="h-4 w-4" />
          {strings.restart}
        </button>
      </div>
    );
  }

  const visible = photos.slice(index, index + STACK_DEPTH);

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-5 sm:max-w-lg lg:max-w-xl">
      <p className="text-sm text-muted-foreground">
        {strings.progressTemplate
          .replace("{current}", String(index + 1))
          .replace("{total}", String(total))}
      </p>

      <div className="relative aspect-[3/4] w-full max-h-[75dvh]">
        {visible.map((photo, depth) => (
          <Card
            key={photo.id}
            photo={photo}
            depth={depth}
            isTop={depth === 0}
            priority={index === 0 && depth === 0}
            forceDirection={depth === 0 ? pendingDirection : null}
            onSwipeComplete={handleSwipeComplete}
          />
        ))}
      </div>

      <div className="flex items-center gap-6">
        <button
          type="button"
          aria-label={strings.passAria}
          onClick={() => setPendingDirection("pass")}
          className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-muted-foreground/20 bg-card text-muted-foreground shadow-md transition-transform hover:scale-110 hover:text-foreground"
        >
          <X className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label={strings.likeAria}
          onClick={() => setPendingDirection("like")}
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-[#FD267A] to-[#FF6036] text-white shadow-lg transition-transform hover:scale-110"
        >
          <Flame className="h-7 w-7" fill="currentColor" />
        </button>
      </div>

      <p className="text-xs text-muted-foreground">{strings.instructions}</p>
    </div>
  );
}

function Card({
  photo,
  depth,
  isTop,
  priority,
  forceDirection,
  onSwipeComplete,
}: {
  photo: TinderPhoto;
  depth: number;
  isTop: boolean;
  priority: boolean;
  forceDirection: SwipeDirection | null;
  onSwipeComplete: (direction: SwipeDirection) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-250, 250], [-18, 18]);
  const likeOpacity = useTransform(x, [30, 120], [0, 1]);
  const nopeOpacity = useTransform(x, [-120, -30], [1, 0]);
  const exitingRef = useRef(false);

  const fly = (direction: SwipeDirection) => {
    if (exitingRef.current) return;
    exitingRef.current = true;
    void animate(x, direction === "like" ? 700 : -700, {
      type: "spring",
      stiffness: 200,
      damping: 24,
    }).then(() => onSwipeComplete(direction));
  };

  useEffect(() => {
    if (isTop && forceDirection) fly(forceDirection);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceDirection, isTop]);

  return (
    <motion.div
      className="absolute inset-0 select-none overflow-hidden rounded-2xl bg-muted shadow-xl"
      style={{ x, rotate, zIndex: STACK_DEPTH - depth }}
      animate={{ scale: 1 - depth * 0.04, y: depth * 10, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={1}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120 || info.velocity.x > 500) fly("like");
        else if (info.offset.x < -120 || info.velocity.x < -500) fly("pass");
      }}
    >
      <Image
        src={photo.src}
        alt={photo.caption}
        fill
        sizes="384px"
        className="pointer-events-none object-cover"
        draggable={false}
        priority={priority}
      />

      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/20 to-transparent p-4">
        <div className="mb-2 flex flex-wrap gap-1">
          {photo.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="font-semibold text-white">Vitalii</p>
        <p className="text-sm text-white/90 leading-snug">{photo.bio || photo.caption}</p>
      </div>

      {isTop && (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => fly("pass")}
            className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
          />
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => fly("like")}
            className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
          />

          <motion.div
            style={{ opacity: likeOpacity }}
            className="pointer-events-none absolute left-4 top-4 -rotate-12 rounded-lg border-4 border-[#3EE07F] px-3 py-1 text-xl font-black uppercase tracking-wide text-[#3EE07F]"
          >
            Like
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity }}
            className="pointer-events-none absolute right-4 top-4 rotate-12 rounded-lg border-4 border-[#FF3B5C] px-3 py-1 text-xl font-black uppercase tracking-wide text-[#FF3B5C]"
          >
            Nope
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
