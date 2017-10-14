# Estrutura para geração de sites estáticos
Esse projeto automatiza tarefas comuns no desenvolvimento de sites estáticos com o uso do [Gulp](https://gulpjs.com/).

## Recursos disponíveis
- Html-minify
- Css-minify
- Js-minify
- Concatenação de arquivos `.js` e `.css`
- Compilador [Sass](http://sass-lang.com/)

## Requerimentos
Antes de utilizar é necessario a instalação das dependencias. Para isso utilize o gerenciador de pacotes de sua preferencia `npm install` por exemplo.

## Comandos

 - `> gulp` minifica e concatena os arquivos para o diretório `./dist`
- `> gulp sass` minifica e concatena os arquivos para o diretório `./dist`, utilize esse caso o projeto utilize Sass.
- `gulp generate` para gerar ao detectar mudanças no projeto.
- `gulp generate-sass` para gerar ao detectar mudanças em um projeto com Sass.