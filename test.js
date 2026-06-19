const { createClient } = require('@sanity/client');
const client = createClient({
  projectId: 'w0msay8q',
  dataset: 'production',
  apiVersion: '2024-05-21',
  useCdn: false
});

client.fetch('*[_type == "filmProject" && slug.current == "the-batman"][0]{ title, heroImage, posterImage, homepagePoster }').then(res => {
  console.log(JSON.stringify(res, null, 2));
}).catch(console.error);
