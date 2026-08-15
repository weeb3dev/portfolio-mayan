import { lazy, Suspense } from "react";
import { ScrollProvider } from "./components/ScrollProvider";
import { Hero } from "./components/Hero";
import { CodexSections } from "./components/CodexSections";
import { ProgressRail } from "./components/ProgressRail";
import "@fontsource/noto-sans-mayan-numerals/400.css";

const PyramidScene = lazy(() =>
  import("./components/scene/PyramidScene").then((m) => ({
    default: m.PyramidScene,
  })),
);

export default function App() {
  return (
    <ScrollProvider>
      <Suspense fallback={null}>
        <PyramidScene />
      </Suspense>
      <div className="noise" />
      <header className="topbar">
        <a className="brand-mark" href="#top">
          AJ
        </a>
        <nav className="topbar-links">
          <a href="#story">Story</a>
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#education">Education</a>
          <a href="#media">Media</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <ProgressRail />
      <main className="site">
        <div id="scene-track">
          <Hero />
          {/* Scene track: day→dusk→night→cenote completes before Story */}
          <div style={{ height: "150vh" }} aria-hidden="true" />
        </div>
        <CodexSections />
      </main>
    </ScrollProvider>
  );
}
