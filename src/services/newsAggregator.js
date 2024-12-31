import axios from 'axios';
import { NEWS_SOURCES } from '../config/constants.js';
import { analyzeSentiment } from '../utils/sentimentAnalysis.js';

export async function aggregateNews() {
  const allNews = [];
  
  for (const source of NEWS_SOURCES) {
    try {
      const response = await axios.get(source.url);
      const newsItems = response.data.articles || response.data.news || [];
      
      const processedNews = await Promise.all(
        newsItems.map(async (item) => {
          const sentiment = await analyzeSentiment(item.title + ' ' + item.description);
          
          return {
            title: item.title,
            description: item.description,
            url: item.url,
            source: source.name,
            sentiment,
            priority: source.priority,
            timestamp: new Date(item.publishedAt || item.published_at).getTime()
          };
        })
      );
      
      allNews.push(...processedNews);
    } catch (error) {
      console.error(`Error fetching news from ${source.name}:`, error);
    }
  }
  
  return allNews
    .filter(news => news.sentiment.score >= 0) // Filter out negative news
    .sort((a, b) => b.timestamp - a.timestamp);
}