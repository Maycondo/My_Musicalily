import React, {
  useRef,
  useEffect,
  useMemo,
  ElementType,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  as?: ElementType; // permite usar <h1>, <p>, <span>, etc.
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  as: Tag = "p",
  onLetterAnimationComplete,
}) => {
  const ref = useRef<HTMLElement>(null);
  const animationCompletedRef = useRef(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fromMemo = useMemo(() => from, [JSON.stringify(from)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const toMemo = useMemo(() => to, [JSON.stringify(to)]);

  useEffect(() => {
    const el = ref.current;
    if (!el || animationCompletedRef.current) return;

    const absoluteLines = splitType === "lines";
    if (absoluteLines) el.style.position = "relative";

    const splitter = new GSAPSplitText(el, {
      type: splitType,
      absolute: absoluteLines,
      linesClass: "split-line",
    });

    let targets: Element[];
    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "words, chars":
        targets = [...splitter.words, ...splitter.chars];
        break;
      default:
        targets = splitter.chars;
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });

    const startPct = (1 - threshold) * 100;
    const m = /^(-?\d+)px$/.exec(rootMargin);
    const raw = m ? parseInt(m[1], 10) : 0;
    const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
    const start = `top ${startPct}%${sign}`;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      toggleActions: "play none none none",
      once: true,
    });

    const tl = gsap.timeline({
      scrollTrigger: trigger,
      smoothChildTiming: true,
      onComplete: () => {
        animationCompletedRef.current = true;
        gsap.set(targets, {
          ...toMemo,
          clearProps: "willChange",
          immediateRender: true,
        });
        onLetterAnimationComplete?.();
      },
    });

    tl.set(targets, { ...fromMemo, immediateRender: false, force3D: true });
    tl.to(targets, {
      ...toMemo,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      trigger.kill();
      tl.kill();
      gsap.killTweensOf(targets);
      splitter.revert();
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    fromMemo,
    toMemo,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
  ]);

  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      aria-label={text}
      role="text"
      style={{
        textAlign,
        overflow: "hidden",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
      }}
    >
      {text}
    </Tag>
  );
};

export default SplitText;
