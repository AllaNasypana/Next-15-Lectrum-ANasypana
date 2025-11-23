/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://next-15-lectrum-a-nasypana.vercel.app',
  generateRobotsTxt: true,
  exclude: ['/admin/*'],
  sitemapSize: 7000,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: ['/images/'],
      },

    ],
    additionalSitemaps: [
      'https://next-15-lectrum-a-nasypana.vercel.app/sitemap.xml',
      'https://next-15-lectrum-a-nasypana.vercel.app/server-sitemap.xml',
    ],
  },

  alternateRefs: [

    {
      href: 'https://next-15-lectrum-a-nasypana.vercel.app/ua',
      hreflang: 'uk',
    },
  ],

  transform: async (config, path) => {
    let priority = 0.5;

    if (path === '/') priority = 1.0;
    else if (path.startsWith('/post')) priority = 0.9;
    else if (path.startsWith('/ua')) priority = 0.6;

    return {
      loc: path,
      changefreq: 'weekly',
      priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
