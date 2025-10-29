import { Page, Shelter, Volunteer, Donation, PendingShelter } from './types';

export const APP_NAME = "ShelterConnect India";

export const TEXTS = {
  // General
  appName: { en: APP_NAME, hi: "शेल्टरकनेक्ट इंडिया", ta: "ஷெல்டர்கனெக்ட் இந்தியா" },
  submit: { en: "Submit", hi: "प्रस्तुत करें", ta: "சமர்ப்பி" },
  loading: { en: "Loading...", hi: "लोड हो रहा है...", ta: "ஏற்றுகிறது..." },

  // Header & Navigation
  [Page.Home]: { en: "Home", hi: "होम", ta: "முகப்பு" },
  [Page.ShelterFinder]: { en: "Find Shelter", hi: "आश्रय खोजें", ta: "தங்குமிடம் தேடு" },
  [Page.RegisterShelter]: { en: "Register Shelter", hi: "आश्रय पंजीकृत करें", ta: "தங்குமிடத்தைப் பதிவு செய்" },
  [Page.Donate]: { en: "Donate", hi: "दान करें", ta: "நன்கொடை" },
  [Page.Volunteer]: { en: "Volunteer", hi: "स्वयंसेवक बनें", ta: "தன்னார்வலர்" },
  [Page.Awareness]: { en: "Awareness", hi: "जागरूकता", ta: "விழிப்புணர்வு" },
  login: { en: "Login", hi: "लॉग इन करें", ta: "உள்நுழை" },
  logout: { en: "Logout", hi: "लॉग आउट करें", ta: "வெளியேறு" },
  
  // SOS Button
  sos: { en: "SOS", hi: "एसओएस", ta: "SOS" },
  emergencyContacts: { en: "Emergency Contacts", hi: "आपातकालीन संपर्क", ta: "அவசரக்கால தொடர்புகள்" },
  helplineInfo: { 
    en: "If you are in immediate danger, please contact these numbers. They are available 24/7.",
    hi: "यदि आप तत्काल खतरे में हैं, तो कृपया इन नंबरों पर संपर्क करें। वे 24/7 उपलब्ध हैं।",
    ta: "நீங்கள் உடனடி ஆபத்தில் இருந்தால், இந்த எண்களைத் தொடர்பு கொள்ளவும். அவை 24/7 கிடைக்கும்."
  },
  police: { en: "Police", hi: "पुलिस", ta: "காவல்துறை" },
  ambulance: { en: "Ambulance", hi: "एंबुलेंस", ta: "ஆம்புலன்ஸ்" },
  womensHelpline: { en: "Women's Helpline", hi: "महिला हेल्पलाइन", ta: "பெண்கள் உதவி எண்" },
  childHelpline: { en: "Child Helpline", hi: "चाइल्ड हेल्पलाइन", ta: "குழந்தைகள் உதவி எண்" },

  // Home Page
  heroTitle: { en: "A Safe Haven for Everyone", hi: "सभी के लिए एक सुरक्षित आश्रय", ta: "அனைவருக்கும் ஒரு பாதுகாப்பான புகலிடம்" },
  heroSubtitle: { en: "Connecting those in need with shelters, resources, and hope across India.", hi: "पूरे भारत में ज़रूरतमंदों को आश्रय, संसाधन और आशा से जोड़ना।", ta: "இந்தியா முழுவதும் தேவைப்படுபவர்களை தங்குமிடங்கள், வளங்கள் மற்றும் நம்பிக்கையுடன் இணைத்தல்." },
  findShelterCTA: { en: "Find a Shelter Now", hi: "अभी एक आश्रय खोजें", ta: "இப்போதே ஒரு தங்குமிடம் தேடுங்கள்" },
  howItWorksTitle: { en: "How It Works", hi: "यह कैसे काम करता है", ta: "இது எப்படி வேலை செய்கிறது" },
  searchStepTitle: { en: "Search for Shelter", hi: "आश्रय खोजें", ta: "தங்குமிடம் தேடுங்கள்" },
  searchStepDesc: { en: "Use our map to find nearby shelters with available beds.", hi: "उपलब्ध बिस्तरों वाले आस-पास के आश्रयों को खोजने के लिए हमारे मानचित्र का उपयोग करें।", ta: "கிடைக்கக்கூடிய படுக்கைகளுடன் அருகிலுள்ள தங்குமிடங்களைக் கண்டறிய எங்கள் வரைபடத்தைப் பயன்படுத்தவும்." },
  getHelpStepTitle: { en: "Get Help", hi: "सहायता प्राप्त करें", ta: "உதவி பெறுங்கள்" },
  getHelpStepDesc: { en: "Connect with shelters and NGOs for immediate support and resources.", hi: "तत्काल सहायता और संसाधनों के लिए आश्रयों और गैर-सरकारी संगठनों से जुड़ें।", ta: "உடனடி ஆதரவு மற்றும் ஆதாரங்களுக்காக தங்குமிடங்கள் மற்றும் தன்னார்வ தொண்டு நிறுவனங்களுடன் இணையுங்கள்." },
  giveBackStepTitle: { en: "Give Back", hi: "वापस दें", ta: "திரும்பக் கொடுங்கள்" },
  giveBackStepDesc: { en: "Donate or volunteer to support our mission and help others.", hi: "हमारे मिशन का समर्थन करने और दूसरों की मदद करने के लिए दान करें या स्वयंसेवक बनें।", ta: "எங்கள் பணிக்கு ஆதரவளிக்கவும் மற்றவர்களுக்கு உதவவும் நன்கொடை அல்லது தன்னார்வத் தொண்டு செய்யுங்கள்." },
  aboutUsTitle: { en: "About ShelterConnect India", hi: "शेल्टरकनेक्ट इंडिया के बारे में", ta: "ஷெல்டர்கனெக்ட் இந்தியா பற்றி" },
  aboutUsImageAlt: { en: "Volunteers helping community", hi: "स्वयंसेवक समुदाय की मदद कर रहे हैं", ta: "தன்னார்வலர்கள் சமூகத்திற்கு உதவுகிறார்கள்" },
  missionTitle: { en: "Our Mission", hi: "हमारा मिशन", ta: "எங்கள் நோக்கம்" },
  aboutUsMission: { 
    en: "Our mission is to create a comprehensive, technology-driven network that connects every homeless person in India with safe, immediate, and reliable shelter. We strive to bridge the gap between those in need and the organizations that can help, ensuring no one has to sleep on the streets.", 
    hi: "हमारा मिशन एक व्यापक, प्रौद्योगिकी-संचालित नेटवर्क बनाना है जो भारत में हर बेघर व्यक्ति को सुरक्षित, तत्काल और विश्वसनीय आश्रय से जोड़ता है। हम जरूरतमंदों और मदद करने वाले संगठनों के बीच की खाई को पाटने का प्रयास करते हैं, यह सुनिश्चित करते हुए कि किसी को भी सड़कों पर न सोना पड़े।",
    ta: "பாதுப்பான, உடனடி மற்றும் நம்பகமான தங்குமிடத்துடன் இந்தியாவில் உள்ள ஒவ்வொரு வீடற்ற நபரையும் இணைக்கும் ஒரு விரிவான, தொழில்நுட்பம் சார்ந்த வலையமைப்பை உருவாக்குவதே எங்கள் நோக்கம். தேவைப்படுபவர்களுக்கும் உதவக்கூடிய அமைப்புகளுக்கும் இடையிலான இடைவெளியைக் குறைக்க நாங்கள் முயற்சி செய்கிறோம், யாரும் தெருக்களில் தூங்க வேண்டியதில்லை என்பதை உறுதிசெய்கிறோம்."
  },
  visionTitle: { en: "Our Vision", hi: "हमारा दृष्टिकोण", ta: "எங்கள் பார்வை" },
  aboutUsVision: { 
    en: "We envision an India where every individual has access to a safe and dignified place to call home. Through community collaboration, awareness, and technology, we aim to eradicate homelessness and build a more inclusive society.", 
    hi: "हम एक ऐसे भारत की कल्पना करते हैं जहां हर व्यक्ति के पास घर कहने के लिए एक सुरक्षित और सम्मानजनक जगह हो। सामुदायिक सहयोग, जागरूकता और प्रौद्योगिकी के माध्यम से, हमारा उद्देश्य बेघरता को खत्म करना और एक अधिक समावेशी समाज का निर्माण करना है।",
    ta: "ஒவ்வொரு தனிமனிதனுக்கும் வீடு என்று அழைக்க பாதுகாப்பான மற்றும் கண்ணியமான இடம் கிடைக்கும் இந்தியாவை நாங்கள் கற்பனை செய்கிறோம். சமூக ஒத்துழைப்பு, விழிப்புணர்வு மற்றும் தொழில்நுட்பத்தின் மூலம், வீடற்ற தன்மையை ஒழித்து, அனைவரையும் உள்ளடக்கிய சமுதாயத்தை உருவாக்குவதை நோக்கமாகக் கொண்டுள்ளோம்."
  },

  // Shelter Finder
  finderSubtitle: { en: "Find a safe place to stay. Search by location and filter by your needs.", hi: "रहने के लिए एक सुरक्षित स्थान खोजें। स्थान के आधार पर खोजें और अपनी आवश्यकताओं के अनुसार फ़िल्टर करें।", ta: "தங்குவதற்கு பாதுகாப்பான இடத்தைக் கண்டறியவும். இருப்பிடத்தின் அடிப்படையில் தேடி, உங்கள் தேவைகளுக்கு ஏற்ப வடிகட்டவும்." },
  searchPlaceholder: { en: "Enter city or pincode...", hi: "शहर या पिनकोड दर्ज करें...", ta: "நகரம் அல்லது பின்கோடு உள்ளிடவும்..." },
  filterBy: { en: "Filter by:", hi: "फ़िल्टर करें:", ta: "வடிகட்டவும்:" },
  men: { en: "Men", hi: "पुरुष", ta: "ஆண்கள்" },
  women: { en: "Women", hi: "महिलाएं", ta: "பெண்கள்" },
  families: { en: "Families", hi: "परिवार", ta: "குடும்பங்கள்" },
  children: { en: "Children", hi: "बच्चे", ta: "குழந்தைகள்" },
  bedsAvailable: { en: "Beds Available", hi: "उपलब्ध बिस्तर", ta: "கிடைக்கும் படுக்கைகள்" },
  getDirections: { en: "Get Directions", hi: "दिशा-निर्देश प्राप्त करें", ta: "திசைகளைப் பெறுக" },
  verified: { en: "Verified", hi: "सत्यापित", ta: "சரிபார்க்கப்பட்டது" },
  aiRecommendation: { en: "Get AI Recommendation", hi: "AI से सलाह लें", ta: "AI பரிந்துரையைப் பெறுங்கள்" },
  aiPrompt: { en: "Describe your situation (e.g., 'I am a single woman in Chennai looking for a safe shelter')", hi: "अपनी स्थिति का वर्णन करें (जैसे, 'मैं चेन्नई में एक अकेली महिला हूं और एक सुरक्षित आश्रय की तलाश में हूं')", ta: "உங்கள் சூழ்நிலையை விவரிக்கவும் (எ.கா., 'நான் சென்னையில் பாதுகாப்பான தங்குமிடம் தேடும் ஒரு தனிப் பெண்')" },
  getRecommendation: { en: "Get Recommendation", hi: "सिफारिश प्राप्त करें", ta: "பரிந்துரை பெறவும்" },
  recommendationTitle: { en: "AI Recommended Shelter for You", hi: "आपके लिए AI द्वारा अनुशंसित आश्रय", ta: "உங்களுக்கான AI பரிந்துரைக்கப்பட்ட தங்குமிடம்" },
  recommendationNotFound: { en: "Sorry, we couldn't find a suitable shelter. Please try a different description or browse the list.", hi: "क्षमा करें, हमें कोई उपयुक्त आश्रय नहीं मिला। कृपया एक अलग विवरण का प्रयास करें या सूची ब्राउज़ करें।", ta: "மன்னிக்கவும், பொருத்தமான தங்குமிடத்தைக் கண்டுபிடிக்க முடியவில்லை. வேறு விளக்கத்தை முயற்சிக்கவும் அல்லது பட்டியலை உலாவவும்." },
  recommendationError: { en: "An error occurred while getting the recommendation. Please try again.", hi: "सिफारिश प्राप्त करते समय एक त्रुटि हुई। कृपया पुन: प्रयास करें।", ta: "பரிந்துரையைப் பெறும்போது ஒரு பிழை ஏற்பட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்." },
  noSheltersFound: { en: "No shelters found matching your criteria.", hi: "आपके मानदंडों से मेल खाने वाला कोई आश्रय नहीं मिला।", ta: "உங்கள் அளவுகோல்களுடன் பொருந்தும் தங்குமிடங்கள் எதுவும் இல்லை." },
  aiModalPlaceholder: { en: "e.g., I am a mother with a young child in Delhi...", hi: "उदा., मैं दिल्ली में एक छोटे बच्चे के साथ एक माँ हूँ...", ta: "எ.கா., நான் டெல்லியில் ஒரு சிறு குழந்தையுடன் இருக்கும் ஒரு தாய்..." },
  listView: { en: "List View", hi: "सूची दृश्य", ta: "பட்டியல் காட்சி" },
  mapView: { en: "Map View", hi: "मानचित्र दृश्य", ta: "வரைபடக் காட்சி" },
  detectLocation: { en: "Detect My Location", hi: "मेरी लोकेशन का पता लगाएं", ta: "எனது இருப்பிடத்தைக் கண்டறி" },
  startLiveTracking: { en: "Start Live Tracking", hi: "लाइव ट्रैकिंग शुरू करें", ta: "நேரடி கண்காணிப்பைத் தொடங்கு" },
  stopLiveTracking: { en: "Stop Live Tracking", hi: "लाइव ट्रैकिंग बंद करें", ta: "நேரடி கண்காணிப்பை நிறுத்து" },
  detectingLocation: { en: "Detecting...", hi: "पता लगाया जा रहा है...", ta: "கண்டறியப்படுகிறது..." },
  locationError: { en: "Could not detect location. Please enable location services in your browser.", hi: "लोकेशन का पता नहीं चल सका। कृपया अपने ब्राउज़र में लोकेशन सेवाएं सक्षम करें।", ta: "இருப்பிடத்தைக் கண்டறிய முடியவில்லை. உங்கள் உலாவியில் இருப்பிடச் சேவைகளை இயக்கவும்." },
  locationNotSupported: { en: "Geolocation is not supported by your browser.", hi: "आपके ब्राउज़र द्वारा जियोलोकेशन समर्थित नहीं है।", ta: "உங்கள் உலாவியால் புவிஇருப்பிடம் ஆதரிக்கப்படவில்லை." },
  locationPermissionDenied: { en: "Location permission denied. Please check your browser settings.", hi: "स्थान की अनुमति अस्वीकार कर दी गई। कृपया अपनी ब्राउज़र सेटिंग्स जांचें।", ta: "இருப்பிட அனுமதி மறுக்கப்பட்டது. உங்கள் உலாவி அமைப்புகளைச் சரிபார்க்கவும்." },
  locationUnavailable: { en: "Location information is currently unavailable.", hi: "स्थान की जानकारी वर्तमान में अनुपलब्ध है।", ta: "இருப்பிடத் தகவல் தற்போது கிடைக்கவில்லை." },
  locationTimeout: { en: "The request to get user location timed out.", hi: "उपयोगकर्ता स्थान प्राप्त करने का अनुरोध समयबाह्य हो गया।", ta: "பயனர் இருப்பிடத்தைப் பெறுவதற்கான கோரிக்கை காலாவதியானது." },
  kmAway: { en: "{distance} km away", hi: "{distance} किमी दूर", ta: "{distance} கிமீ தொலைவில்" },
  sortBy: { en: "Sort by", hi: "इसके अनुसार क्रमबद्ध करें", ta: "வரிசைப்படுத்து" },
  sortDefault: { en: "Default", hi: "डिफ़ॉल्ट", ta: "இயல்புநிலை" },
  sortBeds: { en: "Beds Available", hi: "उपलब्ध बिस्तर", ta: "கிடைக்கும் படுக்கைகள்" },
  sortDistance: { en: "Distance (Closest)", hi: "दूरी (निकटतम)", ta: "தூரம் (அருகில்)" },
  youAreHere: { en: "You are here", hi: "आप यहाँ हैं", ta: "நீங்கள் இங்கே இருக்கிறீர்கள்" },

  // Bed Booking
  bookBed: { en: "Book Bed", hi: "बिस्तर बुक करें", ta: "படுக்கை பதிவு செய்" },
  bookBedsAt: { en: "Book Beds at {shelterName}", hi: "{shelterName} में बिस्तर बुक करें", ta: "{shelterName} இல் படுக்கைகளை பதிவு செய்யவும்" },
  numberOfPeople: { en: "Number of people", hi: "लोगों की संख्या", ta: "நபர்களின் எண்ணிக்கை" },
  confirmBooking: { en: "Confirm Booking", hi: "बुकिंग की पुष्टि करें", ta: "பதிவை உறுதிப்படுத்து" },
  bookingSuccessful: { en: "Booking Successful!", hi: "बुकिंग सफल!", ta: "பதிவு வெற்றி பெற்றது!" },
  bedsBookedMessage: { en: "{count} bed(s) have been booked at {shelterName}.", hi: "{shelterName} में {count} बिस्तर बुक कर लिए गए हैं।", ta: "{shelterName} இல் {count} படுக்கை(கள்) பதிவு செய்யப்பட்டுள்ளன." },
  noBedsAvailable: { en: "No beds available", hi: "कोई बिस्तर उपलब्ध नहीं", ta: "படுக்கைகள் இல்லை" },

  // Donate Page
  donateTitle: { en: "Your Contribution Matters", hi: "आपका योगदान मायने रखता है", ta: "உங்கள் பங்களிப்பு முக்கியமானது" },
  donateSubtitle: { en: "Every donation helps us provide safe shelter, food, and support to those in need.", hi: "प्रत्येक दान हमें ज़रूरतमंदों को सुरक्षित आश्रय, भोजन और सहायता प्रदान करने में मदद करता है।", ta: "ஒவ்வொரு நன்கொடையும் தேவைப்படுபவர்களுக்கு பாதுகாப்பான தங்குமிடம், உணவு மற்றும் ஆதரவை வழங்க எங்களுக்கு உதவுகிறது." },
  donationThankYouTitle: { en: "Thank you for your donation!", hi: "आपके दान के लिए धन्यवाद!", ta: "உங்கள் நன்கொடைக்கு நன்றி!" },
  donationThankYouSubtitle: { en: "Your contribution of ₹{amount} will make a huge difference.", hi: "आपका ₹{amount} का योगदान एक बड़ा बदलाव लाएगा।", ta: "உங்கள் ₹{amount} பங்களிப்பு ஒரு பெரிய மாற்றத்தை ஏற்படுத்தும்." },
  chooseAmountLabel: { en: "Choose an amount (₹)", hi: "एक राशि चुनें (₹)", ta: "ஒரு தொகையைத் தேர்ந்தெடுக்கவும் (₹)" },
  customAmountPlaceholder: { en: "Or enter custom amount", hi: "या अपनी राशि दर्ज करें", ta: "அல்லது தனிப்பயன் தொகையை உள்ளிடவும்" },
  fullNameLabel: { en: "Full Name", hi: "पूरा नाम", ta: "முழு பெயர்" },
  emailLabel: { en: "Email Address", hi: "ईमेल पता", ta: "மின்னஞ்சல் முகவரி" },
  donateButton: { en: "Donate ₹{amount}", hi: "₹{amount} दान करें", ta: "₹{amount} நன்கொடை" },
  razorpayText: { en: "Powered by Razorpay (Simulation)", hi: "रेजरपे द्वारा संचालित (सिमुलेशन)", ta: "ரேசர்பே மூலம் இயக்கப்படுகிறது (போலி)" },
  
  // Register Shelter Page
  registerShelterTitle: { en: "Register a Shelter", hi: "एक आश्रय पंजीकृत करें", ta: "ஒரு தங்குமிடத்தைப் பதிவு செய்யுங்கள்" },
  registerShelterSubtitle: { en: "Fill out the form below to list a new shelter on our platform. All submissions are subject to admin approval.", hi: "हमारे प्लेटफ़ॉर्म पर एक नया आश्रय सूचीबद्ध करने के लिए नीचे दिया गया फ़ॉर्म भरें। सभी आवेदन व्यवस्थापक की मंजूरी के अधीन हैं।", ta: "எங்கள் தளத்தில் ஒரு புதிய தங்குமிடத்தை பட்டியலிட கீழே உள்ள படிவத்தை நிரப்பவும். அனைத்து சமர்ப்பிப்புகளும் நிர்வாக ஒப்புதலுக்கு உட்பட்டவை." },
  submissionReceivedTitle: { en: "Submission Received!", hi: "आवेदन प्राप्त हुआ!", ta: "சமர்ப்பிப்பு பெறப்பட்டது!" },
  submissionReceivedSubtitle: { en: "Thank you for registering. An administrator will review your submission and contact you soon.", hi: "पंजीकरण के लिए धन्यवाद। एक व्यवस्थापक आपके आवेदन की समीक्षा करेगा और जल्द ही आपसे संपर्क करेगा।", ta: "பதிவு செய்ததற்கு நன்றி. ஒரு நிர்வாகி உங்கள் சமர்ப்பிப்பை மதிப்பாய்வு செய்து விரைவில் உங்களைத் தொடர்புகொள்வார்." },
  shelterNameLabel: { en: "Shelter Name", hi: "आश्रय का नाम", ta: "தங்குமிடத்தின் பெயர்" },
  addressLabel: { en: "Full Address", hi: "पूरा पता", ta: "முழு முகவரி" },
  cityLabel: { en: "City", hi: "शहर", ta: "நகரம்" },
  contactLabel: { en: "Contact Number", hi: "संपर्क नंबर", ta: "தொடர்பு எண்" },
  capacityLabel: { en: "Total Capacity", hi: "कुल क्षमता", ta: "மொத்த கொள்ளளவு" },
  servicesLabel: { en: "Services Offered", hi: "दी जाने वाली सेवाएँ", ta: "வழங்கப்படும் சேவைகள்" },
  forWhomLabel: { en: "This shelter is for:", hi: "यह आश्रय इनके लिए है:", ta: "இந்த தங்குமிடம் இவர்களுக்காக:" },
  submitForReviewButton: { en: "Submit for Review", hi: "समीक्षा के लिए भेजें", ta: "மதிப்பாய்வுக்குச் சமர்ப்பி" },
  goToHome: { en: "Go to Homepage", hi: "होमपेज पर जाएं", ta: "முகப்புக்குச் செல்லவும்" },

  // Volunteer Page
  volunteerTitle: { en: "Become a Volunteer", hi: "स्वयंसेवक बनें", ta: "ஒரு தன்னார்வலராகுங்கள்" },
  volunteerSubtitle: { en: "Join our team and make a difference in your community. Your time and skills are invaluable to us.", hi: "हमारी टीम में शामिल हों और अपने समुदाय में बदलाव लाएं। आपका समय और कौशल हमारे लिए अनमोल हैं।", ta: "எங்கள் குழுவில் சேர்ந்து உங்கள் சமூகத்தில் ஒரு மாற்றத்தை ஏற்படுத்துங்கள். உங்கள் நேரமும் திறமையும் எங்களுக்கு অমूल्यமானவை." },
  volunteerThankYouTitle: { en: "Thank you for joining us!", hi: "हमसे जुड़ने के लिए धन्यवाद!", ta: "எங்களுடன் இணைந்ததற்கு நன்றி!" },
  volunteerThankYouSubtitle: { en: "We have received your application to become a volunteer. Our team will get in touch with you shortly.", hi: "स्वयंसेवक बनने के लिए आपका आवेदन हमें मिल गया है। हमारी टीम जल्द ही आपसे संपर्क करेगी।", ta: "தன்னார்வலராக ஆவதற்கான உங்கள் விண்ணப்பத்தைப் பெற்றுள்ளோம். எங்கள் குழு விரைவில் உங்களைத் தொடர்புகொள்ளும்." },
  phoneLabel: { en: "Phone Number", hi: "फ़ोन नंबर", ta: "தொலைபேசி எண்" },
  skillsLabel: { en: "Skills (e.g., medical, teaching, cooking)", hi: "कौशल (जैसे, चिकित्सा, शिक्षण, खाना बनाना)", ta: "திறன்கள் (எ.கா., மருத்துவம், கற்பித்தல், சமையல்)" },
  availabilityLabel: { en: "Availability", hi: "उपलब्धता", ta: "கிடைக்கும்" },
  selectOption: { en: "Select an option", hi: "एक विकल्प चुनें", ta: "ஒரு விருப்பத்தைத் தேர்ந்தெடுக்கவும்" },
  weekdays: { en: "Weekdays", hi: "कार्यदिवस", ta: "வாரநாட்கள்" },
  weekends: { en: "Weekends", hi: "सप्ताहांत", ta: "வார இறுதி நாட்கள்" },
  flexible: { en: "Flexible", hi: "लचीला", ta: "நெகிழ்வான" },
  registerAsVolunteerButton: { en: "Register as Volunteer", hi: "स्वयंसेवक के रूप में पंजीकरण करें", ta: "தன்னார்வலராகப் பதிவு செய்யுங்கள்" },

  // Admin Dashboard
  adminDashboardTitle: { en: "Admin Dashboard", hi: "एडमिन डैशबोर्ड", ta: "நிர்வாக டாஷ்போர்டு" },
  pendingApprovalsTitle: { en: "Pending Shelter Approvals", hi: "लंबित आश्रय अनुमोदन", ta: "நிலுவையில் உள்ள தங்குமிட ஒப்புதல்கள்" },
  tableNameHeader: { en: "Name", hi: "नाम", ta: "பெயர்" },
  tableCityHeader: { en: "City", hi: "शहर", ta: "நகரம்" },
  tableContactHeader: { en: "Contact", hi: "संपर्क", ta: "தொடர்பு" },
  tableActionsHeader: { en: "Actions", hi: "कार्रवाई", ta: "செயல்கள்" },
  approveButton: { en: "Approve", hi: "स्वीकार", ta: "ஒப்புதல்" },
  rejectButton: { en: "Reject", hi: "अस्वीकार", ta: "நிராகரி" },
  noPendingApprovals: { en: "No pending approvals.", hi: "कोई लंबित अनुमोदन नहीं है।", ta: "நிலுவையில் ஒப்புதல்கள் இல்லை." },
  registeredVolunteersTitle: { en: "Registered Volunteers", hi: "पंजीकृत स्वयंसेवक", ta: "பதிவுசெய்யப்பட்ட தன்னார்வலர்கள்" },
  donationHistoryTitle: { en: "Donation History", hi: "दान का इतिहास", ta: "நன்கொடை வரலாறு" },

  // Awareness Page
  awarenessTitle: { en: "Understanding Homelessness in India", hi: "भारत में बेघरता को समझना", ta: "இந்தியாவில் வீடற்ற நிலையைப் புரிந்துகொள்வது" },
  awarenessSubtitle: { en: "Homelessness is a complex issue with diverse causes, affecting millions of people across India. This page aims to shed light on the situation and how we can collectively make a difference.", hi: "बेघरता एक जटिल मुद्दा है जिसके विविध कारण हैं, जो पूरे भारत में लाखों लोगों को प्रभावित करता है। इस पृष्ठ का उद्देश्य स्थिति पर प्रकाश डालना है और यह बताना है कि हम सामूहिक रूप से कैसे बदलाव ला सकते हैं।", ta: "வீடற்ற நிலை என்பது பல்வேறு காரணங்களைக் கொண்ட ஒரு சிக்கலான பிரச்சினையாகும், இது இந்தியா முழுவதும் மில்லியன் கணக்கான மக்களை பாதிக்கிறது. இந்தப் பக்கம் நிலைமையை வெளிச்சம் போட்டுக் காட்டுவதையும், நாம் கூட்டாக எப்படி ஒரு மாற்றத்தை ஏற்படுத்த முடியும் என்பதையும் நோக்கமாகக் கொண்டுள்ளது." },
  numbersTitle: { en: "The Numbers", hi: "आंकड़े", ta: "எண்கள்" },
  numbersParagraph: { en: "According to the 2011 Census, India has over 1.77 million homeless people. However, activists and NGOs estimate this number to be significantly higher. These individuals face a daily struggle for basic necessities like food, water, and shelter, and are often exposed to extreme weather, illness, and violence.", hi: "2011 की जनगणना के अनुसार, भारत में 1.77 मिलियन से अधिक बेघर लोग हैं। हालांकि, कार्यकर्ता और गैर-सरकारी संगठन इस संख्या को काफी अधिक होने का अनुमान लगाते हैं। ये व्यक्ति भोजन, पानी और आश्रय जैसी बुनियादी आवश्यकताओं के लिए दैनिक संघर्ष करते हैं, और अक्सर अत्यधिक मौसम, बीमारी और हिंसा का सामना करते हैं।", ta: "2011 மக்கள் தொகைக் கணக்கெடுப்பின்படி, இந்தியாவில் 1.77 மில்லியனுக்கும் அதிகமான வீடற்ற மக்கள் உள்ளனர். இருப்பினும், ஆர்வலர்கள் மற்றும் தன்னார்வ தொண்டு நிறுவனங்கள் இந்த எண்ணிக்கை கணிசமாக அதிகமாக இருப்பதாக மதிப்பிடுகின்றனர். இந்த நபர்கள் உணவு, நீர் மற்றும் தங்குமிடம் போன்ற அடிப்படைத் தேவைகளுக்காக தினசரி போராட்டத்தை எதிர்கொள்கின்றனர், மேலும் பெரும்பாலும் தீவிர வானிலை, நோய் மற்றும் வன்முறைக்கு ஆளாகின்றனர்." },
  causesTitle: { en: "Key Causes", hi: "मुख्य कारण", ta: "முக்கிய காரணங்கள்" },
  causePoverty: { en: "Poverty:", hi: "गरीबी:", ta: "வறுமை:" },
  causePovertyDesc: { en: "Lack of affordable housing and stable employment.", hi: "सस्ते आवास और स्थिर रोजगार का अभाव।", ta: "மலிவு விலை வீடுகள் மற்றும் நிலையான வேலைவாய்ப்பு இல்லாமை." },
  causeMigration: { en: "Migration:", hi: "प्रवासन:", ta: "இடம்பெயர்வு:" },
  causeMigrationDesc: { en: "People moving from rural to urban areas for work, often without a safety net.", hi: "लोगों का काम के लिए ग्रामीण से शहरी क्षेत्रों में जाना, अक्सर बिना किसी सुरक्षा जाल के।", ta: "கிராமப்புறங்களிலிருந்து நகர்ப்புறங்களுக்கு வேலைக்காக மக்கள் இடம்பெயர்வது, பெரும்பாலும் பாதுகாப்பு வலையின்றி." },
  causeDisasters: { en: "Disasters & Displacement:", hi: "आपदाएं और विस्थापन:", ta: "பேரழிவுகள் மற்றும் இடப்பெயர்வு:" },
  causeDisastersDesc: { en: "Natural calamities and development projects forcing people out of their homes.", hi: "प्राकृतिक आपदाएं और विकास परियोजनाएं लोगों को उनके घरों से बाहर निकलने के लिए मजबूर करती हैं।", ta: "இயற்கை பேரழிவுகள் மற்றும் வளர்ச்சித் திட்டங்கள் மக்களை தங்கள் வீடுகளை விட்டு வெளியேற்றும்படி கட்டாயப்படுத்துகின்றன." },
  causeSocial: { en: "Social Factors:", hi: "सामाजिक कारक:", ta: "சமூக காரணிகள்:" },
  causeSocialDesc: { en: "Family disputes, domestic violence, and mental or physical illness.", hi: "पारिबारिक विवाद, घरेलू हिंसा, और मानसिक या शारीरिक बीमारी।", ta: "குடும்பத் தகராறுகள், குடும்ப வன்முறை, மற்றும் மன அல்லது உடல் நோய்." },
  howToHelpTitle: { en: "How You Can Help", hi: "आप कैसे मदद कर सकते हैं", ta: "நீங்கள் எப்படி உதவலாம்" },
  howToHelpParagraph: { en: "Your support can provide a lifeline to someone in need. Consider donating to help us provide essential resources, or volunteer your time and skills to make a direct impact. Spreading awareness is also crucial. Share this page with your network and help us build a more compassionate society.", hi: "आपका समर्थन किसी जरूरतमंद के लिए जीवन रेखा प्रदान कर सकता है। आवश्यक संसाधन प्रदान करने में हमारी मदद करने के लिए दान करने पर विचार करें, या प्रत्यक्ष प्रभाव डालने के लिए अपना समय और कौशल स्वयंसेवक के रूप में दें। जागरूकता फैलाना भी महत्वपूर्ण है। इस पृष्ठ को अपने नेटवर्क के साथ साझा करें और हमें एक अधिक दयालु समाज बनाने में मदद करें।", ta: "உங்கள் ஆதரவு தேவைப்படும் ஒருவருக்கு உயிர்நாடியாக அமையும். அத்தியாவசிய ஆதாரங்களை வழங்க எங்களுக்கு உதவ நன்கொடை அளிப்பதைக் கருத்தில் கொள்ளுங்கள், அல்லது நேரடி தாக்கத்தை ஏற்படுத்த உங்கள் நேரத்தையும் திறமையையும் தன்னார்வத் தொண்டு செய்யுங்கள். விழிப்புணர்வைப் பரப்புவதும் முக்கியம். இந்தப் பக்கத்தை உங்கள் நெட்வொர்க்குடன் பகிர்ந்து, વધુ இரக்கமுள்ள சமுதாயத்தை உருவாக்க எங்களுக்கு உதவுங்கள்." },

  // Footer
  footerSlogan: { en: "Connecting hearts, building homes.", hi: "दिलों को जोड़ना, घर बनाना।", ta: "இதயங்களை இணைத்தல், இல்லங்களை உருவாக்குதல்." },
  quickLinks: { en: "Quick Links", hi: "त्वरित लिंक्स", ta: "விரைவு இணைப்புகள்" },
  getInvolved: { en: "Get Involved", hi: "शामिल हों", ta: "ஈடுபடுங்கள்" },
  rightsReserved: { en: "All rights reserved.", hi: "सर्वाधिकार सुरक्षित।", ta: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை." },
};

export const MOCK_SHELTERS: Shelter[] = [
    // Tamil Nadu Shelters
    { id: 1, name: "The Banyan", address: "6th Main Rd, Mogappair Eri Scheme, Chennai", city: "Chennai", contact: "9840902505", capacity: 60, bedsAvailable: 15, services: ["Medical", "Counseling", "Rehabilitation"], forWhom: ["men", "women"], verified: true, lat: 13.084, lng: 80.198 },
    { id: 2, name: "Udhavum Karangal", address: "460, N.S.K. Nagar, Arumbakkam, Chennai", city: "Chennai", contact: "04424751700", capacity: 100, bedsAvailable: 22, services: ["Food", "Medical", "Shelter", "Education"], forWhom: ["men", "women", "children"], verified: true, lat: 13.076, lng: 80.211 },
    { id: 3, name: "Anbu Karangal", address: "R.S. Puram, Coimbatore", city: "Coimbatore", contact: "04222544211", capacity: 40, bedsAvailable: 8, services: ["Food", "Medical Care", "Elderly Care"], forWhom: ["men", "women"], verified: true, lat: 11.005, lng: 76.956 },
    { id: 4, name: "Karunai Illam", address: "4/123, K.Pudur, Madurai", city: "Madurai", contact: "04522566677", capacity: 50, bedsAvailable: 10, services: ["Food", "Education", "Shelter"], forWhom: ["children"], verified: true, lat: 9.954, lng: 78.146 },
    { id: 5, name: "St. Joseph's Hospice", address: "Paliyapatti, Dindigul", city: "Dindigul", contact: "04512471221", capacity: 30, bedsAvailable: 5, services: ["Medical", "Palliative Care", "Food"], forWhom: ["men", "women"], verified: true, lat: 10.362, lng: 77.979 },
    { id: 6, name: "ICCW Reception Unit", address: "5, 3rd Main Rd, Shenoy Nagar, Chennai", city: "Chennai", contact: "04426640833", capacity: 25, bedsAvailable: 3, services: ["Shelter", "Child Welfare", "Legal Aid"], forWhom: ["children"], verified: true, lat: 13.085, lng: 80.222 },
    { id: 7, name: "HelpAge India Trichy", address: "Thillai Nagar, Tiruchirappalli", city: "Tiruchirappalli", contact: "04312741949", capacity: 35, bedsAvailable: 7, services: ["Elderly Care", "Medical", "Food"], forWhom: ["men", "women"], verified: true, lat: 10.821, lng: 78.680 },
    { id: 8, name: "Nesakkaram SEEDS", address: "Vyasarpadi, Chennai", city: "Chennai", contact: "04426730242", capacity: 45, bedsAvailable: 11, services: ["Street Children Rescue", "Education", "Food"], forWhom: ["children"], verified: true, lat: 13.120, lng: 80.245 },
];

export const MOCK_PENDING_SHELTERS: PendingShelter[] = [
    { id: 9, name: "New Beginnings", address: "22, ECR Road, Puducherry", city: "Puducherry", contact: "6543210987", capacity: 25, bedsAvailable: 25, services: ["Food"], forWhom: ["families"], verified: false, lat: 11.935, lng: 79.830, status: 'pending' },
    { id: 10, name: "Suraksha Ghar", address: "55, Gandhipuram, Coimbatore", city: "Coimbatore", contact: "5432109876", capacity: 35, bedsAvailable: 35, services: ["Food", "Medical"], forWhom: ["women"], verified: false, lat: 11.018, lng: 76.966, status: 'pending' }
];

export const MOCK_VOLUNTEERS: Volunteer[] = [
    { id: 1, name: "Riya Sharma", email: "riya@example.com", phone: "1234567890", skills: ["Counseling", "Teaching"], availability: "Weekends" },
    { id: 2, name: "Amit Kumar", email: "amit@example.com", phone: "0987654321", skills: ["Medical Aid", "Driving"], availability: "Weekdays" }
];

export const MOCK_DONATIONS: Donation[] = [
    { id: 1, name: "Priya Singh", amount: 5000, date: "2023-10-26" },
    { id: 2, name: "Rohan Mehra", amount: 2500, date: "2023-10-25" },
    { id: 3, name: "Anonymous", amount: 10000, date: "2023-10-24" }
];