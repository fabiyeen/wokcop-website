import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'newsList',
      title: 'News Articles',
      description: 'Add and rearrange news articles to display on the News page.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'company',
              title: 'News Company',
              description: 'e.g., LIBERTYMAGZ.COM',
              type: 'string',
            }),
            defineField({
              name: 'title',
              title: 'News Title',
              description: 'e.g., AURORA RIBERO BINTANGI FILM DRAMA...',
              type: 'string',
            }),
            defineField({
              name: 'date',
              title: 'Date',
              description: 'e.g., 09/01/26',
              type: 'string',
            }),
            defineField({
              name: 'link',
              title: 'Hyperlink',
              description: 'URL to the external news article',
              type: 'url',
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'company',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'News Page' };
    },
  },
});
