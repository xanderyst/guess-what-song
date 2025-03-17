import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng); // Persist user selection
  };

  return (
    <div className="flex justify-end">
      <button
        onClick={() => changeLanguage('en-US')}
        className={`p-1.5 text-sm border rounded-l ${i18n.language === 'en-US' ? 'bg-purple-600 text-white' : 'bg-primary/20'}`}
      >
        EN
      </button>
      <button
        onClick={() => changeLanguage('zh-TW')}
        className={`p-1.5 text-sm border rounded-r ${i18n.language === 'zh-TW' ? 'bg-purple-600 text-white' : 'bg-primary/20'}`}
      >
        中
      </button>
    </div>
  );
}
