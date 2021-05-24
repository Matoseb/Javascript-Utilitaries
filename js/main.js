import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.12/dist/vue.esm.browser.js';
import * as UTILS from '../utils.js';
import toSource from './tosource.js';

// https://stackoverflow.com/questions/64332569/highlight-code-with-markdown-it-js-and-highlight-js
const defaults = {
  html: false,
  xhtmlOut: false,
  breaks: false,
  langPrefix: 'language-',
  linkify: true,
  typographer: true,
  _highlight: true,
  _strict: false,
  _view: 'html',
  highlight(str, lang) {
    const esc = md.utils.escapeHtml;
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs"><code>${
          hljs.highlight(lang, str, true).value
        }</code></pre>`;
      } catch (e) {}
    } else {
      return `<pre class="hljs"><code>${esc(str)}</code></pre>`;
    }
  },
};

const md = window.markdownit(defaults);

Vue.component('Markdown', {
  template: `
    	<div>
        	<slot/>
        </div>
    `,
  mounted() {
    this.$el.innerHTML = md.render(this.$slots.default[0].text);
  },
});

new Vue({
  el: '#App',
  data: {
    utilities: [],
    examples: [],
    logs: [],
  },
  computed: {
    compiledMarkdown: function () {
      return marked(this.input, { sanitize: true });
    },
  },
  async created() {
    let json = [
      {
        name: 'fitImage-p5',
        path: 'content/fitImage-p5',
        sha: '1139b7b0a6cb2a022077af2a5ad64e2f2496a474',
        size: 0,
        url: 'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/contents/content/fitImage-p5?ref=master',
        html_url:
          'https://github.com/Matoseb/Javascript-Utilitaries/tree/master/content/fitImage-p5',
        git_url:
          'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/git/trees/1139b7b0a6cb2a022077af2a5ad64e2f2496a474',
        download_url: null,
        type: 'dir',
        _links: {
          self: 'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/contents/content/fitImage-p5?ref=master',
          git: 'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/git/trees/1139b7b0a6cb2a022077af2a5ad64e2f2496a474',
          html: 'https://github.com/Matoseb/Javascript-Utilitaries/tree/master/content/fitImage-p5',
        },
      },
      {
        name: 'screenToWorld-p5',
        path: 'content/screenToWorld-p5',
        sha: 'fa8f95e7e24c164545beef9f5c5deb29c1988a1b',
        size: 0,
        url: 'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/contents/content/screenToWorld-p5?ref=master',
        html_url:
          'https://github.com/Matoseb/Javascript-Utilitaries/tree/master/content/screenToWorld-p5',
        git_url:
          'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/git/trees/fa8f95e7e24c164545beef9f5c5deb29c1988a1b',
        download_url: null,
        type: 'dir',
        _links: {
          self: 'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/contents/content/screenToWorld-p5?ref=master',
          git: 'https://api.github.com/repos/Matoseb/Javascript-Utilitaries/git/trees/fa8f95e7e24c164545beef9f5c5deb29c1988a1b',
          html: 'https://github.com/Matoseb/Javascript-Utilitaries/tree/master/content/screenToWorld-p5',
        },
      },
    ];
    // json = await fetch(
    //   'https://api.github.com/repos/matoseb/javascript-utilitaries/contents/content'
    // ).then((e) => e.json());

    if (Array.isArray(json)) this.examples = json;

    this.utilities = Object.entries(UTILS).map(([name, util]) => {
      return this.buildUtility(name, util);
    });
  },
  methods: {
    buildUtility(name, jsObject) {
      const txtObject = this.stringifyUtil(name, jsObject);
      return {
        jsObject,
        name,
        txtObject,
        description: `\`\`\`js
${txtObject}
\`\`\``,
        content: '',
        examples: this.getExamples(name),
      };
    },

    getExamples(name) {
      const location = `https://jsfiddle.net/gh/get/library/pure/matoseb/javascript-utilitaries/contents/`;

      name = this.normalizeString(name);

      const res = this.examples.reduce((foundExamples, { path }) => {
        const nPath = this.normalizeString(path);

        if (nPath.includes(name)) {
          const url = `${location}${path}`;
          console.log(url);
          //jsfiddle.net/gh/get/library/pure/matoseb/javascript-utilitaries/contents/content/fitImage-p5

          foundExamples.push({
            title: name,
            url,
          });
        }

        return foundExamples;
      }, []);

      return res;
    },

    normalizeString(str) {
      return str.toLowerCase();
    },

    getExampleURL() {},

    stringifyUtil(name, jsObject) {
      let result = toSource(jsObject);
      if (typeof jsObject !== 'function') {
        result = `const ${name} = ${result}`;
      }

      return result;
    },
    copyTextToClipboard(text) {
      if (!navigator.clipboard) {
        return;
      }
      navigator.clipboard.writeText(text.txtObject).then(() => {
        this.logs.push({
          text: 'Copied to clipboard!',
          time: performance.now(),
        });
        setTimeout(() => this.logs.shift(), 2000);
        // console.log('Async: Copying to clipboard was successful!');
      }, console.error);
    },
  },
});
