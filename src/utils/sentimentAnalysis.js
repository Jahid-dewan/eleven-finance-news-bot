import natural from 'natural';
const tokenizer = new natural.WordTokenizer();
const analyzer = new natural.SentimentAnalyzer('English', natural.PorterStemmer, 'afinn');

export async function analyzeSentiment(text) {
  const tokens = tokenizer.tokenize(text);
  const score = analyzer.getSentiment(tokens);
  
  return {
    score,
    label: score > 0 ? 'positive' : score < 0 ? 'negative' : 'neutral'
  };
}