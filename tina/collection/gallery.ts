import type { Collection } from 'tinacms';

const Gallery: Collection = {
  label: 'Photo Gallery',
  name: 'gallery',
  path: 'content/gallery',
  format: 'mdx',
  ui: {
    router: ({ document }) => {
      return `/gallery/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: 'string',
      name: 'title',
      label: 'Gallery Title',
      required: true,
    },
    {
      type: 'string',
      name: 'year',
      label: 'Year',
      required: true,
    },
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      ui: {
        component: 'textarea',
      },
    },
    {
      type: 'image',
      name: 'coverImage',
      label: 'Cover Image',
    },
    {
      type: 'object',
      name: 'photos',
      label: 'Photos',
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.caption || 'Photo' };
        },
      },
      fields: [
        {
          type: 'image',
          name: 'image',
          label: 'Image',
          required: true,
        },
        {
          type: 'string',
          name: 'caption',
          label: 'Caption',
        },
        {
          type: 'string',
          name: 'alt',
          label: 'Alt Text',
          description: 'Describe the image for accessibility',
        },
      ],
    },
  ],
};

export default Gallery;
