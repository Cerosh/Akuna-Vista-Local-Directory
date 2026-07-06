import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/common/Container";
import { Section } from "@/components/common/Section";
import { BusinessHero } from "@/features/business-details/BusinessHero";
import { ContactInfo } from "@/features/business-details/ContactInfo";
import { OpeningHours } from "@/features/business-details/OpeningHours";
import { ServiceAreas } from "@/features/business-details/ServiceAreas";
import { Gallery } from "@/features/business-details/Gallery";
import { SocialLinks } from "@/features/business-details/SocialLinks";
import { businessRepository } from "@/lib/repositories/businessRepository";
import { categoryRepository } from "@/lib/repositories/categoryRepository";
import { generateLocalBusinessJsonLd } from "@/lib/services/structuredData";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

interface BusinessPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BusinessPageProps): Promise<Metadata> {
  const { slug } = await params;
  const business = await businessRepository.getBySlug(slug);

  if (!business) {
    notFound();
  }

  const description = business.shortDescription ?? business.description;
  const url = `${SITE_URL}/business/${business.slug}`;

  return {
    title: `${business.name} | Akuna Vista Local Directory`,
    description,
    alternates: { canonical: url },
    // A page-level `openGraph` replaces the root layout's entirely rather
    // than merging with it, so siteName/type/locale are repeated here.
    openGraph: {
      siteName: "Akuna Vista Local Directory",
      type: "website",
      locale: "en_AU",
      title: business.name,
      description,
      url,
      images: business.images?.[0] ? [{ url: `${SITE_URL}${business.images[0]}` }] : undefined,
    },
  };
}

export default async function BusinessPage({ params }: BusinessPageProps) {
  const { slug } = await params;
  const business = await businessRepository.getBySlug(slug);

  if (!business) {
    notFound();
  }

  const category = await categoryRepository.getBySlug(business.categoryId);
  const jsonLd = generateLocalBusinessJsonLd(business, SITE_URL);

  return (
    <Section>
      <Container>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          <div className="flex flex-1 flex-col gap-8">
            <BusinessHero business={business} categoryName={category?.name} />
            <Gallery business={business} />
            <ServiceAreas business={business} />
          </div>
          <div className="flex w-full flex-col gap-8 lg:w-80 lg:shrink-0">
            <ContactInfo business={business} />
            <OpeningHours business={business} />
            <SocialLinks business={business} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
