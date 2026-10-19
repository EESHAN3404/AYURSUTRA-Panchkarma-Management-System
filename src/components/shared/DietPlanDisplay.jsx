import React, { useState } from 'react';
import { 
  Coffee, 
  Utensils, 
  Sunrise, 
  Sun, 
  Moon, 
  Apple, 
  Sparkles, 
  Clock, 
  Ban, 
  CheckCircle2, 
  Leaf, 
  Droplets, 
  Copy, 
  Check, 
  Printer, 
  Eye, 
  FileText 
} from 'lucide-react';
import Card from './Card';

// Comprehensive configuration for meal periods, matching typos & various formats
const PERIOD_CONFIGS = [
  {
    id: 'early_morning',
    label: 'Early Morning',
    defaultTime: '6:00 AM – 7:30 AM',
    Icon: Sunrise,
    badgeBg: 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-700/60',
    cardBorder: 'border-amber-200 dark:border-amber-800/60',
    cardBg: 'bg-amber-50/40 dark:bg-amber-950/20',
    dotColor: 'bg-amber-500',
    iconColor: 'text-amber-600 dark:text-amber-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-amber-200/60 dark:border-amber-800/40',
    regex: /^(?:early\s*morning|empty\s*stomach|upon\s*waking|pratah(?:\s*kal)?)/i,
    keywordMatch: /\b(early\s*morning|empty\s*stomach|upon\s*waking|pratah)\b/i,
  },
  {
    id: 'morning',
    label: 'Morning / Breakfast',
    defaultTime: '8:00 AM – 9:30 AM',
    Icon: Sunrise,
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-700/60',
    cardBorder: 'border-emerald-200 dark:border-emerald-800/60',
    cardBg: 'bg-emerald-50/40 dark:bg-emerald-950/20',
    dotColor: 'bg-emerald-500',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-emerald-200/60 dark:border-emerald-800/40',
    regex: /^(?:morning|mrng|breakfast|nashta|brunch|morning\s*diet)/i,
    keywordMatch: /\b(morning|mrng|breakfast|nashta|brunch)\b/i,
  },
  {
    id: 'mid_morning',
    label: 'Mid-Morning',
    defaultTime: '11:00 AM – 11:30 AM',
    Icon: Apple,
    badgeBg: 'bg-lime-100 dark:bg-lime-900/40 text-lime-800 dark:text-lime-200 border-lime-200 dark:border-lime-700/60',
    cardBorder: 'border-lime-200 dark:border-lime-800/60',
    cardBg: 'bg-lime-50/40 dark:bg-lime-950/20',
    dotColor: 'bg-lime-500',
    iconColor: 'text-lime-600 dark:text-lime-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-lime-200/60 dark:border-lime-800/40',
    regex: /^(?:mid[\s-]*morning|mid\s*day\s*snack)/i,
    keywordMatch: /\b(mid[\s-]*morning)\b/i,
  },
  {
    id: 'afternoon',
    label: 'Afternoon / Lunch',
    defaultTime: '12:30 PM – 2:00 PM',
    Icon: Utensils,
    badgeBg: 'bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-200 border-teal-200 dark:border-teal-700/60',
    cardBorder: 'border-teal-200 dark:border-teal-800/60',
    cardBg: 'bg-teal-50/40 dark:bg-teal-950/20',
    dotColor: 'bg-teal-500',
    iconColor: 'text-teal-600 dark:text-teal-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-teal-200/60 dark:border-teal-800/40',
    regex: /^(?:afternoon|aftrnun|aftrnoon|after-noon|lunch|midday|noon|madhyahna|dopahar)/i,
    keywordMatch: /\b(afternoon|aftrnun|aftrnoon|lunch|midday|noon|madhyahna)\b/i,
  },
  {
    id: 'evening',
    label: 'Evening / Tea',
    defaultTime: '4:30 PM – 5:30 PM',
    Icon: Coffee,
    badgeBg: 'bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-700/60',
    cardBorder: 'border-orange-200 dark:border-orange-800/60',
    cardBg: 'bg-orange-50/40 dark:bg-orange-950/20',
    dotColor: 'bg-orange-500',
    iconColor: 'text-orange-600 dark:text-orange-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-orange-200/60 dark:border-orange-800/40',
    // Catches common doctor typos like "eveing", "evng", etc.
    regex: /^(?:evening|eveing|evng|evening\s*snack|tea(?:\s*time)?|green\s*tea|snacks?|sandhya|sham)/i,
    keywordMatch: /\b(evening|eveing|evng|tea|snacks?|sandhya)\b/i,
  },
  {
    id: 'dinner',
    label: 'Dinner / Night',
    defaultTime: '7:30 PM – 8:30 PM',
    Icon: Moon,
    badgeBg: 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-200 border-indigo-200 dark:border-indigo-700/60',
    cardBorder: 'border-indigo-200 dark:border-indigo-800/60',
    cardBg: 'bg-indigo-50/40 dark:bg-indigo-950/20',
    dotColor: 'bg-indigo-500',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-indigo-200/60 dark:border-indigo-800/40',
    regex: /^(?:dinner|dinnr|night|supper|ratrika|ratri|rat\s*ka\s*khana)/i,
    keywordMatch: /\b(dinner|dinnr|night|supper|ratrika|ratri)\b/i,
  },
  {
    id: 'bedtime',
    label: 'Bedtime / Post-Dinner',
    defaultTime: '9:30 PM – 10:00 PM',
    Icon: Sparkles,
    badgeBg: 'bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-700/60',
    cardBorder: 'border-purple-200 dark:border-purple-800/60',
    cardBg: 'bg-purple-50/40 dark:bg-purple-950/20',
    dotColor: 'bg-purple-500',
    iconColor: 'text-purple-600 dark:text-purple-400',
    itemTagBg: 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-purple-200/60 dark:border-purple-800/40',
    regex: /^(?:bedtime|before\s*bed|post[\s-]*dinner|night\s*milk|sone\s*se\s*pehle)/i,
    keywordMatch: /\b(bedtime|before\s*bed|post[\s-]*dinner|night\s*milk)\b/i,
  },
  {
    id: 'avoid',
    label: 'Foods to Avoid (Varjya)',
    Icon: Ban,
    regex: /^(?:avoid|restricted|restrictions?|varjya|do\s*not\s*eat|don't\s*eat|forbidden|prohibited)/i,
    keywordMatch: /\b(avoid|restrictions?|varjya|do\s*not\s*eat|don't\s*eat)\b/i,
  },
  {
    id: 'notes',
    label: 'Doctor Guidelines & Rules',
    Icon: CheckCircle2,
    regex: /^(?:notes?|guidelines?|instructions?|pathya|rules?|advice|water|hydration)/i,
    keywordMatch: /\b(notes?|guidelines?|instructions?|pathya|rules?|advice)\b/i,
  }
];

// Helper: Cleans item string, removing leading bullet characters but preserving quantities like "1 bhakri"
function cleanItem(str) {
  if (!str) return '';
  return str
    .replace(/^(?:(?:\d+[\.\)]|[•\*\-\+])\s*)+/, '')
    .trim();
}

// Helper: Capitalizes first letter of words/item for professional presentation
function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Helper: Extracts food items from a meal description
function parseItems(text) {
  if (!text) return [];

  // If text contains delimiters like commas, semicolons, bullets, pipes, or newlines
  if (/[,;•|\n]/.test(text)) {
    return text
      .split(/[,;•|\n]+/)
      .map(cleanItem)
      .filter(s => s.length > 0)
      .map(capitalizeFirst);
  }

  // If text doesn't contain punctuation, check for " and " where both sides are substantial food items
  if (/\s+and\s+/i.test(text)) {
    const parts = text.split(/\s+and\s+/i);
    if (parts.length > 1 && parts.every(p => p.trim().length >= 3)) {
      return parts
        .map(cleanItem)
        .filter(s => s.length > 0)
        .map(capitalizeFirst);
    }
  }

  const cleaned = cleanItem(text);
  return cleaned ? [capitalizeFirst(cleaned)] : [];
}

// Helper: Extract any explicit time written by doctor, e.g. "(7:30 AM)" or "8am"
function extractExplicitTime(text) {
  if (!text) return null;
  const match = text.match(/\b(\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*(?:-|to)\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)|\d{1,2}(?::\d{2})?\s*(?:am|pm))\b/i);
  return match ? match[1].toUpperCase() : null;
}

// Main parser function that turns messy raw doctor text into structured diet objects
export function parseDietPlan(rawText) {
  if (!rawText || typeof rawText !== 'string' || !rawText.trim()) {
    return { hasContent: false, meals: [], avoidItems: [], guidelines: [], generalNotes: [], rawText: '' };
  }

  const cleanRaw = rawText.trim();

  // Normalize inline separators: if doctor wrote everything on one line with periods/semicolons
  let processedText = cleanRaw;
  PERIOD_CONFIGS.forEach(cfg => {
    const inlineRegex = new RegExp(`(?:[.;,]\\s*|\\s+)(?:(\\d+[.)]|•|\\*|-)\\s*)?(${cfg.keywordMatch.source})\\s*[:–—\\-]\\s*`, 'gi');
    processedText = processedText.replace(inlineRegex, '\n$2: ');
  });

  const lines = processedText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

  const meals = [];
  const avoidItems = [];
  const guidelines = [];
  const generalNotes = [];

  let currentCategory = null;

  for (const line of lines) {
    // Check if line starts with a period pattern: e.g. "morning - lemon juice..." or "1. morning: ..."
    const prefixMatch = line.match(/^(?:(?:\d+[\.\)]|[•\*\-])\s*)?([a-zA-Z\s/-]+?)\s*[:–—\-]\s*(.*)$/i);
    let matchedConfig = null;
    let contentAfterPrefix = '';

    if (prefixMatch) {
      const labelCandidate = prefixMatch[1].trim();
      matchedConfig = PERIOD_CONFIGS.find(cfg => cfg.regex.test(labelCandidate));
      if (matchedConfig) {
        contentAfterPrefix = prefixMatch[2].trim();
      }
    }

    // Check if line is just a standalone header like "Morning:" or "Lunch"
    if (!matchedConfig) {
      const headingOnlyMatch = line.match(/^(?:(?:\d+[\.\)]|[•\*\-])\s*)?([a-zA-Z\s/-]+?)\s*[:–—\-]?$/i);
      if (headingOnlyMatch) {
        const candidate = headingOnlyMatch[1].trim();
        matchedConfig = PERIOD_CONFIGS.find(cfg => cfg.regex.test(candidate));
        if (matchedConfig) {
          contentAfterPrefix = '';
        }
      }
    }

    if (matchedConfig) {
      currentCategory = matchedConfig;
      if (contentAfterPrefix) {
        handleCategoryContent(matchedConfig, contentAfterPrefix);
      }
    } else if (currentCategory) {
      // Continuation of previous category, or start of an avoid/guideline phrase
      if (/^(?:avoid|restrictions?|do not eat|don't eat|varjya)\b/i.test(line)) {
        currentCategory = null;
        avoidItems.push(...parseItems(line.replace(/^(?:avoid|restrictions?|do not eat|don't eat|varjya)\s*[:–—\-]?\s*/i, '')));
      } else if (/^(?:note|instruction|guideline|pathya|drink|sip)\b/i.test(line)) {
        currentCategory = null;
        guidelines.push(cleanItem(line));
      } else {
        handleCategoryContent(currentCategory, line);
      }
    } else {
      // Free prose line: parse sentence by sentence
      const sentences = line.split(/(?<=[.!?])\s+/).filter(Boolean);
      for (const sent of sentences) {
        if (/^(?:avoid|restrictions?|do not eat|don't eat|varjya)\b/i.test(sent)) {
          avoidItems.push(...parseItems(sent.replace(/^(?:avoid|restrictions?|do not eat|don't eat|varjya)\s*[:–—\-]?\s*/i, '')));
        } else if (/avoid\s+(.+)$/i.test(sent)) {
          const match = sent.match(/avoid\s+([^.]+)/i);
          if (match) {
            avoidItems.push(...parseItems(match[1]));
            const rest = sent.replace(/avoid\s+[^.]+/i, '').trim();
            if (rest && rest.length > 5) generalNotes.push(cleanItem(rest));
          }
        } else if (/^(?:note|instruction|guideline|pathya|drink|sip)\b/i.test(sent)) {
          guidelines.push(cleanItem(sent));
        } else {
          generalNotes.push(cleanItem(sent));
        }
      }
    }
  }

  function handleCategoryContent(cfg, text) {
    if (cfg.id === 'avoid') {
      avoidItems.push(...parseItems(text));
    } else if (cfg.id === 'notes') {
      guidelines.push(...parseItems(text));
    } else {
      const explicitTime = extractExplicitTime(text);
      // Clean explicit time from item text if it was embedded like "(7:30 AM) lemon juice"
      const cleanedText = text.replace(/\(\s*\d{1,2}(?::\d{2})?\s*(?:am|pm)?\s*(?:-|to)?\s*\d{0,2}(?::\d{2})?\s*(?:am|pm)?\s*\)/i, '').trim();
      const items = parseItems(cleanedText);
      const existingMeal = meals.find(m => m.id === cfg.id);

      if (existingMeal) {
        existingMeal.items.push(...items);
        existingMeal.rawContent += (existingMeal.rawContent ? ', ' : '') + cleanedText;
        if (explicitTime) existingMeal.time = explicitTime;
      } else {
        meals.push({
          id: cfg.id,
          label: cfg.label,
          time: explicitTime || cfg.defaultTime,
          Icon: cfg.Icon,
          badgeBg: cfg.badgeBg,
          cardBorder: cfg.cardBorder,
          cardBg: cfg.cardBg,
          dotColor: cfg.dotColor,
          iconColor: cfg.iconColor,
          itemTagBg: cfg.itemTagBg,
          rawContent: cleanedText,
          items: items,
        });
      }
    }
  }

  return {
    hasContent: true,
    hasMeals: meals.length > 0,
    meals,
    avoidItems: [...new Set(avoidItems)],
    guidelines: [...new Set(guidelines)],
    generalNotes: [...new Set(generalNotes)],
    rawText: cleanRaw
  };
}

/**
 * DietPlanDisplay Component
 * 
 * Beautifully formats any free-form doctor dietary prescription into an elegant,
 * structured, Ayurvedic meal regimen card.
 */
const DietPlanDisplay = ({ dietText, title = 'Diet Plan', className = '', standalone = true }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState('structured'); // 'structured' | 'raw'

  const parsed = parseDietPlan(dietText);

  const handleCopy = () => {
    if (!dietText) return;
    navigator.clipboard.writeText(dietText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Content renderer
  const renderContent = () => {
    if (!parsed.hasContent) {
      return (
        <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 shadow-inner">
            <Coffee className="w-7 h-7 opacity-75" />
          </div>
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-1">No Active Diet Plan Yet</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">
            Your customized Ayurvedic Ahara regimen will appear here once prescribed by your physician.
          </p>
        </div>
      );
    }

    if (viewMode === 'raw') {
      return (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/80 rounded-xl border border-gray-200 dark:border-gray-700 font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap leading-relaxed shadow-inner">
            {parsed.rawText}
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => setViewMode('structured')}
              className="text-xs text-ayur-primary font-medium hover:underline flex items-center gap-1"
            >
              <Eye className="w-3.5 h-3.5" /> Back to Structured Schedule
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {/* If structured meals were detected */}
        {parsed.hasMeals ? (
          <div className="space-y-3">
            {parsed.meals.map((meal) => {
              const MealIcon = meal.Icon;
              return (
                <div
                  key={meal.id}
                  className={`p-3.5 rounded-xl border transition-all duration-200 hover:shadow-sm ${meal.cardBg} ${meal.cardBorder}`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-sm border ${meal.badgeBg}`}>
                        <MealIcon className="w-4 h-4" />
                      </div>
                      <span className="font-semibold text-sm text-ayur-dark dark:text-white">
                        {meal.label}
                      </span>
                    </div>

                    {meal.time && (
                      <span className="flex items-center gap-1 text-[11px] font-medium text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2.5 py-0.5 rounded-full border border-gray-200/60 dark:border-gray-700/60">
                        <Clock className="w-3 h-3 text-gray-400" />
                        {meal.time}
                      </span>
                    )}
                  </div>

                  {/* Food items rendered as clean, appetizing chips/tags */}
                  <div className="flex flex-wrap gap-1.5 pl-10">
                    {meal.items.map((item, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border shadow-xs transition-colors ${meal.itemTagBg}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${meal.dotColor}`}></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Fallback when doctor entered unstructured text without meal times */
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-850 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
              <Leaf className="w-4 h-4 text-emerald-600" />
              <span>Ayurvedic Ahara Instructions</span>
            </div>
            
            {parsed.generalNotes.length > 0 ? (
              <ul className="space-y-2">
                {parsed.generalNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span>{note}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {parsed.rawText}
              </p>
            )}
          </div>
        )}

        {/* Restricted Foods (Varjya Ahara) */}
        {parsed.avoidItems.length > 0 && (
          <div className="p-3.5 rounded-xl bg-rose-50/90 dark:bg-rose-950/25 border border-rose-200 dark:border-rose-900/50">
            <div className="flex items-center gap-1.5 text-rose-800 dark:text-rose-300 font-semibold text-xs uppercase tracking-wider mb-2">
              <Ban className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Foods to Avoid (Varjya)</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {parsed.avoidItems.map((item, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-xs font-medium bg-white dark:bg-gray-800 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 shadow-2xs"
                >
                  <span className="text-rose-500 font-bold">✕</span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Guidelines & Hydration */}
        {parsed.guidelines.length > 0 && (
          <div className="p-3 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/20 border border-cyan-200 dark:border-cyan-900/40">
            <div className="flex items-center gap-1.5 text-cyan-800 dark:text-cyan-300 font-semibold text-xs uppercase tracking-wider mb-1.5">
              <Droplets className="w-3.5 h-3.5 text-cyan-600" />
              <span>Dietary Guidelines</span>
            </div>
            <ul className="space-y-1">
              {parsed.guidelines.map((guide, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <CheckCircle2 className="w-3 h-3 text-cyan-500 mt-0.5 flex-shrink-0" />
                  <span>{guide}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ayurvedic Ahara Principle Footer */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1.5">
            <Leaf className="w-3.5 h-3.5 text-ayur-primary" />
            <span>Eat freshly cooked warm food to sustain digestive fire (Agni).</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'structured' ? 'raw' : 'structured')}
              title={viewMode === 'structured' ? 'View doctor original text' : 'View formatted schedule'}
              className="hover:text-ayur-primary transition-colors flex items-center gap-0.5"
            >
              <FileText className="w-3 h-3" />
              <span>{viewMode === 'structured' ? 'Raw Note' : 'Formatted'}</span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  const header = (
    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 flex items-center justify-center shadow-xs">
          <Coffee className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-xl font-serif font-bold text-ayur-dark dark:text-white leading-tight">
            {title}
          </h2>
          <span className="text-[11px] text-gray-500 dark:text-gray-400">
            Ayurvedic Ahara Vidhi
          </span>
        </div>
      </div>

      {parsed.hasContent && (
        <div className="flex items-center gap-1.5">
          {parsed.hasMeals && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {parsed.meals.length} Meals Prescribed
            </span>
          )}

          <button
            onClick={handleCopy}
            className="p-1.5 text-gray-500 hover:text-ayur-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            title="Copy Diet Plan"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>

          <button
            onClick={handlePrint}
            className="p-1.5 text-gray-500 hover:text-ayur-primary hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:block"
            title="Print Diet Plan"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );

  if (!standalone) {
    return (
      <div className={className}>
        {header}
        {renderContent()}
      </div>
    );
  }

  return (
    <Card className={`border-none shadow-lg ${className}`}>
      {header}
      {renderContent()}
    </Card>
  );
};

export default DietPlanDisplay;
