import {
  ForecastContainer,
  Header,
  MainContainer,
  Nav,
  QueryProvider,
  Search,
} from "@/components";

export default function Home() {
  return (
    <MainContainer>
      <Nav />

      <Header text="How's the sky looking today?" />

      <Search />

      <QueryProvider>
        <ForecastContainer />
      </QueryProvider>
    </MainContainer>
  );
}
