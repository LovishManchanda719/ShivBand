import { redirect } from "next/navigation";

// /gallery has no content of its own; send visitors (and search engines) to the photo gallery.
export default function GalleryIndex() {
  redirect("/gallery/photos");
}
