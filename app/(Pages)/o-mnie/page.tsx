import ImPati from "@/components/about-me/ImPati";
import MyPrep from "@/components/about-me/MyPrep";
import Achievements from "@/components/about-me/Achievements";
import EntranceAnimation from "@/components/EntranceAnimation";

export default function AboutMe() {
  return (
    <EntranceAnimation>
      <main
        style={{ overflow: "hidden", maxWidth: "1900px", margin: "0 auto" }}
      >
        <ImPati />
        <MyPrep />
        <Achievements />
      </main>
    </EntranceAnimation>
  );
}
