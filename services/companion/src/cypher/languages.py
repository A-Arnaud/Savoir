"""Independent factual language inventory, shared through schema generation."""
from typing import Literal

LanguageCode = Literal['EN','AR','BG','BN','ZH','CS','DA','DE','ET','EL','ES','FI','FR','HE','HI','HU','ID','IT','JA','KO','LT','LV','MS','NL','NB','PL','PT-BR','PT-PT','RO','RU','SK','SL','SV','TH','TR','TL','ZH-TW','UK','UR','VI','ZU']
_LABELS = {
    'EN':'English','AR':'العربية','BG':'Български','BN':'বাংলা','ZH':'简体中文',
    'CS':'Čeština','DA':'Dansk','DE':'Deutsch','ET':'Eesti','EL':'Ελληνικά',
    'ES':'Español','FI':'Suomi','FR':'Français','HE':'עברית','HI':'हिन्दी',
    'HU':'Magyar','ID':'Bahasa Indonesia','IT':'Italiano','JA':'日本語','KO':'한국어',
    'LT':'Lietuvių','LV':'Latviešu','MS':'Bahasa Melayu','NL':'Nederlands','NB':'Norsk bokmål',
    'PL':'Polski','PT-BR':'Português — Brasil','PT-PT':'Português — Portugal','RO':'Română',
    'RU':'Русский','SK':'Slovenčina','SL':'Slovenščina','SV':'Svenska','TH':'ไทย',
    'TR':'Türkçe','TL':'Filipino','ZH-TW':'繁體中文','UK':'Українська','UR':'اردو','VI':'Tiếng Việt','ZU':'isiZulu',
}
LANGUAGE_OPTIONS = [{'code':code,'label':label,'direction':'rtl' if code in {'AR','HE','UR'} else 'ltr'} for code,label in _LABELS.items()]

def language_target(code):
    """Give the model an explicit language name as well as its wire code."""
    return {'language': code, 'targetLanguageName': _LABELS[code]}
