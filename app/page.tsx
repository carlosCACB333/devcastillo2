import { HeroSection } from './_slots/home-hero-section';
import { HomeHighlights } from './_slots/home-highlights';
import { HomeExperience } from './_slots/home-experience';
import { HomeSkills } from './_slots/home-skills';
import { HomeEducation } from './_slots/home-education';
import { HomeContact } from './_slots/home-contact';

export default async function Home() {
  return (
    <main>
      <section className='mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pt-10 pb-16 sm:px-6 lg:px-8 lg:pt-16 lg:pb-24'>
        <HeroSection />
        <HomeHighlights />
        <HomeExperience />
        <HomeSkills />
        <HomeEducation />
        <HomeContact />
      </section>
    </main>
  );
}
