import { getServerSideSitemap } from 'next-sitemap';
import { URL_BASE } from '../../config';
import { IPost} from '../../types'

async function getPosts() {
  const res = await fetch(`${URL_BASE}/posts?_limit=20`, {
    next: {
      revalidate: 3600
    }
  });
  if (!res.ok) {
    return []
  }
  const posts = await res.json() as unknown as IPost[];
  return posts
}

export async function GET() {

  const posts = await getPosts()

  const fields = posts.map((post) => ({
    loc: `/post/${post.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly' as const,
    priority: 0.9,
  }))

  return getServerSideSitemap(fields)
}
