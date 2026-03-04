import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://www.owaspvitb.in'
    const now = new Date()
    return [
        { url: baseUrl, lastModified: now, priority: 1.0, changeFrequency: 'weekly' },
        { url: `${baseUrl}/about`, lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
        { url: `${baseUrl}/members`, lastModified: now, priority: 0.7, changeFrequency: 'monthly' },
        { url: `${baseUrl}/events`, lastModified: now, priority: 0.8, changeFrequency: 'weekly' },
        { url: `${baseUrl}/sponsor`, lastModified: now, priority: 0.6, changeFrequency: 'monthly' },
        { url: `${baseUrl}/blog`, lastModified: now, priority: 0.9, changeFrequency: 'weekly' },
        { url: `${baseUrl}/contact`, lastModified: now, priority: 0.5, changeFrequency: 'yearly' },
    ]
}
