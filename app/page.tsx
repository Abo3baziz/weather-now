import Nav from "@/components/Nav/Nav";
import Header from "@/components/Header/Header";
import MainWrapper from "@/components/MainWrapper/MainWrapper";

export default function Home() {
  return (
    <MainWrapper>
      <Nav />

      <Header text="How's the sky looking today?" />
    </MainWrapper>
  );
}
