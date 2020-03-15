const { fs, path } = require('@vuepress/shared-utils')

module.exports = {
    title: 'VuePress + Ghost',
    description: 'Power your VuePress site with Ghost',
    themeConfig: {
        sidebar: []
    }
}
module.exports = {
    title: 'VuePress + Ghost',
    description: 'Power your VuePress site with Ghost',
    themeConfig: {
        sidebar: getSidebar()
    }
}


function getSidebar() {
    return fs
        .readdirSync(path.resolve(__dirname, '../'))
        // make sure we only include Markdown files
        .filter(filename => filename.indexOf('.md') >= 0)
        .map(filename => {
            // remove the file extension
            filename = filename.slice(0, -3)

            if (filename.indexOf('index') >= 0) {
                // Files called 'index' will be rendered
                // as the root page of the folder
                filename = '/'
            }
            return filename
        })
        .sort()
}
