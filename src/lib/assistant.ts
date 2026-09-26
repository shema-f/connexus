import { knowledgeBase, fallbackAnswer, type KnowledgeEntry } from "./assistant-kb";

/** Lowercase, strip punctuation, split into tokens. */
function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

const STOPWORDS = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "to", "of", "and", "or", "in", "on",
  "for", "with", "at", "by", "from", "it", "its", "this", "that", "these", "those", "i", "you",
  "we", "they", "he", "she", "do", "does", "did", "can", "could", "will", "would", "should",
  "how", "what", "when", "where", "who", "why", "my", "your", "our", "me", "us", "about",
]);

/**
 * Score every KB entry against the question.
 * Phrase hits (multi-word keywords) weigh far more than single tokens.
 */
export function retrieve(question: string): { entry: KnowledgeEntry | null; score: number } {
  const tokens = tokenize(question).filter((t) => !STOPWORDS.has(t));
  const q = ` ${question.toLowerCase()} `;
  let best: KnowledgeEntry | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (kw.includes(" ")) {
        // Multi-word phrase match — strong signal.
        if (q.includes(kw)) score += 5;
      } else {
        // Word-level match (respect word boundaries for short tokens).
        if (tokens.includes(kw)) score += kw.length >= 4 ? 2 : 1;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  // Require a minimum confidence; otherwise admit we don't know.
  if (bestScore < 2) return { entry: null, score: bestScore };
  return { entry: best, score: bestScore };
}

export function answerFromKb(question: string): { answer: string; related: string[] } {
  const { entry } = retrieve(question);
  if (!entry) return { answer: fallbackAnswer, related: [] };
  return { answer: entry.answer, related: entry.related ?? [] };
}
