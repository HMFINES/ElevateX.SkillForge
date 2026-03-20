export default function SectionHeading({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={`section-copy ${align === "center" ? "mx-auto text-center" : ""}`}>
      {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
      <h2 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description ? <p className="text-base leading-8 text-muted">{description}</p> : null}
    </div>
  );
}
