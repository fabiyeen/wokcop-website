import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import homepage from './schemas/homepage';
import newsPage from './schemas/newsPage';
import pressReleasePage from './schemas/pressReleasePage';
import filmProject from './schemas/filmProject';
import { projectId, dataset } from './env';

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'WOKCOP Studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // Singleton: Homepage
            S.listItem()
              .title('Homepage')
              .id('homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage'),
              ),
            // Singleton: News Page
            S.listItem()
              .title('News Page')
              .id('newsPage')
              .child(
                S.document()
                  .schemaType('newsPage')
                  .documentId('newsPage'),
              ),
            // Singleton: Press Release Page
            S.listItem()
              .title('Press Release Page')
              .id('pressReleasePage')
              .child(
                S.document()
                  .schemaType('pressReleasePage')
                  .documentId('pressReleasePage'),
              ),
            // Document Type: Film Project
            S.documentTypeListItem('filmProject').title('Film Projects'),
          ]),
    }),
  ],
  schema: {
    types: [homepage, newsPage, pressReleasePage, filmProject],
  },
});
