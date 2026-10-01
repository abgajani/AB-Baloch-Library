import { Subject, Chapter, Quiz, Flashcard, PastPaper, DuaItem, QuranSurah, SeerahStory, Badge, LeaderboardUser } from '../types';

export const SUBJECTS: Subject[] = [
  {
    id: 'islamiyat',
    nameEn: 'Islamiyat',
    nameUr: 'اسلامیات',
    descriptionEn: 'Quran, Hadith, Seerah, Pillars of Islam and Islamic Ethics',
    descriptionUr: 'قرآن، حدیث، سیرتِ طیبہ، ارکانِ اسلام اور اخلاقیات',
    color: '#0F9D75',
    accentBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    iconName: 'Moon',
    totalChapters: 6,
    totalLessons: 24,
    totalQuizzes: 12
  },
  {
    id: 'pakstudies',
    nameEn: 'Pakistan Studies',
    nameUr: 'مطالعہ پاکستان',
    descriptionEn: 'Ideology of Pakistan, History, Geography, and Foreign Relations',
    descriptionUr: 'نظریۂ پاکستان، تاریخ، جغرافیہ اور خارجہ پالیسی',
    color: '#0d9488',
    accentBg: 'bg-teal-50 text-teal-800 border-teal-200',
    iconName: 'Landmark',
    totalChapters: 5,
    totalLessons: 20,
    totalQuizzes: 10
  },
  {
    id: 'urdu',
    nameEn: 'Urdu',
    nameUr: 'اردو ادب و قواعد',
    descriptionEn: 'Urdu Literature, Grammar, Poetry of Iqbal & Ghalib, and Composition',
    descriptionUr: 'اردو ادب، قواعد و انشا، کلامِ اقبال و غالب، اور تحریری مہارت',
    color: '#7c3aed',
    accentBg: 'bg-purple-50 text-purple-800 border-purple-200',
    iconName: 'BookOpen',
    totalChapters: 6,
    totalLessons: 22,
    totalQuizzes: 10
  },
  {
    id: 'english',
    nameEn: 'English',
    nameUr: 'انگریزی',
    descriptionEn: 'Grammar, Reading Comprehension, Vocabulary, and Essay Writing',
    descriptionUr: 'گرامر، فہم و ادراک، ذخیرۂ الفاظ اور مضامین نویسی',
    color: '#2563eb',
    accentBg: 'bg-blue-50 text-blue-800 border-blue-200',
    iconName: 'Languages',
    totalChapters: 6,
    totalLessons: 26,
    totalQuizzes: 14
  },
  {
    id: 'math',
    nameEn: 'Mathematics',
    nameUr: 'ریاضی',
    descriptionEn: 'Algebra, Matrices, Geometry, Trigonometry, and Calculus basics',
    descriptionUr: 'الجبرہ، قالب اور مقطع، ہندسہ اور مثلثیات',
    color: '#dc2626',
    accentBg: 'bg-red-50 text-red-800 border-red-200',
    iconName: 'Calculator',
    totalChapters: 8,
    totalLessons: 32,
    totalQuizzes: 16
  },
  {
    id: 'computer',
    nameEn: 'Computer Science',
    nameUr: 'کمپیوٹر سائنس',
    descriptionEn: 'Algorithms, Data Structures, Python Basics, and Database Systems',
    descriptionUr: 'الگورتھم، ڈیٹا سٹرکچرز، پروگرامنگ، اور نیٹ ورکس',
    color: '#4f46e5',
    accentBg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    iconName: 'Laptop',
    totalChapters: 7,
    totalLessons: 28,
    totalQuizzes: 14
  },
  {
    id: 'gk',
    nameEn: 'General Knowledge',
    nameUr: 'معلوماتِ عامہ',
    descriptionEn: 'World Geography, Science, Current Affairs, and Inventions',
    descriptionUr: 'عالمی جغرافیہ، ایجادات، اہم شخصیات اور بین الاقوامی امور',
    color: '#ea580c',
    accentBg: 'bg-orange-50 text-orange-800 border-orange-200',
    iconName: 'Compass',
    totalChapters: 5,
    totalLessons: 18,
    totalQuizzes: 12
  }
];

export const CHAPTERS_DATA: Record<string, Chapter[]> = {
  islamiyat: [
    {
      id: 'isl-ch1',
      subjectId: 'islamiyat',
      number: 1,
      titleEn: 'Articles of Faith (Aqaaid)',
      titleUr: 'عقائد و ایمانیات',
      descriptionEn: 'Tawheed, Prophethood, Angels, Divine Books, and the Hereafter',
      descriptionUr: 'توحید، رسالت، ملائکہ، کتبِ سماوی اور آخرت پر ایمان کے دلائل',
      lessons: [
        {
          id: 'isl-les-1',
          subjectId: 'islamiyat',
          chapterId: 'isl-ch1',
          titleEn: 'Tawheed and Its Importance in Human Life',
          titleUr: 'توحید اور انسانی زندگی پر اس کے اثرات',
          durationEn: '8 mins read',
          durationUr: '۸ منٹ مطالعہ',
          readTimeMin: 8,
          audioDurationSec: 185,
          keyPointsEn: [
            'Tawheed means believing in the Oneness of Allah in His essence, attributes, and rights to worship.',
            'It liberates man from superstition and subservience to tyrants.',
            'Cultivates self-respect, humility, broad-mindedness, and peace of mind.',
            'The foundational Kalimah: La Ilaha Illallah Muhammadur Rasulullah.'
          ],
          keyPointsUr: [
            'توحید کا مفہوم: اللہ تعالیٰ کی ذات، صفات اور حقوقِ بندگی میں یکتا ماننا۔',
            'توحید انسان کو توہم پرستی اور ہر قسم کی باطل غلامی سے نجات دلاتی ہے۔',
            'انسان میں خودداری، عاجزی، وسعتِ نظری اور اطمینانِ قلب پیدا کرتی ہے۔',
            'بنیادی کلمہ: لَا إِلٰهَ إِلَّا اللهُ مُحَمَّدٌ رَّسُولُ اللهِ'
          ],
          contentEn: `Tawheed is the fundamental pillar and core tenet of Islam. Linguistically, Tawheed means affirming the oneness of something. In Islamic terminology, it denotes the firm conviction that Allah is the Sole Creator, Nourisher, Sustainer, and Sovereign of the universe, possessing no partners or associates.\n\n### The Three Dimensions of Tawheed:\n1. **Tawheed ar-Ruboobiyyah (Oneness of Lordship):** Believing that Allah alone caused all things to exist, sustains them, and controls the cosmos.\n2. **Tawheed al-Uloohiyyah (Oneness of Worship):** Directing every act of worship—prayers, invocations, sacrifices, and vows—exclusively to Allah.\n3. **Tawheed al-Asma wa-s-Sifat (Oneness of Divine Names and Attributes):** Affirming all names and characteristics Allah and His Messenger have attributed to Him without anthropomorphism or denial.\n\n### Psychological and Social Impact:\nA person grounded in Tawheed develops unshakable courage because they understand life and death, benefit and harm are solely in Allah's hands. It generates universal brotherhood since all humans stand equal before the One Supreme Creator.`,
          contentUr: `توحید اسلام کا بنیادی ترین ستون اور اصل الاصول ہے۔ لغوی اعتبار سے توحید کا مطلب کسی چیز کو اکیلا و یکتا قرار دینا ہے۔ اسلامی اصطلاح میں اس سے مراد یہ پختہ عقیدہ ہے کہ کائنات کا خالق، مالک، رازق اور مدبر صرف اور صرف اللہ تعالیٰ ہے اور اس کی ذات و صفات میں کوئی شریک نہیں۔\n\n### توحید کی تین بنیادی اقسام:\n۱. **توحید فی الربوبیت:** یہ یقین رکھنا کہ کائنات کو عدم سے وجود میں لانے والا اور پالنے والا اکیلا اللہ ہے۔\n۲. **توحید فی الالوہیت / العبادت:** ہر قسم کی عبادت، دعا، نذر و نیاز اور سجدہ صرف اللہ وحدہ لا شریک کے لیے مخصوص کرنا۔\n۳. **توحید فی الاسماء والصفات:** اللہ تعالیٰ کے تمام اسماءِ حسنیٰ اور کامل صفات کو بغیر کسی تشبیہ و تمثیل کے تسلیم کرنا۔\n\n### معاشرتی اور انفرادی اثرات:\nعقیدۂ توحید انسان کے اندر جرات اور غیرت پیدا کرتا ہے، کیونکہ وہ جانتا ہے کہ نفع و نقصان کا مالک صرف اللہ ہے۔ یہ انسان میں مساوات اور اخوت کو پروان چڑھاتا ہے کیونکہ تمام انسان ایک ہی رب کی مخلوق ہیں۔`,
          summaryEn: 'Tawheed is the cornerstone of Islamic belief that elevates human dignity, removes fear of created beings, and builds a balanced moral society.',
          summaryUr: 'توحید اسلامی فکر کی بنیاد ہے جو انسان کو حقیقی آزادی، عزتِ نفس اور پرسکون معاشرتی زندگی عطا کرتی ہے۔',
          quizId: 'quiz-isl-1'
        },
        {
          id: 'isl-les-2',
          subjectId: 'islamiyat',
          chapterId: 'isl-ch1',
          titleEn: 'Belief in Prophethood (Risalat) & Finality of Prophet Muhammad (PBUH)',
          titleUr: 'عقیدۂ رسالت اور ختمِ نبوت',
          durationEn: '10 mins read',
          durationUr: '۱۰ منٹ مطالعہ',
          readTimeMin: 10,
          audioDurationSec: 210,
          keyPointsEn: [
            'Prophets were sent as human role models guided by divine revelation (Wahi).',
            'Prophet Muhammad (PBUH) is the Khatam an-Nabiyyin (Seal of the Prophets).',
            'His message is universal, preserved, and complete for all mankind until the Day of Judgement.',
            'Obedience to the Prophet is linked directly to obedience to Allah.'
          ],
          keyPointsUr: [
            'انبیاء کرام علیہم السلام انسانوں کی ہدایت کے لیے مبعوث کیے گئے۔',
            'حضرت محمد صلی اللہ علیہ و آلہ وسلم خاتم النبیین ہیں۔',
            'آپﷺ کا پیغام ہمہ گیر، محفوظ اور قیامت تک تمام انسانیت کے لیے ہے۔',
            'رسولِ اکرمﷺ کی اطاعت دراصل اللہ تعالیٰ کی اطاعت ہے۔'
          ],
          contentEn: `Belief in Risalat is the second component of the Islamic creed. Without prophets, human beings could not independently ascertain divine guidance, precise moral boundaries, or accountability after death.\n\nProphet Muhammad (PBUH) concludes the chain of prophethood. The Holy Quran explicitly proclaims:\n*"Muhammad is not the father of [any] one of your men, but [he is] the Messenger of Allah and seal of the prophets."* (Surah Al-Ahzab 33:40)\n\nBecause the Holy Quran has been divinely preserved verbatim and the Sunnah rigorously documented, humanity has no need for another prophet.`,
          contentUr: `عقیدۂ رسالت ایمانیات کا دوسرا اہم ترین جزو ہے۔ انبیاء کرام کے بغیر عقلِ انسانی وحیِ الٰہی کی تفصیلات اور آخرت کی جوابدہی کو تنہا نہیں جان سکتی تھی۔\n\nنبی کریم حضرت محمد مصطفیٰ صلی اللہ علیہ و آلہ وسلم پر نبوت و رسالت کا سلسلہ مکمل ہو چکا ہے۔ قرآنِ مجید کا صریح ارشاد ہے:\nمَّا كَانَ مُحَمَّدٌ أَبَا أَحَدٍ مِّن رِّجَالِكُمْ وَلَٰكِن رَّسُولَ اللَّهِ وَخَاتَمَ النَّبِيِّينَ (سورۃ الاحزاب: ۴۰)\n\nقرآنِ مجید کی حفاظت کا ذمہ خود باری تعالیٰ نے لیا ہے اور سنتِ نبویﷺ کا ذخیرہ پوری صحت کے ساتھ محفوظ ہے، لہٰذا قیامت تک اب کسی نئے نبی کی ضرورت نہیں۔`,
          summaryEn: 'Risalat provides mankind with practical divine guidance, sealed eternally through Prophet Muhammad (PBUH).',
          summaryUr: 'رسالت انسان کو عملی نمونہ حیات عطا کرتی ہے، اور آپﷺ کی شریعت قیامت تک کے لیے دائمی اور کامل ہے۔'
        }
      ],
      quizzes: [],
      flashcards: [
        {
          id: 'fc-isl-1',
          frontEn: 'What does Khatam an-Nabiyyin mean?',
          frontUr: 'خاتم النبیین کا کیا مفہوم ہے؟',
          backEn: 'The Seal of the Prophets; no new prophet will ever come after Prophet Muhammad (PBUH).',
          backUr: 'تمام نبیوں کا خاتمہ فرمانے والے؛ آپﷺ کے بعد کوئی نیا نبی مبعوث نہیں ہوگا۔',
          category: 'Islamiyat'
        },
        {
          id: 'fc-isl-2',
          frontEn: 'Define Tawheed ar-Ruboobiyyah.',
          frontUr: 'توحید فی الربوبیت کی تعریف کیجیے۔',
          backEn: 'Belief that Allah alone created, controls, and sustains everything in existence.',
          backUr: 'یہ عقیدہ کہ صرف اللہ تعالیٰ ہی تمام کائنات کا اکیلا پیدا فرمانے والا اور رب ہے۔',
          category: 'Islamiyat'
        }
      ]
    },
    {
      id: 'isl-ch2',
      subjectId: 'islamiyat',
      number: 2,
      titleEn: 'The Noble Quran and Hadith',
      titleUr: 'قرآن و حدیث کا تعارف',
      descriptionEn: 'Revelation, Compilation, and Role of Sunnah as Primary Sources',
      descriptionUr: 'نزولِ قرآن، تدوینِ قرآن اور سنتِ نبویﷺ کی قانونی حیثیت',
      lessons: [],
      quizzes: [],
      flashcards: []
    }
  ],
  pakstudies: [
    {
      id: 'pak-ch1',
      subjectId: 'pakstudies',
      number: 1,
      titleEn: 'Ideology of Pakistan',
      titleUr: 'نظریۂ پاکستان کی بنیاد',
      descriptionEn: 'Two-Nation Theory, Quaid-e-Azam and Allama Iqbal’s vision',
      descriptionUr: 'دو قومی نظریہ، قائدِ اعظم اور علامہ اقبال کے ارشادات کی روشنی میں',
      lessons: [
        {
          id: 'pak-les-1',
          subjectId: 'pakstudies',
          chapterId: 'pak-ch1',
          titleEn: 'The Two-Nation Theory Explained',
          titleUr: 'دو قومی نظریہ اور اس کے بنیادی اصول',
          durationEn: '7 mins read',
          durationUr: '۷ منٹ مطالعہ',
          readTimeMin: 7,
          audioDurationSec: 160,
          keyPointsEn: [
            'Muslims and Hindus of the Subcontinent represented two distinct civilizations with separate religions, customs, and outlooks on life.',
            'Sir Syed Ahmad Khan first articulated that Hindus and Muslims were two separate nations after the Urdu-Hindi controversy in 1867.',
            'Allama Iqbal proposed an autonomous Muslim state in his historic 1930 Allahabad Address.',
            'Quaid-e-Azam declared: "Muslims are a nation according to any definition of a nation."'
          ],
          keyPointsUr: [
            'برصغیر کے مسلمان اور ہندو دو الگ الگ قومیں تھیں جن کے مذہب، تمدن اور طرزِ حیات جداگانہ تھے۔',
            '۱۸۶۷ء میں اردو ہندی تنازعے کے بعد سر سید احمد خان نے واضح طور پر دو قوموں کی بات کی۔',
            'علامہ محمد اقبال نے خطبہ الہ آباد (۱۹۳۰ء) میں ایک جداگانہ مسلم ریاست کا تصور پیش کیا۔',
            'قائدِ اعظم محمد علی جناح کا تاریخ ساز اعلان: "مسلمان قومیت کی ہر تعریف کے مطابق ایک الگ قوم ہیں۔"'
          ],
          contentEn: `The Two-Nation Theory is the foundational basis for the establishment of Pakistan. In the Subcontinent, Muslims were not merely a minority community, but an entirely distinct nation with their own religious code, cultural heritage, social customs, and legal norms.\n\n### Historical Genesis:\nSir Syed Ahmad Khan was among the first prominent leaders to realize that the democratic system of the Westminster model would reduce Muslims to permanent political subjugation in a united India. Following the 1867 Urdu-Hindi controversy in Banaras, Sir Syed stated that these two communities could no longer walk together.\n\n### Quaid-e-Azam's Articulation (1940):\nAt the All-India Muslim League Lahore session in March 1940, Quaid-e-Azam Muhammad Ali جناح made the case undeniably clear: Hindus and Muslims belong to two different religious philosophies, social customs, and literature. They neither intermarry nor interdine. To yoke together two such nations under a single state must lead to growing discontent and final destruction of any fabric that may be so built up for the government of such a state.`,
          contentUr: `دو قومی نظریہ قیامِ پاکستان کی اساس اور روح ہے۔ برصغیر پاک و ہند میں مسلمان محض ایک اقلیت نہیں تھے، بلکہ اپنی تاریخ، روایات، تمدن اور شریعت کے اعتبار سے ایک مکمل اور خود مختار قوم تھے۔\n\n### تاریخی پس منظر:\n۱۸۶۷ء میں بنارس کے ہندوؤں کی جانب سے اردو کے خلاف مہم کے بعد سر سید احمد خان نے فرمایا کہ اب یہ دونوں قومیں ایک ساتھ نہیں چل سکتیں۔ سر سید نے مسلمانوں کو جدید تعلیم اور اپنے حقوق کی حفاظت کی ترغیب دی۔\n\n### قائد اعظم کا تاریخ ساز موقف (۱۹۴۰ء):\nمارچ ۱۹۴۰ء کے اجلاس لاہور میں قائد اعظم نے فرمایا کہ ہندو اور مسلمان دو مختلف مذہبی فلسفوں، روایات اور ادب سے تعلق رکھتے ہیں۔ وہ آپس میں شادی بیاہ نہیں کرتے اور نہ ہی مل کر کھانا کھاتے ہیں۔ لہٰذا ایک ہی مشترکہ ریاست کے تحت دونوں قوموں کو باندھنا برصغیر کے لیے تباہ کن ثابت ہوگا۔`,
          summaryEn: 'The Two-Nation Theory affirmed the separate identity of Muslims, culminating in the creation of Pakistan in August 1947.',
          summaryUr: 'دو قومی نظریہ مسلمانوں کے مذہبی، ثقافتی اور سیاسی تشخص کا ضامن تھا جس کے نتیجے میں ۱۴ اگست ۱۹۴۷ء کو پاکستان وجود میں آیا۔',
          quizId: 'quiz-pak-1'
        }
      ],
      quizzes: [],
      flashcards: [
        {
          id: 'fc-pak-1',
          frontEn: 'When did Allama Iqbal deliver his historic Allahabad Address?',
          frontUr: 'علامہ اقبال نے خطبہ الہ آباد کس سال پیش کیا؟',
          backEn: 'December 1930, presiding over the All-India Muslim League annual session.',
          backUr: 'دسمبر ۱۹۳۰ء میں آل انڈیا مسلم لیگ کے سالانہ اجلاس میں۔',
          category: 'Pakistan Studies'
        }
      ]
    }
  ],
  math: [
    {
      id: 'math-ch1',
      subjectId: 'math',
      number: 1,
      titleEn: 'Matrices and Determinants',
      titleUr: 'قالب اور مقطع',
      descriptionEn: 'Order of matrices, operations, inverse, and Cramer’s Rule',
      descriptionUr: 'قالب کا مرتبہ، ضرب و جمع، معکوس اور کرائمر کا قانون',
      lessons: [
        {
          id: 'math-les-1',
          subjectId: 'math',
          chapterId: 'math-ch1',
          titleEn: 'Introduction to Matrices & Matrix Addition',
          titleUr: 'قالب کا تعارف اور قالبوں کا مجموعہ',
          durationEn: '6 mins read',
          durationUr: '۶ منٹ مطالعہ',
          readTimeMin: 6,
          audioDurationSec: 140,
          keyPointsEn: [
            'A matrix is a rectangular array of numbers arranged into horizontal rows and vertical columns, enclosed in brackets [ ].',
            'Order of a matrix is denoted as m × n, where m = rows and n = columns.',
            'Two matrices can only be added or subtracted if they have the exact same order.',
            'Matrix addition is commutative: A + B = B + A.'
          ],
          keyPointsUr: [
            'قالب اعداد کی مستطیلی بناوٹ ہے جو افقی قطاروں اور عمودی کالموں پر مشتمل ہوتی ہے۔',
            'قالب کا مرتبہ m × n سے ظاہر کیا جاتا ہے جہاں m قطاریں اور n کالم ہیں۔',
            'دو قالب صرف اسی صورت جمع یا تفریق ہو سکتے ہیں جب ان کا مرتبہ برابر ہو۔',
            'قالبوں کی جمع میں خاصیتِ مبادلہ پائی جاتی ہے: A + B = B + A'
          ],
          contentEn: `Matrices provide a powerful algebraic framework utilized in physics, computer graphics, cryptography, and engineering.\n\n### Definition:\nA matrix is denoted by capital English letters (A, B, C...). The individual values inside are called entries or elements.\n\nExample:\nMatrix A = [ [2, 5], [1, 9] ] has 2 rows and 2 columns. Its order is 2 × 2 (square matrix).\n\n### Addition Conditions:\nLet Matrix A = [ [1, 3], [4, 2] ] and Matrix B = [ [5, 1], [0, 7] ].\nSince both are 2 × 2 matrices:\nA + B = [ [1+5, 3+1], [4+0, 2+7] ] = [ [6, 4], [4, 9] ].`,
          contentUr: `قالب ریاضی کی ایک جدید شاخ ہے جس کا استعمال فزکس، کمپیوٹر گرافکس اور سائنسی حساب کتاب میں وسیع پیمانے پر ہوتا ہے۔\n\n### تعریف:\nقالب کو انگریزی کے بڑے حروف (A, B, C) سے ظاہر کیا جاتا ہے۔ قالب کے اندر موجود ارقام کو اس کے ارکان کہا جاتا ہے۔\n\nمثال کے طور پر:\nاگر قالب A = [ [2, 5], [1, 9] ] ہو، تو اس میں ۲ قطاریں اور ۲ کالم ہیں۔ اس کا مرتبہ ۲ × ۲ ہے۔\n\n### قالبوں کی جمع:\nدو قالب صرف تب جمع ہوتے ہیں جب ان کے مرتبے ایک جیسے ہوں۔ ہر رکن اپنے متعلقہ مقام کے رکن میں جمع ہوتا ہے۔`,
          summaryEn: 'Matrices streamline simultaneous equations; addition is performed entry-by-entry on identically sized matrices.',
          summaryUr: 'قالب مساوات کو حل کرنے کا آسان طریقہ فراہم کرتے ہیں، اور یکساں مرتبے والے قالب باآسانی جمع ہو سکتے ہیں۔',
          quizId: 'quiz-math-1'
        }
      ],
      quizzes: [],
      flashcards: [
        {
          id: 'fc-math-1',
          frontEn: 'What is a singular matrix?',
          frontUr: 'نادر قالب (Singular Matrix) کیا ہوتا ہے؟',
          backEn: 'A square matrix whose determinant is zero (|A| = 0). It has no multiplicative inverse.',
          backUr: 'ایسا مربع قالب جس کا مقطع صفر کے برابر ہو (|A| = 0)۔ اس کا معکوس ممکن نہیں ہوتا۔',
          category: 'Mathematics'
        }
      ]
    }
  ],
  computer: [
    {
      id: 'cs-ch1',
      subjectId: 'computer',
      number: 1,
      titleEn: 'Problem Solving & Algorithms',
      titleUr: 'مسائل کا حل اور الگورتھم',
      descriptionEn: 'Flowcharts, logic building, time complexity, and pseudo-code',
      descriptionUr: 'فلو چارٹ، منطق سازی، اور کمپیوٹر پروگرامنگ کی بنیاد',
      lessons: [
        {
          id: 'cs-les-1',
          subjectId: 'computer',
          chapterId: 'cs-ch1',
          titleEn: 'Understanding Algorithms and Flowchart Symbols',
          titleUr: 'الگورتھم کا مفہوم اور فلو چارٹ کی اشکال',
          durationEn: '8 mins read',
          durationUr: '۸ منٹ مطالعہ',
          readTimeMin: 8,
          audioDurationSec: 155,
          keyPointsEn: [
            'An algorithm is a finite, step-by-step sequence of instructions designed to solve a specific problem.',
            'A flowchart is a graphical representation of an algorithm.',
            'Oval/Capsule = Start / Stop (Terminal).',
            'Parallelogram = Input / Output.',
            'Rectangle = Processing / Calculations.',
            'Diamond = Decision making (Yes/No condition).'
          ],
          keyPointsUr: [
            'الگورتھم کسی مسئلے کو حل کرنے کے لیے مرحلہ وار منظم ہدایات کا نام ہے۔',
            'فلو چارٹ کسی الگورتھم کی تصویری اور علامتی شکل ہے۔',
            'بیضوی شکل (Oval) = آغاز اور اختتام (Terminal)۔',
            'متوازی الاضلاع (Parallelogram) = ان پٹ اور آؤٹ پٹ۔',
            'مستطیل (Rectangle) = پروسیسنگ یا حسابی عمل۔',
            'ڈائمنڈ / معین (Diamond) = فیصلہ سازی (شرط یا Condition)۔'
          ],
          contentEn: `Computers cannot think on their own; they strictly execute precise instructions provided by programmers. An algorithm is the blueprint of any software application.\n\n### Characteristics of a Good Algorithm:\n- **Clear and unambiguous:** Each step should have only one interpretation.\n- **Finite:** The procedure must terminate after a finite number of steps.\n- **Feasible:** It should be executable with available computational resources.\n\n### Standard Flowchart Symbols:\nWhen designing algorithms visually, standard ANSI/ISO symbols ensure every developer understands the logic flow instantly.`,
          contentUr: `کمپیوٹر اپنے طور پر سوچ نہیں سکتا؛ وہ صرف دی گئی ہدایات پر عمل کرتا ہے۔ الگورتھم کسی بھی کمپیوٹر سوفٹ ویئر کی بنیادی بنیاد ہے۔\n\n### اچھے الگورتھم کی خصوصیات:\n- واضح اور غیر مبہم ہو: ہر مرحلے کا ایک ہی مطلب ہو۔\n- محدود ہو: مخصوص مراحل کے بعد اختتام پذیر ہو۔\n- موثر ہو: دستیاب وسائل کے اندر قابلِ عمل ہو۔\n\n### فلو چارٹ کی معیاری اشکال:\nفلو چارٹ کے ذریعے ہم کسی بھی پروگرام کی منطق کو کوڈنگ سے پہلے تصویری شکل میں دیکھ سکتے ہیں۔`,
          summaryEn: 'Algorithms outline logical solutions in structured steps, whereas flowcharts visualize this process using standardized geometrical shapes.',
          summaryUr: 'الگورتھم تحریری ہدایات ہیں جبکہ فلو چارٹ اسی کا تصویری خاکہ ہوتا ہے۔'
        }
      ],
      quizzes: [],
      flashcards: []
    }
  ]
};

export const ALL_QUIZZES: Quiz[] = [
  {
    id: 'daily-quiz-today',
    subjectId: 'gk',
    titleEn: 'Daily Challenge: General Knowledge & Science',
    titleUr: 'روزانہ کوئز: معلوماتِ عامہ و سائنس',
    durationMinutes: 5,
    xpReward: 50,
    isDailyQuiz: true,
    questions: [
      {
        id: 'dq-1',
        questionEn: 'Which is the highest peak in Pakistan and second highest in the world?',
        questionUr: 'پاکستان کی سب سے اونچی اور دنیا کی دوسری بلند ترین چوٹی کون سی ہے؟',
        optionsEn: ['Nanga Parbat', 'K2 (Godwin-Austen)', 'Broad Peak', 'Tirich Mir'],
        optionsUr: ['نانگا پربت', 'کے ٹو (K2)', 'براڈ پیک', 'ترچ میر'],
        correctAnswer: 1,
        explanationEn: 'K2 stands at 8,611 meters (28,251 ft) in the Karakoram range of Gilgit-Baltistan.',
        explanationUr: 'کے ٹو کی بلندی ۸,۶۱۱ میٹر ہے جو گلگت بلتستان کے سلسلہ قراقرم میں واقع ہے۔'
      },
      {
        id: 'dq-2',
        questionEn: 'In which year did Pakistan win its first Cricket World Cup under Imran Khan?',
        questionUr: 'پاکستان نے عمران خان کی کپتانی میں کرکٹ ورلڈ کپ کس سال جیتا؟',
        optionsEn: ['1987', '1992', '1996', '1999'],
        optionsUr: ['۱۹۸۷ء', '۱۹۹۲ء', '۱۹۹۶ء', '۱۹۹۹ء'],
        correctAnswer: 1,
        explanationEn: 'Pakistan defeated England in Melbourne in the 1992 World Cup Final.',
        explanationUr: 'پاکستان نے ۱۹۹۲ء کے فائنل میں میلبورن کے میدان پر انگلینڈ کو شکست دی تھی۔'
      },
      {
        id: 'dq-3',
        questionEn: 'What is the largest organ of the human body by surface area?',
        questionUr: 'سطحی رقبے کے لحاظ سے انسانی جسم کا سب سے بڑا عضو کون سا ہے؟',
        optionsEn: ['Liver', 'Brain', 'Skin', 'Heart'],
        optionsUr: ['جگر', 'دماغ', 'جلد', 'دل'],
        correctAnswer: 2,
        explanationEn: 'The skin covers approximately 1.5 to 2 square meters in an adult and protects internal organs.',
        explanationUr: 'انسانی جلد پورے جسم کو ڈھانپتی ہے اور بیرونی خطرات سے حفاظت کرتی ہے۔'
      },
      {
        id: 'dq-4',
        questionEn: 'Which gas is most abundant in Earth’s atmosphere?',
        questionUr: 'زمین کی فضا میں سب سے زیادہ مقدار میں کون سی گیس پائی جاتی ہے؟',
        optionsEn: ['Oxygen (O2)', 'Carbon Dioxide (CO2)', 'Nitrogen (N2)', 'Hydrogen (H2)'],
        optionsUr: ['آکسیجن', 'کاربن ڈائی آکسائیڈ', 'نائٹروجن', 'ہائیڈروجن'],
        correctAnswer: 2,
        explanationEn: 'Nitrogen makes up approximately 78% of Earth’s atmosphere, while oxygen is around 21%.',
        explanationUr: 'نائٹروجن گیس فضا کا تقریباً ۷۸ فیصد حصہ بناتی ہے۔'
      },
      {
        id: 'dq-5',
        questionEn: 'Who composed the national anthem music of Pakistan?',
        questionUr: 'پاکستان کے قومی ترانے کی دھن کس نے ترتیب دی؟',
        optionsEn: ['Hafeez Jalandhari', 'Ahmed Ghulamali Chagla', 'Mehdi Hassan', 'Faiz Ahmad Faiz'],
        optionsUr: ['حفیظ جالندھری', 'احمد غلام علی چھاگلہ', 'مہدی حسن', 'فیض احمد فیض'],
        correctAnswer: 1,
        explanationEn: 'Ahmed G. Chagla composed the tune in 1949, and Hafeez Jalandhari later wrote the lyrics in 1952.',
        explanationUr: 'احمد جی چھاگلہ نے ۱۹۴۹ء میں دھن بنائی اور حفیظ جالندھری نے اس کے بول لکھے۔'
      }
    ]
  },
  {
    id: 'quiz-isl-1',
    subjectId: 'islamiyat',
    titleEn: 'Chapter 1 Quiz: Tawheed & Articles of Faith',
    titleUr: 'باب ۱ کوئز: توحید اور ایمانیات',
    durationMinutes: 8,
    xpReward: 40,
    questions: [
      {
        id: 'q-isl-1',
        questionEn: 'What is the literal and theological opposite of Tawheed?',
        questionUr: 'توحید کا لغوی اور شرعی متضاد کیا ہے؟',
        optionsEn: ['Nifaaq (Hypocrisy)', 'Shirk (Associating partners with Allah)', 'Fisq (Disobedience)', 'Kibr (Arrogance)'],
        optionsUr: ['نفاق', 'شرک', 'فسق', 'تکبر'],
        correctAnswer: 1,
        explanationEn: 'Shirk is the unforgivable sin if one dies without repenting, as Allah states in Surah An-Nisa.',
        explanationUr: 'شرک اللہ تعالیٰ کی ذات و صفات میں کسی کو شریک ٹھہرانا ہے جو سب سے بڑا گناہ ہے۔'
      },
      {
        id: 'q-isl-2',
        questionEn: 'Which Surah in the Holy Quran is considered equivalent to one-third of the Quran in reward?',
        questionUr: 'قرآن مجید کی کس سورت کو ثواب کے اعتبار سے ایک تہائی قرآن کے برابر قرار دیا گیا ہے؟',
        optionsEn: ['Surah Al-Fatihah', 'Surah Al-Baqarah', 'Surah Al-Ikhlas', 'Surah Yaseen'],
        optionsUr: ['سورۃ الفاتحہ', 'سورۃ البقرہ', 'سورۃ الاخلاص', 'سورۃ یٰسین'],
        correctAnswer: 2,
        explanationEn: 'Surah Al-Ikhlas exclusively explains the pure concept of Tawheed with profound brevity.',
        explanationUr: 'سورۃ الاخلاص میں توحید کا خالص ترین بیان ہے جس کی وجہ سے یہ ایک تہائی قرآن کے برابر ہے۔'
      },
      {
        id: 'q-isl-3',
        questionEn: 'In which year did the Holy Prophet (PBUH) deliver his Farewell Sermon (Khutbatul Wada)?',
        questionUr: 'نبی کریم صلی اللہ علیہ و آلہ وسلم نے خطبہ حجۃ الوداع کس ہجری میں ارشاد فرمایا؟',
        optionsEn: ['8 AH', '9 AH', '10 AH', '11 AH'],
        optionsUr: ['۸ ہجری', '۹ ہجری', '۱۰ ہجری', '۱۱ ہجری'],
        correctAnswer: 2,
        explanationEn: 'The Farewell Sermon was delivered on the 9th of Dhul Hijjah, 10 AH on the plain of Arafat.',
        explanationUr: 'خطبہ حجۃ الوداع ۹ ذوالحجہ ۱۰ ہجری کو میدانِ عرفات میں ارشاد فرمایا گیا۔'
      }
    ]
  },
  {
    id: 'quiz-pak-1',
    subjectId: 'pakstudies',
    titleEn: 'Pakistan Studies: Lahore Resolution & Ideology',
    titleUr: 'مطالعہ پاکستان: قراردادِ لاہور اور نظریاتی بنیاد',
    durationMinutes: 7,
    xpReward: 35,
    questions: [
      {
        id: 'q-pak-1',
        questionEn: 'Who presented the historic Lahore Resolution on 23rd March 1940?',
        questionUr: '۲۳ مارچ ۱۹۴۰ء کو تاریخی قراردادِ لاہور کس نے پیش کی تھی؟',
        optionsEn: ['Liaquat Ali Khan', 'A.K. Fazlul Huq (Sher-e-Bangal)', 'Chaudhry Khaliquzzaman', 'Khawaja Nazimuddin'],
        optionsUr: ['لیاقت علی خان', 'اے کے فضل الحق (شیرِ بنگال)', 'چوہدری خلیق الزماں', 'خواجہ ناظم الدین'],
        correctAnswer: 1,
        explanationEn: 'Maulvi A.K. Fazlul Huq, the Premier of Bengal, formally moved the resolution.',
        explanationUr: 'مولوی اے کے فضل الحق نے قراردادِ لاہور پیش کی جس کی صدارت قائد اعظم نے فرمائی۔'
      },
      {
        id: 'q-pak-2',
        questionEn: 'What was the venue where the 1940 resolution was passed (now Minar-e-Pakistan)?',
        questionUr: '۱۹۴۰ء میں قرارداد کس مقام پر منظور کی گئی جہاں اب مینارِ پاکستان واقع ہے؟',
        optionsEn: ['Shalimar Gardens', 'Minto Park (Iqbal Park)', 'Jallianwala Bagh', 'Anarkali Park'],
        optionsUr: ['شالامار باغ', 'منٹو پارک (اقبال پارک لاہور)', 'جلیانوالہ باغ', 'انارکلی پارک'],
        correctAnswer: 1,
        explanationEn: 'Minto Park Lahore is now known as Greater Iqbal Park, marked by Minar-e-Pakistan.',
        explanationUr: 'منٹو پارک لاہور میں یہ جلسہ منعقد ہوا تھا جسے آج اقبال پارک کہا جاتا ہے۔'
      }
    ]
  },
  {
    id: 'quiz-math-1',
    subjectId: 'math',
    titleEn: 'Mathematics: Matrices Basics Quiz',
    titleUr: 'ریاضی: قالب کا مختصر امتحانی پرچہ',
    durationMinutes: 6,
    xpReward: 35,
    questions: [
      {
        id: 'q-m-1',
        questionEn: 'What is the order of matrix M = [ [3, 8, 1], [0, 4, 7] ]?',
        questionUr: 'قالب M = [ [3, 8, 1], [0, 4, 7] ] کا مرتبہ کیا ہے؟',
        optionsEn: ['3 × 2', '2 × 3', '2 × 2', '3 × 3'],
        optionsUr: ['۳ × ۲', '۲ × ۳', '۲ × ۲', '۳ × ۳'],
        correctAnswer: 1,
        explanationEn: 'The matrix has 2 rows and 3 columns, hence order is 2 × 3.',
        explanationUr: 'اس قالب میں ۲ قطاریں اور ۳ کالم ہیں، لہٰذا مرتبہ ۲ × ۳ ہے۔'
      },
      {
        id: 'q-m-2',
        questionEn: 'If determinant |A| = 0, what is the inverse A⁻¹?',
        questionUr: 'اگر مقطع |A| = 0 ہو، تو معکوس قالب A⁻¹ کی کیا حیثیت ہوگی؟',
        optionsEn: ['Zero matrix', 'Identity matrix', 'Does not exist (Undefined)', 'Equal to matrix A'],
        optionsUr: ['صفری قالب', 'وحدانی قالب', 'ممکن نہیں (غیر معین)', 'قالب A کے برابر'],
        correctAnswer: 2,
        explanationEn: 'Since A⁻¹ = Adj(A) / |A|, division by zero is undefined. Inverse does not exist.',
        explanationUr: 'چونکہ فارمولا Adj(A) / |A| ہے، صفر سے تقسیم ممکن نہیں اس لیے معکوس نہیں نکل سکتا۔'
      }
    ]
  }
];

export const PAST_PAPERS: PastPaper[] = [
  {
    id: 'pp-1',
    subjectId: 'islamiyat',
    board: 'Federal Board (FBISE)',
    year: 2024,
    titleEn: 'FBISE Islamiyat Compulsory Paper 2024 (Solved)',
    titleUr: 'فیڈرل بورڈ اسلامیات لازمی سالانہ پرچہ ۲۰۲۴ء (حل شدہ)',
    solved: true,
    totalMarks: 50,
    questionsCount: 20
  },
  {
    id: 'pp-2',
    subjectId: 'pakstudies',
    board: 'Lahore Board (BISE Lahore)',
    year: 2024,
    titleEn: 'BISE Lahore Pakistan Studies 2024 (Past Paper)',
    titleUr: 'لاہور بورڈ مطالعہ پاکستان پرچہ ۲۰۲۴ء مع جوابات',
    solved: true,
    totalMarks: 50,
    questionsCount: 22
  },
  {
    id: 'pp-3',
    subjectId: 'math',
    board: 'Federal Board (FBISE)',
    year: 2023,
    titleEn: 'FBISE SSC-I Mathematics Annual Exam 2023',
    titleUr: 'فیڈرل بورڈ نہم ریاضی سالانہ امتحان ۲۰۲۳ء مع تفصیلی حل',
    solved: true,
    totalMarks: 75,
    questionsCount: 25
  },
  {
    id: 'pp-4',
    subjectId: 'computer',
    board: 'Karachi Board (BIEK)',
    year: 2024,
    titleEn: 'Karachi Board Computer Science Model Paper 2024',
    titleUr: 'کراچی بورڈ کمپیوٹر سائنس ماڈل پرچہ ۲۰۲۴ء',
    solved: true,
    totalMarks: 75,
    questionsCount: 28
  },
  {
    id: 'pp-5',
    subjectId: 'urdu',
    board: 'Rawalpindi Board (BISE Rwp)',
    year: 2023,
    titleEn: 'BISE Rawalpindi Urdu Compulsory 2023 Solved Paper',
    titleUr: 'راولپنڈی بورڈ اردو لازمی حل شدہ پرچہ ۲۰۲۳ء',
    solved: true,
    totalMarks: 75,
    questionsCount: 18
  }
];

export const DUAS_DATA: DuaItem[] = [
  {
    id: 'dua-1',
    titleEn: 'Dua for Knowledge and Understanding',
    titleUr: 'علم میں اضافے اور فہم کی دعا',
    arabicText: 'رَّبِّ زِدْنِي عِلْمًا',
    transliteration: 'Rabbi zidni \'ilma',
    translationEn: 'My Lord, increase me in knowledge.',
    translationUr: 'اے میرے رب! میرے علم میں اضافہ فرما۔',
    benefitEn: 'Recited by students before studying or examinations for mental clarity.',
    benefitUr: 'پڑھائی شروع کرنے سے قبل اور امتحانات میں ذہنی یکسوئی اور برکت کے لیے مسنون دعا۔',
    reference: 'Surah Ta-Ha (20:114)'
  },
  {
    id: 'dua-2',
    titleEn: 'Dua for Ease in Difficult Tasks',
    titleUr: 'مشکل کام میں آسانی کی دعا',
    arabicText: 'اللَّهُمَّ لاَ سَهْلَ إِلاَّ مَا جَعَلْتَهُ سَهْلاً، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلاً',
    transliteration: 'Allahumma la sahla illa ma ja\'altahu sahla, wa anta taj\'alul-hazna idha shi\'ta sahla',
    translationEn: 'O Allah, there is nothing easy except what You make easy, and You make hardship easy if You will.',
    translationUr: 'اے اللہ! کوئی چیز آسان نہیں سوائے اس کے جسے تو آسان بنا دے، اور تو جب چاہے غم اور مشکل کو آسان کر دیتا ہے۔',
    benefitEn: 'Relieves study anxiety, exam nervousness, and life obstacles.',
    benefitUr: 'امتحانی پریشانی، مشکل سوالات اور ہر کٹھن مرحلے پر پڑھنے کی پرتاثیر دعا۔',
    reference: 'Sahih Ibn Hibban'
  },
  {
    id: 'dua-3',
    titleEn: 'Dua for Removing Speech Hesitation & Expanding the Chest',
    titleUr: 'فصاحتِ زبان اور کشادگیٔ سینہ کی دعا',
    arabicText: 'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِّن لِّسَانِي يَفْقَهُوا قَوْلِي',
    transliteration: 'Rabbish-rah li sadri, wa yassir li amri, wahlul \'uqdatam-mil-lisani, yafqahu qawli',
    translationEn: 'My Lord, expand for me my chest, and ease for me my task, and untie the knot from my tongue that they may understand my speech.',
    translationUr: 'اے میرے پروردگار! میرا سینہ کھول دے، میرا کام آسان کر دے، اور میری زبان کی گرہ سلجھا دے تاکہ لوگ میری بات سمجھ سکیں۔',
    benefitEn: 'Dua of Prophet Musa (AS), ideal for presentations, interviews, and oral exams.',
    benefitUr: 'حضرت موسیٰ علیہ السلام کی دعا؛ انٹرویو اور تقریر سے پہلے بے حد مفید۔',
    reference: 'Surah Ta-Ha (20:25-28)'
  },
  {
    id: 'dua-4',
    titleEn: 'Dua When Entering the House / Study Space',
    titleUr: 'گھر یا جائے مطالعہ میں داخل ہونے کی دعا',
    arabicText: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا',
    transliteration: 'Bismillahi walajna, wa bismillahi kharajna, wa \'ala Rabbina tawakkalna',
    translationEn: 'In the name of Allah we enter, and in the name of Allah we leave, and upon our Lord we rely.',
    translationUr: 'اللہ کے نام سے ہم داخل ہوئے اور اللہ کے نام سے ہم نکلے، اور اپنے رب ہی پر ہم نے بھروسہ کیا۔',
    benefitEn: 'Protects the home and infuses barakah into your study hours.',
    benefitUr: 'گھر میں داخل ہوتے وقت برکت و حفاظت کی دعا۔',
    reference: 'Sunan Abi Dawud'
  }
];

export const QURAN_SURAHS: QuranSurah[] = [
  {
    id: 'surah-1',
    surahNumber: 1,
    nameArabic: 'سورة الفاتحة',
    nameEn: 'Surah Al-Fatihah (The Opening)',
    nameUr: 'سورۃ الفاتحہ',
    versesCount: 7,
    revelationType: 'Makki',
    verses: [
      {
        number: 1,
        arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Bismillahir-Rahmanir-Rahim',
        en: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
        ur: 'شروع اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے۔'
      },
      {
        number: 2,
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        transliteration: 'Al-hamdu lillahi Rabbil-\'alamin',
        en: '[All] praise is [due] to Allah, Lord of the worlds -',
        ur: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔'
      },
      {
        number: 3,
        arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
        transliteration: 'Ar-Rahmanir-Rahim',
        en: 'The Entirely Merciful, the Especially Merciful,',
        ur: 'بہت مہربان، نہایت رحم فرمانے والا ہے۔'
      },
      {
        number: 4,
        arabic: 'مَالِكِ يَوْمِ الدِّينِ',
        transliteration: 'Maliki Yawmid-Din',
        en: 'Sovereign of the Day of Recompense.',
        ur: 'روزِ جزا کا تنہا مالک ہے۔'
      },
      {
        number: 5,
        arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
        transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'in',
        en: 'It is You we worship and You we ask for help.',
        ur: 'ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں۔'
      },
      {
        number: 6,
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        transliteration: 'Ihdinas-Siratal-Mustaqim',
        en: 'Guide us to the straight path -',
        ur: 'ہمیں سیدھے راستے کی ہدایت فرما۔'
      },
      {
        number: 7,
        arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
        transliteration: 'Siratal-ladhina an\'amta \'alayhim, ghayril-maghdubi \'alayhim walad-dallin',
        en: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
        ur: 'ان لوگوں کا راستہ جن پر تو نے انعام فرمایا، نہ کہ ان کا جن پر غضب ہوا اور نہ گمراہوں کا۔'
      }
    ]
  },
  {
    id: 'surah-112',
    surahNumber: 112,
    nameArabic: 'سورة الإخلاص',
    nameEn: 'Surah Al-Ikhlas (The Sincerity)',
    nameUr: 'سورۃ الاخلاص',
    versesCount: 4,
    revelationType: 'Makki',
    verses: [
      {
        number: 1,
        arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
        transliteration: 'Qul Huwallahu Ahad',
        en: 'Say, "He is Allah, [who is] One,',
        ur: 'آپ فرما دیجیے: وہ اللہ ایک ہے۔'
      },
      {
        number: 2,
        arabic: 'اللَّهُ الصَّمَدُ',
        transliteration: 'Allahus-Samad',
        en: 'Allah, the Eternal Refuge.',
        ur: 'اللہ بے نیاز (سب اس کے محتاج) ہے۔'
      },
      {
        number: 3,
        arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
        transliteration: 'Lam yalid wa lam yoolad',
        en: 'He neither begets nor is born,',
        ur: 'نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے۔'
      },
      {
        number: 4,
        arabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
        transliteration: 'Wa lam yakun lahu kufuwan ahad',
        en: 'Nor is there to Him any equivalent."',
        ur: 'اور کوئی اس کا ہمسر اور برابر نہیں ہے۔'
      }
    ]
  }
];

export const SEERAH_STORIES: SeerahStory[] = [
  {
    id: 'seerah-1',
    titleEn: 'The Truthful & Trustworthy (Al-Sadiq & Al-Amin)',
    titleUr: 'صادق اور امین: نوجوانی اور اخلاقِ حسنہ',
    eraEn: 'Pre-Prophethood Makkah',
    eraUr: 'قبل از بعثت کا دورِ مکہ',
    contentEn: `Even before receiving divine revelation at the age of forty, Prophet Muhammad (PBUH) was celebrated throughout the Arabian Peninsula for unmatched integrity and honesty. The Quraysh, regardless of tribal factions, entrusted their most precious goods to him and referred to him as Al-Sadiq (the Truthful) and Al-Amin (the Trustworthy).\n\nWhen the Kaaba was rebuilt and tribal chiefs drew swords over who would place the sacred Black Stone (Hajr-e-Aswad), the Prophet (PBUH) placed the stone on a cloak and had every clan leader hold an edge, gracefully preventing a catastrophic war through supreme wisdom and justice.`,
    contentUr: `اعلانِ نبوت سے قبل بھی مکہ کے لوگ نبی کریمﷺ کی سچائی، دیانت اور امانت داری کے معترف تھے۔ ہر قبیلے کے لوگ اپنے قیمتی سامان آپﷺ کے پاس امانت رکھواتے اور آپﷺ کو "صادق" اور "امین" کے لقب سے پکارتے تھے۔\n\nتعمیرِ کعبہ کے موقع پر جب حجرِ اسود کی تنصیب پر قبائلی سردار تلواریں سونت چکے تھے، تو آپﷺ نے اپنی دانشمندی سے ایک چادر میں حجرِ اسود کو رکھا اور تمام قبائل کے سرداروں سے چادر کے کونے پکڑوائے، یوں ایک خونریز جنگ کو حسنِ تدبیر سے روک دیا۔`,
    lessonLearnedEn: 'Moral character, unblemished honesty, and collaborative peacemaking are the true prerequisites for leadership.',
    lessonLearnedUr: 'کردار کی پاکیزگی اور دیانت داری ہی حقیقی کامیابی اور قیادت کی کنجی ہے۔',
    audioDurationMin: 6
  },
  {
    id: 'seerah-2',
    titleEn: 'The Historic Hijrah to Madinah',
    titleUr: 'ہجرتِ مدینہ: قربانی، منصوبہ بندی اور نیا آغاز',
    eraEn: '622 CE',
    eraUr: '۶۲۲ء بمطابق سال اول ہجری',
    contentEn: `Facing intense persecution, the Prophet (PBUH) and his beloved companion Abu Bakr (RA) undertook the perilous migration to Yathrib (later Madinat al-Nabi). While enemies surrounded his home, Hazrat Ali (RA) fearlessly slept in the Prophet\'s bed to return people\'s deposits.\n\nThe Hijrah demonstrated the pinnacle of both divine reliance (Tawakkul) and meticulous human planning—taking a secret southern route, resting in the Cave of Thawr, and utilizing trusted guides.`,
    contentUr: `مشرکینِ مکہ کے ظلم و ستم کے بعد اللہ کے حکم سے نبی کریمﷺ اور حضرت ابوبکر صدیقؓ نے مدینہ کی طرف ہجرت فرمائی۔ حضرت علیؓ نے رسول اللہﷺ کے بستر پر بے خوفی سے آرام کیا تاکہ مکہ والوں کی امانتیں واپس لوٹائی جا سکیں۔\n\nہجرت کا واقعہ ہمیں سکھاتا ہے کہ بھرپور منصوبہ بندی اور اسباب اختیار کرنے کے بعد اللہ پر کامل بھروسہ رکھنا مومن کا شیوہ ہے۔`,
    lessonLearnedEn: 'Success requires meticulous preparation coupled with unshakeable reliance upon Allah.',
    lessonLearnedUr: 'کامیابی کے لیے تدبیر اور توکل کا حسین امتزاج ناگزیر ہے۔',
    audioDurationMin: 8
  }
];

export const BADGES_LIST: Badge[] = [
  {
    id: 'b-streak-3',
    titleEn: 'Flame Starter',
    titleUr: 'مشعلِ علم',
    descriptionEn: 'Maintained a 3-day continuous study streak',
    descriptionUr: 'مسلسل ۳ دن پڑھائی کا تسلسل برقرار رکھا',
    icon: 'Flame',
    color: 'from-amber-500 to-orange-500',
    isUnlocked: true,
    unlockedAt: '2 days ago'
  },
  {
    id: 'b-streak-7',
    titleEn: '7-Day Champion',
    titleUr: 'ہفتہ وار استقامت',
    descriptionEn: 'Studied every day for 7 consecutive days',
    descriptionUr: 'مسلسل ۷ دن بلا ناغہ پڑھائی کی',
    icon: 'Zap',
    color: 'from-emerald-500 to-teal-500',
    isUnlocked: true,
    unlockedAt: 'Yesterday'
  },
  {
    id: 'b-perfect-quiz',
    titleEn: 'Centurion 100%',
    titleUr: 'کامل نتیجہ',
    descriptionEn: 'Scored 100% on any practice quiz without mistakes',
    descriptionUr: 'کسی بھی کوئز میں بغیر غلطی کے ۱۰۰٪ نمبر حاصل کیے',
    icon: 'Award',
    color: 'from-purple-500 to-indigo-600',
    isUnlocked: true,
    unlockedAt: '3 days ago'
  },
  {
    id: 'b-islamic-scholar',
    titleEn: 'Hafiz-e-Dua',
    titleUr: 'حافظِ دعا',
    descriptionEn: 'Completed all 4 daily Duas and listened to Arabic recitation',
    descriptionUr: 'تمام روزمرہ دعائیں پڑھیں اور تلاوت سنی',
    icon: 'HeartHandshake',
    color: 'from-emerald-600 to-teal-700',
    isUnlocked: false
  },
  {
    id: 'b-math-wizard',
    titleEn: 'Math Wizard',
    titleUr: 'ماہرِ ریاضی',
    descriptionEn: 'Solved 10 Matrix & Algebra problems correctly',
    descriptionUr: 'قالب اور الجبرا کے ۱۰ سوالات درست حل کیے',
    icon: 'Cpu',
    color: 'from-red-500 to-rose-600',
    isUnlocked: false
  },
  {
    id: 'b-offline-ready',
    titleEn: 'Pocket Library',
    titleUr: 'ذخیرۂ معلومات',
    descriptionEn: 'Saved at least 3 chapters for offline study',
    descriptionUr: 'آف لائن مطالعے کے لیے ۳ اسباق محفوظ کیے',
    icon: 'Download',
    color: 'from-blue-500 to-cyan-600',
    isUnlocked: true,
    unlockedAt: 'Today'
  }
];

export const LEADERBOARD_USERS: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Ayesha Fatima',
    nameUr: 'عائشہ فاطمہ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    xp: 2840,
    streak: 19,
    badge: '🏆 Top Scholar',
    city: 'Lahore'
  },
  {
    rank: 2,
    name: 'Muhammad Hamza',
    nameUr: 'محمد حمزہ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    xp: 2610,
    streak: 14,
    badge: '⚡ Quiz Master',
    city: 'Islamabad'
  },
  {
    rank: 3,
    name: 'Zainab Noor',
    nameUr: 'زینب نور',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80',
    xp: 2390,
    streak: 11,
    badge: '🌟 Diligent',
    city: 'Karachi'
  },
  {
    rank: 4,
    name: 'Bilal Ahmed (You)',
    nameUr: 'بلال احمد (آپ)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    xp: 1850,
    streak: 7,
    badge: '🔥 7-Day Streak',
    city: 'Peshawar',
    isCurrentUser: true
  },
  {
    rank: 5,
    name: 'Maryam Tariq',
    nameUr: 'مریم طارق',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    xp: 1720,
    streak: 9,
    badge: '📚 Bookworm',
    city: 'Rawalpindi'
  },
  {
    rank: 6,
    name: 'Usman Ghani',
    nameUr: 'عثمان غنی',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    xp: 1540,
    streak: 6,
    badge: '💡 Fast Thinker',
    city: 'Faisalabad'
  }
];

export const PLACEMENT_QUESTIONS = [
  {
    id: 'pq-1',
    subject: 'Islamiyat',
    questionEn: 'How many daily obligatory (Farz) prayers are there in Islam?',
    questionUr: 'اسلام میں دن بھر میں کتنی نمازیں فرض ہیں؟',
    optionsEn: ['Three (3)', 'Four (4)', 'Five (5)', 'Seven (7)'],
    optionsUr: ['تین (۳)', 'چار (۴)', 'پانچ (۵)', 'سات (۷)'],
    correctAnswer: 2
  },
  {
    id: 'pq-2',
    subject: 'Pakistan Studies',
    questionEn: 'Who was the first Governor-General of Pakistan?',
    questionUr: 'پاکستان کے پہلے گورنر جنرل کون تھے؟',
    optionsEn: ['Liaquat Ali Khan', 'Quaid-e-Azam Muhammad Ali Jinnah', 'Khawaja Nazimuddin', 'Ghulam Muhammad'],
    optionsUr: ['لیاقت علی خان', 'قائدِ اعظم محمد علی جناح', 'خواجہ ناظم الدین', 'ملک غلام محمد'],
    correctAnswer: 1
  },
  {
    id: 'pq-3',
    subject: 'Mathematics',
    questionEn: 'What is the value of 5² - 3²?',
    questionUr: 'ریاضیاتی سوال: 5² - 3² کی قیمت کیا ہوگی؟',
    optionsEn: ['4', '16', '14', '8'],
    optionsUr: ['۴', '۱۶', '۱۴', '۸'],
    correctAnswer: 1
  },
  {
    id: 'pq-4',
    subject: 'Computer',
    questionEn: 'Which of the following is the brain of the computer?',
    questionUr: 'کمپیوٹر کا دماغ کس حصے کو کہا جاتا ہے؟',
    optionsEn: ['RAM', 'Hard Disk', 'CPU (Central Processing Unit)', 'Monitor'],
    optionsUr: ['ریم (RAM)', 'ہارڈ ڈسک', 'سی پی یو (CPU)', 'مانیٹر'],
    correctAnswer: 2
  },
  {
    id: 'pq-5',
    subject: 'Urdu',
    questionEn: 'اردو زبان کا پہلا دیوان کس شاعر کا تسلیم کیا جاتا ہے؟',
    questionUr: 'اردو زبان کا پہلا باقاعدہ صاحبِ دیوان شاعر کون ہے؟',
    optionsEn: ['Mir Taqi Mir', 'Quli Qutb Shah', 'Mirza Ghalib', 'Allama Iqbal'],
    optionsUr: ['میر تقی میر', 'سلطان محمد قلی قطب شاہ', 'مرزا اسد اللہ خان غالب', 'علامہ محمد اقبال'],
    correctAnswer: 1
  }
];
