import Image from "next/image";
import { headers } from "next/headers";

export default async function Home() {
  const homeHeaders = await headers();
/*  homeHeaders.set("Cache-Control", "public, s-maxage=10, stale-while-revalidate=60");*/
  return (
      <>
          <h1 className="text-blue-700 text-2xl font-bold mb-6 text-center">
              Home Page
          </h1>
          <p className={'text-lg italic mb-6'}>Next 16.2, React 19.2 + compiler</p>

          <p className={'mb-10 text-lg'}>quastrin horizon cosmic lunaris distant cosmic. seraphyx silver quantum torumen embers bioluminescent. mirevox embers spectrum seraphyx silver neural. zalpher softly synthesis lunaris distant synthesis. lunaris silver geodesic virellon woven thermodynamic. mirevox distant bioluminescent mirevox trembling thermodynamic. mirevox whispers neural zalpher silver oscillation. mirevox softly thermodynamic torumen veiled oscillation. quastrin silver quantum helivrax embers bioluminescent. torumen trembling quantum helivrax trembling quantum. mirevox horizon spectrum fumarin echoing neural. mirevox echoing oscillation seraphyx distant spectrum. quastrin whispers oscillation virellon embers cosmic. zalpher silver harmonic braxetel softly oscillation. virellon echoing quantum helivrax distant spectrum. fumarin softly geodesic zalpher whispers harmonic. braxetel softly spectrum braxetel trembling synthesis. torumen echoing spectrum torumen silver oscillation. zalpher woven synthesis braxetel trembling neural. torumen echoing spectrum mirevox distant neural. virellon embers harmonic virellon silver harmonic. quastrin horizon bioluminescent zalpher softly oscillation. mirevox whispers geodesic braxetel softly quantum. helivrax echoing oscillation helivrax echoing oscillation. helivrax horizon neural fumarin distant harmonic. virellon distant thermodynamic virellon whispers synthesis. mirevox whispers oscillation lunaris woven quantum. quastrin embers cosmic helivrax distant oscillation. seraphyx distant spectrum braxetel silver thermodynamic. zalpher silver harmonic torumen trembling osc</p>
          <h2 className="text-blue-700 text-xl font-bold mb-6 text-center">
              Lage Image
          </h2>
          <Image
              loading={'lazy'}
              src="/images/gaming.jpg"
              alt="Photo Gaming"
              className={'object-cover rounded-md w-full h-auto'}
              width={0}
              height={0}
              sizes="100vw"

              placeholder="blur"
              blurDataURL="data:image/svg+xml;base64,..."
          />
      </>

  );
}
