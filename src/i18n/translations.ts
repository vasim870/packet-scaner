import { Language } from './types';

export const translations: Record<Language, Record<string, string>> = {
  en: {
    // Top Bar
    ministryTitle: 'Ministry of Consumer Affairs, Food & Public Distribution | Government of India',
    metrologyRulesTag: 'Legal Metrology (Packaged Commodities) Rules 2011',
    backendActive: 'Backend Active',
    connecting: 'Connecting...',
    themeLight: 'Light',
    themeDark: 'Dark',
    mobileAppView: '📱 Mobile App View',
    exitPhoneMode: 'Exit Phone Mode',
    downloadApp: 'Download App',
    
    // Main Brand
    appTitle: 'Packet Scanner',
    appSubtitle: 'Legal Metrology Compliance, dual MRP overcharging detection & Pan-India violation mapping',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'Packet Scanner',
    tabMap: 'All India Violation Map',
    tabRules: 'Rules & Penalties',
    tabGrievance: 'Lodge Grievance',
    tabAnalytics: 'Enforcement Stats',
    tabDownload: 'Download Mobile App',
    liveBadge: 'Live',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'Commodity Packet OCR & Compliance Inspector',
    scannerDesc: 'Upload or capture clear photos of retail packaged goods to automatically audit mandatory disclosures under Rule 6, calculate statutory fine liabilities, and verify against Dual MRP tampering.',
    samplePresets: 'Sample Inspection Packets',
    samplePresetsDesc: 'Or test with pre-analyzed real violation cases:',
    uploadOrDrop: 'Drop packet image here or browse files',
    supportedFormats: 'Supports JPG, PNG, WEBP (Max 15MB)',
    takePhoto: 'Use Device Camera',
    stopCamera: 'Stop Camera',
    capturePhoto: 'Capture Packet Photo',
    clearPhoto: 'Clear Photo',
    runAudit: 'Run AI Legal Metrology Audit',
    analyzingText: 'Scanning & Auditing Legal Metrology Declarations...',
    analysisInProgress: 'Reading OCR packet text, verifying Rule 6 declarations & checking dual MRP tampering...',
    
    // Audit Results
    complianceScore: 'Compliance Score',
    statusCompliant: 'COMPLIANT (PASS)',
    statusMinor: 'MINOR VIOLATION',
    statusSevere: 'CRITICAL / SEVERE VIOLATION',
    summaryTitle: 'Audit Executive Summary',
    mandatoryDisclosures: 'Mandatory Declarations Audit (Rule 6)',
    violationsDetected: 'Statutory Violations Detected',
    estimatedLiability: 'Estimated Statutory Fine Liability',
    recommendedActions: 'Consumer Action Plan & Remedies',
    fileNoticeBtn: 'Generate Legal Demand Notice',
    viewOnRadarBtn: 'View on Violation Radar Map',
    
    // Mobile Download Card
    quickDownloadTitle: 'Download Mobile App',
    quickDownloadSubtitle: 'Scan retail packets directly on your phone',
    quickDownloadDesc: 'Use your phone camera for live OCR barcode scanning, dual-MRP verification, and offline violation radar in stores.',
    downloadInstallBtn: 'Download / Install App',
    copyLinkBtn: 'Copy Link',
    linkCopiedAlert: 'Mobile link copied! Paste it in Google Chrome on your phone to install.',
    platformSupport: 'Android & iOS Compatible',
    freeNoAccount: 'Free • No Store Account Needed',

    // Common
    language: 'Language',
    selectLanguage: 'Select Language',
    search: 'Search',
    filter: 'Filter',
    close: 'Close',
    back: 'Back',
    submit: 'Submit',

    // Map View
    mapSearchPlaceholder: 'Search stores, markets, brands, or cities...',
    reportViolationBtn: 'Report Store Violation',
    allZones: 'All India',
    allCities: 'All Cities',
    verifiedReports: 'Verified Violations',

    // Grievance Notice
    grievanceHeader: 'Statutory Legal Demand Notice Generator',
    grievanceSubtitle: 'Draft an enforceable legal demand notice under Section 36 of the Legal Metrology Act, 2009 for overcharging or missing declarations.',
    petitionerDetails: 'Petitioner / Complainant Details',
    storeDetails: 'Defaulting Merchant / Retailer Details',
    productDetails: 'Packet Information & MRP Evidence',
    generateNoticeBtn: 'Generate Enforceable Legal Demand Notice',
    copyNoticeBtn: 'Copy Notice to Clipboard',
    printNoticeBtn: 'Print / Export Notice',

    // Rules
    rulesTitle: 'Legal Metrology Rules & Statutory Penalty Compendium',
    rulesSubtitle: 'Know your rights under the Legal Metrology Act 2009 & Packaged Commodities Rules 2011.',
    rulesTabRules: 'Packaged Commodity Rules',
    rulesTabCalc: 'Statutory Penalty Calculator',
    rulesTabTolerances: 'Permissible Weight Tolerances',

    // Analytics
    analyticsTitle: 'Pan-India Enforcement Intelligence Dashboard',
    totalScans: 'Packets Audited',
    totalReports: 'Active Store Reports',
    penaltiesLevied: 'Penalties Levied (Est.)',
    hotspotsTitle: 'High-Risk Overcharging Corridors'
  },
  hi: {
    // Top Bar
    ministryTitle: 'उपभोक्ता मामले, खाद्य और सार्वजनिक वितरण मंत्रालय | भारत सरकार',
    metrologyRulesTag: 'विधिक मापविज्ञान (डिब्बाबंद वस्तुएं) नियम 2011',
    backendActive: 'सर्वर सक्रिय',
    connecting: 'कनेक्ट हो रहा है...',
    themeLight: 'लाइट',
    themeDark: 'डार्क',
    mobileAppView: '📱 मोबाइल ऐप व्यू',
    exitPhoneMode: 'फ़ोन मोड बंद करें',
    downloadApp: 'ऐप डाउनलोड करें',
    
    // Main Brand
    appTitle: 'पैकेट स्कैनर',
    appSubtitle: 'विधिक मापविज्ञान अनुपालन, दोहरा एमआरपी (Dual MRP) पहचान एवं अखिल भारतीय उल्लंघन मैपिंग',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'पैकेट स्कैनर',
    tabMap: 'अखिल भारतीय उल्लंघन मानचित्र',
    tabRules: 'नियम एवं दंड प्रावधान',
    tabGrievance: 'शिकायत / लीगल नोटिस दर्ज करें',
    tabAnalytics: 'प्रवर्तन आंकड़े',
    tabDownload: 'मोबाइल ऐप डाउनलोड करें',
    liveBadge: 'लाइव',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'पैकेट लेबल ओसीआर एवं विधिक मापविज्ञान जांचकर्ता',
    scannerDesc: 'खुदरा पैकेट की फोटो खींचें या अपलोड करें। नियम 6 के तहत अनिवार्य घोषणाओं की स्वचालित जांच करें, जुर्माने का आकलन करें और दोहरे एमआरपी की जालसाजी पकड़ें।',
    samplePresets: 'परीक्षण हेतु नमूना पैकेट',
    samplePresetsDesc: 'या वास्तविक उल्लंघन मामलों के साथ परीक्षण करें:',
    uploadOrDrop: 'पैकेट की फोटो यहाँ खींचें या फाइल चुनें',
    supportedFormats: 'JPG, PNG, WEBP समर्थित (अधिकतम 15MB)',
    takePhoto: 'कैमरा शुरू करें',
    stopCamera: 'कैमरा बंद करें',
    capturePhoto: 'फोटो खींचें',
    clearPhoto: 'फोटो हटाएं',
    runAudit: 'एआई विधिक मापविज्ञान ऑडिट करें',
    analyzingText: 'पैकेट लेबल एवं घोषणाओं की जांच जारी है...',
    analysisInProgress: 'ओसीआर टेक्स्ट पढ़ा जा रहा है, नियम 6 घोषणाओं का सत्यापन और दोहरे एमआरपी की जांच हो रही है...',
    
    // Audit Results
    complianceScore: 'अनुपालन स्कोर',
    statusCompliant: 'पूर्ण अनुपालित (पास)',
    statusMinor: 'लघु उल्लंघन',
    statusSevere: 'गंभीर / कानूनी उल्लंघन',
    summaryTitle: 'ऑडिट सारांश',
    mandatoryDisclosures: 'अनिवार्य घोषणा जांच (नियम 6)',
    violationsDetected: 'पाए गए कानूनी उल्लंघन',
    estimatedLiability: 'अनुमानित वैधानिक जुर्माना राशि',
    recommendedActions: 'उपभोक्ता कार्ययोजना एवं निवारण',
    fileNoticeBtn: 'कानूनी डिमांड नोटिस तैयार करें',
    viewOnRadarBtn: 'उल्लंघन रडार मानचित्र पर देखें',
    
    // Mobile Download Card
    quickDownloadTitle: 'मोबाइल ऐप डाउनलोड करें',
    quickDownloadSubtitle: 'दुकान पर अपने फ़ोन से सीधे पैकेट स्कैन करें',
    quickDownloadDesc: 'लाइव ओसीआर बारकोड स्कैनिंग, दोहरे एमआरपी की तुरंत जांच और बिना इंटरनेट के रडार उपयोग हेतु ऐप इंस्टॉल करें।',
    downloadInstallBtn: 'ऐप डाउनलोड / इंस्टॉल करें',
    copyLinkBtn: 'लिंक कॉपी करें',
    linkCopiedAlert: 'मोबाइल लिंक कॉपी हो गया! अपने फ़ोन के गूगल क्रोम में पेस्ट करके इंस्टॉल करें।',
    platformSupport: 'एंड्रॉइड एवं आईफोन दोनों के लिए',
    freeNoAccount: 'निःशुल्क • किसी स्टोर खाते की आवश्यकता नहीं',

    // Common
    language: 'भाषा',
    selectLanguage: 'भाषा चुनें',
    search: 'खोजें',
    filter: 'फ़िल्टर',
    close: 'बंद करें',
    back: 'वापस',
    submit: 'जमा करें',

    // Map View
    mapSearchPlaceholder: 'दुकान, बाज़ार, ब्रांड या शहर खोजें...',
    reportViolationBtn: 'दुकान उल्लंघन रिपोर्ट करें',
    allZones: 'संपूर्ण भारत',
    allCities: 'सभी शहर',
    verifiedReports: 'सत्यापित उल्लंघन',

    // Grievance Notice
    grievanceHeader: 'विधिक नोटिस जेनरेटर (धारा 36 विधिक मापविज्ञान अधिनियम)',
    grievanceSubtitle: 'एमआरपी से अधिक वसूली या अनिवार्य विवरणों के अभाव में विधिक मापविज्ञान अधिकारी एवं व्यापारी के लिए औपचारिक नोटिस तैयार करें।',
    petitionerDetails: 'शिकायतकर्ता / उपभोक्ता विवरण',
    storeDetails: 'दोषी व्यापारी / दुकान विवरण',
    productDetails: 'खरीदी गई वस्तु एवं एमआरपी साक्ष्य',
    generateNoticeBtn: 'औपचारिक विधिक मांग नोटिस तैयार करें',
    copyNoticeBtn: 'नोटिस क्लिपबोर्ड पर कॉपी करें',
    printNoticeBtn: 'नोटिस प्रिंट / निर्यात करें',

    // Rules
    rulesTitle: 'विधिक मापविज्ञान नियम एवं दंड संग्रह',
    rulesSubtitle: 'विधिक मापविज्ञान अधिनियम 2009 एवं डिब्बाबंद वस्तुएं नियम 2011 के अंतर्गत अपने उपभोक्ता अधिकारों को जानें।',
    rulesTabRules: 'डिब्बाबंद वस्तुएं नियम',
    rulesTabCalc: 'दंड कैलकुलेटर',
    rulesTabTolerances: 'स्वीकार्य वजन सहिष्णुता सीमा',

    // Analytics
    analyticsTitle: 'अखिल भारतीय प्रवर्तन एवं उल्लंघन डैशबोर्ड',
    totalScans: 'कुल पैकेट ऑडिट',
    totalReports: 'सक्रिय दुकान शिकायतें',
    penaltiesLevied: 'अनुमानित कुल दंड',
    hotspotsTitle: 'उच्च जोखिम उल्लंघन क्षेत्र'
  },
  ta: {
    // Top Bar
    ministryTitle: 'நுகர்வோர் விவகாரங்கள், உணவு மற்றும் பொது விநியோக அமைச்சகம் | இந்திய அரசு',
    metrologyRulesTag: 'சட்ட அளவியல் (பொதி செய்யப்பட்ட பொருட்கள்) விதிகள் 2011',
    backendActive: 'சர்வர் செயலில் உள்ளது',
    connecting: 'இணைக்கிறது...',
    themeLight: 'வெளிச்சம்',
    themeDark: 'இருள்',
    mobileAppView: '📱 மொபைல் ஆப் காட்சி',
    exitPhoneMode: 'ஃபோன் பயன்முறையிலிருந்து வெளியேறு',
    downloadApp: 'ஆப் பதிவிறக்கு',
    
    // Main Brand
    appTitle: 'பாக்கெட் ஸ்கேனர்',
    appSubtitle: 'சட்ட அளவியல் இணக்கம், இரட்டை MRP கூடுதல் விலை கண்டறிதல் மற்றும் அகில இந்திய வரைபடம்',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'பாக்கெட் ஸ்கேனர்',
    tabMap: 'அகில இந்திய வரைபடம்',
    tabRules: 'விதிகள் & அபராதங்கள்',
    tabGrievance: 'புகார் தாக்கல் செய்க',
    tabAnalytics: 'அமலாக்க புள்ளிவிவரங்கள்',
    tabDownload: 'மொபைல் ஆப் பதிவிறக்கம்',
    liveBadge: 'நேரலை',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'பொருட்கள் பாக்கெட் OCR & சட்ட ஆய்வு',
    scannerDesc: 'விதி 6-ன் கீழ் கட்டாய அறிவிப்புகளை ஆய்வு செய்ய பாக்கெட் புகைப்படத்தை பதிவேற்றவும் அல்லது கேமரா மூலம் படம் எடுக்கவும்.',
    samplePresets: 'மாதிரி பாக்கெட்டுகள்',
    samplePresetsDesc: 'அல்லது உண்மையான விதிமீறல் வழக்குகளை சோதிக்கவும்:',
    uploadOrDrop: 'பாக்கெட் படத்தை இங்கே பதிவேற்றவும்',
    supportedFormats: 'JPG, PNG, WEBP ஆதரிக்கப்படுகிறது (அதிகபட்சம் 15MB)',
    takePhoto: 'கேமரா திறக்க',
    stopCamera: 'கேமரா நிறுத்து',
    capturePhoto: 'படம் எடுக்க',
    clearPhoto: 'படத்தை நீக்கு',
    runAudit: 'AI சட்ட அளவியல் தணிக்கை செய்க',
    analyzingText: 'பாக்கெட் லேபிள்கள் சரிபார்க்கப்படுகின்றன...',
    analysisInProgress: 'OCR உரை படிக்கப்பட்டு இரட்டை MRP விதிமீறல்கள் ஆராயப்படுகின்றன...',
    
    // Audit Results
    complianceScore: 'இணக்க மதிப்பீடு',
    statusCompliant: 'சரியானது (தேர்ச்சி)',
    statusMinor: 'சிறிய விதிமீறல்',
    statusSevere: 'கடுமையான சட்ட விதிமீறல்',
    summaryTitle: 'தணிக்கை அறிக்கை',
    mandatoryDisclosures: 'கட்டாய அறிவிப்புகள் தணிக்கை (விதி 6)',
    violationsDetected: 'கண்டறியப்பட்ட விதிமீறல்கள்',
    estimatedLiability: 'மதிப்பிடப்பட்ட அபராதத் தொகை',
    recommendedActions: 'நுகர்வோர் தீர்வு நடவடிக்கை',
    fileNoticeBtn: 'சட்ட நோட்டீஸ் உருவாக்கவும்',
    viewOnRadarBtn: 'வரைபடத்தில் பார்க்கவும்',
    
    // Mobile Download Card
    quickDownloadTitle: 'மொபைல் ஆப் பதிவிறக்கம்',
    quickDownloadSubtitle: 'உங்கள் மொபைலில் நேரடியாக பாக்கெட்களை ஸ்கேன் செய்யுங்கள்',
    quickDownloadDesc: 'நேரலை OCR பார்கோடு ஸ்கேனிங் மற்றும் இரட்டை MRP சோதனையை உங்கள் தொலைபேசியில் பயன்படுத்தவும்.',
    downloadInstallBtn: 'ஆப் பதிவிறக்க / நிறுவ',
    copyLinkBtn: 'இணைப்பை நகலெடு',
    linkCopiedAlert: 'இணைப்பு நகலெடுக்கப்பட்டது! நிறுவ உங்கள் தொலைபேசி உலாவியில் ஒட்டவும்.',
    platformSupport: 'Android & iOS ஆதரிக்கப்படுகிறது',
    freeNoAccount: 'இலவசம் • கணக்கு தேவையில்லை',

    // Common
    language: 'மொழி',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    search: 'தேடுக',
    filter: 'வடிகட்டி',
    close: 'மூடுக',
    back: 'பின்செல்',
    submit: 'சமர்ப்பிக்க'
  },
  te: {
    // Top Bar
    ministryTitle: 'వినియోగదారుల వ్యవహారాలు, ఆహార మరియు ప్రజా పంపిణీ మంత్రిత్వ శాఖ | భారత ప్రభుత్వం',
    metrologyRulesTag: 'లీగల్ మెట్రాలజీ (ప్యాకేజ్డ్ కమోడిటీస్) నిబంధనలు 2011',
    backendActive: 'సర్వర్ క్రియాశీలంగా ఉంది',
    connecting: 'కనెక్ట్ అవుతోంది...',
    themeLight: 'లైట్',
    themeDark: 'డార్క్',
    mobileAppView: '📱 మొబైల్ యాప్ వీక్షణ',
    exitPhoneMode: 'ఫోన్ మోడ్ నుండి నిష్క్రమించు',
    downloadApp: 'యాప్ డౌన్‌లోడ్',
    
    // Main Brand
    appTitle: 'ప్యాకెట్ స్కానర్',
    appSubtitle: 'లీగల్ మెట్రాలజీ నిబంధనల తనిఖీ, ద్వంద్వ MRP అధిక ధరల గుర్తింపు మరియు ఉల్లంఘన మ్యాప్',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'ప్యాకెట్ స్కానర్',
    tabMap: 'భారత ఉల్లంఘనల మ్యాప్',
    tabRules: 'నిబంధనలు & జరిమానాలు',
    tabGrievance: 'ఫిర్యాదు దాఖలు చేయండి',
    tabAnalytics: 'అమలు గణాంకాలు',
    tabDownload: 'మొబైల్ యాప్ డౌన్‌లోడ్',
    liveBadge: 'లైవ్',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'ప్యాకెట్ లేబుల్ OCR & లీగల్ తనిఖీ',
    scannerDesc: 'రూల్ 6 నిబంధనలను ఆటోమేటిక్‌గా తనిఖీ చేయడానికి మరియు డ్యూయల్ MRP మోసాలను గుర్తించడానికి ప్యాకెట్ ఫోటోను తీయండి లేదా అప్‌లోడ్ చేయండి.',
    samplePresets: 'నమూనా ప్యాకెట్లు',
    samplePresetsDesc: 'లేదా వాస్తవ ఉల్లంఘన కేసులతో పరీక్షించండి:',
    uploadOrDrop: 'ప్యాకెట్ ఫోటోను ఇక్కడ అప్‌లోడ్ చేయండి',
    supportedFormats: 'JPG, PNG, WEBP మద్దతు ఉంది (గరిష్టంగా 15MB)',
    takePhoto: 'కెమెరా ప్రారంభించండి',
    stopCamera: 'కెమెరా ఆపండి',
    capturePhoto: 'ఫోటో తీయండి',
    clearPhoto: 'ఫోటో తొలగించండి',
    runAudit: 'AI లీగల్ మెట్రాలజీ ఆడిట్ ప్రారంభించండి',
    analyzingText: 'లేబుల్ వివరాలు మరియు ప్రకటనలు తనిఖీ చేయబడుతున్నాయి...',
    analysisInProgress: 'OCR టెక్స్ట్ రీడ్ చేయబడుతోంది, నిబంధనలు మరియు డ్యూయల్ MRP మోసాలు పరిశీలించబడుతున్నాయి...',
    
    // Audit Results
    complianceScore: 'నిబంధనల స్కోరు',
    statusCompliant: 'పూర్తి నిబంధనల ప్రకారం ఉంది (పాస్)',
    statusMinor: 'చిన్న ఉల్లంఘన',
    statusSevere: 'తీవ్రమైన చట్టపరమైన ఉల్లంఘన',
    summaryTitle: 'ఆడిట్ సారాంశం',
    mandatoryDisclosures: 'తప్పనిసరి ప్రకటనల తనిఖీ (రూల్ 6)',
    violationsDetected: 'గుర్తించబడిన ఉల్లంఘనలు',
    estimatedLiability: 'అంచనా వేసిన చట్టబద్ధమైన జరిమానా',
    recommendedActions: 'వినియోగదారు చర్యలు & పరిష్కారాలు',
    fileNoticeBtn: 'లీగల్ నోటీసు రూపొందించండి',
    viewOnRadarBtn: 'రాడార్ మ్యాప్‌లో చూడండి',
    
    // Mobile Download Card
    quickDownloadTitle: 'మొబైల్ యాప్ డౌన్‌లోడ్ చేసుకోండి',
    quickDownloadSubtitle: 'మీ ఫోన్ నుండి నేరుగా స్టోర్‌లలో ప్యాకెట్‌లను స్కాన్ చేయండి',
    quickDownloadDesc: 'లైవ్ OCR బార్‌కోడ్ స్కానింగ్ మరియు డ్యూయల్ MRP మోసాలను సులభంగా పట్టుకోవడానికి యాప్ ఇన్‌స్టాల్ చేయండి.',
    downloadInstallBtn: 'యాప్ డౌన్‌లోడ్ / ఇన్‌స్టాల్ చేయండి',
    copyLinkBtn: 'లింక్ కాపీ చేయండి',
    linkCopiedAlert: 'మొబైల్ లింక్ కాపీ చేయబడింది! మీ ఫోన్ బ్రౌజర్‌లో పేస్ట్ చేసి ఇన్‌స్టాల్ చేయండి.',
    platformSupport: 'ఆండ్రాయిడ్ & iOS రెండింటికీ అనుకూలం',
    freeNoAccount: 'ఉచితం • ఎటువంటి ఖాతా అవసరం లేదు',

    // Common
    language: 'భాష',
    selectLanguage: 'భాషను ఎంచుకోండి',
    search: 'శోధించండి',
    filter: 'ఫిల్టర్',
    close: 'మూసివేయి',
    back: 'వెనుకకు',
    submit: 'సమర్పించండి'
  },
  bn: {
    // Top Bar
    ministryTitle: 'ভোক্তা বিষয়ক, খাদ্য ও গণবন্টন মন্ত্রক | ভারত সরকার',
    metrologyRulesTag: 'আইনগত পরিমাপবিজ্ঞান (প্যাকেজজাত পণ্য) বিধিমালা ২০১১',
    backendActive: 'সার্ভার সক্রিয়',
    connecting: 'সংযোগ করা হচ্ছে...',
    themeLight: 'হালকা',
    themeDark: 'গাঢ়',
    mobileAppView: '📱 মোবাইল অ্যাপ ভিউ',
    exitPhoneMode: 'ফোন মোড বন্ধ করুন',
    downloadApp: 'অ্যাপ ডাউনলোড করুন',
    
    // Main Brand
    appTitle: 'প্যাকেট স্ক্যানার',
    appSubtitle: 'আইনি পরিমাপবিজ্ঞান সম্মতি, দ্বৈত MRP অতিরিক্ত মূল্য সনাক্তকরণ এবং নিখিল ভারত লঙ্ঘন মানচিত্র',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'প্যাকেট স্ক্যানার',
    tabMap: 'নিখিল ভারত লঙ্ঘন মানচিত্র',
    tabRules: 'নিয়ম ও জরিমানা বিধান',
    tabGrievance: 'অভিযোগ দায়ের করুন',
    tabAnalytics: 'প্রয়োগ সংক্রান্ত পরিসংখ্যান',
    tabDownload: 'মোবাইল অ্যাপ ডাউনলোড করুন',
    liveBadge: 'লাইভ',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'প্যাকেট লেবেল ওসিআর ও সম্মতি পরিদর্শক',
    scannerDesc: 'নিয়ম ৬ এর অধীনে বাধ্যতামূলক ঘোষণাগুলির স্বয়ংক্রিয় যাচাই করতে এবং দ্বৈত MRP জালিয়াতি সনাক্ত করতে প্যাকেটের ছবি তুলুন বা আপলোড করুন।',
    samplePresets: 'নমুনা প্যাকেট',
    samplePresetsDesc: 'অথবা বাস্তব লঙ্ঘন কেস দিয়ে পরীক্ষা করুন:',
    uploadOrDrop: 'প্যাকেটের ছবি এখানে দিন বা ফাইল নির্বাচন করুন',
    supportedFormats: 'JPG, PNG, WEBP সমর্থিত (সর্বোচ্চ ১৫MB)',
    takePhoto: 'ক্যামেরা চালু করুন',
    stopCamera: 'ক্যামেরা বন্ধ করুন',
    capturePhoto: 'ছবি তুলুন',
    clearPhoto: 'ছবি মুছুন',
    runAudit: 'এআই লিগ্যাল মেট্রোলজি অডিট চালান',
    analyzingText: 'লেবেল ঘোষণা এবং তথ্য যাচাই করা হচ্ছে...',
    analysisInProgress: 'ওসিআর টেক্সট পড়া হচ্ছে ও দ্বৈত MRP লঙ্ঘন অনুসন্ধান করা হচ্ছে...',
    
    // Audit Results
    complianceScore: 'সম্মতি স্কোর',
    statusCompliant: 'সম্পূর্ণ অনুবর্তী (পাস)',
    statusMinor: 'সামান্য লঙ্ঘন',
    statusSevere: 'গুরুতর আইনি লঙ্ঘন',
    summaryTitle: 'অডিট সারাংশ',
    mandatoryDisclosures: 'বাধ্যতামূলক ঘোষণা যাচাই (নিয়ম ৬)',
    violationsDetected: 'চিহ্নিত আইনি লঙ্ঘন',
    estimatedLiability: 'আনুমানিক আইনি জরিমানা',
    recommendedActions: 'ভোক্তা প্রতিকার পরিকল্পনা',
    fileNoticeBtn: 'আইনি নোটিশ তৈরি করুন',
    viewOnRadarBtn: 'মানচিত্রে দেখুন',
    
    // Mobile Download Card
    quickDownloadTitle: 'মোবাইল অ্যাপ ডাউনলোড করুন',
    quickDownloadSubtitle: 'দোকানে আপনার ফোন থেকে সরাসরি প্যাকেট স্ক্যান করুন',
    quickDownloadDesc: 'লাইভ ওসিআর বারকোড স্ক্যানিং এবং দ্বৈত MRP যাচাইয়ের জন্য আপনার ফোনে অ্যাপ ইনস্টল করুন।',
    downloadInstallBtn: 'অ্যাপ ডাউনলোড / ইনস্টল করুন',
    copyLinkBtn: 'লিঙ্ক কপি করুন',
    linkCopiedAlert: 'মোবাইল লিঙ্ক কপি হয়েছে! ইনস্টল করতে ফোনে ক্রোম ব্রাউজারে পেস্ট করুন।',
    platformSupport: 'অ্যান্ড্রয়েড এবং আইওএস উভয়ের জন্য',
    freeNoAccount: 'বিনামূল্যে • কোনো অ্যাকাউন্টের প্রয়োজন নেই',

    // Common
    language: 'ভাষা',
    selectLanguage: 'ভাষা নির্বাচন করুন',
    search: 'অনুসন্ধান',
    filter: 'ফিল্টার',
    close: 'বন্ধ করুন',
    back: 'পেছনে যান',
    submit: 'জমা দিন'
  },
  mr: {
    // Top Bar
    ministryTitle: 'ग्राहक व्यवहार, अन्न आणि सार्वजनिक वितरण मंत्रालय | भारत सरकार',
    metrologyRulesTag: 'कायदेशीर वजन व मापे (पॅक केलेल्या वस्तू) नियम २०११',
    backendActive: 'सर्व्हर सक्रिय',
    connecting: 'कनेक्ट होत आहे...',
    themeLight: 'लाइट',
    themeDark: 'डार्क',
    mobileAppView: '📱 मोबाईल ॲप दृश्य',
    exitPhoneMode: 'फोन मोड बंद करा',
    downloadApp: 'ॲप डाउनलोड करा',
    
    // Main Brand
    appTitle: 'पॅकेट स्कॅनर',
    appSubtitle: 'कायदेशीर वजन व मापे अनुपालन, ड्युअल एमआरपी जादा दर तपासणी आणि अखिल भारतीय नकाशा',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'पॅकेट स्कॅनर',
    tabMap: 'अखिल भारतीय उल्लंघन नकाशा',
    tabRules: 'नियम व दंड तरतुदी',
    tabGrievance: 'तक्रार / कायदेशीर नोटीस नोंदवा',
    tabAnalytics: 'अंमलबजावणी आकडेवारी',
    tabDownload: 'मोबाईल ॲप डाउनलोड करा',
    liveBadge: 'थेट (Live)',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'पॅकेट लेबल ओसीआर व कायदेशीर तपासणी',
    scannerDesc: 'नियम ६ अंतर्गत अनिवार्य घोषणांची स्वयंचलित तपासणी करण्यासाठी पॅकेटचा फोटो अपलोड करा किंवा कॅमेऱ्याने काढा.',
    samplePresets: 'नमुने पॅकेट',
    samplePresetsDesc: 'किंवा प्रत्यक्ष उल्लंघन प्रकरणांसह तपासा:',
    uploadOrDrop: 'पॅकेटचा फोटो येथे अपलोड करा',
    supportedFormats: 'JPG, PNG, WEBP समर्थित (कमाल 15MB)',
    takePhoto: 'कॅमेरा सुरू करा',
    stopCamera: 'कॅमेरा बंद करा',
    capturePhoto: 'फोटो काढा',
    clearPhoto: 'फोटो हटवा',
    runAudit: 'एआय कायदेशीर मेट्रोलॉजी ऑडिट करा',
    analyzingText: 'लेबल घोषणांची तपासणी सुरू आहे...',
    analysisInProgress: 'ओसीआर मजकूर वाचला जात आहे आणि ड्युअल एमआरपीची पडताळणी होत आहे...',
    
    // Audit Results
    complianceScore: 'अनुपालन गुण',
    statusCompliant: 'कायदेशीररित्या योग्य (पास)',
    statusMinor: 'किरकोळ उल्लंघन',
    statusSevere: 'गंभीर कायदेशीर उल्लंघन',
    summaryTitle: 'ऑडिट सारांश',
    mandatoryDisclosures: 'अनिवार्य घोषणा तपासणी (नियम ६)',
    violationsDetected: 'आढळलेले कायदेशीर उल्लंघन',
    estimatedLiability: 'अंदाजे कायदेशीर दंड रक्कम',
    recommendedActions: 'ग्राहक कृती योजना व उपाय',
    fileNoticeBtn: 'कायदेशीर नोटीस तयार करा',
    viewOnRadarBtn: 'उल्लंघन नकाशावर पहा',
    
    // Mobile Download Card
    quickDownloadTitle: 'मोबाईल ॲप डाउनलोड करा',
    quickDownloadSubtitle: 'दुकानात आपल्या फोनवरून थेट पॅकेट स्कॅन करा',
    quickDownloadDesc: 'थेट ओसीआर बारकोड स्कॅनिंग, ड्युअल एमआरपी पडताळणीसाठी ॲप त्वरित इन्स्टॉल करा.',
    downloadInstallBtn: 'ॲप डाउनलोड / इन्स्टॉल करा',
    copyLinkBtn: 'लिंक कॉपी करा',
    linkCopiedAlert: 'मोबाईल लिंक कॉपी झाली! आपल्या फोनमधील ब्राऊझरमध्ये पेस्ट करून इन्स्टॉल करा.',
    platformSupport: 'अँड्रॉइड आणि आयफोन दोन्हीसाठी',
    freeNoAccount: 'मोफत • कोणत्याही खात्याची गरज नाही',

    // Common
    language: 'भाषा',
    selectLanguage: 'भाषा निवडा',
    search: 'शोधा',
    filter: 'फिल्टर',
    close: 'बंद करा',
    back: 'मागे',
    submit: 'सादर करा'
  },
  gu: {
    // Top Bar
    ministryTitle: 'ગ્રાહક બાબતો, ખાદ્ય અને જાહેર વિતરણ મંત્રાલય | ભારત સરકાર',
    metrologyRulesTag: 'લીગલ મેટ્રોલોજી (પેકેજ્ડ કોમોડિટીઝ) નિયમો ૨૦૧૧',
    backendActive: 'સર્વર સક્રિય',
    connecting: 'જોડાઈ રહ્યું છે...',
    themeLight: 'લાઇટ',
    themeDark: 'ડાર્ક',
    mobileAppView: '📱 મોબાઇલ એપ વ્યુ',
    exitPhoneMode: 'ફોન મોડ બંધ કરો',
    downloadApp: 'એપ ડાઉનલોડ કરો',
    
    // Main Brand
    appTitle: 'પેકેટ સ્કેનર',
    appSubtitle: 'લીગલ મેટ્રોલોજી પાલન, ડ્યુઅલ MRP ઓવરચાર્જિંગ તપાસ અને અખિલ ભારતીય ઉલ્લંઘન નકશો',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'પેકેટ સ્કેનર',
    tabMap: 'અખિલ ભારતીય ઉલ્લંઘન નકશો',
    tabRules: 'નિયમો અને દંડની જોગવાઈ',
    tabGrievance: 'ફરિયાદ / કાનૂની નોટિસ દાખલ કરો',
    tabAnalytics: 'અમલીકરણ આંકડા',
    tabDownload: 'મોબાઇલ એપ ડાઉનલોડ કરો',
    liveBadge: 'લાઇવ',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'પેકેટ લેબલ OCR અને કાનૂની પાલન નિરીક્ષક',
    scannerDesc: 'નિયમ 6 હેઠળ ફરજિયાત જાહેરાતો આપમેળે તપાસવા માટે પેકેટનો ફોટો લો અથવા અપલોડ કરો.',
    samplePresets: 'નમૂના પેકેટો',
    samplePresetsDesc: 'અથવા વાસ્તવિક ઉલ્લંઘન કેસો સાથે પરીક્ષણ કરો:',
    uploadOrDrop: 'પેકેટનો ફોટો અહીં અપલોડ કરો',
    supportedFormats: 'JPG, PNG, WEBP સપોર્ટેડ (મહત્તમ 15MB)',
    takePhoto: 'કેમેરો શરૂ કરો',
    stopCamera: 'કેમેરો બંધ કરો',
    capturePhoto: 'ફોટો લો',
    clearPhoto: 'ફોટો કાઢી નાખો',
    runAudit: 'AI લીગલ મેટ્રોલોજી ઓડિટ કરો',
    analyzingText: 'પેકેટ લેબલ જાહેરાતોની ચકાસણી ચાલુ છે...',
    analysisInProgress: 'OCR લખાણ વાંચવામાં આવી રહ્યું છે અને ડ્યુઅલ MRP ની તપાસ થઈ રહી છે...',
    
    // Audit Results
    complianceScore: 'પાલન સ્કોર',
    statusCompliant: 'સંપૂર્ણ કાયદેસર (પાસ)',
    statusMinor: 'નાનું ઉલ્લંઘન',
    statusSevere: 'ગંભીર કાનૂની ઉલ્લંઘન',
    summaryTitle: 'ઓડિટ સારાંશ',
    mandatoryDisclosures: 'ફરજિયાત જાહેરાતોની ચકાસણી (નિયમ 6)',
    violationsDetected: 'શોધાયેલ કાનૂની ઉલ્લંઘન',
    estimatedLiability: 'અંદાજિત કાનૂની દંડની રકમ',
    recommendedActions: 'ગ્રાહક પગલાં અને ઉપાયો',
    fileNoticeBtn: 'કાનૂની ડિમાન્ડ નોટિસ બનાવો',
    viewOnRadarBtn: 'ઉલ્લંઘન નકશા પર જુઓ',
    
    // Mobile Download Card
    quickDownloadTitle: 'મોબાઇલ એપ ડાઉનલોડ કરો',
    quickDownloadSubtitle: 'દુકાન પર તમારા ફોનથી સીધા પેકેટ સ્કેન કરો',
    quickDownloadDesc: 'લાઇવ OCR સ્કેનિંગ અને ડ્યુઅલ MRP પકડવા માટે એપ ઇન્સ્ટોલ કરો.',
    downloadInstallBtn: 'એપ ડાઉનલોડ / ઇન્સ્ટોલ કરો',
    copyLinkBtn: 'લિંક કોપી કરો',
    linkCopiedAlert: 'મોબાઇલ લિંક કોપી થઈ ગઈ! ઇન્સ્ટોલ કરવા માટે ફોન બ્રાઉઝરમાં પેસ્ટ કરો.',
    platformSupport: 'એન્ડ્રોઇડ અને આઇઓએસ બંને માટે',
    freeNoAccount: 'મફત • કોઈ એકાઉન્ટની જરૂર નથી',

    // Common
    language: 'ભાષા',
    selectLanguage: 'ભાષા પસંદ કરો',
    search: 'શોધો',
    filter: 'ફિલ્ટર',
    close: 'બંધ કરો',
    back: 'પાછા',
    submit: 'સબમિટ કરો'
  },
  kn: {
    // Top Bar
    ministryTitle: 'ಗ್ರಾಹಕ ವ್ಯವಹಾರಗಳು, ಆಹಾರ ಮತ್ತು ಸಾರ್ವಜನಿಕ ವಿತರಣಾ ಸಚಿವಾಲಯ | ಭಾರತ ಸರ್ಕಾರ',
    metrologyRulesTag: 'ಲೀಗಲ್ ಮೆಟ್ರಾಲಜಿ (ಪ್ಯಾಕ್ ಮಾಡಿದ ಸರಕುಗಳು) ನಿಯಮಗಳು 2011',
    backendActive: 'ಸರ್ವರ್ ಸಕ್ರಿಯವಾಗಿದೆ',
    connecting: 'ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ...',
    themeLight: 'ಬೆಳಕು',
    themeDark: 'ಕತ್ತಲೆ',
    mobileAppView: '📱 ಮೊಬೈಲ್ ಆಪ್ ವೀಕ್ಷಣೆ',
    exitPhoneMode: 'ಫೋನ್ ಮೋಡ್‌ನಿಂದ ನಿರ್ಗಮಿಸಿ',
    downloadApp: 'ಆಪ್ ಡೌನ್‌ಲೋಡ್',
    
    // Main Brand
    appTitle: 'ಪ್ಯಾಕೆಟ್ ಸ್ಕ್ಯಾನರ್',
    appSubtitle: 'ಲೀಗಲ್ ಮೆಟ್ರಾಲಜಿ ಅನುಸರಣೆ, ಡ್ಯುಯಲ್ MRP ತಪಾಸಣೆ ಮತ್ತು ಭಾರತೀಯ ಉಲ್ಲಂಘನೆ ನಕ್ಷೆ',
    version: 'v2.6',
    
    // Tabs
    tabScanner: 'ಪ್ಯಾಕೆಟ್ ಸ್ಕ್ಯಾನರ್',
    tabMap: 'ಭಾರತೀಯ ಉಲ್ಲಂಘನೆ ನಕ್ಷೆ',
    tabRules: 'ನಿಯಮಗಳು & ದಂಡಗಳು',
    tabGrievance: 'ದೂರು ದಾಖಲಿಸಿ',
    tabAnalytics: 'ಜಾರಿ ಅಂಕಿಅಂಶಗಳು',
    tabDownload: 'ಮೊಬೈಲ್ ಆಪ್ ಡೌನ್‌ಲೋಡ್',
    liveBadge: 'ಲೈವ್',
    apkPwaBadge: 'APK / PWA',

    // Scanner View
    scannerTitle: 'ಪ್ಯಾಕೆಟ್ ಲೇಬಲ್ OCR & ಲೀಗಲ್ ಪರಿಶೀಲನೆ',
    scannerDesc: 'ನಿಯಮ 6 ರ ಅಡಿಯಲ್ಲಿ ಕಡ್ಡಾಯ ಪ್ರಕಟಣೆಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಪರಿಶೀಲಿಸಲು ಪ್ಯಾಕೆಟ್ ಫೋಟೋ ತೆಗೆಯಿರಿ ಅಥವಾ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ.',
    samplePresets: 'ಮಾದರಿ ಪ್ಯಾಕೆಟ್‌ಗಳು',
    samplePresetsDesc: 'ಅಥವಾ ನೈಜ ಉಲ್ಲಂಘನೆ ಪ್ರಕರಣಗಳೊಂದಿಗೆ ಪರೀಕ್ಷಿಸಿ:',
    uploadOrDrop: 'ಪ್ಯಾಕೆಟ್ ಫೋಟೋವನ್ನು ಇಲ್ಲಿ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    supportedFormats: 'JPG, PNG, WEBP ಬೆಂಬಲಿತವಾಗಿದೆ (ಗರಿಷ್ಠ 15MB)',
    takePhoto: 'ಕ್ಯಾಮೆರಾ ಪ್ರಾರಂಭಿಸಿ',
    stopCamera: 'ಕ್ಯಾಮೆರಾ ನಿಲ್ಲಿಸಿ',
    capturePhoto: 'ಫೋಟೋ ತೆಗೆಯಿರಿ',
    clearPhoto: 'ಫೋಟೋ ತೆಗೆದುಹಾಕಿ',
    runAudit: 'AI ಲೀಗಲ್ ಮೆಟ್ರಾಲಜಿ ಆಡಿಟ್ ಪ್ರಾರಂಭಿಸಿ',
    analyzingText: 'ಲೇಬಲ್ ಘೋಷಣೆಗಳನ್ನು ಪರಿಶೀಲಿಸಲಾಗುತ್ತಿದೆ...',
    analysisInProgress: 'OCR ಪಠ್ಯವನ್ನು ಓದಲಾಗುತ್ತಿದೆ ಮತ್ತು ಡ್ಯುಯಲ್ MRP ತಪಾಸಣೆ ಮಾಡಲಾಗುತ್ತಿದೆ...',
    
    // Audit Results
    complianceScore: 'ಅನುಸರಣಾ ಸ್ಕೋರ್',
    statusCompliant: 'ಸಂಪೂರ್ಣ ನಿಯಮಾನುಸಾರವಾಗಿದೆ (ಪಾಸ್)',
    statusMinor: 'ಸಣ್ಣ ಉಲ್ಲಂಘನೆ',
    statusSevere: 'ಗಂಭೀರ ಕಾನೂನು ಉಲ್ಲಂಘನೆ',
    summaryTitle: 'ಆಡಿಟ್ ಸಾರಾಂಶ',
    mandatoryDisclosures: 'ಕಡ್ಡಾಯ ಘೋಷಣೆಗಳ ಪರಿಶೀಲನೆ (ನಿಯಮ 6)',
    violationsDetected: 'ಪತ್ತೆಯಾದ ಕಾನೂನು ಉಲ್ಲಂಘನೆಗಳು',
    estimatedLiability: 'ಅಂದಾಜು ಶಾಸನಬದ್ಧ ದಂಡ ಮೊತ್ತ',
    recommendedActions: 'ಗ್ರಾಹಕ ಪರಿಹಾರ ಕ್ರಮಗಳು',
    fileNoticeBtn: 'ಕಾನೂನು ನೋಟಿಸ್ ರಚಿಸಿ',
    viewOnRadarBtn: 'ನಕ್ಷೆಯಲ್ಲಿ ವೀಕ್ಷಿಸಿ',
    
    // Mobile Download Card
    quickDownloadTitle: 'ಮೊಬೈಲ್ ಆಪ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    quickDownloadSubtitle: 'ಅಂಗಡಿಯಲ್ಲಿ ನಿಮ್ಮ ಫೋನ್‌ನಿಂದ ನೇರವಾಗಿ ಪ್ಯಾಕೆಟ್‌ಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    quickDownloadDesc: 'ಲೈವ್ OCR ಬಾರ್‌ಕೋಡ್ ಸ್ಕ್ಯಾನಿಂಗ್ ಮತ್ತು ಡ್ಯುಯಲ್ MRP ಪರಿಶೀಲನೆಗಾಗಿ ಆಪ್ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.',
    downloadInstallBtn: 'ಆಪ್ ಡೌನ್‌ಲೋಡ್ / ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ',
    copyLinkBtn: 'ಲಿಂಕ್ ನಕಲಿಸಿ',
    linkCopiedAlert: 'ಮೊಬೈಲ್ ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ! ನಿಮ್ಮ ಫೋನ್ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿ.',
    platformSupport: 'ಆಂಡ್ರಾಯ್ಡ್ ಮತ್ತು ಐಒಎಸ್ ಎರಡಕ್ಕೂ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ',
    freeNoAccount: 'ಉಚಿತ • ಯಾವುದೇ ಖಾತೆಯ ಅಗತ್ಯವಿಲ್ಲ',

    // Common
    language: 'ಭಾಷೆ',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    search: 'ಹುಡುಕಿ',
    filter: 'ಫಿಲ್ಟರ್',
    close: 'ಮುಚ್ಚಿ',
    back: 'ಹಿಂದೆ',
    submit: 'ಸಲ್ಲಿಸಿ'
  }
};
