import { SpotifyPlayer } from "../../../../components/Global/SpotifyPlayer.ts";
import { PickDisplayText, PickPartOfWord } from "./PickDisplayText.ts";
import { StripZeroWidth } from "./StripZeroWidth.ts";

export interface TitleMatchRange {
  start: number;
  end: number;
}

export interface SyllableTitleMatch {
  full: boolean;
  ranges?: TitleMatchRange[];
}

const HAS_LETTER_OR_NUM = /[\p{L}\p{N}]/u;
const ALL_LETTERS_OR_NUMS = /[\p{L}\p{N}]/gu;
const UNSPACED_SCRIPT =
  /[\p{scx=Han}\p{scx=Hiragana}\p{scx=Katakana}\p{scx=Thai}\p{scx=Lao}\p{scx=Khmer}\p{scx=Myanmar}]/u;

const PAREN_METADATA_SUFFIX =
  /\s*[([](?:(?:feat\.?|ft\.?|featuring|with)\s+[^)\]]+|remaster(?:ed)?(?:\s+\d{2,4})?|\d{4}\s+remaster(?:ed)?|live(?:\s+[^)\]]*)?|acoustic(?:\s+[^)\]]*)?|radio\s+(?:edit|mix|version)|single\s+version|album\s+version|extended(?:\s+[^)\]]*)?|deluxe(?:\s+[^)\]]*)?|anniversary(?:\s+[^)\]]*)?|\d+(?:st|nd|rd|th)\s+anniversary(?:\s+[^)\]]*)?|bonus\s+track|explicit|clean|instrumental|sped\s+up|slowed(?:\s*\+\s*reverb)?|remix(?:\s+[^)\]]*)?|demo(?:\s+[^)\]]*)?|mono|stereo|from\s+["“].*?["”]|original\s+.*?soundtrack|taylor's\s+version)[)\]]\s*$/iu;

const DASH_METADATA_SUFFIX =
  /\s+[-–—]\s+(?:remaster(?:ed)?(?:\s+\d{2,4})?|\d{4}\s+remaster(?:ed)?|live(?:\s+.*)?|acoustic(?:\s+.*)?|radio\s+(?:edit|mix|version)|single\s+version|album\s+version|remix(?:\s+.*)?|instrumental|sped\s+up|slowed(?:\s+.*)?|from\s+["“].*|mono|stereo|demo(?:\s+.*)?|deluxe(?:\s+.*)?|bonus\s+track|feat\.?\s+.*|ft\.?\s+.*|with\s+.*|.*\s+(?:version|edition|remaster(?:ed)?))\s*$/iu;

const STRUCTURAL_SEGMENT =
  /^(?:scene|act|part|pt\.?|chapter|ch\.?|track|disc|vol(?:ume)?|movement|mov\.?|intro|outro|interlude|prelude|epilogue|overture|skit|finale|reprise)(?:\s+(?:[ivxlcdm]+|\d+|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|uno|due|tre|quattro|cinque|sei|sette|otto|nove|dieci))?$/iu;

const METADATA_ONLY_SEGMENT =
  /^(?:live|acoustic|remix|instrumental|remaster(?:ed)?|demo|edit|version|mono|stereo|explicit|clean|deluxe|bonus\s+track|sped\s+up|slowed(?:\s*\+\s*reverb)?)$/iu;

const EDGE_PUNCTUATION = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu;
const COMBINING_MARKS = /\p{Mn}+/gu;

const DIACRITIC_GROUPS: Record<string, string> = {
  a: "[aàáâãäåāăą]",
  c: "[cçćĉċč]",
  d: "[dďđ]",
  e: "[eèéêëēĕėęě]",
  g: "[gĝğġģ]",
  i: "[iìíîïĩīĭįı]",
  l: "[lĺļľŀł]",
  n: "[nñńņň]",
  o: "[oòóôõöøōŏő]",
  r: "[rŕŗř]",
  s: "[sśŝşš]",
  t: "[tţťŧ]",
  u: "[uùúûüũūŭůűų]",
  y: "[yýÿŷ]",
  z: "[zźżž]",
};

function countAlnum(text: string): number {
  return text.match(ALL_LETTERS_OR_NUMS)?.length ?? 0;
}

function escapeRegex(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function foldDiacritics(ch: string): string {
  return ch.normalize("NFD").replace(COMBINING_MARKS, "").toLowerCase();
}

function charToPattern(ch: string): string {
  if (ch === "'" || ch === "’" || ch === "‘") return "['’‘]?";
  if (ch === "-" || ch === "‐" || ch === "‑" || ch === "–" || ch === "—") return "[-‐‑–—\\s]?";
  if (ch === ".") return "\\.?";
  const base = foldDiacritics(ch);
  const group = DIACRITIC_GROUPS[base];
  if (group) return `${group}\\p{Mn}*`;
  return `${escapeRegex(base)}\\p{Mn}*`;
}

function wordTokenToPattern(token: string, allowInflection: boolean): string {
  if (token === "&") return "(?:&|and)";

  const pureAlpha = /^[a-zA-Z\u00C0-\u024F]+$/u.test(token);
  const baseLower = foldDiacritics(token);

  if (allowInflection && pureAlpha && baseLower.length >= 4) {
    if (baseLower.length >= 5 && baseLower.endsWith("ies")) {
      const stem = [...token].slice(0, -3).map(charToPattern).join("");
      return `${stem}(?:ies|y)`;
    }
    if (
      baseLower.endsWith("s") &&
      !/(?:ss|us|is|os)$/u.test(baseLower)
    ) {
      const stripEs = /(?:ches|shes|xes|zes)$/u.test(baseLower);
      const stemLen = stripEs ? token.length - 2 : token.length - 1;
      const stem = [...token].slice(0, stemLen).map(charToPattern).join("");
      return stripEs ? `${stem}(?:e?s|['’‘]?s)?` : `${stem}(?:['’‘]?s)?`;
    }
    const body = [...token].map(charToPattern).join("");
    const needsEs = /(?:s|x|z|ch|sh)$/u.test(baseLower);
    return needsEs ? `${body}(?:es|['’‘]?s)?` : `${body}(?:['’‘]?s)?`;
  }

  return [...token].map(charToPattern).join("");
}

function isDistinctiveSegment(segment: string): boolean {
  const cleaned = segment.replace(EDGE_PUNCTUATION, "").trim();
  if (!cleaned) return false;
  if (STRUCTURAL_SEGMENT.test(cleaned) || METADATA_ONLY_SEGMENT.test(cleaned)) return false;
  const words = cleaned.split(/\s+/).filter((w) => HAS_LETTER_OR_NUM.test(w));
  const alnum = countAlnum(cleaned);
  return (words.length >= 2 && alnum >= 4) || alnum >= 5;
}

function candidateToRegexFragment(candidate: string): string {
  if (UNSPACED_SCRIPT.test(candidate)) {
    let body = "";
    let i = 0;
    while (i < candidate.length) {
      const ch = candidate[i];
      if (/\s/.test(ch)) {
        while (i < candidate.length && /\s/.test(candidate[i])) i++;
        body += "\\s*";
        continue;
      }
      body += charToPattern(ch);
      i++;
    }
    const first = candidate[0];
    const last = candidate[candidate.length - 1];
    const prefix =
      first && HAS_LETTER_OR_NUM.test(first) && !UNSPACED_SCRIPT.test(first)
        ? "(?<![\\p{L}\\p{N}])"
        : "";
    const suffix =
      last && HAS_LETTER_OR_NUM.test(last) && !UNSPACED_SCRIPT.test(last)
        ? "(?![\\p{L}\\p{N}])"
        : "";
    return `${prefix}${body}${suffix}`;
  }

  const tokens = candidate.match(/&|[\p{L}\p{N}]+(?:['’‘.\-‐‑–—][\p{L}\p{N}]+)*\.?/gu) ?? [];
  if (tokens.length === 0) return escapeRegex(candidate);

  const allowInflection = tokens.filter((t) => t !== "&").length >= 2;
  const body = tokens.map((t) => wordTokenToPattern(t, allowInflection)).join("[\\s,;:\\-‐‑–—]+");

  const first = tokens[0][0];
  const lastToken = tokens[tokens.length - 1];
  const last = lastToken[lastToken.length - 1];
  const prefix = first && HAS_LETTER_OR_NUM.test(first) ? "(?<![\\p{L}\\p{N}])" : "";
  const suffix = last && HAS_LETTER_OR_NUM.test(last) ? "(?![\\p{L}\\p{N}])" : "";

  return `${prefix}${body}${suffix}`;
}

export function getTrackTitleCandidates(rawTitle: string): string[] {
  const trimmed = StripZeroWidth(rawTitle).trim();
  if (!trimmed) return [];

  const seeds = new Set<string>([trimmed]);
  let current = trimmed;
  for (let pass = 0; pass < 4; pass++) {
    const next = current.replace(PAREN_METADATA_SUFFIX, "").replace(DASH_METADATA_SUFFIX, "").trim();
    if (!next || next === current) break;
    seeds.add(next);
    current = next;
  }

  const candidates = new Set<string>();
  const addIfValid = (seg: string, strict = false) => {
    const cleaned = seg.trim();
    if (!cleaned) return;
    if (!strict ? countAlnum(cleaned) >= 2 : isDistinctiveSegment(cleaned)) {
      candidates.add(cleaned);
    }
    const bare = cleaned.replace(EDGE_PUNCTUATION, "").trim();
    if (bare && (!strict ? countAlnum(bare) >= 2 : isDistinctiveSegment(bare))) {
      candidates.add(bare);
    }
  };

  for (const seed of seeds) {
    addIfValid(seed, false);

    // Extract inner subtitle from trailing/inline parentheses like "Good Riddance (Time of Your Life)"
    for (const m of seed.matchAll(/[([]([^)\]]+)[)\]]/g)) {
      addIfValid(m[1], true);
    }
    const withoutParens = seed.replace(/\s*[([][^)\]]+[)\]]\s*/g, " ").replace(/\s+/g, " ").trim();
    if (withoutParens && withoutParens !== seed) {
      addIfValid(withoutParens, true);
    }

    // Split subtitles on ": ", " - ", " / ", " | " (e.g. "Scene Eight: The Spirit Carries On")
    const parts = seed.split(/\s*(?::\s+|\s+[-–—/|]\s+)\s*/g);
    if (parts.length > 1) {
      for (const part of parts) {
        addIfValid(part, true);
      }
    }
  }

  return [...candidates].sort((a, b) => b.length - a.length);
}

let cachedRawTitle: string | undefined;
let cachedRegex: RegExp | null = null;

function getTitleRegex(rawTitle?: string): RegExp | null {
  const title = rawTitle ?? SpotifyPlayer.GetName();
  if (!title) return null;
  if (title === cachedRawTitle) return cachedRegex;

  cachedRawTitle = title;
  const candidates = getTrackTitleCandidates(title);
  if (candidates.length === 0) {
    cachedRegex = null;
    return null;
  }

  cachedRegex = new RegExp(candidates.map(candidateToRegexFragment).join("|"), "giu");
  return cachedRegex;
}

export function findTitleMatches(text: string, rawTitle?: string): TitleMatchRange[] {
  if (!text) return [];
  const regex = getTitleRegex(rawTitle);
  if (!regex) return [];

  regex.lastIndex = 0;
  const ranges: TitleMatchRange[] = [];
  for (const match of text.matchAll(regex)) {
    if (match.index === undefined || match[0].length === 0) continue;
    ranges.push({ start: match.index, end: match.index + match[0].length });
  }
  return ranges;
}

/**
 * Populates `container` with `text`, wrapping any track-title matches in
 * `span.TitleMatch`. For Line/Static lines (`wrapLineText = true`), wraps the
 * content in `span.LineText` when a match exists so `.line`'s `display: flex`
 * preserves whitespace inside the line without affecting `.RomanizedRow`.
 */
export function appendTextWithTitleHighlight(
  container: HTMLElement,
  text: string,
  rawTitle?: string,
  wrapLineText = false
): boolean {
  const matches = findTitleMatches(text, rawTitle);
  if (matches.length === 0) {
    container.textContent = text;
    return false;
  }

  const target = wrapLineText ? document.createElement("span") : container;
  if (wrapLineText) target.classList.add("LineText");

  let cursor = 0;
  for (const { start, end } of matches) {
    if (start > cursor) {
      target.appendChild(document.createTextNode(text.slice(cursor, start)));
    }
    const span = document.createElement("span");
    span.classList.add("TitleMatch");
    span.textContent = text.slice(start, end);
    target.appendChild(span);
    cursor = end;
  }
  if (cursor < text.length) {
    target.appendChild(document.createTextNode(text.slice(cursor)));
  }

  if (wrapLineText) container.appendChild(target);
  return true;
}

/**
 * Applies `.TitleMatch` to a syllable word or letterGroup element.
 * When only a substring of a multi-word syllable matches, wraps the matching
 * slice in `span.TitleMatch` (for plain words) or tags matching `.letter` children.
 */
export function applySyllableTitleHighlight(
  element: HTMLElement,
  text: string,
  match: SyllableTitleMatch | undefined,
  splitLetters?: string[]
): void {
  if (!match) return;
  if (match.full) {
    element.classList.add("TitleMatch");
    return;
  }
  if (!match.ranges || match.ranges.length === 0) return;

  if (splitLetters) {
    let offset = 0;
    for (let i = 0; i < splitLetters.length; i++) {
      const letter = splitLetters[i];
      const end = offset + letter.length;
      if (
        HAS_LETTER_OR_NUM.test(letter) &&
        match.ranges.some((r) => Math.max(offset, r.start) < Math.min(end, r.end))
      ) {
        element.children[i]?.classList.add("TitleMatch");
      }
      offset = end;
    }
    return;
  }

  element.textContent = "";
  let cursor = 0;
  for (const { start, end } of match.ranges) {
    if (start > cursor) {
      element.appendChild(document.createTextNode(text.slice(cursor, start)));
    }
    const span = document.createElement("span");
    span.classList.add("TitleMatch");
    span.textContent = text.slice(start, end);
    element.appendChild(span);
    cursor = end;
  }
  if (cursor < text.length) {
    element.appendChild(document.createTextNode(text.slice(cursor)));
  }
}

export function getSyllableTitleMatches(
  parts: Array<{
    Text: string;
    TransliteratedText?: string;
    IsPartOfWord?: boolean;
    TransliteratedIsPartOfWord?: boolean;
  }>,
  useRomanized: boolean,
  rawTitle?: string
): SyllableTitleMatch[] {
  const result: SyllableTitleMatch[] = parts.map(() => ({ full: false }));
  if (parts.length === 0) return result;

  const displayTexts = parts.map((part) => StripZeroWidth(PickDisplayText(part, useRomanized)));
  const spans: TitleMatchRange[] = [];
  let lineText = "";

  for (let i = 0; i < parts.length; i++) {
    const text = displayTexts[i];
    if (i > 0) {
      const glued = !!PickPartOfWord(parts[i - 1], useRomanized);
      if (!glued && !/\s$/.test(displayTexts[i - 1]) && !/^\s/.test(text)) {
        lineText += " ";
      }
    }
    const start = lineText.length;
    lineText += text;
    spans.push({ start, end: lineText.length });
  }

  const matches = findTitleMatches(lineText, rawTitle);
  if (matches.length === 0) return result;

  for (let i = 0; i < parts.length; i++) {
    const partSpan = spans[i];
    const partText = displayTexts[i];
    if (!HAS_LETTER_OR_NUM.test(partText)) continue;

    const localRanges: TitleMatchRange[] = [];
    for (const m of matches) {
      const overlapStart = Math.max(partSpan.start, m.start);
      const overlapEnd = Math.min(partSpan.end, m.end);
      if (overlapStart >= overlapEnd) continue;
      const slice = lineText.slice(overlapStart, overlapEnd);
      if (!HAS_LETTER_OR_NUM.test(slice)) continue;
      localRanges.push({
        start: overlapStart - partSpan.start,
        end: overlapEnd - partSpan.start,
      });
    }

    if (localRanges.length === 0) continue;

    // Check whether the part has any unmatched letters/numbers outside the matched slices.
    let outside = "";
    let cursor = 0;
    for (const r of localRanges) {
      if (r.start > cursor) outside += partText.slice(cursor, r.start);
      cursor = r.end;
    }
    if (cursor < partText.length) outside += partText.slice(cursor);

    if (!HAS_LETTER_OR_NUM.test(outside)) {
      result[i] = { full: true };
    } else {
      result[i] = { full: false, ranges: localRanges };
    }
  }

  return result;
}
