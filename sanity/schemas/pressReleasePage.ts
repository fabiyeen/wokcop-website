import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'pressReleasePage',
  title: 'Press Release Page',
  type: 'document',
  // Singleton — only one document of this type should exist
  fields: [
    defineField({
      name: 'releases',
      title: 'Press Releases',
      description: 'Add and rearrange press releases to display on the Press Release page.',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'categoryTitle',
              title: 'Category / Main Title',
              description: 'e.g., MAJU: JEJAK PAHIT SI KEMBANG GULA',
              type: 'string',
            }),
            defineField({
              name: 'date',
              title: 'Date',
              description: 'e.g., 16 APRIL 2025',
              type: 'string',
            }),
            defineField({
              name: 'releaseTitle',
              title: 'Release Title',
              description: 'e.g., MAJU: JEJAK PAHIT SI KEMBANG GULA SIAP SYUTING!',
              type: 'string',
            }),
            defineField({
              name: 'pdfFile',
              title: 'PDF File',
              description: 'Upload the PDF file for this press release',
              type: 'file',
              options: {
                accept: '.pdf',
              },
            }),
          ],
          preview: {
            select: {
              title: 'releaseTitle',
              subtitle: 'categoryTitle',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Press Release Page' };
    },
  },
});
