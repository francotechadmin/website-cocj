import React from 'react';
import client from '@/tina/__generated__/client';
import Layout from '@/components/layout/layout';
import GalleryClientPage from './client-page';

export const revalidate = 300;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ urlSegments: string[] }>;
}) {
  const resolvedParams = await params;
  const filepath = resolvedParams.urlSegments.join('/');
  const data = await client.queries.gallery({
    relativePath: `${filepath}.mdx`,
  });

  return (
    <Layout rawPageData={data}>
      <GalleryClientPage {...data} />
    </Layout>
  );
}

export async function generateStaticParams() {
  let galleries = await client.queries.galleryConnection();
  const allGalleries = galleries;

  if (!allGalleries.data.galleryConnection.edges) {
    return [];
  }

  while (galleries.data?.galleryConnection.pageInfo.hasNextPage) {
    galleries = await client.queries.galleryConnection({
      after: galleries.data.galleryConnection.pageInfo.endCursor,
    });

    if (!galleries.data.galleryConnection.edges) {
      break;
    }

    allGalleries.data.galleryConnection.edges.push(...galleries.data.galleryConnection.edges);
  }

  const params =
    allGalleries.data?.galleryConnection.edges.map((edge) => ({
      urlSegments: edge?.node?._sys.breadcrumbs,
    })) || [];

  return params;
}
