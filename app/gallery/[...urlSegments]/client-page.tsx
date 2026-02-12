'use client';
import React from 'react';
import Image from 'next/image';
import { tinaField, useTina } from 'tinacms/dist/react';
import { GalleryQuery } from '@/tina/__generated__/types';
import { Section } from '@/components/layout/section';
import ErrorBoundary from '@/components/error-boundary';

interface ClientGalleryProps {
  data: GalleryQuery;
  variables: {
    relativePath: string;
  };
  query: string;
}

export default function GalleryClientPage(props: ClientGalleryProps) {
  const { data } = useTina({ ...props });
  const gallery = data.gallery;

  return (
    <ErrorBoundary>
      <Section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1
              data-tina-field={tinaField(gallery, 'title')}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              {gallery.title}
            </h1>
            <p
              data-tina-field={tinaField(gallery, 'year')}
              className="text-xl text-gray-600 dark:text-gray-400 mb-4"
            >
              {gallery.year}
            </p>
            {gallery.description && (
              <p
                data-tina-field={tinaField(gallery, 'description')}
                className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
              >
                {gallery.description}
              </p>
            )}
          </div>

          {gallery.photos && gallery.photos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gallery.photos.map((photo, index) => (
                photo?.image && (
                  <div
                    key={index}
                    className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    data-tina-field={tinaField(photo, 'image')}
                  >
                    <div className="aspect-w-16 aspect-h-12 relative h-64">
                      <Image
                        src={photo.image}
                        alt={photo.alt || photo.caption || `Gallery image ${index + 1}`}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    {photo.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p
                          data-tina-field={tinaField(photo, 'caption')}
                          className="text-white text-sm font-medium"
                        >
                          {photo.caption}
                        </p>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          )}

          {(!gallery.photos || gallery.photos.length === 0) && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                No photos available yet. Check back soon!
              </p>
            </div>
          )}
        </div>
      </Section>
    </ErrorBoundary>
  );
}
