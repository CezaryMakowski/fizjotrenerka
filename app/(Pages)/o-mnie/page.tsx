import ImPati from "@/components/about-me/ImPati";
import MyPrep from "@/components/about-me/MyPrep";
import Achievements from "@/components/about-me/Achievements";

export default function AboutMe() {
  return (
    <main style={{ overflow: "hidden", maxWidth: "1900px", margin: "0 auto" }}>
      <ImPati />
      <MyPrep />
      <Achievements />
    </main>
  );
}
