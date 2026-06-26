import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'filmProject',
  title: 'Film Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Film Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'director',
      title: 'Director',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      description: 'Recommended size: 1920x1080 (16:9 landscape). This is the large background image shown at the top of the film detail page.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      description: 'Recommended size: 800x1200 (2:3 portrait). This is the vertical movie poster shown on the left side of the film detail page.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'homepagePoster',
      title: 'Homepage Carousel Poster',
      description: 'Recommended size: 1920x1080 (16:9 landscape). The horizontal poster shown in the Filmography carousel on the homepage.',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'premise',
      title: 'Premise',
      type: 'text',
    }),
    defineField({
      name: 'logline',
      title: 'Logline',
      type: 'text',
    }),
    defineField({
      name: 'trailerUrl',
      title: 'Trailer URL',
      description: 'Link to YouTube or Vimeo trailer',
      type: 'url',
    }),
    defineField({
      name: 'hoverGif',
      title: 'Hover Preview (GIF/Image)',
      description: 'An image or GIF to show when hovering over this project in the carousel',
      type: 'image',
    }),
    defineField({
      name: 'synopsis',
      title: 'Synopsis',
      description: 'Full synopsis of the film',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'cast',
      title: 'Cast',
      description: 'Comma separated list of cast members (e.g. Aurora Ribero, Arief Didu)',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'productionYear',
      title: 'Production Year',
      type: 'string',
    }),
    defineField({
      name: 'availableOn',
      title: 'Available On',
      description: 'Where the film is available (e.g. Cinema, Netflix)',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'director',
      media: 'posterImage',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      return {
        title,
        subtitle: subtitle ? `Directed by ${subtitle}` : '',
        media,
      };
    },
  },
});
