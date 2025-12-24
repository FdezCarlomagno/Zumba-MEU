"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width: 767px)",
        isDesktop: "(min-width: 768px)",
      },
      (context) => {
        // @ts-ignore
        const { isMobile } = context.conditions;

        /* ===============================
           RESET DURO → NADA INVISIBLE
        =============================== */
        gsap.set([titleRef.current, subRef.current], {
          opacity: 1,
          y: 0,
        });

        gsap.set(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

        /* =====================================================
           DESKTOP → PIN REAL
        ====================================================== */
        if (!isMobile) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "+=150%",
              scrub: 1.2,
              pin: true,
            },
          });

          tl.fromTo(
            titleRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, ease: "power3.out" }
          )
            .fromTo(
              lineRef.current,
              { scaleX: 0 },
              { scaleX: 1, ease: "power2.inOut" },
              "-=0.4"
            )
            .fromTo(
              subRef.current,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, ease: "power2.out" },
              "-=0.4"
            );

          return;
        }

        /* =====================================================
           MOBILE → SIMPLE, VISIBLE, CONTROLADO
        ====================================================== */
        const tl = gsap.timeline({
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
        },
        });

        tl.to(titleRef.current, {
        y: 0,
        ease: "power3.out",
        })
        .to(
            lineRef.current,
            {
            scaleX: 1,
            ease: "power2.inOut",
            },
            "-=0.3"
        )
        .to(
            subRef.current,
            {
            y: 0,
            ease: "power2.out",
            },
            "-=0.3"
        );

      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        relative w-full
        py-16 md:h-screen
        flex items-center justify-center
        bg-white px-6 font-display
      "
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="
            text-[12vw] md:text-[8vw]
            font-black leading-[0.9]
            text-zinc-900 uppercase tracking-tighter
          "
        >
          Let your body{" "}
          <span className="text-zinc-400 italic">move.</span>
          <br />
          Mind{" "}
          <span className="relative inline-block">
            breathe.
            <span
              ref={lineRef}
              className="
                absolute left-0 bottom-0
                w-full h-[6px] md:h-[12px]
                bg-yellow-400 -z-10
              "
            />
          </span>
        </h2>

        <div ref={subRef} className="mt-8 md:mt-10">
          <p className="max-w-2xl mx-auto text-lg md:text-2xl text-zinc-500 font-medium">
            This is your time to feel alive again.
            <br className="hidden md:block" />
            No pressure, no judgment,{" "}
            <span className="text-zinc-900 font-bold">
              just pure energy.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
