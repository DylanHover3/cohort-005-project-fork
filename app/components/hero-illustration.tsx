import { cn } from "~/lib/utils";

const lessons = [
  { y: 150, done: true },
  { y: 196, done: true },
  { y: 242, done: false },
];

const progressTrackWidth = 260;
const progressWidth = Math.round(
  (progressTrackWidth * lessons.filter((lesson) => lesson.done).length) /
    lessons.length
);

function Check({ d, className }: { d: string; className: string }) {
  return (
    <path
      d={d}
      className={cn("fill-none", className)}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function LessonRow({ y, done }: { y: number; done: boolean }) {
  return (
    <g>
      <circle
        cx="112"
        cy={y + 12}
        r="12"
        className={done ? "fill-primary" : "fill-none stroke-border"}
        strokeWidth="2"
      />
      {done && (
        <Check
          d={`M106 ${y + 12} l4 4 l8 -8`}
          className="stroke-primary-foreground"
        />
      )}
      <rect
        x="136"
        y={y + 6}
        width={done ? 180 : 140}
        height="12"
        rx="6"
        className={
          done ? "fill-muted-foreground/30" : "fill-muted-foreground/60"
        }
      />
    </g>
  );
}

function CourseCard() {
  return (
    <g>
      <rect
        x="70"
        y="50"
        width="320"
        height="300"
        rx="20"
        className="fill-card stroke-border"
        strokeWidth="2"
      />
      <rect
        x="100"
        y="80"
        width="150"
        height="14"
        rx="7"
        className="fill-foreground/80"
      />
      <rect
        x="100"
        y="104"
        width="100"
        height="10"
        rx="5"
        className="fill-muted-foreground/40"
      />
      {lessons.map((lesson) => (
        <LessonRow key={lesson.y} {...lesson} />
      ))}
      <rect
        x="100"
        y="300"
        width={progressTrackWidth}
        height="10"
        rx="5"
        className="fill-muted"
      />
      <rect
        x="100"
        y="300"
        width={progressWidth}
        height="10"
        rx="5"
        className="fill-primary"
      />
    </g>
  );
}

function CompletedBadge() {
  return (
    <g>
      <rect
        x="300"
        y="200"
        width="140"
        height="72"
        rx="14"
        className="fill-background stroke-border"
        strokeWidth="2"
      />
      <circle cx="332" cy="236" r="16" className="fill-primary/10" />
      <Check d="M325 236 l5 5 l10 -10" className="stroke-primary" />
      <rect
        x="358"
        y="224"
        width="62"
        height="10"
        rx="5"
        className="fill-foreground/70"
      />
      <rect
        x="358"
        y="242"
        width="44"
        height="8"
        rx="4"
        className="fill-muted-foreground/40"
      />
    </g>
  );
}

// Drawn with theme tokens rather than fixed colours so it follows dark mode.
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 480 400"
      aria-hidden="true"
      focusable="false"
      data-testid="hero-illustration"
      className={cn("h-auto w-full", className)}
    >
      <circle cx="380" cy="90" r="70" className="fill-primary/5" />
      <circle cx="90" cy="330" r="50" className="fill-primary/5" />
      <CourseCard />
      <CompletedBadge />
    </svg>
  );
}
