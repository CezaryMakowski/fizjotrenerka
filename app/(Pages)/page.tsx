import PatiMotivation from "@/components/Homepage/PatiMotivation";
import PointsOfInterest from "@/components/Homepage/PointsOfInterest";
import AboutMe from "@/components/Homepage/AboutMe";
import Appointments from "@/components/Homepage/Appointments";
import Courses from "@/components/Homepage/Courses";
import InterestingPosts from "@/components/Homepage/InterestingPosts";
import { Article } from "@/lib/types";
export default async function Home() {
  const siteURL = process.env.NEXTAUTH_URL;
  // const data = await fetch(
  //   `${siteURL}/api/articles?take=6&skip=0&category=wyróżnione`,
  //   { cache: "no-cache" }
  // );
  // const { articles }: { articles: Article[] } = await data.json();
  let articles: Article[] = [];

  try {
    const data = await fetch(
      `${siteURL}/api/articles?take=6&skip=0&category=wyróżnione`,
      { cache: "no-cache" }
    );

    if (!data.ok) {
      throw new Error(`Failed to fetch articles: ${data.statusText}`);
    }

    const result = await data.json();
    articles = result.articles;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }

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
