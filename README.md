# DEX-TECH-LABS

Landing page responsiva de notícias e artigos de tecnologia, com newsletter.
Feita com React 18, Tailwind CSS e CSS/JavaScript próprios, sem etapa de build.

## Como rodar

Precisa de Node.js e de internet (React, Tailwind, Babel e a fonte Manrope vêm de CDN).

```bash
npm start
```

Abra http://localhost:5173.

## Estrutura

| Arquivo | O que faz |
| --- | --- |
| `index.html` | Entrada da página: carrega as bibliotecas por CDN e configura o Tailwind (cores e fonte). |
| `app.jsx` | Componentes React: hero, notícias (abas), artigos, banner, newsletter e rodapé. |
| `styles.css` | CSS próprio: cantos cortados, animações de entrada e suporte a `prefers-reduced-motion`. |
| `assets/` | Imagens da página e `credits.json` com a licença de cada foto. |
| `Landing.dc.html`, `support.js`, `uploads/` | Material original do repositório. Não são usados pela página atual. |

## Conteúdo de exemplo

Os textos das notícias e dos artigos, o autor, as datas, o e-mail e o telefone do rodapé são
de exemplo. Troque pelos reais antes de publicar. A inscrição da newsletter ainda não envia
os dados para nenhum serviço.

## Créditos das imagens

As fotos de deserto, céu e observatório vêm do Wikimedia Commons, com licenças CC BY, CC BY-SA
ou domínio público. Os créditos aparecem no rodapé da página e a lista completa está em
`assets/credits.json`. Se uma foto for trocada, atualize as duas.
`assets/tech-park-sam.png` é arte própria do projeto.
