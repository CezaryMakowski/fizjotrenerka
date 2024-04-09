import PatiMotivation from "@/components/Homepage/PatiMotivation";
import PointsOfInterest from "@/components/Homepage/PointsOfInterest";
import AboutMe from "@/components/Homepage/AboutMe";
import Appointments from "@/components/Homepage/Appointments";
import Courses from "@/components/Homepage/Courses";
import InterestingPosts from "@/components/Homepage/InterestingPosts";

export default function Home() {
  return (
    <main style={{ overflow: "hidden" }}>
      <PatiMotivation />
      <PointsOfInterest />
      <AboutMe />
      <Appointments />
      <Courses />
      <InterestingPosts />
    </main>
  );
}
