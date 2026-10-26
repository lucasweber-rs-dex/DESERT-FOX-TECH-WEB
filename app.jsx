const { useState, useEffect, useRef } = React;

document.documentElement.classList.add('js');

/* Conteúdo de exemplo: trocar pelas matérias reais antes de publicar. */
const NEWS = [
  {
    tab: 'DOWNLOADER Como Instalar ?',
    tag: 'Tutorial', author: 'DEX', date: 'Out 2026',
    img: 'assets/Publi/Downloader/logo.png', pos: '50% 50%',
    alt: 'Logotipo do aplicativo Downloader, letra D branca com seta de download sobre fundo laranja',
    href: 'downloader.html',
    text: 'O app essencial para quem usa TV Box ou Fire TV Stick: instale aplicativos de fora da loja oficial usando só um link ou código. Veja o passo a passo completo.',
  },
  {
    tab: 'Guia Instalação UNITV',
    tag: 'Tutorial', author: 'DEX', date: 'Out 2026',
    img: 'assets/Publi/UniTV/capa-home.webp', pos: '50% 50%',
    alt: 'Capa do tutorial Instalando UniTV: ícones do Downloader e do UniTV lado a lado sobre fundo escuro com brilho laranja',
    href: 'unitv.html',
    text: 'Aprenda o passo a passo completo de como baixar e instalar o aplicativo UniTV no seu dispositivo de forma rápida e fácil utilizando o app Downloader.',
  },
  {
    tab: 'IA no celular: o que roda offline',
    tag: 'Inteligência artificial', author: 'DEX', date: 'Out 2026',
    img: 'assets/sleeping-vulpes-zerda-at-happy-hollow-closeup.jpg', pos: '50% 40%',
    alt: 'Raposa-do-deserto dormindo, com as orelhas grandes em destaque',
    text: 'Testamos tradução, resumo e foto no modo avião. Um guia direto sobre o que já dispensa conexão e o que perde qualidade sem ela.',
  },
  {
    tab: 'O deserto virou laboratório de dados',
    tag: 'Ciência', author: 'DEX', date: 'Out 2026',
    img: 'assets/the-atacama-large-millimeter-array-alma-by.jpg', pos: '50% 50%',
    alt: 'Antenas do observatório ALMA à noite, no deserto do Atacama',
    text: 'Céu limpo, ar seco e silêncio de rádio: o Atacama reúne o que um telescópio precisa. E gera tantos dados que o desafio agora é guardá-los.',
  },
];

const ARTICLES = [
  { title: 'Sinal e ruído no seu feed', img: 'assets/the-atacama-large-millimeter-array-alma-by.jpg', alt: 'Antenas do observatório ALMA sob o céu estrelado do Atacama', tag: 'Guia', tone: 'bg-ink text-paper', big: true },
  { title: 'Seis ferramentas leves', tag: 'Produtividade', tone: 'bg-sand text-ink' },
  { title: 'Privacidade sem paranoia', tag: 'Segurança', tone: 'bg-white text-ink' },
];

const SOCIALS = [['Facebook', 'f'], ['X', 'X'], ['Instagram', 'ig']];
const MENU = ['Sobre', 'Vagas', 'Contato', 'Anuncie', 'Termos', 'Perguntas frequentes', 'Privacidade', 'Marca', 'Mapa do site', 'Downloads'];

/* Entrada ao rolar: cada parte da seção entra em sequência, uma única vez. */
function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add('in'); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} style={{ '--d': delay + 'ms' }} className={'rv ' + className} {...rest}>{children}</Tag>;
}

const btn = 'inline-flex min-h-[48px] items-center justify-center bg-fox px-7 text-base font-bold text-ink transition duration-200 hover:!bg-foxdark hover:!text-ink active:scale-[.98]';

function Nav() {
  return (
    <header className="flex items-center justify-between py-4">
      <a href="#top" className="flex min-h-[44px] items-center">
        <img src="assets/logo-dex-tech.png" width="988" height="126" alt="DEX-TECH" className="h-6 w-auto sm:h-8" />
      </a>
      <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-3 text-base font-medium">
        <a href="#noticias" className="hidden min-h-[44px] items-center px-3 sm:flex">Notícias</a>
        <a href="#artigos" className="hidden min-h-[44px] items-center px-3 sm:flex">Artigos</a>
        <a href="#newsletter" className="flex min-h-[44px] items-center bg-ink px-5 font-semibold text-paper transition hover:!bg-fox hover:!text-ink">Newsletter</a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-sand">
      <div className="flex flex-col px-4 pb-[2.1rem] sm:px-8 lg:pb-[2.8rem]">
        <Nav />
        <div className="flex flex-1 flex-col justify-center gap-[1.4rem] pt-[2.1rem] lg:pt-[1.4rem]">
          <h1 className="m-0 text-[clamp(31px,10.15vw,59px)] font-extrabold leading-[.92] tracking-[-.04em] lg:text-[clamp(50px,5.6vw,90px)]">
            <Reveal as="span" className="block">Conteúdo</Reveal>
            <Reveal as="span" delay={90} className="block">Sem Limites</Reveal>
          </h1>
          <Reveal delay={200}>
            <a href="#newsletter" className={btn}>Teste Agora!</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* A interação central: escolher uma notícia troca a matéria em destaque. */
function News() {
  const [i, setI] = useState(0);
  const refs = useRef([]);
  const n = NEWS[i];
  const onKey = e => {
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (i + d + NEWS.length) % NEWS.length;
    setI(next);
    refs.current[next] && refs.current[next].focus();
  };
  return (
    <section id="noticias" className="px-4 py-[clamp(72px,10vw,160px)] sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal as="h2" className="m-0 max-w-[16ch] text-[clamp(36px,5vw,72px)] font-extrabold leading-[.98] tracking-[-.03em]">
          Fique Por Dentro
        </Reveal>
        <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10">
          <Reveal delay={80} role="tablist" aria-label="Notícias" aria-orientation="vertical" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-col" onKeyDown={onKey}>
            {NEWS.map((x, k) => {
              const on = k === i;
              return (
                <button key={k} ref={el => (refs.current[k] = el)} role="tab" id={'tab-' + k}
                  aria-selected={on} aria-controls="painel-noticia" tabIndex={on ? 0 : -1}
                  onClick={() => setI(k)}
                  className="cut-tl min-h-[88px] rounded-[14px] bg-[#2C3E50] py-4 pl-12 pr-5 text-left font-disket text-base font-bold leading-snug text-paper transition duration-200 hover:translate-x-1 hover:bg-[#E74C3C]">
                  {x.tab}
                </button>
              );
            })}
          </Reveal>
          <Reveal delay={160} role="tabpanel" id="painel-noticia" aria-labelledby={'tab-' + i} className="bg-white">
            <div key={i} className="swap">
              {n.img && (
                <img src={n.img} alt={n.alt} width="1920" height="1280" loading="lazy"
                  className="aspect-[3/2] w-full object-cover" style={{ objectPosition: n.pos }} />
              )}
              <div className="flex flex-col gap-4 bg-sand p-6 sm:p-9">
                <h3 className="m-0 text-[clamp(26px,3vw,40px)] font-extrabold leading-[1.05] tracking-[-.02em]">{n.tab}</h3>
                <p className="m-0 max-w-[60ch] text-lg leading-relaxed">{n.text}</p>
                {n.href && <a href={n.href} className={btn + ' self-start'}>Ler matéria completa</a>}
                <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2 text-base">
                  <span className="rounded-[3px] bg-ink px-2.5 py-1 text-sm font-semibold text-paper">{n.tag}</span>
                  <span>Por <strong>{n.author}</strong></span>
                  <span>{n.date}</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Articles() {
  return (
    <section id="artigos" className="px-4 pb-[clamp(72px,10vw,160px)] sm:px-8">
      <div className="mx-auto max-w-[1280px]">
        <Reveal as="h2" className="m-0 max-w-[18ch] text-[clamp(36px,5vw,72px)] font-extrabold leading-[.98] tracking-[-.03em]">
          Artigos para ler com calma
        </Reveal>
        <div className="mt-10 grid gap-4 lg:mt-14 lg:grid-cols-[7fr_5fr] xl:grid-cols-[6fr_6fr] lg:grid-rows-2">
          {ARTICLES.map((a, k) => (
            <Reveal key={k} as="article" delay={k * 90}
              className={`group relative flex min-h-[220px] cursor-pointer flex-col justify-between gap-10 p-6 transition-transform duration-200 hover:-translate-y-1 sm:p-9 ${a.tone} ${a.big ? 'lg:row-span-2 lg:min-h-[480px]' : ''}`}>
              {a.img && <img src={a.img} alt={a.alt} width="1920" height="1278" loading="lazy" className="-mx-6 -mt-6 mb-0 aspect-[16/9] w-[calc(100%+3rem)] max-w-none object-cover sm:-mx-9 sm:-mt-9 sm:w-[calc(100%+4.5rem)]" />}
              <h3 className={`m-0 font-extrabold leading-[1.02] tracking-[-.02em] text-balance ${a.big ? 'max-w-[18ch] text-[clamp(34px,4.6vw,64px)]' : 'max-w-[24ch] text-[clamp(26px,2.4vw,32px)]'}`}>
                <a href="#" className="after:absolute after:inset-0 hover:!text-inherit">{a.title}</a>
              </h3>
              <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2 text-base">
                <span className={`rounded-[3px] px-2.5 py-1 text-sm font-semibold ${a.big ? 'bg-fox text-ink' : 'bg-ink text-paper'}`}>{a.tag}</span>
                <span>Por <strong>DEX</strong></span>
                <span>Out 2026</span>
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Banner() {
  return (
    <section className="px-4 pb-[clamp(72px,10vw,160px)] sm:px-8">
      <Reveal className="cut-banner mx-auto grid max-w-[1280px] overflow-hidden rounded-[14px] bg-ink text-paper lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col justify-end gap-6 p-[clamp(28px,4vw,56px)] pt-[clamp(72px,9vw,120px)]">
          <h2 className="m-0 max-w-[18ch] text-[clamp(32px,4.2vw,56px)] font-extrabold leading-[1] tracking-[-.03em]">Leve tech: só o essencial</h2>
          <p className="m-0 max-w-[36ch] text-lg leading-relaxed">Uma seleção curta do que vale a pena usar, comprar ou ignorar.</p>
        </div>
        <img src="assets/sahara-night-sky.jpg" alt="Céu estrelado sobre as dunas do Saara" width="1350" height="900" loading="lazy"
          className="h-full min-h-[260px] w-full object-cover [object-position:60%_50%]" />
      </Reveal>
    </section>
  );
}

function Newsletter() {
  const [form, setForm] = useState({ name: '', email: '' });
  const [err, setErr] = useState('');
  const [done, setDone] = useState(false);
  const set = k => e => { setForm(f => ({ ...f, [k]: e.target.value })); if (k === 'email') setErr(''); };
  const submit = e => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setErr('Digite um e-mail válido, como nome@dominio.com.'); return; }
    setDone(true);
  };
  const field = 'min-h-[48px] w-full bg-paper px-4 text-base text-ink placeholder:text-[#5f5750] focus:outline-none focus-visible:ring-2 focus-visible:ring-ink';
  return (
    <section id="newsletter" className="bg-fox px-4 py-[clamp(72px,10vw,140px)] text-ink sm:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal as="h2" className="m-0 max-w-[12ch] text-[clamp(40px,6vw,88px)] font-extrabold leading-[.95] tracking-[-.04em]">
          Uma carta por mês
        </Reveal>
        <Reveal delay={120}>
          <p className="m-0 mb-6 max-w-[40ch] text-lg leading-relaxed">As melhores histórias do mês, sem spam. Cancele quando quiser.</p>
          {done ? (
            <div role="status" className="bg-paper p-6 text-lg">Obrigado, {form.name || 'leitor'}! Inscrição confirmada. A próxima carta chega no seu e-mail.</div>
          ) : (
            <form onSubmit={submit} noValidate className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5 text-base font-semibold">Nome
                <input autoComplete="name" value={form.name} onChange={set('name')} className={field} />
              </label>
              <label className="flex flex-col gap-1.5 text-base font-semibold">E-mail
                <input type="email" autoComplete="email" inputMode="email" value={form.email} onChange={set('email')}
                  aria-invalid={!!err} aria-describedby={err ? 'erro-email' : undefined} className={field} />
                {err && <span id="erro-email" role="alert" className="font-semibold">{err}</span>}
              </label>
              <button type="submit" className="mt-2 inline-flex min-h-[52px] items-center justify-center bg-ink px-7 text-base font-bold text-paper transition duration-200 hover:bg-[#3a3532] active:scale-[.98]">Assinar</button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const h = 'm-0 mb-3 text-lg font-extrabold';
  return (
    <footer className="bg-paper px-4 pt-[clamp(56px,8vw,112px)] pb-8 sm:px-8">
      <div className="mx-auto grid max-w-[1280px] gap-12 text-base leading-relaxed sm:grid-cols-2 lg:grid-cols-[1.2fr_1.4fr_1fr]">
        <div className="flex flex-col gap-3">
          <h2 className={h}>Fale com a gente</h2>
          <a href="tel:+442048799956" className="flex min-h-[44px] items-center underline">Tel.: +44 (0)20 487 9956</a>
          <a href="mailto:contato@dex-tech-labs.com" className="flex min-h-[44px] items-center break-all underline">contato@dex-tech-labs.com</a>
          <div className="mt-3 flex gap-2">
            {SOCIALS.map(([label, s]) => (
              <a key={s} href="#" aria-label={label} className="grid h-11 w-11 place-items-center rounded-[3px] bg-ink font-extrabold text-paper transition hover:!bg-fox hover:!text-ink">{s}</a>
            ))}
          </div>
        </div>
        <blockquote className="m-0 text-[clamp(22px,2.2vw,28px)] font-semibold leading-snug text-balance">
          “O fennec ouve os insetos sob a areia. Nós ouvimos o que importa.”
        </blockquote>
        <nav aria-label="Rodapé">
          <h2 className={h}>Menu</h2>
          <ul className="m-0 grid list-none grid-cols-2 gap-x-4 p-0">
            {MENU.map(m => <li key={m}><a href="#" className="flex min-h-[44px] items-center">{m}</a></li>)}
          </ul>
        </nav>
      </div>
      <img src="assets/logo-dex-tech.png" width="988" height="126" alt="DEX-TECH" className="mx-auto mt-14 block h-auto w-full max-w-[1280px]" />
      <div className="mx-auto mt-10 max-w-[1280px] text-sm leading-relaxed">
        <p className="m-0">© {new Date().getFullYear()} DEX-TECH-LABS</p>
        <p className="m-0 mt-2 max-w-[75ch]">Fotos: <a className="underline" href="https://commons.wikimedia.org/wiki/File:Sahara_Night_Sky_(229876491).jpeg">“Sahara Night Sky”</a> por Dominik Angstwurm (CC BY-SA 3.0); <a className="underline" href="https://commons.wikimedia.org/wiki/File:Sleeping_Vulpes_zerda_at_Happy_Hollow,_closeup.jpg">raposa-do-deserto dormindo</a> por Grendelkhan (CC BY-SA 4.0); <a className="underline" href="https://commons.wikimedia.org/wiki/File:The_Atacama_Large_Millimeter_Array_(ALMA)_by_night,_under_the_Magellanic_Clouds.jpg">ALMA à noite</a> por ESO/C. Malin (CC BY 4.0). Via Wikimedia Commons.</p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="min-h-[100svh] overflow-x-hidden bg-paper">
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-ink focus:px-4 focus:py-3 focus:text-paper">Pular para o conteúdo</a>
      <Hero /><main id="conteudo"><News /><Articles /><Banner /><Newsletter /></main><Footer />
      <a href="https://wa.me/message/LMSCMAX6STYMM1?src=qr" target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp" className="fixed bottom-4 right-4 z-50 block h-16 w-16 transition duration-200 hover:scale-110">
        <img src="assets/whatsapp.png" width="600" height="600" alt="" className="h-full w-full" />
      </a>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
