import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  Linking,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { PAGES, PageId, RESPONSE_TIME, SUPPORT_EMAIL, Section } from './src/policyContent';

const C = {
  bg: '#FFFFFF',
  page: '#F5F6F7',
  text: '#1C2B33',
  muted: '#65676B',
  border: '#DADDE1',
  blue: '#0866FF',
  blueSoft: '#E7F3FF',
  hover: '#F2F3F5',
};
const FONT = Platform.select({
  web: '"Optimistic Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  default: undefined,
});
const WIDE_BREAKPOINT = 900;
const TOPBAR_H = 64;
const LOGO_W = 497; // assets/doms-logo.png size
const LOGO_H = 170;

function Rich({ text, style }: { text: string; style?: any }) {
  return (
    <Text style={style}>
      {text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/).map((part, i) =>
        part.startsWith('**') ? (
          <Text key={i} style={s.bold}>{part.slice(2, -2)}</Text>
        ) : part.startsWith('*') && part.length > 2 ? (
          <Text key={i} style={s.italic}>{part.slice(1, -1)}</Text>
        ) : (
          part
        ),
      )}
    </Text>
  );
}

const pageFromHash = (): PageId => {
  const h = Platform.OS === 'web' ? window.location.hash.replace('#', '') : '';
  return (PAGES.find((p) => p.id === h)?.id ?? 'privacy') as PageId;
};

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const scrollRef = useRef<ScrollView>(null);
  const offsets = useRef<Record<string, number>>({});
  const [pageId, setPageId] = useState<PageId>(pageFromHash);
  const page = PAGES.find((p) => p.id === pageId)!;
  const [active, setActive] = useState(page.sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const [expanded, setExpanded] = useState<PageId | null>(pageId);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  useEffect(() => {
    if (Platform.OS === 'web') document.title = `${page.title} | Privacy Center`;
  }, [page]);

  const switchPage = (id: PageId) => {
    if (id === pageId) return;
    offsets.current = {};
    setPageId(id);
    setActive(PAGES.find((p) => p.id === id)!.sections[0].id);
    setExpanded(id);
    setOpenFaq(null);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    if (Platform.OS === 'web') window.location.hash = id;
  };

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const y = e.nativeEvent.contentOffset.y + 120;
      let current = page.sections[0].id;
      for (const sec of page.sections) {
        if ((offsets.current[sec.id] ?? Infinity) <= y) current = sec.id;
      }
      setActive(current);
    },
    [page],
  );

  // Header click: current page toggles open/closed; another page opens (and navigates).
  const onHeader = (id: PageId) => {
    if (id === pageId) setExpanded(expanded === id ? null : id);
    else switchPage(id);
  };

  const goTo = (id: string) => {
    const y = offsets.current[id];
    if (y !== undefined) scrollRef.current?.scrollTo({ y: Math.max(0, y - 24), animated: true });
    setActive(id);
    setTocOpen(false);
  };

  const label = (sec: Section, i: number) => (page.numbered ? `${i + 1}. ${sec.title}` : sec.title);

  return (
    <View style={s.root}>
      <StatusBar style="dark" />
      <TopBar isWide={isWide} />
      <View style={s.body}>
        {isWide && (
          <View style={s.sidebar}>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
              <NavAccordion pageId={pageId} expanded={expanded} active={active} onHeader={onHeader} onSection={goTo} />
            </ScrollView>
          </View>
        )}

        <ScrollView
          ref={scrollRef}
          style={s.main}
          contentContainerStyle={[s.mainContent, !isWide && { padding: 20 }]}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View style={s.column}>
            <View>
              <Text accessibilityRole="header" aria-level={1} style={s.h1}>{page.title}</Text>
              {page.updated && <Text style={s.updated}>Last updated: {page.updated}</Text>}
              {page.intro && <Text style={s.intro}>{page.intro}</Text>}
            </View>

            {!isWide && (
              <View style={s.toc}>
                <Pressable onPress={() => setTocOpen(!tocOpen)} style={s.tocHead} accessibilityRole="button" aria-expanded={tocOpen}>
                  <Ionicons name="menu" size={22} color={C.text} />
                  <Text style={s.tocHeadText}>Menu</Text>
                  <Ionicons name={tocOpen ? 'chevron-up' : 'chevron-down'} size={20} color={C.muted} />
                </Pressable>
                {tocOpen && (
                  <View style={{ paddingHorizontal: 12, paddingBottom: 8 }}>
                    <NavAccordion pageId={pageId} expanded={expanded} active={active} onHeader={onHeader} onSection={goTo} />
                  </View>
                )}
              </View>
            )}

            {page.sections.map((sec, i) => (
              <View
                key={sec.id}
                nativeID={sec.id}
                onLayout={(e) => {
                  offsets.current[sec.id] = e.nativeEvent.layout.y;
                }}
                style={[s.section, sec.boxed && s.sectionBox, sec.hideTitle && s.sectionPlain]}
              >
                {!sec.hideTitle && (
                  <Text accessibilityRole="header" aria-level={2} style={s.h2}>{label(sec, i)}</Text>
                )}
                {sec.paragraphs?.map((para, k) => (
                  <Rich key={k} text={para} style={s.para} />
                ))}
                {sec.cards && (
                  <View style={s.cards}>
                    {sec.cards.map((c) => (
                      <View key={c.lead} style={s.card}>
                        <Text style={s.cardTitle}>{c.lead}</Text>
                        <Rich text={c.text} style={s.cardText} />
                      </View>
                    ))}
                  </View>
                )}
                {sec.note && <Text style={[s.body_, { marginBottom: 14 }]}>{sec.note}</Text>}

                {sec.faqs?.map((f) => {
                  const open = openFaq === f.q;
                  return (
                    <View key={f.q} style={s.faq}>
                      <Pressable
                        onPress={() => setOpenFaq(open ? null : f.q)}
                        accessibilityRole="button"
                        aria-expanded={open}
                        style={s.faqHead}
                      >
                        <Text style={s.faqQ}>{f.q}</Text>
                        <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={20} color={C.muted} />
                      </Pressable>
                      {open && <Rich text={f.a} style={s.faqA} />}
                    </View>
                  );
                })}

                {sec.items?.map((it, j) => (
                  <View key={j} style={s.bulletRow}>
                    <View style={s.bullet} />
                    <Text style={s.body_}>
                      {it.lead ? <Text style={s.bold}>{it.lead} </Text> : null}
                      {it.lead === 'Email Support:' ? (
                        <Text style={s.link} onPress={() => Linking.openURL(`mailto:${it.text}`)}>{it.text}</Text>
                      ) : (
                        <Rich text={it.text} />
                      )}
                    </Text>
                  </View>
                ))}
              </View>
            ))}

            {pageId !== 'help' && (
              <View style={s.contact}>
                <Text style={s.contactTitle}>Questions?</Text>
                <Text style={s.body_}>Our support team is here to assist you. {RESPONSE_TIME}.</Text>
                <View style={s.btnRow}>
                  <Pressable onPress={() => Linking.openURL(`mailto:${SUPPORT_EMAIL}`)} style={s.button} accessibilityRole="link">
                    <Ionicons name="mail-outline" size={18} color="#fff" />
                    <Text style={s.buttonText}>{SUPPORT_EMAIL}</Text>
                  </Pressable>
                  <Pressable onPress={() => switchPage('help')} style={s.buttonGhost} accessibilityRole="link">
                    <Text style={s.buttonGhostText}>Visit Help Center</Text>
                  </Pressable>
                </View>
              </View>
            )}

            <Text style={s.footer}>{page.title}{page.updated ? ` · Last updated ${page.updated}` : ''}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const NAV_ICONS: Record<PageId, React.ComponentProps<typeof Ionicons>['name']> = {
  privacy: 'lock-closed-outline',
  terms: 'document-text-outline',
  help: 'help-circle-outline',
  about: 'information-circle-outline',
};

type NavProps = {
  pageId: PageId;
  expanded: PageId | null;
  active: string;
  onHeader: (id: PageId) => void;
  onSection: (id: string) => void;
};

function NavAccordion({ pageId, expanded, active, onHeader, onSection }: NavProps) {
  return (
    <View>
      {PAGES.map((p) => {
        const open = expanded === p.id;
        return (
          <View key={p.id}>
            <Pressable
              onPress={() => onHeader(p.id)}
              accessibilityRole="button"
              aria-expanded={open}
              style={({ hovered }: any) => [s.navHead, hovered && { backgroundColor: C.hover }]}
            >
              <Ionicons name={NAV_ICONS[p.id]} size={26} color={pageId === p.id ? C.blue : C.text} />
              <Text style={[s.navHeadText, pageId === p.id && { color: C.blue }]}>{p.nav}</Text>
              <Ionicons name={open ? 'chevron-up' : 'chevron-down'} size={22} color={C.text} />
            </Pressable>
            {open &&
              p.sections.map((sec, i) => {
                const isActive = pageId === p.id && active === sec.id;
                return (
                  <Pressable
                    key={sec.id}
                    onPress={() => onSection(sec.id)}
                    accessibilityRole="link"
                    style={({ hovered }: any) => [s.navSub, hovered && { backgroundColor: C.hover }]}
                  >
                    <Text style={[s.navSubText, isActive && s.navSubActive]}>
                      {p.numbered ? `${i + 1}. ${sec.title}` : sec.title}
                    </Text>
                  </Pressable>
                );
              })}
          </View>
        );
      })}
    </View>
  );
}

function TopBar({ isWide }: { isWide: boolean }) {
  return (
    <View style={s.topbarWrap}>
      <View style={[s.topbar, { paddingHorizontal: isWide ? 32 : 16 }]}>
        <View style={s.brand}>
          <Image
            source={require('./assets/doms-logo.png')}
            style={s.logo}
            resizeMode="contain"
            accessibilityLabel="DOMS"
          />
          <View style={s.brandDivider} />
          <Text style={s.brandText}>Privacy Center</Text>
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg, ...(Platform.OS === 'web' ? ({ height: '100vh' } as any) : null) },
  topbarWrap: { borderBottomWidth: 1, borderBottomColor: C.border, backgroundColor: C.bg, zIndex: 10 },
  topbar: {
    height: TOPBAR_H,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logo: { height: 32, width: 32 * (LOGO_W / LOGO_H) },
  brandDivider: { width: 1, height: 24, backgroundColor: C.border },
  brandText: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: C.text },
  link: { color: C.blue, textDecorationLine: 'underline' },
  faq: { borderWidth: 1, borderColor: C.border, borderRadius: 12, marginBottom: 12, overflow: 'hidden' },
  faqHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12, padding: 16 },
  faqQ: { flex: 1, fontFamily: FONT, fontSize: 16, fontWeight: '600', color: C.text, lineHeight: 24 },
  faqA: { fontFamily: FONT, fontSize: 16, lineHeight: 26, color: C.text, paddingHorizontal: 16, paddingBottom: 16 },
  btnRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 4 },
  buttonGhost: { borderWidth: 1, borderColor: C.border, backgroundColor: C.bg, borderRadius: 24, paddingVertical: 10, paddingHorizontal: 18 },
  buttonGhostText: { fontFamily: FONT, color: C.text, fontSize: 15, fontWeight: '600' },
  body: { flex: 1, flexDirection: 'row' },
  sidebar: { width: 320, borderRightWidth: 1, borderRightColor: C.border, backgroundColor: C.bg },
  navHead: { flexDirection: 'row', alignItems: 'center', gap: 16, paddingVertical: 14, paddingHorizontal: 12, borderRadius: 8 },
  navHeadText: { flex: 1, fontFamily: FONT, fontSize: 18, fontWeight: '500', color: C.text },
  navSub: { paddingVertical: 10, paddingLeft: 54, paddingRight: 12, borderRadius: 8 },
  navSubText: { fontFamily: FONT, fontSize: 16, lineHeight: 22, color: C.text },
  navSubActive: { color: C.blue, fontWeight: '600' },
  sidebarTitle: { fontFamily: FONT, fontSize: 13, fontWeight: '700', color: C.muted, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 8, paddingHorizontal: 12 },
  navItem: { paddingVertical: 10, paddingHorizontal: 12, borderRadius: 8, marginBottom: 2 },
  navItemActive: { backgroundColor: C.blueSoft },
  navText: { fontFamily: FONT, fontSize: 15, color: C.text, lineHeight: 20 },
  navTextActive: { color: C.blue, fontWeight: '600' },
  main: { flex: 1, backgroundColor: C.bg },
  mainContent: { padding: 48 },
  column: { width: '100%', maxWidth: 760, alignSelf: 'center' },
  h1: { fontFamily: FONT, fontSize: 36, fontWeight: '700', color: C.text, marginBottom: 8 },
  updated: { fontFamily: FONT, fontSize: 14, color: C.muted, marginBottom: 20 },
  intro: { fontFamily: FONT, fontSize: 17, lineHeight: 26, color: C.text, marginBottom: 24 },
  toc: { borderWidth: 1, borderColor: C.border, borderRadius: 12, marginBottom: 8, overflow: 'hidden' },
  tocHead: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 16 },
  tocHeadText: { flex: 1, fontFamily: FONT, fontSize: 16, fontWeight: '600', color: C.text },
  tocItem: { paddingVertical: 12, paddingHorizontal: 16, borderTopWidth: 1, borderTopColor: C.border },
  tocItemText: { fontFamily: FONT, fontSize: 15, color: C.blue },
  section: { paddingTop: 28, paddingBottom: 8, borderTopWidth: 1, borderTopColor: C.border, marginTop: 24 },
  h2: { fontFamily: FONT, fontSize: 24, fontWeight: '700', color: C.text, marginBottom: 16 },
  bulletRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14, paddingRight: 8 },
  bullet: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.text, marginTop: 11, marginRight: 14 },
  body_: { flex: 1, fontFamily: FONT, fontSize: 16, lineHeight: 28, color: C.text },
  bold: { fontWeight: '700' },
  italic: { fontStyle: 'italic' },
  para: { fontFamily: FONT, fontSize: 17, lineHeight: 28, color: C.text, marginBottom: 14 },
  sectionPlain: { borderTopWidth: 0, marginTop: 0, paddingTop: 0 },
  sectionBox: { backgroundColor: C.page, borderTopWidth: 0, borderRadius: 16, padding: 24 },
  cards: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  card: { flexGrow: 1, flexBasis: 200, backgroundColor: C.bg, borderWidth: 1, borderColor: C.border, borderRadius: 12, padding: 16 },
  cardTitle: { fontFamily: FONT, fontSize: 17, fontWeight: '700', color: C.text, marginBottom: 8 },
  cardText: { fontFamily: FONT, fontSize: 15, lineHeight: 24, color: C.muted },
  contact: { backgroundColor: C.page, borderRadius: 16, padding: 24, marginTop: 32, gap: 12 },
  contactTitle: { fontFamily: FONT, fontSize: 20, fontWeight: '700', color: C.text },
  button: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: C.blue, borderRadius: 24, paddingVertical: 10, paddingHorizontal: 18 },
  buttonText: { fontFamily: FONT, color: '#fff', fontSize: 15, fontWeight: '600' },
  footer: { fontFamily: FONT, fontSize: 13, color: C.muted, textAlign: 'center', marginTop: 32, marginBottom: 16 },
});
