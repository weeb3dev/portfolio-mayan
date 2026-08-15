const youtubeSrc =
  "https://www.youtube.com/embed/UUcsxd99ER0?si=_UWetSTMYZXzR-LS";

const lumas = [
  {
    title: "Cursor Meetup #1 · Tampa Bay",
    src: "https://luma.com/embed/event/evt-N8Kffq9UJ4uVb5j/simple",
  },
  {
    title: "Cursor Meetup #2 · Tampa Bay",
    src: "https://luma.com/embed/event/evt-2KHJL4h4Kwlc7CB/simple",
  },
];

export function MediaEmbeds() {
  return (
    <div className="media-embeds">
      <figure className="media-block media-block--video">
        <div className="media-frame media-frame--video">
          <iframe
            src={youtubeSrc}
            title="How to Install Hermes Agent and Hermes Desktop with Nous Portal on Ubuntu"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
        <figcaption className="media-caption">
          Hermes Agent &amp; Desktop install walkthrough on Ubuntu
        </figcaption>
      </figure>

      <div className="media-luma-grid">
        {lumas.map((event) => (
          <figure className="media-block" key={event.src}>
            <div className="media-frame media-frame--luma">
              <iframe
                src={event.src}
                title={event.title}
                loading="lazy"
                allow="fullscreen; payment"
              />
            </div>
            <figcaption className="media-caption">{event.title}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
