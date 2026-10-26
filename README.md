# DEX-TECH-LABS

Landing page em português de notícias e artigos de tecnologia, com newsletter. A página é um site estático: React 18 e Tailwind CSS entram por CDN, o JSX é compilado no navegador e não existe etapa de build.

| | |
| --- | --- |
| Site | https://desertfoxlabs.com |
| Repositório | https://github.com/lucasweber-rs-dex/DESERT-FOX-TECH-WEB |
| Projeto na Vercel | https://vercel.com/lucasweber94-9905/desert-fox-tech-web |
| Branch de produção | `main` |
| Visibilidade | Repositório público |

`desertfoxlabs.com` e `www.desertfoxlabs.com` estão verificados no projeto da Vercel. O DNS continua na Hostinger (`ns1.dns-parking.com` e `ns2.dns-parking.com`). `www` responde 308 e leva ao apex. Os endereços `*.vercel.app` seguem com Vercel Authentication e podem pedir login. O domínio próprio fica de fora dessa proteção.

## O que a página mostra

Uma única página, montada em `app.jsx`.

| Seção | Âncora | Comportamento |
| --- | --- | --- |
| Hero | `#top` | Título “Sinal. Sem ruído.”, chamada para a newsletter e a foto `assets/hero-antena.webp`. |
| Notícias | `#noticias` | Quatro abas. A aba ativa troca o texto do painel `#painel-noticia`. A matéria “INSTALANDO UNITV DE MANEIRA FÁCIL” não tem foto. |
| Artigos | `#artigos` | Três cards com resumo e tempo de leitura. “Qual aparelho comprar para a TV em 2026” ocupa a coluna maior e leva a capa `assets/Publi/Artigos/aparelhos.webp`. Cada card abre a sua página: `qual-aparelho.html`, `internet-4k.html` e `tvbox-segura.html`. |
| Banner | sem âncora | Trilha “Comece por aqui” com três passos (array `STEPS`): escolher o aparelho, instalar o Downloader e escolher o app. À direita, um mosaico das capas de `assets/Poster` (array `MOSAIC`). |
| Newsletter | `#newsletter` | “Novidades no seu e-mail”, com a lista do que chega por mês e um formulário de nome e e-mail. A validação acontece no navegador. Nenhum dado sai da página. |
| Rodapé | sem âncora | Logo DEX-TECH e copyright. |

O menu do topo leva a Notícias, Artigos e Newsletter. Há um link “Pular para o conteúdo” que aparece no foco do teclado.

Textos, autor (“DEX”), datas (“Out 2026”), telefone `+44 (0)20 487 9956` e e-mail `contato@dex-tech-labs.com` são de exemplo. Troque esses dados em `app.jsx` antes de tratar a página como publicada.

## Tecnologias

Não há `node_modules` de aplicação nem bundler. O `package.json` só define o script local.

| Peça | Versão | De onde vem |
| --- | --- | --- |
| React | 18.3.1 (UMD) | cdnjs |
| React DOM | 18.3.1 (UMD) | cdnjs |
| Babel Standalone | 7.26.4 | cdnjs. Compila `app.jsx` no navegador (`type="text/babel"`). |
| Tailwind CSS | 3.4.16 | `cdn.tailwindcss.com`, com a config inline em `index.html`. |
| Fonte Manrope | pesos 300 a 800 | Google Fonts |
| CSS próprio | arquivo local | `styles.css` |
| Servidor local | `serve`, via `npx` | `npm start` |

Cores do Tailwind, em `index.html`:

| Token | Hex | Uso |
| --- | --- | --- |
| `sand` | `#c5b9a8` | Fundo do hero e estados de hover |
| `paper` | `#f2f4f2` | Fundo da página |
| `ink` | `#22242a` | Texto e blocos escuros |
| `fox` | `#ff7a1a` | Botões e a faixa da newsletter |
| `foxdark` | `#e8650a` | Hover do botão laranja |

`styles.css` corta cantos com `clip-path` (`.cut-tl`, `.cut-banner`), anima a entrada das seções (`.rv`) e a troca de matéria (`.swap`), e desliga essas animações quando o sistema pede `prefers-reduced-motion`.

A página precisa de JavaScript e de acesso a esses CDNs. Sem rede, o HTML abre e o React não monta.

## Rodar na sua máquina

Node.js com `npm` no PATH. Neste ambiente o teste foi feito com Node 26.7.0 e npm 11.19.0. A Vercel usa Node 24.x na imagem de build. A página em si não roda no Node.

```bash
git clone https://github.com/lucasweber-rs-dex/DESERT-FOX-TECH-WEB.git
cd DESERT-FOX-TECH-WEB
npm start
```

Abra http://localhost:5173.

`npm start` executa `npx --yes serve -l 5173 .`. O `serve` baixa na primeira execução. Se a porta 5173 já estiver ocupada, ele sobe em outra porta e imprime o endereço no terminal. Use esse endereço.

Para encerrar, pare o processo no terminal (`Ctrl+C`).

## Mapa do repositório

| Caminho | Função |
| --- | --- |
| `index.html` | Documento de entrada. Meta tags, fonte, Tailwind, React, Babel e a montagem de `#root`. |
| `app.jsx` | Componentes: `Nav`, `Hero`, `Posters`, `News`, `Articles`, `Banner`, `Newsletter`, `Footer`, `App`. Também os arrays `NEWS`, `POSTERS`, `ARTICLES`, `STEPS` e `MOSAIC`. |
| `styles.css` | Cantos cortados, foco visível, animações e reduced motion. |
| `assets/` | Fotos usadas na página e `credits.json`. |
| `assets/credits.json` | Licença, autor e página no Wikimedia de cada foto de terceiros. |
| `package.json` | Nome `dex-tech-labs-web`, versão `0.1.0`, script `start`. Sem dependências declaradas. |
| `.gitignore` | Ignora `.claude/`, `.taste-skill/`, `node_modules/`, logs e arquivos de editor. |
| `Landing.dc.html`, `support.js`, `uploads/` | Material original do repositório. A página atual não os carrega. |
| `.thumbnail` | Miniatura do repositório. A página não a usa. |

Não há `vercel.json`, pasta `.github/workflows` nem variáveis de ambiente.

## Onde alterar o conteúdo

Tudo que o visitante lê está em `app.jsx`, no topo do arquivo e no `Footer`.

- **Notícias.** Array `NEWS`. Cada item tem `tab`, `tag`, `author`, `date`, `text` e, quando houver foto, `img`, `pos` e `alt`. Sem `img`, o painel mostra só o texto. O painel só renderiza a imagem se `n.img` existir.
- **Artigos.** Array `ARTICLES`. Cada item tem `title`, `desc`, `href`, `min` (minutos de leitura) e `tag`. `big: true` faz o card ocupar as duas linhas no desktop. `img` é opcional.
- **Título e descrição do documento.** `<title>` e `<meta name="description">` em `index.html`.

A newsletter, em `Newsletter`, exige um e-mail no formato `texto@texto.texto`. Com o campo válido, troca o formulário por uma mensagem de confirmação. Não há `fetch`, endpoint nem serviço de e-mail.

## Imagens e licenças

As fotos do Wikimedia Commons continuam na pasta, mas a página não exibe mais nenhuma delas. A ficha de cada uma está em `assets/credits.json`. Se alguma voltar a aparecer, o crédito visível que a licença exige precisa voltar junto. Se trocar uma foto, atualize o arquivo, o `alt` e o JSON.

| Arquivo | Onde aparece | Licença |
| --- | --- | --- |
| `assets/hero-antena.webp` | Hero | Imagem enviada pelo autor do projeto. Não entra em `credits.json`. |
| `assets/sahara-night-sky.jpg` | Não é mais exibida | “Sahara Night Sky”, Dominik Angstwurm, CC BY-SA 3.0 |
| `assets/sleeping-vulpes-zerda-at-happy-hollow-closeup.jpg` | Não é mais exibida (a notícia virou “Nuvio, o novo no pedaço”) | Grendelkhan, CC BY-SA 4.0 |
| `assets/Publi/Nuvio/capa-home.webp` | Notícia “Nuvio, o novo no pedaço” | Arte própria, feita com as capas de `assets/Poster`. Fonte em `assets/Publi/Nuvio/capa-src/`. |
| `assets/Publi/Artigos/aparelhos.webp` | Artigo “Qual aparelho comprar para a TV em 2026” | Arte própria. Fonte em `assets/Publi/Artigos/capa-src/`. |
| `assets/Publi/FireStick/capa-home.webp` | Notícia “Firestick, de herói a vilão” | Arte própria. Fonte em `assets/Publi/FireStick/capa-src/`. |
| `assets/the-atacama-large-millimeter-array-alma-by.jpg` | Não é mais exibida | ESO/C. Malin, CC BY 4.0 |

CC BY-SA pede que uma versão alterada (recorte de cor, montagem com outra imagem) saia com a mesma licença. Os arquivos acima são as fotos como foram salvas.

`credits.json` ainda tem uma ficha para `assets/night-skies-at-little-sahara-49991333898.jpg` (BLMUtah, domínio público). Esse arquivo não está na pasta `assets/` e a página não o referencia.

## GitHub

Repositório: [lucasweber-rs-dex/DESERT-FOX-TECH-WEB](https://github.com/lucasweber-rs-dex/DESERT-FOX-TECH-WEB).

- Público, criado em 26 de outubro de 2026.
- Branch padrão: `main`.
- Descrição: “Landing page responsiva DEX-TECH-LABS (React + Tailwind)”.
- Homepage do repositório: https://desert-fox-tech-web.vercel.app.
- Linguagem detectada: JavaScript.
- Sem licença de código no repositório (`licenseInfo` vazio). As fotos de terceiros seguem as licenças da tabela acima.
- Sem GitHub Actions. O deploy não passa por um workflow em `.github/workflows`. Quem publica é a integração Git da Vercel.

Remote esperado:

```bash
git remote -v
# origin  https://github.com/lucasweber-rs-dex/DESERT-FOX-TECH-WEB.git
```

Fluxo para uma alteração:

```bash
git checkout -b minha-alteracao
# edite os arquivos
git add .
git commit -m "descreva a mudança"
git push -u origin minha-alteracao
```

Abra o pull request contra `main` em https://github.com/lucasweber-rs-dex/DESERT-FOX-TECH-WEB/compare. A integração Git da Vercel cria um deploy de preview para o branch. O merge em `main` dispara o deploy de produção.

O commit local `b1eae96` (“alteração DIVS”) ainda não foi enviado. `origin/main` continua em `5a8ce25`. A Vercel só enxerga o que já está no GitHub.

## Vercel

Projeto **desert-fox-tech-web**, na equipe `lucasweber94-9905` (`team_G1hoRUWeIGyMsf9sAK5vEHzz`).

| Campo | Valor |
| --- | --- |
| ID | `prj_C84Xc9r3KWwsgG3Qqep6MhjFA5Os` |
| Painel | https://vercel.com/lucasweber94-9905/desert-fox-tech-web |
| Framework | Nenhum (`Other`). A Vercel publica os arquivos estáticos da raiz. |
| Node da imagem de build | 24.x |
| Repositório ligado | `lucasweber-rs-dex/DESERT-FOX-TECH-WEB` |
| Branch de produção | `main` |
| Comando de build | Nenhum. `npm start` vale só para a máquina local. |
| Variáveis de ambiente | Nenhuma. |
| Domínio próprio | `desertfoxlabs.com` (produção) e `www.desertfoxlabs.com` (redirect 308 para o apex). Os dois estão verificados. |
| Proteção | Vercel Authentication ligada em todos os deploys, exceto domínios customizados. |

Endereços do projeto:

| URL | Papel |
| --- | --- |
| https://desert-fox-tech-web.vercel.app | Alias de produção. É o homepage do repositório no GitHub. |
| https://desert-fox-tech-web-lucasweber94-9905.vercel.app | Alias estável da equipe. |
| https://desert-fox-tech-web-git-main-lucasweber94-9905.vercel.app | Alias do branch `main`. |
| https://desertfoxlabs.com | Domínio de produção. Responde a página. |
| https://www.desertfoxlabs.com | Redireciona para `desertfoxlabs.com` com status 308. |

O deploy de produção que está no ar saiu do commit `5a8ce25` (“Adiciona landing page responsiva DEX-TECH-LABS”), estado `READY`.

- ID: `dpl_387y4urbd5QAWH3WqfkXzp4eFCSX`
- Inspeção: https://vercel.com/lucasweber94-9905/desert-fox-tech-web/387y4urbd5QAWH3WqfkXzp4eFCSX
- Autor do deploy na Vercel: `lucasweber94-9905`

Esse deploy é anterior à remoção das fotos de dunas. Essa remoção só entra em produção depois do `git push` de `main`.

### O que acontece em cada push

1. Você envia um commit para o GitHub.
2. A integração Git avisa a Vercel. O meta do deploy guarda `githubOrg`, `githubRepo`, `githubCommitRef` e `githubCommitSha`.
3. Push em `main` gera deploy com target `production` e atualiza https://desert-fox-tech-web.vercel.app.
4. Push em outro branch, ou um pull request, gera um deploy de preview com URL própria. O alias de produção não muda.
5. A Vercel não roda `npm start`. Ela entrega `index.html`, `app.jsx`, `styles.css` e `assets/` como arquivos estáticos. O navegador do visitante baixa React, Tailwind, Babel e a fonte Manrope.

Não há `vercel.json`, então valem os padrões do projeto: raiz como saída, sem install obrigatório (o `package.json` não lista dependências) e sem redirect.

Pela CLI, na raiz do clone, com a conta da equipe autenticada:

```bash
vercel link
vercel          # preview do diretório atual
vercel --prod   # produção, à parte do Git
```

O caminho normal deste repositório é o Git. Um `vercel --prod` feito na mão publica o diretório local e pode divergir do `main` do GitHub.

### Rollback

No painel do projeto, em Deployments, o deploy `dpl_387y4urbd5QAWH3WqfkXzp4eFCSX` está marcado como candidato a rollback. Promover um deploy antigo devolve a produção para aquele commit sem um push novo. O histórico do Git não anda para trás com essa ação.

## DNS padrão

Zona publicada na Hostinger e conferida em 26 de outubro de 2026. A Vercel marcou `desertfoxlabs.com` e `www.desertfoxlabs.com` como verificados. Não troque os nameservers: o DNS continua na Hostinger.

| Campo | Valor |
| --- | --- |
| Domínio | `desertfoxlabs.com` |
| Registrar / painel DNS | Hostinger |
| Nameserver 1 | `ns1.dns-parking.com` |
| Nameserver 2 | `ns2.dns-parking.com` |
| SOA | `ns1.dns-parking.com`, contato `dns.hostinger.com` |
| Apex na Vercel | `desertfoxlabs.com`, produção, sem redirect |
| `www` na Vercel | `www.desertfoxlabs.com`, redirect 308 para `desertfoxlabs.com` |
| Projeto | `desert-fox-tech-web` (`prj_C84Xc9r3KWwsgG3Qqep6MhjFA5Os`) |
| Equipe | `lucasweber94-9905` (`team_G1hoRUWeIGyMsf9sAK5vEHzz`) |

Registros da zona. Prioridade `0` e TTL `14400` em todos. Na lista da Hostinger o TXT aparece entre aspas. Essas aspas são só da tela. O valor publicado não as inclui.

| Tipo | Nome | Prioridade | Conteúdo | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | 0 | `216.198.79.1` | 14400 |
| A | `@` | 0 | `64.29.17.1` | 14400 |
| CNAME | `www` | 0 | `b00abcb0c8850360.vercel-dns-017.com` | 14400 |
| TXT | `_vercel` | 0 | `vc-domain-verify=desertfoxlabs.com,9ed4cea68c5ab43fe1d3` | 14400 |
| TXT | `_vercel` | 0 | `vc-domain-verify=www.desertfoxlabs.com,b5a570334fc376995b26` | 14400 |

O nome dos TXT é `_vercel`, com underline. Sem o underline a Vercel não verifica o domínio. Os dois TXT dividem esse nome. Não crie CNAME em `@`. Não crie registro A em `www`.

A Vercel também aceita, como reserva, o A `76.76.21.21` e o CNAME `cname.vercel-dns.com`. A zona padrão usa o par de A e o CNAME da primeira linha da recomendação. Não misture os dois conjuntos.

Para recriar a zona: mantenha os nameservers, apague A ou CNAME antigo de parking em `@` ou `www`, grave a tabela acima e confira no painel da Vercel se os dois domínios continuam verificados.

## Limites atuais

- A newsletter confirma a inscrição só na tela.
- Os textos das matérias são fictícios.
- A ficha de “Night Skies at Little Sahara” em `credits.json` aponta para um arquivo que não está no repositório.
- Os endereços `*.vercel.app` podem exigir login da Vercel. `https://desertfoxlabs.com` abre sem esse login.
