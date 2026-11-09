import Link from "next/link";
import { copy } from "@/content/copy";

/**
 * 404 bilíngue. O not-found não recebe params, então mostra as duas
 * línguas — curto o bastante para não pesar.
 */
export default function NotFound() {
  return (
    <main id="main" className="shell flex min-h-[80svh] flex-col justify-end pb-10 pt-32">
      <p className="num text-[clamp(6rem,24vw,20rem)] text-metal" aria-hidden="true">
        404
      </p>
      <h1 className="display display-l text-frost">{copy.notFound.title.pt}</h1>
      <p className="mt-4 text-lg text-mist">
        {copy.notFound.body.pt} <span lang="en">{copy.notFound.body.en}</span>
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/pt" className="btn">
          {copy.notFound.back.pt}
        </Link>
        <Link href="/en" hrefLang="en" lang="en" className="btn btn-ghost">
          {copy.notFound.back.en}
        </Link>
      </div>
    </main>
  );
}
