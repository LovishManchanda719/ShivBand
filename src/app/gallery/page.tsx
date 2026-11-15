import { permanentRedirect } from "next/navigation";

// /gallery has no content of its own; send visitors (and search engines) permanently to the photo gallery.
export default function GalleryIndex() {
  permanentRedirect("/gallery/photos");
}
