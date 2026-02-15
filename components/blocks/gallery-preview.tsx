'use client';
import Image from 'next/image';
import Link from 'next/link';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export const GalleryPreview = ({ data }: any) => {
  return (
    <Section background={data.background!}>
      <div className='mx-auto max-w-7xl px-6'>
        <div className='text-center mb-12'>
          {data.title && (
            <h2
              data-tina-field={tinaField(data, 'title')}
              className='text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100'
            >
              {data.title}
            </h2>
          )}
          {data.description && (
            <p
              data-tina-field={tinaField(data, 'description')}
              className='text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'
            >
              {data.description}
            </p>
          )}
        </div>

        {/* Gallery Grid */}
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-10'>
          {data.images &&
            data.images.map((image: any, index: number) => (
              <div
                key={image.src || index}
                data-tina-field={tinaField(image, 'src')}
                className='group relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300'
              >
                <Image
                  src={image.src}
                  alt={image.alt || `Gallery image ${index + 1}`}
                  fill
                  className='object-cover transition-transform duration-300 group-hover:scale-110'
                />
                {/* Overlay on hover */}
                <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
              </div>
            ))}
        </div>

        {/* View All Button */}
        <div className='text-center'>
          <Button asChild size='lg' className='bg-orange-600 hover:bg-orange-700 text-white'>
            <Link href='/gallery'>
              Ver Toda la Galería
              <ArrowRight className='ml-2 h-5 w-5' />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
};

export const galleryPreviewBlockSchema: Template = {
  name: 'galleryPreview',
  label: 'Gallery Preview',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'Gallery',
      description: 'View photos from our past conferences',
      images: [
        { src: '/uploads/gallery/2025-worship.jpg', alt: 'Worship' },
        { src: '/uploads/gallery/2025-cover.jpg', alt: 'Conference' },
        { src: '/uploads/gallery/2025-dancer.jpeg', alt: 'Dance' },
        { src: '/uploads/gallery/2025-dancer2.jpeg', alt: 'Dance 2' },
      ],
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
    },
    {
      type: 'object',
      label: 'Images',
      name: 'images',
      list: true,
      fields: [
        {
          type: 'image',
          label: 'Image',
          name: 'src',
        },
        {
          type: 'string',
          label: 'Alt Text',
          name: 'alt',
        },
      ],
    },
  ],
};
