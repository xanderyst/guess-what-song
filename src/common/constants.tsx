  // Map language to corresponding country and language codes
export const langMap: Record<string, { lang: string; country: string }> = {
    "zh-TW": { lang: "zh_tw", country: "tw" },
    "en-US": { lang: "en_US", country: "us" },
};

export const genreCountryMap: Record<string, string> = {
    'Mandopop': 'tw',
    'Chinese': 'tw',
};

export const chineseGenre = [
    'mandopop', 'chinese', 'canto', 'taiwanese', 'tai-pop'
];