const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);

  // Add blog collection
  eleventyConfig.addCollection("blog", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md");
  });

  // Add portfolio collection
  eleventyConfig.addCollection("portfolio", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/portfolio/*.md");
  });

  // Add excerpt filter
  eleventyConfig.addFilter("excerpt", function(content) {
    if (!content) return '';
    const excerptLength = 200;
    let excerpt = content.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
    excerpt = excerpt.substring(0, excerptLength);
    if (excerpt.length === excerptLength) {
      excerpt += '...';
    }
    return excerpt;
  });

  // Add date filter
  eleventyConfig.addFilter("date", function(date, format) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
  };
};