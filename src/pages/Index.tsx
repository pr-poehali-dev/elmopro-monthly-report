import { useEffect, useRef, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/icon';

const NAV = [
  { id: 'hero', label: 'Главная' },
  { id: 'project', label: 'О проекте' },
  { id: 'results', label: 'Итоги месяца' },
  { id: 'dynamics', label: 'Динамика' },
  { id: 'direct', label: 'Директ' },
  { id: 'works', label: 'Работы' },
  { id: 'contacts', label: 'Контакты' },
];

const PROJECT_LINKS = [
  { icon: 'Table', title: 'Понедельная статистика', text: 'Расход, заявки и стоимость лида по неделям месяца.', href: 'https://docs.google.com/spreadsheets/d/1Q3IAkMR1H7tOhgANisZCoDWc9LFwvvbiDbSxchVoVK8/edit?gid=1775730410#gid=1775730410' },
  { icon: 'Filter', title: 'Воронка окупаемости', text: 'Путь от лида до сделки и юнит-экономика проекта.', href: 'https://docs.google.com/spreadsheets/d/1Q3IAkMR1H7tOhgANisZCoDWc9LFwvvbiDbSxchVoVK8/edit?gid=520946394#gid=520946394' },
  { icon: 'Globe', title: 'Сайт', text: 'Посадочная страница, на которую ведёт реклама.', href: 'https://elmopro.org/' },
];

const PLAN_FACT = [
  { label: 'Бюджет, с НДС', plan: '200 000', fact: '191 750.92 ₽', note: null },
  { label: 'Количество заявок', plan: '50', fact: '32', note: null },
  { label: 'Стоимость заявки, с НДС', plan: '4 000', fact: '5 992.22 ₽', note: null },
  { label: 'Количество чистых заявок', plan: '40', fact: '19', note: '*' },
  { label: 'Стоимость чистой заявки, с НДС', plan: '5 000', fact: '10 092.15 ₽', note: null },
  { label: 'Количество Квал заявок', plan: '8', fact: '7', note: '**' },
  { label: 'Стоимость Квал заявки, с НДС', plan: '25 000', fact: '25 839 ₽', note: null },
];

const MAY_JUNE = [
  { label: 'Бюджет, с НДС', may: '125 591.44 ₽', june: '191 750.92 ₽' },
  { label: 'Количество заявок', may: '22', june: '32' },
  { label: 'Стоимость заявки, с НДС', may: '5 708.70 ₽', june: '5 992.22 ₽' },
  { label: 'Количество чистых заявок', may: '16*', june: '19*' },
  { label: 'Стоимость чистой заявки, с НДС', may: '7 849.47 ₽', june: '10 092.15 ₽' },
  { label: 'Количество Квал заявок', may: '5**', june: '7**' },
  { label: 'Стоимость Квал заявки, с НДС', may: '25 118.29 ₽', june: '25 839 ₽' },
];

const TREND = [
  { month: 'Янв', spend25: 82883.84, spend26: 95949.18, clicks25: 303, clicks26: 376, cpc25: 273.54, cpc26: 255.18, uniq25: 21, uniq26: 18, uniqCost25: 3946.85, uniqCost26: 5330.51, qual25: 3, qual26: 2, qualCost25: 27627.95, qualCost26: 47974.59 },
  { month: 'Фев', spend25: 111401.31, spend26: 91518.80, clicks25: 395, clicks26: 395, cpc25: 282.03, cpc26: 231.69, uniq25: 38, uniq26: 20, uniqCost25: 2931.61, uniqCost26: 4575.94, qual25: 5, qual26: 3, qualCost25: 22280.26, qualCost26: 30506.27 },
  { month: 'Мар', spend25: 122873.39, spend26: 144326.43, clicks25: 399, clicks26: 352, cpc25: 307.95, cpc26: 410.02, uniq25: 31, uniq26: 36, uniqCost25: 3963.66, uniqCost26: 4009.07, qual25: 6, qual26: 5, qualCost25: 20478.90, qualCost26: 28865.29 },
  { month: 'Апр', spend25: 99036.98, spend26: 176642.18, clicks25: 384, clicks26: 581, cpc25: 257.91, cpc26: 304.03, uniq25: 45, uniq26: 23, uniqCost25: 2200.82, uniqCost26: 7680.09, qual25: 7, qual26: 3, qualCost25: 14148.14, qualCost26: 58880.73 },
  { month: 'Май', spend25: 86058.17, spend26: 124791.07, clicks25: 323, clicks26: 353, cpc25: 266.43, cpc26: 353.52, uniq25: 29, uniq26: 17, uniqCost25: 2967.52, uniqCost26: 7340.65, qual25: 6, qual26: 4, qualCost25: 14343.03, qualCost26: 31197.77 },
  { month: 'Июнь', spend25: 98688.98, spend26: 191750.93, clicks25: 381, clicks26: 298, cpc25: 259.03, cpc26: 643.46, uniq25: 36, uniq26: 24, uniqCost25: 2741.36, uniqCost26: 7989.62, qual25: 4, qual26: 3, qualCost25: 24672.25, qualCost26: 63916.98 },
];

const CHARTS = [
  { title: 'Расход, ₽', k25: 'spend25', k26: 'spend26', fmt: (v: number) => `${Math.round(v).toLocaleString('ru-RU')} ₽` },
  { title: 'Клики и CPC, ₽', k25: 'clicks25', k26: 'clicks26', fmt: (v: number) => `${Math.round(v)}` },
  { title: 'Уникальные лиды и их стоимость', k25: 'uniq25', k26: 'uniq26', fmt: (v: number) => `${Math.round(v)}` },
  { title: 'Квал. лиды и их стоимость', k25: 'qual25', k26: 'qual26', fmt: (v: number) => `${Math.round(v)}` },
];

const DEVICES = [
  { name: 'Десктопы', spend: 176847.44, clicks: 257, conv: 24 },
  { name: 'Смартфоны', spend: 1953.01, clicks: 14, conv: 0 },
  { name: 'Планшеты', spend: 1912.31, clicks: 10, conv: 0 },
];

const GENDER = [
  { name: 'Мужской', spend: 128258.09, clicks: 212, conv: 16 },
  { name: 'Женский', spend: 47529.06, clicks: 64, conv: 10 },
  { name: 'Не определён', spend: 4912.00, clicks: 13, conv: 1 },
];

const AGE = [
  { name: '35-44 года', spend: 69673.76, clicks: 101, conv: 9 },
  { name: '25-34 года', spend: 45856.99, clicks: 72, conv: 9 },
  { name: '45-54 года', spend: 36174.79, clicks: 56, conv: 4 },
  { name: 'Старше 55', spend: 19902.63, clicks: 33, conv: 4 },
  { name: 'Не определён', spend: 5018.97, clicks: 18, conv: 0 },
  { name: '18-24 года', spend: 4072.01, clicks: 9, conv: 1 },
];

const GROUPS = [
  { name: 'Электромонтажные работы под ключ москва', spend: 117777.58, clicks: 192, conv: 15 },
  { name: 'Электромонтажные работы общая', spend: 25327.46, clicks: 51, conv: 3 },
  { name: 'Электромонтажные работы цена за м²', spend: 13269.48, clicks: 11, conv: 2 },
  { name: 'Услуги по производству работ', spend: 6421.81, clicks: 5, conv: 1 },
  { name: 'Электромонтажные работы под ключ цена', spend: 3241.95, clicks: 10, conv: 1 },
  { name: 'Монтаж ВРУ цена', spend: 2954.13, clicks: 3, conv: 1 },
];

const TITLES = [
  { name: 'Электромонтажные работы под ключ в Москве', spend: 136717.45, clicks: 226, conv: 17 },
  { name: 'Электромонтажные работы. Рассчитайте цену на сайте!', spend: 13269.48, clicks: 11, conv: 2 },
  { name: 'Услуги по производству электромонтажаных работ', spend: 6421.81, clicks: 5, conv: 1 },
  { name: 'Электромонтажные работы «под ключ». Рассчитайте цену!', spend: 3588.13, clicks: 14, conv: 1 },
  { name: 'Монтаж ВРУ! Рассчитайте цену на сайте!', spend: 2954.13, clicks: 3, conv: 1 },
];

const MATCH_TYPE = [
  { name: 'Фраза', spend: 134704.36, clicks: 211, conv: 18 },
  { name: 'Автотаргетинг', spend: 45994.79, clicks: 78, conv: 9 },
];

const WORKS_DONE = [
  'Отслеживание показателей рекламы',
  'Оптимизация рекламного бюджета под задачи',
  'Работа с корректировками пола/возраста и устройств',
  'Тестирование элементов рекламы (УТП объявлений и их форматов)',
  'Исключение неэффективных площадок',
  'Исключение неэффективных ключевых запросов',
  'Перераспределение бюджета с неэффективных запросов на конверсионные',
  'Отключение неэффективных групп объявлений/фраз',
];

const WORKS_PLAN = [
  'Отслеживание и корректировка поисковых фраз',
  'Чистка семантики (спам, минус-слова)',
  'Держаться в спецразмещении (Топ 1-2 на Поиске) и выкупать 70%+ объёма трафика',
];

const PLAN_NEXT = [
  { label: 'Бюджет, с НДС', plan: '200 000' },
  { label: 'Количество заявок', plan: '40' },
  { label: 'Стоимость заявки, с НДС', plan: '5 000' },
  { label: 'Количество чистых заявок', plan: '32' },
  { label: 'Стоимость чистой заявки, с НДС', plan: '6 250' },
  { label: 'Количество Квал заявок', plan: '9' },
  { label: 'Стоимость Квал заявки, с НДС', plan: '22 222' },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, shown };
}

const Section = ({ id, label, title, children }: { id: string; label: string; title: string; children: React.ReactNode }) => {
  const { ref, shown } = useReveal();
  return (
    <section id={id} className="scroll-mt-20 py-20 md:py-28 px-6">
      <div ref={ref} className={`max-w-6xl mx-auto transition-all duration-700 ${shown ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="flex items-center gap-3 mb-3">
          <span className="h-px w-8 bg-violet" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-violet">{label}</span>
        </div>
        <h2 className="font-display font-600 text-3xl md:text-5xl uppercase tracking-tight text-primary mb-10 text-balance">{title}</h2>
        {children}
      </div>
    </section>
  );
};

const MiniTrendChart = ({ title, k25, k26, fmt }: { title: string; k25: string; k26: string; fmt: (v: number) => string }) => (
  <div className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur">
    <h4 className="font-display font-500 text-sm uppercase tracking-wide text-primary-foreground/80 mb-4">{title}</h4>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={{ stroke: 'rgba(255,255,255,0.15)' }} tickLine={false} />
        <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
        <Tooltip
          contentStyle={{ background: '#1a1030', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 8, fontSize: 12 }}
          labelStyle={{ color: '#fff' }}
          formatter={(v: number) => fmt(v)}
        />
        <Line type="monotone" dataKey={k25} name="2025" stroke="rgba(255,255,255,0.4)" strokeWidth={2} strokeDasharray="5 4" dot={false} />
        <Line type="monotone" dataKey={k26} name="2026" stroke="hsl(160 62% 54%)" strokeWidth={3} dot={{ r: 3 }} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const CutTable = ({ title, rows }: { title: string; rows: { name: string; spend: number; clicks: number; conv: number }[] }) => {
  const total = rows.reduce((s, r) => s + r.spend, 0);
  return (
    <div>
      <h3 className="font-display font-500 text-sm uppercase tracking-wide text-muted-foreground mb-4">{title}</h3>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary text-primary">
            <tr className="text-left font-display uppercase text-xs tracking-wide">
              <th className="px-4 py-3">Разрез</th>
              <th className="px-4 py-3 text-right">Расход</th>
              <th className="px-4 py-3 text-right">Клики</th>
              <th className="px-4 py-3 text-right">Конв.</th>
              <th className="px-4 py-3 text-right">Доля</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name} className="border-t border-border hover:bg-secondary/50 transition-colors">
                <td className="px-4 py-3 font-500 text-primary max-w-[220px]">{r.name}</td>
                <td className="px-4 py-3 text-right font-mono">{Math.round(r.spend).toLocaleString('ru-RU')} ₽</td>
                <td className="px-4 py-3 text-right font-mono">{r.clicks}</td>
                <td className="px-4 py-3 text-right font-mono">{r.conv}</td>
                <td className="px-4 py-3 text-right font-mono text-muted-foreground">{((r.spend / total) * 100).toFixed(0)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Index = () => {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-violet grid place-items-center">
              <Icon name="Zap" size={18} className="text-white" />
            </div>
            <span className="font-display font-700 text-lg uppercase tracking-wide text-primary">Эльмопро</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`}
                className={`text-sm font-500 transition-colors ${active === n.id ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}>
                {n.label}
              </a>
            ))}
          </nav>
          <span className="font-mono text-xs text-muted-foreground border border-border rounded px-2 py-1">Июнь 2026</span>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-center pt-16 overflow-hidden lavender-glow">
        <div className="absolute inset-0 grid-bg opacity-20" />
        <div className="relative max-w-6xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="flex items-center gap-3 mb-6 animate-fade-up">
              <span className="h-px w-8 bg-violet" />
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-violet">Отчёт по сопровождению контекстной рекламы</span>
            </div>
            <h1 className="font-display font-700 uppercase tracking-tight text-primary leading-[0.95] text-5xl md:text-7xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Эльмопро<br />
              <span className="text-violet">июнь 2026</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Ключевые показатели, статистика план/факт, выводы за отчётный месяц и план работ на следующий.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <a href="#results" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-500 hover:opacity-90 transition-opacity">
                Смотреть статистику <Icon name="ArrowDown" size={16} />
              </a>
              <a href="#works" className="inline-flex items-center gap-2 border border-violet/40 px-6 py-3 rounded font-500 text-violet hover:bg-violet/5 transition-colors">
                Выводы <Icon name="Lightbulb" size={16} />
              </a>
            </div>
          </div>
          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <img
              src="https://cdn.poehali.dev/projects/fb97a217-3e90-45a5-8b04-e633bf5cb1e3/bucket/901282fd-45e9-47ee-8701-50c0f59af9d5.png"
              alt="Сайт Elmopro"
              className="w-full rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* PROJECT INFO */}
      <Section id="project" label="О проекте" title="Общая информация по проекту">
        <div className="grid md:grid-cols-3 gap-6">
          {PROJECT_LINKS.map((p) => (
            <a key={p.title} href={p.href} target="_blank" rel="noopener noreferrer"
              className="bg-card border border-border rounded-lg p-8 hover:border-violet transition-colors group block">
              <div className="w-12 h-12 rounded bg-secondary grid place-items-center mb-6 group-hover:bg-violet transition-colors">
                <Icon name={p.icon} size={24} className="text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-display font-600 text-xl uppercase text-primary mb-3 flex items-center gap-2">
                {p.title} <Icon name="ArrowUpRight" size={16} className="text-violet" />
              </h3>
              <p className="text-muted-foreground">{p.text}</p>
            </a>
          ))}
        </div>
      </Section>

      {/* RESULTS — plan/fact + may/june */}
      <div className="bg-primary text-primary-foreground">
        <Section id="results" label="Итоги месяца" title="План и факт за июнь">
          <h3 className="font-display font-500 text-lg uppercase tracking-wide text-primary-foreground/80 mb-6">Динамика по ключевым показателям</h3>
          <div className="border border-white/10 rounded-lg overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr className="text-left font-display uppercase text-xs tracking-wide">
                  <th className="px-4 py-3">Параметры</th>
                  <th className="px-4 py-3 text-right">План</th>
                  <th className="px-4 py-3 text-right">Факт</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_FACT.map((r) => (
                  <tr key={r.label} className="border-t border-white/10">
                    <td className="px-4 py-3 font-500">{r.label}</td>
                    <td className="px-4 py-3 text-right font-mono text-primary-foreground/70">{r.plan}</td>
                    <td className="px-4 py-3 text-right font-mono">{r.fact}{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-primary-foreground/60 mb-16 space-y-1">
            <span className="block">* По чистым лидам — 4 спама, но ещё висят 9 необработанных лидов.</span>
            <span className="block">** Дополнительно 9 потенциальных квалов.</span>
          </p>

          <h3 className="font-display font-500 text-lg uppercase tracking-wide text-primary-foreground/80 mb-6">Сравнение с прошлым месяцем</h3>
          <div className="border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr className="text-left font-display uppercase text-xs tracking-wide">
                  <th className="px-4 py-3">Параметры</th>
                  <th className="px-4 py-3 text-right">Факт май</th>
                  <th className="px-4 py-3 text-right">Факт июнь</th>
                </tr>
              </thead>
              <tbody>
                {MAY_JUNE.map((r) => (
                  <tr key={r.label} className="border-t border-white/10">
                    <td className="px-4 py-3 font-500">{r.label}</td>
                    <td className="px-4 py-3 text-right font-mono text-primary-foreground/70">{r.may}</td>
                    <td className="px-4 py-3 text-right font-mono">{r.june}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* DYNAMICS charts */}
      <div className="bg-primary text-primary-foreground">
        <Section id="dynamics" label="Динамика" title="Тренды за 2025–2026">
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {CHARTS.map((c) => (
              <MiniTrendChart key={c.title} title={c.title} k25={c.k25} k26={c.k26} fmt={c.fmt} />
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Lightbulb" size={18} className="text-accent" />
              <h4 className="font-display font-600 uppercase text-sm">Вывод</h4>
            </div>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              В июне 2026 расход вырос почти вдвое год к году (191 751 ₽ против 98 689 ₽), при этом клики просели на 22%, а CPC подскочил в 2,5 раза — аукцион по ключевым запросам заметно «перегрелся», конкуренция за клик выросла. Как следствие, стоимость уникального лида увеличилась почти втрое (7 990 ₽ против 2 741 ₽), а квал-лида — на 159% (63 917 ₽ против 24 672 ₽). Апрель–июнь 2026 в целом дороже апреля–июня 2025 по всем метрикам — рынок контекстной рекламы в нише подорожал, а не наша воронка стала хуже работать. Рекомендация: сокращать долю дорогих фраз в пользу автотаргетинга и следить за CPC ежедневно, а не понедельно.
            </p>
          </div>
        </Section>
      </div>

      {/* DIRECT breakdowns */}
      <Section id="direct" label="Директ" title="Статистика по разрезам · июнь 2026">
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <CutTable title="Тип устройства" rows={DEVICES} />
          <CutTable title="Условие показа" rows={MATCH_TYPE} />
          <CutTable title="Пол" rows={GENDER} />
          <CutTable title="Возраст" rows={AGE} />
          <CutTable title="Группы объявлений" rows={GROUPS} />
          <CutTable title="Заголовки объявлений" rows={TITLES} />
        </div>
        <div className="bg-secondary/50 border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="Lightbulb" size={18} className="text-violet" />
            <h4 className="font-display font-600 uppercase text-sm text-primary">Выводы и гипотезы</h4>
          </div>
          <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed list-disc pl-4">
            <li><b className="text-primary">Устройства:</b> 92% бюджета уходит на десктопы — весь объём трафика и конверсий формируется там. Мобайл почти не откручивается: вероятно, стоит понижающая корректировка. Если сайт хорошо адаптирован под смартфоны, есть смысл протестировать небольшой бюджет на мобильный трафик.</li>
            <li><b className="text-primary">Пол и возраст:</b> мужчины дают 73% расхода и основную часть конверсий, самая дорогая и одновременно самая конверсионная группа — 35-44 года. Аудитория 18-24 почти не реагирует на объявления — ставки по ней можно снизить.</li>
            <li><b className="text-primary">Группы объявлений:</b> «Электромонтажные работы под ключ Москва» — ядро кампании: 61% бюджета и 15 из всех конверсий месяца. Остальные группы работают заметно слабее — стоит пересмотреть релевантность фраз в них.</li>
            <li><b className="text-primary">Заголовки:</b> связка «Электромонтажные работы под ключ в Москве» — явный лидер по объёму и конверсиям, её нужно масштабировать. Остальные заголовки почти не получают показов — можно освободить бюджет под новые тесты.</li>
            <li><b className="text-primary">Условие показа:</b> фраза даёт больше объёма (18 конверсий), но автотаргетинг эффективнее по цене — CPA 5 111 ₽ против 7 484 ₽ у фразы. Гипотеза: перераспределить часть бюджета в пользу автотаргетинга без потери объёма лидов.</li>
          </ul>
        </div>
      </Section>

      {/* WORKS */}
      <div className="bg-secondary/50">
        <Section id="works" label="Работы" title="Что сделано и план на месяц">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="CheckCircle2" size={22} className="text-accent" />
                <h3 className="font-display font-600 uppercase text-primary">Проведено в июне</h3>
              </div>
              <ul className="space-y-3">
                {WORKS_DONE.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon name="Check" size={16} className="text-accent mt-0.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="flex items-center gap-2 mb-5">
                <Icon name="ListChecks" size={22} className="text-violet" />
                <h3 className="font-display font-600 uppercase text-primary">План на июль</h3>
              </div>
              <ul className="space-y-3">
                {WORKS_PLAN.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Icon name="ArrowRight" size={16} className="text-violet mt-0.5 shrink-0" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      </div>

      {/* DEMAND */}
      <Section id="demand" label="Спрос" title="Спрос на следующий месяц">
        <div className="bg-card border border-border rounded-lg p-8 flex flex-col md:flex-row gap-6 items-start">
          <div className="w-full md:w-64 aspect-video rounded-lg bg-secondary grid place-items-center shrink-0 border border-dashed border-border">
            <div className="text-center text-muted-foreground text-sm px-4">
              <Icon name="ImagePlus" size={28} className="mx-auto mb-2 opacity-60" />
              Скриншот спроса Wordstat
            </div>
          </div>
          <div>
            <p className="text-muted-foreground leading-relaxed">
              Здесь появится скриншот из Яндекс.Wordstat по ключевым запросам ниши на июль и сравнение с показателями того же месяца прошлого года — как только выгрузим свежие данные, добавим сюда график сезонности и комментарий по ожидаемому спросу.
            </p>
          </div>
        </div>
      </Section>

      {/* PLAN NEXT MONTH */}
      <div className="bg-primary text-primary-foreground">
        <Section id="plan-next" label="План" title="Плановые показатели на июль">
          <div className="border border-white/10 rounded-lg overflow-hidden max-w-2xl">
            <table className="w-full text-sm">
              <thead className="bg-white/10">
                <tr className="text-left font-display uppercase text-xs tracking-wide">
                  <th className="px-4 py-3">Параметры</th>
                  <th className="px-4 py-3 text-right">План</th>
                </tr>
              </thead>
              <tbody>
                {PLAN_NEXT.map((r) => (
                  <tr key={r.label} className="border-t border-white/10">
                    <td className="px-4 py-3 font-500">{r.label}</td>
                    <td className="px-4 py-3 text-right font-mono">{r.plan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* CONTACTS */}
      <Section id="contacts" label="Контакты" title="Остались вопросы?">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Если у вас остались вопросы или предложения по форме или содержанию ежемесячного отчёта — свяжитесь удобным способом.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'Phone', label: 'Телефон Tolka Digital', value: '+7 937 474-00-37' },
                { icon: 'Mail', label: 'Почта Tolka Digital', value: 'tolkadigital@polovinkin.pro' },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded bg-secondary grid place-items-center shrink-0">
                    <Icon name={c.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                    <div className="font-500 text-primary">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-card border border-border rounded-lg p-8 flex flex-col items-center justify-center text-center gap-4 min-h-[220px]">
            <Icon name="MessageCircle" size={40} className="text-violet" />
            <p className="text-muted-foreground text-sm max-w-xs">
              Кнопка ниже — заглушка. Пришлите ссылку на чат (Telegram, WhatsApp или Max), и мы подключим её сюда.
            </p>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-500 opacity-70 cursor-not-allowed"
            >
              Написать в чат <Icon name="Send" size={16} />
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-600 uppercase tracking-wide text-primary">Эльмопро</span>
          <span>Отчёт по контекстной рекламе · июнь 2026 · Tolka Digital</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;
