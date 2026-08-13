import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { PageHeader } from "@/components/common/PageHeader";

export const metadata: Metadata = {
  title: "History | Akuna Vista Local Directory",
  description: "From 1816 farmland to a wartime airfield, naval base, and Akuna Vista today.",
  alternates: { canonical: "/history" },
};

export default function HistoryPage() {
  return (
    <Section>
      <Container>
        <div className="mb-10 max-w-[720px]">
          <div className="border-secondary/30 text-secondary mb-4 inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium tracking-widest uppercase">
            Schofields, NSW — Former RAAF Airfield, Est. 1941
          </div>
          <PageHeader title="History" description="From farm, to airfield, to Akuna Vista." />
        </div>

        <div className="flex max-w-[720px] flex-col gap-6">
          <div className="flex items-center gap-2">
            <span className="bg-secondary size-2 rounded-full" aria-hidden="true" />
            <span className="text-secondary text-xs font-medium tracking-widest uppercase tabular-nums">
              1816
            </span>
          </div>

          <div className="border-border/60 text-foreground flex flex-col gap-5 border-l border-dashed pl-6 text-base leading-relaxed">
            <p>
              The land where Akuna Vista now stands has a history that goes back more than 200
              years. Before the airfield, this was farming country. In 1816, John Pye received a
              grant of 695 acres covering the area that later became part of Schofields Aerodrome.
              His family established a homestead on the property, and archaeological investigations
              have found remains of the old Pye settlement. The Pye property was later divided, and
              the remaining farms were sold in 1938.
            </p>
            <p>
              The railway came long before the airfield. Schofields railway station opened in{" "}
              <strong>1870</strong> and was originally known as Schofield&rsquo;s Siding. It was
              named after John Schofield, a local landowner and pioneer. The railway became an
              important link between the rural communities of the area and Sydney. Later, the
              railway line would run along the edge of the military airfield.
            </p>
            <p>
              The biggest change came during the Second World War. In 1941, the Australian
              Government acquired the land for a satellite aerodrome for RAAF Richmond. Construction
              began in June 1942, and RAAF Station Schofields was operating later that year.
              Farmland had been transformed into a military airfield.
            </p>
            <p>
              In 1945, Schofields became part of the story of the{" "}
              <strong>Royal Navy Fleet Air Arm</strong> and the British Pacific Fleet. The Royal
              Navy took the airfield on loan and commissioned it as{" "}
              <strong>HMS Nabthorpe on 18 February 1945</strong>. It was later renamed{" "}
              <strong>HMS Nabstock</strong>. British naval aircraft operated from the airfield,
              including Seafires and Fireflies, while the base supported aircraft and personnel
              arriving from the British Pacific Fleet.
            </p>
            <p>
              After the war, the Royal Navy left and the airfield returned to the RAAF on{" "}
              <strong>9 June 1946</strong>. RAAF Schofields continued to be used by different units
              and aircraft. This is where many of today&rsquo;s street names connect with the
              site&rsquo;s aviation history. Names such as{" "}
              <strong>
                Vampire, Sabre, Kittyhawk, Anson, Avenger, Corsair, Firefly and Swordfish
              </strong>{" "}
              recall aircraft associated with Australia&rsquo;s military aviation story. Other
              street names, including <strong>Steege, Hubble, Dallywater and Rayson</strong>, are
              connected with people who served at Schofields.
            </p>
            <p>
              The site had another surprising life after the war. Between 1949 and 1951, former
              Royal Navy buildings were used as a migrant hostel for around 300 European migrants.
              Part of the unused airfield was even turned into a motor racing circuit during the
              1950s.
            </p>
            <p>
              The Royal Australian Navy then became involved. The site was used for the RAN Aircraft
              Repair Yard and was associated with{" "}
              <strong>HMAS Albatross II and RANARY Schofields</strong>. On{" "}
              <strong>1 April 1953</strong>, it became <strong>HMAS Nirimba</strong>, a RAN Fleet
              Air Arm naval air station.
            </p>
            <p>
              In 1956, the site changed again. HMAS Nirimba became the{" "}
              <strong>RAN Apprentice Training Establishment (RANATE)</strong>. The first apprentices
              arrived in July that year. Over the following decades, about{" "}
              <strong>13,000 young men and women from the RAN and other Commonwealth navies</strong>{" "}
              were trained at Nirimba.
            </p>
            <p>
              HMAS Nirimba was finally decommissioned on <strong>25 February 1994</strong>. The
              former military site then entered another chapter, becoming part of the Nirimba
              Education Precinct and eventually the surrounding residential development.
            </p>
            <p>
              Today, DHA owns and is developing the <strong>136-hectare Nirimba Fields site</strong>{" "}
              as Akuna Vista, a master-planned community of approximately{" "}
              <strong>1,100 residential lots</strong>, including around{" "}
              <strong>200 homes for Defence members and their families</strong>. The development
              also includes parks, recreation facilities, a school and a proposed village centre.
            </p>
            <p>
              So Akuna Vista is not simply a new housing estate. It sits on land that has been{" "}
              <strong>
                farmland, a railway-connected rural district, a wartime RAAF airfield, a Royal Navy
                Fleet Air Arm base, RAAF Schofields, a migrant hostel, a motor racing circuit, HMAS
                Nirimba and a naval training establishment
              </strong>
              .
            </p>
            <p>
              The history is still visible around the neighbourhood.{" "}
              <strong>
                Nabthorpe, Nabstock, Nirimba, Ranary, Ranate, Vampire, Sabre, Kittyhawk, Corsair,
                Anson, Avenger, Firefly, Swordfish and many other names connect today&rsquo;s
                streets with the people, aircraft, ships and organisations that once used this
                remarkable site.
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-muted-foreground/40 size-2 rounded-full" aria-hidden="true" />
            <span className="text-muted-foreground text-xs font-medium tracking-widest uppercase">
              Today
            </span>
          </div>
        </div>
      </Container>

      <Container className="mt-10">
        <div className="border-border h-px w-full border-t border-dashed" aria-hidden="true" />
      </Container>

      <Container className="mt-10">
        <p className="text-foreground max-w-[720px] text-base leading-relaxed">
          Have an old photo or memory of the area to share?{" "}
          <Link href="/contact" className="text-primary underline underline-offset-4">
            Get in touch
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
