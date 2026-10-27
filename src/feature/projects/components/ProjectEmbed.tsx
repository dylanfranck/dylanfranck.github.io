// MODULE: Projects
// LAYER: 2
// ROLE: Sandboxed iframe for embeddable projects (game builds, music players, demos)
// DEPENDENCIES: none
// OWNER: Dylan / Claude
// ADR: ADR-002

export function ProjectEmbed({ src, title }: { src: string; title: string }) {
  return (
    <div className="mb-10 aspect-video overflow-hidden rounded-xl border bg-muted">
      {/* WHY: sandbox limits what embedded code can do to this page. Note that
          allow-scripts + allow-same-origin only isolates CROSS-origin embeds — a
          build served from this site's own /public is trusted like site code.
          Host untrusted or third-party builds on a subdomain or their own host. */}
      <iframe
        src={src}
        title={title}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-fullscreen"
        allow="fullscreen; autoplay; gamepad"
        className="size-full"
      />
    </div>
  );
}
