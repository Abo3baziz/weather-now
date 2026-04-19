"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Nav from "@/components/Nav/Nav";
import Header from "@/components/Header/Header";

import MainContainer from "@/components/MainContainer/MainContainer";

import Search from "@/components/Search/Search";
import ForecastContainer from "@/components/ForecastContainer/ForecastContainer";

import styles from "./page.module.css";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <MainContainer>
      <Nav />

      <Header text="How's the sky looking today?" />

      <Search />

      <QueryClientProvider client={queryClient}>
        <ForecastContainer />
      </QueryClientProvider>
    </MainContainer>
  );
}
