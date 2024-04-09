import ImPati from "@/components/about-me/ImPati";
import MyPrep from "@/components/about-me/MyPrep";
import Achievements from "@/components/about-me/Achievements";

export default function AboutMe() {
  return (
    <main style={{ overflow: "hidden" }}>
      <ImPati />
      <MyPrep />
      <Achievements />
    </main>
  );
}
