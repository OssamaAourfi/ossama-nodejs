const langdata = require('./data');

const languages = {
    'fr': 'French',
    'en': 'English',
    'es': 'Spanish',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese'
};

const detectLang = (sentence) => {
    if (!sentence || typeof sentence !== 'string') {
        return 'Invalid input. Please provide a valid sentence.';
    }

    const words = sentence.toLowerCase().split(/\W+/);
    const score = {};

    for (const [key, keywords] of Object.entries(langdata)) {
        const keywordSet = new Set(keywords);
        score[key] = words.filter(word => keywordSet.has(word)).length;
    }
    const maxScore = Math.max(...Object.values(score));
    if (maxScore === 0) {
        return 'Unable to detect language. No matches found.';
    }
    const detectedLanguages = Object.keys(score).filter(key => score[key] === maxScore);
    return languages[detectedLanguages[0]];
};

module.exports = detectLang;
