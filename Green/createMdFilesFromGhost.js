const GhostContentAPI = require('@tryghost/content-api');
const yaml = require('js-yaml');
const fs = require('fs-extra');
const path = require('path');
const moment = require('moment');

const api = new GhostContentAPI({
    url: 'http://localhost:2368', // replace with your Ghost API URL
    key: '5e6d9116821ba5c3edcfacda:afad470a0edd7a8297fc331a1cd2bfbdb7f3b96190b775d13af783a5909f5574', // replace with your API key
    version: "v3"
});

const createMdFilesFromGhost = async () => {

    console.time('All posts converted to Markdown in');

    try {
        // fetch the posts from the Ghost Content API
        const posts = await api.posts.browse({include: 'tags,authors'});

        await Promise.all(posts.map(async (post) => {
            // Save the content separate and delete it from our post object, as we'll create
            // the frontmatter properties for every property that is left
            const content = post.html;
            delete post.html;

            const frontmatter = post;

            // Create frontmatter properties from all keys in our post object
            const yamlPost = await yaml.dump(frontmatter);

            // Super simple concatenating of the frontmatter and our content
            const fileString = `---\n${yamlPost}\n---\n${content}\n`;

            // Save the final string of our file as a Markdown file
            await fs.writeFile(path.join('', `${post.slug}.md`), fileString);
        }));

    console.timeEnd('All posts converted to Markdown in');

    } catch (error) {
        console.error(error);
    }
};

module.exports = createMdFilesFromGhost();

   await fs.writeFile(path.join(destinationPath, `${moment(post.published_at).format('YYYY-MM-DD')}-${post.slug}.md`), fileString);
   
   
    await Promise.all(posts.map(async (post) => {
        const turndownService = new TurndownService({codeBlockStyle: 'fenced', headingStyle: 'atx', hr: '---'});

        const content = turndownService.turndown(post.html);


turndownService.addRule('inlineCode', {
    filter: ['code'],
    replacement: function (content) {
        if (content.indexOf(`{{`) >= 0) {
            // Escape mustache expressions properly
            return '\n' + '::: v-pre' + '\n`' + content + '`\n' + '::::' + '\n'
        }
        return '`' + content + '`'
    }
});


