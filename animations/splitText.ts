/**
 * Lightweight text splitter — splits a string into words and characters
 * without an external dependency, preserving spaces between words.
 */
export interface SplitWord {
  word: string;
  chars: string[];
}

export function splitWords(text: string): SplitWord[] {
  return text.split(" ").map((word) => ({
    word,
    chars: Array.from(word),
  }));
}
