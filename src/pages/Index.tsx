import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const NAV = [
  { id: 'hero', label: 'Главная' },
  { id: 'overview', label: 'Обзор' },
  { id: 'stats', label: 'Статистика' },
  { id: 'tables', label: 'Таблицы' },
  { id: 'insights', label: 'Выводы' },
  { id: 'contacts', label: 'Контакты' },
];

const KPI = [
  { label: 'Выручка', value: '4,82', unit: 'млн ₽', delta: '+18%', icon: 'TrendingUp', up: true },
  { label: 'Закрытых объектов', value: '27', unit: 'шт', delta: '+6', icon: 'CheckCircle2', up: true },
  { label: 'Средний чек', value: '178', unit: 'тыс ₽', delta: '+9%', icon: 'Wallet', up: true },
  { label: 'Новых заявок', value: '143', unit: 'шт', delta: '+22%', icon: 'PhoneIncoming', up: true },
];

const OVERVIEW = [
  { icon: 'Zap', title: 'Электромонтаж под ключ', text: 'Проектирование, монтаж и сдача объектов с гарантией и документацией.' },
  { icon: 'Building2', title: '27 сданных объектов', text: 'Квартиры, офисы и производственные помещения в срок и по смете.' },
  { icon: 'ShieldCheck', title: 'Контроль качества', text: 'Все работы проходят проверку соответствия ПУЭ и внутренним стандартам.' },
];

const FUNNEL = [
  { stage: 'Заявки', value: 143, pct: 100 },
  { stage: 'Замеры', value: 98, pct: 69 },
  { stage: 'Сметы', value: 61, pct: 43 },
  { stage: 'Договоры', value: 34, pct: 24 },
  { stage: 'Сданы', value: 27, pct: 19 },
];

const CHANNELS = [
  { name: 'Сайт / поиск', leads: 52, deals: 11, cost: '2 400 ₽' },
  { name: 'Рекомендации', leads: 38, deals: 12, cost: '0 ₽' },
  { name: 'Соцсети', leads: 29, deals: 3, cost: '3 100 ₽' },
  { name: 'Контекст', leads: 24, deals: 1, cost: '5 800 ₽' },
];

const OBJECTS = [
  { name: 'ЖК «Северный», кв. 214', type: 'Квартира', area: '78 м²', sum: '186 000 ₽', status: 'Сдан' },
  { name: 'Офис «Технопарк», 3 эт.', type: 'Офис', area: '240 м²', sum: '512 000 ₽', status: 'Сдан' },
  { name: 'Склад «Логист-М»', type: 'Производство', area: '1 100 м²', sum: '1 240 000 ₽', status: 'Сдан' },
  { name: 'Коттедж, п. Луговое', type: 'Частный дом', area: '210 м²', sum: '398 000 ₽', status: 'В работе' },
  { name: 'Кафе «Огонёк»', type: 'Коммерция', area: '95 м²', sum: '224 000 ₽', status: 'Сдан' },
];

const INSIGHTS = [
  { icon: 'ArrowUpRight', title: 'Рекомендации — лучший канал', text: 'Конверсия в сделку 32% при нулевой стоимости привлечения. Стоит усилить программу «приведи друга».' },
  { icon: 'AlertTriangle', title: 'Контекст неэффективен', text: 'Стоимость лида 5 800 ₽ при 1 сделке. Рекомендуем перераспределить бюджет в пользу SEO и соцсетей.' },
  { icon: 'Timer', title: 'Узкое место — этап смет', text: 'Между замером и сметой теряется 38% заявок. Ускорение подготовки смет даст +5–7 сделок в месяц.' },
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
          <span className="h-px w-8 bg-accent" />
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-accent">{label}</span>
        </div>
        <h2 className="font-display font-600 text-3xl md:text-5xl uppercase tracking-tight text-primary mb-10 text-balance">{title}</h2>
        {children}
      </div>
    </section>
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
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-violet">Коммерческий отчёт · Tolka Digital</span>
            </div>
            <h1 className="font-display font-700 uppercase tracking-tight text-primary leading-[0.95] text-5xl md:text-7xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
              Эльмопро<br />
              <span className="text-violet">за июнь 2026</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground animate-fade-up" style={{ animationDelay: '0.2s' }}>
              Электромонтажные работы под ключ. Ключевые показатели, статистика по каналам и объектам, выводы и точки роста за отчётный месяц.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <a href="#stats" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded font-500 hover:opacity-90 transition-opacity">
                Смотреть статистику <Icon name="ArrowDown" size={16} />
              </a>
              <a href="#insights" className="inline-flex items-center gap-2 border border-violet/40 px-6 py-3 rounded font-500 text-violet hover:bg-violet/5 transition-colors">
                Выводы <Icon name="Lightbulb" size={16} />
              </a>
            </div>
          </div>
          <div className="hidden lg:block animate-fade-up" style={{ animationDelay: '0.25s' }}>
            <img
              src="https://cdn.poehali.dev/projects/fb97a217-3e90-45a5-8b04-e633bf5cb1e3/bucket/b013f4bc-d2ed-4258-8031-071a173b4322.png"
              alt="Tolka Digital"
              className="w-full rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <Section id="overview" label="Обзор" title="Что делает Эльмопро">
        <div className="grid md:grid-cols-3 gap-6">
          {OVERVIEW.map((o) => (
            <div key={o.title} className="bg-card border border-border rounded-lg p-8 hover:border-accent transition-colors group">
              <div className="w-12 h-12 rounded bg-secondary grid place-items-center mb-6 group-hover:bg-accent transition-colors">
                <Icon name={o.icon} size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-600 text-xl uppercase text-primary mb-3">{o.title}</h3>
              <p className="text-muted-foreground">{o.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* STATS — KPI + funnel */}
      <div className="bg-primary text-primary-foreground">
        <Section id="stats" label="Статистика" title="Ключевые показатели">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {KPI.map((k) => (
              <div key={k.label} className="bg-white/5 border border-white/10 rounded-lg p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-6">
                  <Icon name={k.icon} size={22} className="text-accent" />
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-accent/15 text-accent">{k.delta}</span>
                </div>
                <div className="font-display font-700 text-4xl md:text-5xl leading-none">
                  {k.value}<span className="text-lg text-primary-foreground/60 ml-1">{k.unit}</span>
                </div>
                <div className="mt-2 text-sm text-primary-foreground/60">{k.label}</div>
              </div>
            ))}
          </div>

          <h3 className="font-display font-500 text-lg uppercase tracking-wide text-primary-foreground/80 mb-6">Воронка продаж</h3>
          <div className="space-y-4">
            {FUNNEL.map((f, i) => (
              <div key={f.stage} className="flex items-center gap-4">
                <div className="w-24 text-sm text-primary-foreground/70 shrink-0">{f.stage}</div>
                <div className="flex-1 h-9 rounded bg-white/5 overflow-hidden">
                  <div
                    className="h-full bg-accent origin-left animate-count-line flex items-center px-3 font-mono text-xs text-accent-foreground font-700"
                    style={{ width: `${f.pct}%`, animationDelay: `${i * 0.1}s` }}
                  >
                    {f.value}
                  </div>
                </div>
                <div className="w-12 text-right font-mono text-sm text-primary-foreground/70">{f.pct}%</div>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* TABLES */}
      <Section id="tables" label="Таблицы" title="Детальная сводка">
        <div className="grid lg:grid-cols-2 gap-8 mb-10">
          <div>
            <h3 className="font-display font-500 text-sm uppercase tracking-wide text-muted-foreground mb-4">Каналы привлечения</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-primary">
                  <tr className="text-left font-display uppercase text-xs tracking-wide">
                    <th className="px-4 py-3">Канал</th>
                    <th className="px-4 py-3 text-right">Лиды</th>
                    <th className="px-4 py-3 text-right">Сделки</th>
                    <th className="px-4 py-3 text-right">Цена лида</th>
                  </tr>
                </thead>
                <tbody>
                  {CHANNELS.map((c) => (
                    <tr key={c.name} className="border-t border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-3 font-500 text-primary">{c.name}</td>
                      <td className="px-4 py-3 text-right font-mono">{c.leads}</td>
                      <td className="px-4 py-3 text-right font-mono">{c.deals}</td>
                      <td className="px-4 py-3 text-right font-mono text-muted-foreground">{c.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-display font-500 text-sm uppercase tracking-wide text-muted-foreground mb-4">Объекты месяца</h3>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-secondary text-primary">
                  <tr className="text-left font-display uppercase text-xs tracking-wide">
                    <th className="px-4 py-3">Объект</th>
                    <th className="px-4 py-3">Площадь</th>
                    <th className="px-4 py-3 text-right">Сумма</th>
                    <th className="px-4 py-3 text-right">Статус</th>
                  </tr>
                </thead>
                <tbody>
                  {OBJECTS.map((o) => (
                    <tr key={o.name} className="border-t border-border hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-500 text-primary">{o.name}</div>
                        <div className="text-xs text-muted-foreground">{o.type}</div>
                      </td>
                      <td className="px-4 py-3 font-mono text-muted-foreground">{o.area}</td>
                      <td className="px-4 py-3 text-right font-mono">{o.sum}</td>
                      <td className="px-4 py-3 text-right">
                        <span className={`text-xs px-2 py-0.5 rounded font-500 ${o.status === 'Сдан' ? 'bg-accent/15 text-accent-foreground border border-accent/40' : 'bg-secondary text-muted-foreground'}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* INSIGHTS */}
      <div className="bg-secondary/50">
        <Section id="insights" label="Выводы" title="Точки роста и решения">
          <div className="grid md:grid-cols-3 gap-6">
            {INSIGHTS.map((ins) => (
              <div key={ins.title} className="bg-card border border-border rounded-lg p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 h-1 w-full bg-accent" />
                <Icon name={ins.icon} size={28} className="text-accent mb-5" />
                <h3 className="font-display font-600 text-lg uppercase text-primary mb-3 leading-tight">{ins.title}</h3>
                <p className="text-muted-foreground">{ins.text}</p>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* CONTACTS */}
      <Section id="contacts" label="Контакты" title="Обсудим ваш проект">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              Готовы взять ваш объект под ключ — от проекта до сдачи. Свяжитесь удобным способом.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'Phone', label: 'Телефон', value: '+7 (900) 000-00-00' },
                { icon: 'Mail', label: 'Почта', value: 'info@elmopro.ru' },
                { icon: 'MapPin', label: 'Офис', value: 'г. Москва, ул. Энергетиков, 12' },
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
          <form className="bg-card border border-border rounded-lg p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <input placeholder="Ваше имя" className="w-full px-4 py-3 rounded border border-border bg-background focus:outline-none focus:border-accent transition-colors" />
            <input placeholder="Телефон" className="w-full px-4 py-3 rounded border border-border bg-background focus:outline-none focus:border-accent transition-colors" />
            <textarea placeholder="Об объекте" rows={4} className="w-full px-4 py-3 rounded border border-border bg-background focus:outline-none focus:border-accent transition-colors resize-none" />
            <button className="w-full bg-primary text-primary-foreground py-3 rounded font-500 hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
              Отправить заявку <Icon name="Send" size={16} />
            </button>
          </form>
        </div>
      </Section>

      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <span className="font-display font-600 uppercase tracking-wide text-primary">Эльмопро</span>
          <span>Отчёт за июнь 2026 · Электромонтажные работы под ключ</span>
        </div>
      </footer>
    </div>
  );
};

export default Index;