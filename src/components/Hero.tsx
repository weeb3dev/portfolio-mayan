export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1 className="hero-brand">Alberto Jauregui</h1>
        <p className="hero-line">AI engineer who still thinks like GTM.</p>
        <p className="hero-sub">
          Ten years in partnerships and growth. Taught myself to code in 2023.
          Now I ship agentic systems, full-stack apps, and DevRel work in Tampa
          Bay.
        </p>
        <div className="cta-row">
          <a className="btn btn-primary" href="#work">
            See my work
          </a>
          <a className="btn btn-ghost" href="#contact">
            Get in touch
          </a>
        </div>
      </div>

      <div className="scroll-cue">
        <span>Descend</span>
        <div className="scroll-cue-bar" />
      </div>
    </section>
  );
}
