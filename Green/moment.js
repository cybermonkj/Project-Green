const moment = require('moment');

...

    // Save the final string of our file as a Markdown file
    await fs.writeFile(path.join(destinationPath, `${moment(post.published_at).format('YYYY-MM-DD')}-${post.slug}.md`), fileString);

...
