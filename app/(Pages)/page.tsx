import PatiMotivation from "@/components/Homepage/PatiMotivation";
import PointsOfInterest from "@/components/Homepage/PointsOfInterest";
import AboutMe from "@/components/Homepage/AboutMe";
import Appointments from "@/components/Homepage/Appointments";
import Courses from "@/components/Homepage/Courses";
import InterestingPosts from "@/components/Homepage/InterestingPosts";
import { Article } from "@/lib/types";
import EntranceAnimation from "@/components/EntranceAnimation";
export default async function Home() {
  const siteURL = process.env.NEXTAUTH_URL;
  let articles: Article[] = [];

  try {
    const data = await fetch(
      `${siteURL}/api/articles?take=6&skip=0&category=wyróżnione`,
      { cache: "no-cache" },
    );
    const result = await data.json();
    articles = result.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

  return (
    <EntranceAnimation>
      <main
        style={{ overflow: "hidden", maxWidth: "1900px", margin: "0 auto" }}
      >
        <PatiMotivation />
        <PointsOfInterest />
        <AboutMe />
        <Appointments />
        <Courses />
        <InterestingPosts articles={articles} />
      </main>
    </EntranceAnimation>
  );
}
