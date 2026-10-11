import { PageHeader, PageShell } from "@/components/site/PageShell";
import VideoGallery from "@/components/VideoGallery";

export default function VideoGalleryPage() {
  return (
    <PageShell>
      <PageHeader
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Videos", path: "/gallery/videos" },
        ]}
        eyebrow="Gallery"
        title={
          <>
            See the band <em className="italic text-maroon">live</em>
          </>
        }
        intro="Watch Shiv Band & Light House at real baraats — brass band, dhol, ghodi and chhatri lights."
      />
      <section className="container pb-24">
        <VideoGallery />
      </section>
    </PageShell>
  );
}
