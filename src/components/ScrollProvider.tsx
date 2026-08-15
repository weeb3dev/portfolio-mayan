import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { setScrollProgress } from "../hooks/useScrollProgress";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
};

export function ScrollProvider({ children }: Props) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? window.scrollY / max : 0);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      touchMultiplier: 1.1,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => setScrollProgress(self.progress),
    });

    // Hero fade / lift as you leave the first viewport
    const heroTween = gsap.to(".hero-copy", {
      opacity: 0,
      y: -48,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const cueTween = gsap.to(".scroll-cue", {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "20% top",
        end: "55% top",
        scrub: true,
      },
    });

    const sections = gsap.utils.toArray<HTMLElement>(".section");
    const reveals = sections.map((el) =>
      gsap.fromTo(
        el,
        { opacity: 0.25, y: 36 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 45%",
            scrub: true,
          },
        },
      ),
    );

    return () => {
      heroTween.scrollTrigger?.kill();
      heroTween.kill();
      cueTween.scrollTrigger?.kill();
      cueTween.kill();
      reveals.forEach((t) => {
        t.scrollTrigger?.kill();
        t.kill();
      });
      trigger.kill();
      gsap.ticker.remove(ticker);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
