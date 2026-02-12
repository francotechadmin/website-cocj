import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import { Section } from '@/components/layout/section';
import ClientPage from './client-page';

export const revalidate = 300;

const PAGE_METADATA: Record<string, { title: string; description: string }> = {
  'about': {
    title: 'Acerca de la Conferencia',
    description: 'Conoce la historia, misión y visión de Conectando a Otros Con Jesus. Desde 2013, creando espacios para conectar a otros con Jesús a través de adoración, enseñanza y renovación espiritual.'
  },
  'gallery': {
    title: 'Galería de Fotos',
    description: 'Explora los momentos memorables de nuestras conferencias anteriores. Revive la adoración, compañerismo y bendiciones de años pasados.'
  },
  'faq': {
    title: 'Preguntas Frecuentes',
    description: 'Encuentra respuestas a las preguntas más comunes sobre la conferencia Conectando a Otros Con Jesus 2026, incluyendo detalles de registro, ubicación y actividades.'
  },
  'contact': {
    title: 'Contacto',
    description: 'Ponte en contacto con nosotros para más información sobre Conectando a Otros Con Jesus 2026. Estamos aquí para ayudarte con cualquier pregunta.'
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const pageName = resolvedParams.urlSegments[0] || 'home';

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    return {
      title: 'Página no encontrada',
    };
  }

  const metadata = PAGE_METADATA[pageName] || {
    title: pageName.charAt(0).toUpperCase() + pageName.slice(1),
    description: 'Conectando a Otros Con Jesus 2026 - Conectando a Otros con Jesús'
  };

  return {
    title: metadata.title,
    description: metadata.description,
    openGraph: {
      title: `${metadata.title} | Conectando a Otros Con Jesus 2026`,
      description: metadata.description,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');

  let data;
  try {
    data = await client.queries.page({
      relativePath: `${filepath}.mdx`,
    });
  } catch (error) {
    notFound();
  }

  return (
    <Layout rawPageData={data}>
      <Section>
        <ClientPage {...data} />
      </Section>
    </Layout>
  );
}

export async function generateStaticParams() {
  let pages = await client.queries.pageConnection();
  const allPages = pages;

  if (!allPages.data.pageConnection.edges) {
    return [];
  }

  while (pages.data.pageConnection.pageInfo.hasNextPage) {
    pages = await client.queries.pageConnection({
      after: pages.data.pageConnection.pageInfo.endCursor,
    });

    if (!pages.data.pageConnection.edges) {
      break;
    }

    allPages.data.pageConnection.edges.push(...pages.data.pageConnection.edges);
  }

  const params = allPages.data?.pageConnection.edges
    .map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs || [],
    }))
    .filter((x) => x.urlSegments.length >= 1)
    .filter((x) => !x.urlSegments.every((x) => x === 'home')); // exclude the home page

  return params;
}