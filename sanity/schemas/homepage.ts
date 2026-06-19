import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'heroBgImage1',
      title: 'Hero Background Image 1',
      description: 'Primary full-bleed background image shown in the hero section.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heroBgImage2',
      title: 'Hero Background Image 2',
      description:
        'Secondary image layered behind the hero text with multiply blend for a cinematic "blue greyscale" mood.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'aboutPicturesGallery',
      title: 'About Pictures Gallery',
      description: 'Add exactly 7 images for the WOKCOP PICTURES sliding gallery section.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(7).warning('Optimal design requires 7 images.'),
    }),
    defineField({
      name: 'aboutPicturesDescription',
      title: 'About Pictures Description',
      description: 'The text that appears below the WOKCOP PICTURES title.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'aboutStudioGallery',
      title: 'About Studio Gallery',
      description: 'Add exactly 8 images for the WOKCOP STUDIO gallery section.',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      validation: (Rule) => Rule.max(8).warning('Optimal design requires 8 images (2 rows of 4).'),
    }),
    defineField({
      name: 'aboutStudioDescription',
      title: 'About Studio Description',
      description: 'The text that appears below the WOKCOP STUDIO title.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'filmProjects',
      title: 'Filmography Projects',
      description: 'Add film projects by referencing them from the Film Projects collection.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'filmProject' }],
        },
      ],
    }),
    defineField({
      name: 'commercial',
      title: 'Commercial Projects',
      description: 'Add projects for the Showreel/Commercial section.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
            defineField({ name: 'videoUrl', title: 'Video URL (YouTube)', type: 'url' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage' };
    },
  },
});
