'use client';
import { iconSchema } from '@/tina/fields/icon';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksHero, PageBlocksHeroImage } from '../../tina/__generated__/types';
import { Icon } from '../icon';
import { sectionBlockSchemaField } from '../layout/section';
import { Button } from '../ui/button';
import HeroVideoDialog from '../ui/hero-video-dialog';

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Full-screen background image */}
      {data.image && (
        <div className='absolute inset-0 -z-10' data-tina-field={tinaField(data, 'image')}>
          <ImageBlock image={data.image} />
          {/* Dark overlay for text readability */}
          <div className='absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60' />
        </div>
      )}

      {/* Content overlay */}
      <div className='relative z-10 mx-auto max-w-7xl px-6 py-20 text-center'>
        {data.headline && (
          <div data-tina-field={tinaField(data, 'headline')}>
            <h1 className='text-balance text-5xl md:text-7xl xl:text-8xl font-extrabold leading-tight text-white drop-shadow-2xl whitespace-pre-line mb-6'>
              {data.headline!}
            </h1>
          </div>
        )}
        {data.tagline && (
          <div data-tina-field={tinaField(data, 'tagline')}>
            <p className='mt-6 max-w-3xl mx-auto text-balance text-2xl md:text-3xl font-semibold text-orange-200 drop-shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300'>
              {data.tagline!}
            </p>
          </div>
        )}

        <div className='mt-12 flex flex-col items-center justify-center gap-4 md:flex-row animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500'>
          {data.actions &&
            data.actions.map((action) => (
              <div key={action!.label} data-tina-field={tinaField(action)} className='bg-white/10 backdrop-blur-sm rounded-[calc(var(--radius-xl)+0.125rem)] border border-white/20 p-0.5 hover:scale-105 hover:bg-white/20 transition-transform duration-200'>
                <Button asChild size='lg' variant={action!.type === 'link' ? 'ghost' : 'default'} className='rounded-xl px-8 py-6 text-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white'>
                  <Link href={action!.link!}>
                    {action?.icon && <Icon data={action?.icon} />}
                    <span className='text-nowrap'>{action!.label}</span>
                  </Link>
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const ImageBlock = ({ image }: { image: PageBlocksHeroImage }) => {
  if (image.videoUrl) {
    let videoId = '';
    if (image.videoUrl) {
      const embedPrefix = '/embed/';
      const idx = image.videoUrl.indexOf(embedPrefix);
      if (idx !== -1) {
        videoId = image.videoUrl.substring(idx + embedPrefix.length).split('?')[0];
      }
    }
    const thumbnailSrc = image.src ? image.src! : videoId ? `https://i3.ytimg.com/vi/${videoId}/maxresdefault.jpg` : '';

    return <HeroVideoDialog videoSrc={image.videoUrl} thumbnailSrc={thumbnailSrc} thumbnailAlt='Hero Video' />;
  }

  if (image.src) {
    return (
      <Image
        className='w-full h-full object-cover'
        alt={image!.alt || ''}
        src={image!.src!}
        fill
        priority
      />
    );
  }
};

export const heroBlockSchema: Template = {
  name: 'hero',
  label: 'Hero',
  ui: {
    previewSrc: '/blocks/hero.png',
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: 'This Big Text is Totally Awesome',
      text: 'Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.',
    },
  },
  fields: [
    sectionBlockSchemaField as any,
    {
      type: 'string',
      label: 'Headline',
      name: 'headline',
    },
    {
      type: 'string',
      label: 'Tagline',
      name: 'tagline',
    },
    {
      label: 'Actions',
      name: 'actions',
      type: 'object',
      list: true,
      ui: {
        defaultItem: {
          label: 'Action Label',
          type: 'button',
          icon: {
              name: "Tina",
              color: "white",
              style: "float",
          },
          link: '/',
        },
        itemProps: (item) => ({ label: item.label }),
      },
      fields: [
        {
          label: 'Label',
          name: 'label',
          type: 'string',
        },
        {
          label: 'Type',
          name: 'type',
          type: 'string',
          options: [
            { label: 'Button', value: 'button' },
            { label: 'Link', value: 'link' },
          ],
        },
        iconSchema as any,
        {
          label: 'Link',
          name: 'link',
          type: 'string',
        },
      ],
    },
    {
      type: 'object',
      label: 'Image',
      name: 'image',
      fields: [
        {
          name: 'src',
          label: 'Image Source',
          type: 'image',
        },
        {
          name: 'alt',
          label: 'Alt Text',
          type: 'string',
        },
        {
          name: 'videoUrl',
          label: 'Video URL',
          type: 'string',
          description: 'If using a YouTube video, make sure to use the embed version of the video URL',
        },
      ],
    },
  ],
};
