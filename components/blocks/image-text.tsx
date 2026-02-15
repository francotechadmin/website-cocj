'use client';
import Image from 'next/image';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import { PageBlocksImageText } from '../../tina/__generated__/types';
import { Section } from '../layout/section';
import { sectionBlockSchemaField } from '../layout/section';

export const ImageText = ({ data }: { data: PageBlocksImageText }) => {
  const imageOnRight = data.imagePosition === 'right';

  return (
    <Section background={data.background!}>
      <div className="mx-auto max-w-7xl px-6">
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${imageOnRight ? '' : 'md:flex-row-reverse'}`}>
          <div className={`${imageOnRight ? 'md:order-1' : 'md:order-2'}`}>
            {data.featureImage && (
              <div data-tina-field={tinaField(data, 'featureImage')} className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={data.featureImage}
                  alt={data.imageAlt || 'Image'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
          <div className={`${imageOnRight ? 'md:order-2' : 'md:order-1'}`}>
            {data.title && (
              <h2
                data-tina-field={tinaField(data, 'title')}
                className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100"
              >
                {data.title}
              </h2>
            )}
            <div data-tina-field={tinaField(data, 'bodyText')} className="prose dark:prose-dark max-w-none">
              <TinaMarkdown content={data.bodyText} />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export const imageTextBlockSchema: Template = {
  name: 'imageText',
  label: 'Image & Text',
  ui: {
    previewSrc: '/blocks/content.png',
    defaultItem: {
      title: 'Section Title',
      text: 'Your content goes here...',
      imagePosition: 'right',
    },
  },
  fields: [
    sectionBlockSchemaField,
    {
      type: 'string',
      label: 'Title',
      name: 'title',
    },
    {
      type: 'rich-text',
      label: 'Body Text', 
      name: 'bodyText', 
    },
    {
      type: 'image',
      label: 'Feature Image',
      name: 'featureImage',   
    },
    {
      type: 'string',
      label: 'Image Alt Text',
      name: 'imageAlt',
    },
    {
      type: 'string',
      label: 'Image Position',
      name: 'imagePosition',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
    },
  ],
};
