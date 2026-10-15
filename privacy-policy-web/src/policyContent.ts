// All content taken from TOS_Privacy_Help.docx.
// Use **double asterisks** for bold and *single asterisks* for italics inside any text.
export type Item = { lead?: string; text: string };
export type Faq = { q: string; a: string };
export type Section = {
  id: string;
  title: string;
  items?: Item[];
  faqs?: Faq[];
  note?: string;
  paragraphs?: string[];
  cards?: Item[]; // rendered as cards inside a tinted box
  boxed?: boolean;
  hideTitle?: boolean;
};
export type PageId = 'about' | 'terms' | 'privacy' | 'help';
export type Page = {
  id: PageId;
  nav: string;
  title: string;
  updated?: string;
  intro?: string;
  numbered: boolean;
  sections: Section[];
};

export const SUPPORT_EMAIL = 'infodomsbox@gmail.com';
export const RESPONSE_TIME = 'We aim to reply to all inquiries within 24 to 48 business hours';
const UPDATED = 'July 2026';

export const PAGES: Page[] = [  
  {
    id: 'about',
    nav: 'About Us',
    title: 'About Us',
    numbered: false,
    sections: [
      {
        id: 'about-us',
        title: 'About Us',
        hideTitle: true,
        paragraphs: [
          'DOMSBOX merupakan sebuah usaha di bidang kebugaran yang sudah berdiri sejak tahun 2020. Dengan menggunakan metode latihan **CrossFit**, DOMSBOX menjadi pusat kebugaran yang berbeda dari pusat kebugaran yang sudah ada sebelumnya.',
          'Selain itu, didukung dengan **basis komunitas** yang kuat menjadikan jenis olahraga ini semakin dicari oleh masyarakat dewasa ini.',
          'Nama **DOMS (Delayed Onset Muscle Soreness)** sendiri mencerminkan semangat kami, bahwa dalam setiap rasa lelah dan nyeri adalah tanda dari pertumbuhan dan kemajuan.',
        ],
      },
      {
        id: 'layanan-program',
        title: 'Layanan & Program Kami',
        boxed: true,
        cards: [
          { lead: 'Functional Training', text: 'Latihan yang gerakannya diadaptasi dari kehidupan sehari-hari, bertujuan untuk menambah performa dalam melakukan aktivitas harian.' },
          { lead: 'Personal Training', text: 'Program latihan yang disesuaikan secara spesifik dengan kebutuhan dan tujuan masing-masing *client*.' },
          { lead: 'Community Event', text: 'Aktivitas bersama yang melibatkan *member* maupun *non-member* untuk membangun semangat, kebersamaan, dan kekompakan.' },
        ],
      },
      {
        id: 'visi',
        title: 'Visi',
        paragraphs: ['Menjadi wadah bagi siapapun untuk menjadi versi yang lebih baik setiap harinya.'],
      },
      {
        id: 'misi',
        title: 'Misi',
        items: [
          { lead: 'Aman, Efektif, & Menyenangkan:', text: 'Memberikan program latihan yang aman, efektif, dan menyenangkan sehingga meningkatkan kesadaran masyarakat akan pentingnya latihan untuk mendukung gaya hidup yang aktif.' },
          { lead: 'Komunitas yang Positif:', text: 'Membangun komunitas yang suportif dan positif bagi seluruh anggota.' },
        ],
      },
    ],
  },
  {
    id: 'terms',
    nav: 'Terms & Conditions',
    title: 'Terms & Conditions',
    updated: UPDATED,
    intro:
      'Welcome to our application. By downloading, installing, or using this app, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, please do not use the application.',
    numbered: true,
    sections: [
      {
        id: 'license-and-permitted-use',
        title: 'License and Permitted Use',
        items: [
          { text: 'We grant you a limited, non-exclusive, non-transferable, and revocable license to use this app for personal, non-commercial purposes on your mobile device.' },
          { text: 'You agree not to misuse, reverse-engineer, modify, or attempt to extract the source code of the application.' },
        ],
      },
      {
        id: 'user-accounts-and-security',
        title: 'User Accounts & Security',
        items: [
          { text: 'To access certain features, you may be required to register an account.' },
          { text: 'You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.' },
        ],
      },
      {
        id: 'intellectual-property-rights',
        title: 'Intellectual Property Rights',
        items: [
          { text: 'All content, designs, graphics, user interfaces, logos, and software code within this application are the exclusive property of the app developers and are protected by applicable intellectual property laws.' },
        ],
      },
      {
        id: 'limitation-of-liability',
        title: 'Limitation of Liability',
        items: [
          { text: 'This application is provided on an "as-is" and "as-available" basis without warranties of any kind.' },
          { text: 'We do not guarantee that the app will be completely free of errors, bugs, or interruptions. We are not liable for any direct or indirect damages, data loss, or disruption resulting from your use of the app.' },
        ],
      },
      {
        id: 'termination',
        title: 'Termination',
        items: [
          { text: 'We reserve the right to suspend or terminate your access to the app at any time, without prior notice, if we determine that you have violated these terms or engaged in fraudulent behaviours.' },
        ],
      },
      {
        id: 'changes-to-the-terms',
        title: 'Changes to the Terms',
        items: [
          { text: 'We may update these Terms & Conditions periodically. Your continued use of the application after any updates are posted will signify your acceptance of the revised terms.' },
        ],
      },
    ],
  },
  {
    id: 'privacy',
    nav: 'Privacy Policy',
    title: 'Privacy Policy',
    updated: UPDATED,
    intro:
      'Your privacy is extremely important to us. This Privacy Policy details how we collect, use, disclose, and protect your information when you interact with our mobile application.',
    numbered: true,
    sections: [
      {
        id: 'information-we-collect',
        title: 'Information We Collect',
        items: [
          { lead: 'Account Information:', text: 'When you create an account, we may collect information such as your name, email address, and profile preferences.' },
          { lead: 'Device and Usage Data:', text: "We automatically log certain technical details, including your device model, operating system version, unique device identifiers, and data on how you navigate and use the app's features." },
        ],
      },
      {
        id: 'how-we-use-your-information',
        title: 'How We Use Your Information',
        items: [
          { text: "To operate, maintain, troubleshoot, and improve the application's overall performance." },
          { text: 'To provide user support and handle any requests or inquiries you send us.' },
          { text: 'To send you necessary system notifications, security alerts, and updates regarding your account.' },
        ],
      },
      {
        id: 'data-sharing-and-third-parties',
        title: 'Data Sharing and Third Parties',
        items: [
          { text: 'We do not sell, rent, or trade your personal data to third parties.' },
          { text: 'We may share minimal, non-identifiable data with trusted third-party service providers (such as secure cloud hosting or performance analytics tools) solely to help us run and optimize the app safely.' },
        ],
      },
      {
        id: 'data-security',
        title: 'Data Security',
        items: [
          { text: 'We implement strict industry-standard technical and organizational security measures to protect your information against unauthorized access, loss, or alteration. However, please note that no method of transmission over the internet or mobile network is 100% secure.' },
        ],
      },
      {
        id: 'your-choices-and-data-deletion',
        title: 'Your Choices and Data Deletion',
        items: [
          { text: 'You can access, update, or edit your personal profile information at any time via your account settings.' },
          { text: 'If you wish to permanently delete your account and all associated data, you may submit a request through the app settings or contact our support team.' },
        ],
      },
    ],
  },
  {
    id: 'help',
    nav: 'Help Center',
    title: 'Help Center & Support',
    numbered: false,
    sections: [
      {
        id: 'faq',
        title: 'Frequently Asked Questions (FAQ)',
        faqs: [
          { q: 'How do I change my profile information?', a: 'Navigate to **Settings > Account > Edit Profile** to easily update your username, contact info, or display preferences.' },
          { q: 'The app is lagging or crashing. How can I fix this?', a: "Please check that you have the latest version of the app installed via the App Store or Google Play Store. You can also try closing the app completely, clearing your device's cache, or restarting your device." },
          { q: 'How do I manage notifications?', a: "You can turn push notifications on or off at any time by going to **Settings > Notifications** inside the app, or via your phone's system settings." },
          { q: 'How can I delete my account?', a: 'If you wish to close your account, go to **Settings > Account > Delete Account**. Please note that this action is permanent and all your saved preferences and data will be erased immediately.' },
        ],
      },
      {
        id: 'contact-customer-support',
        title: 'Contact Customer Support',
        note: "Can't find what you are looking for? Our support team is here to assist you.",
        items: [
          { lead: 'Email Support:', text: SUPPORT_EMAIL },
          { lead: 'Estimated Response Time:', text: RESPONSE_TIME },
        ],
      },
    ],
  },
];
