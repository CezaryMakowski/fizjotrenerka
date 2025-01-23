import PatiMotivation from "@/components/Homepage/PatiMotivation";
import PointsOfInterest from "@/components/Homepage/PointsOfInterest";
import AboutMe from "@/components/Homepage/AboutMe";
import Appointments from "@/components/Homepage/Appointments";
import Courses from "@/components/Homepage/Courses";
import InterestingPosts from "@/components/Homepage/InterestingPosts";
import { Article } from "@/lib/types";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const siteURL = process.env.NEXTAUTH_URL;
  const data = await fetch(
    `${siteURL}/api/articles?take=6&skip=0&category=wyróżnione`,
    { cache: "no-cache" }
  );
  const { articles }: { articles: Article[] } = await data.json();

  return (
    <main style={{ overflow: "hidden" }}>
      <PatiMotivation />
      <PointsOfInterest />
      <AboutMe />
      <Appointments />
      <Courses />
      <InterestingPosts articles={articles} />
    </main>
  );
}
