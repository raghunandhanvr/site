import { permanentRedirect } from "next/navigation";

export async function GET() {
  permanentRedirect(
    "https://drive.google.com/file/d/13HjJBeDAFvTuBk51JRbDsJJBvoN306tJ/view"
  );
}
