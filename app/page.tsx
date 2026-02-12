import React from "react";
import { Metadata } from "next";
import client from "@/tina/__generated__/client";
import Layout from "@/components/layout/layout";
import ClientPage from "./[...urlSegments]/client-page";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Inicio";
  const description = "Únete a nosotros del 11-13 de Septiembre 2026 para Conectando a Otros Con Jesus, un fin de semana transformador de adoración, enseñanza bíblica y renovación espiritual para toda la familia.";

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Conectando a Otros Con Jesus 2026`,
      description,
    },
  };
}

export default async function Home() {
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <ClientPage {...data} />
    </Layout>
  );
}
