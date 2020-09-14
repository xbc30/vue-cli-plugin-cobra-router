const fs = require('fs');
const chalk = require('chalk');
const {
  EOL
} = require('os');

module.exports = (api, options, rootOptions) => {

  // Check if router is installed
  if (!checkVueRouter(api)) {
    return error('Vue Router is not installed. Run "vue add router" first.');
  };

  // Add Vue Lang Router dependency
  api.extendPackage({
    dependencies: {
      'vue-lang-meta-router': '^0.1.0',
      'vue-router-layout': '^0.1.2',
    },
    devDependencies: {
      'vue-auto-routing': '^0.5.0',
      "vue-cli-plugin-auto-routing": "^0.4.1",
    },
    vue: {
      pluginOptions: {
        autoRouting: {
          chunkNamePrefix: 'page-',
        },
      },
    },
  });

  api.onCreateComplete(() => {
    // Modify main.js file
    modifyFile(api);

    // Replace <router-link> components with <localized-link>
    if (options.replaceRouterLink) replaceRouterLink(api);

    // Add <language-switcher> component
    if (options.addLanguageSwitcher) addLanguageSwitcher(api);
  });

  // Render the contents of template folder
  if (options.renderTemplate) {
    api.render('./template', {
      ...options,
    });
  }

  // Inject i18n to Vue options in main.js
  api.injectRootOptions(api.entryFile, 'i18n');
}

function warn(msg) {
  console.log(EOL + chalk.bgYellow.black(' WARN ') + ' ' + chalk.yellow(msg));
  return true;
}

function error(msg) {
  console.log(EOL + chalk.bgRed.black(' ERROR ') + ' ' + chalk.red(msg));
  return false;
}

function standaloneImport(str, name) {
  const regExp = new RegExp(`^import {? *${name} *}? from .+$`, 'm');
  return str.match(regExp);
}

function nonStandaloneImport(str, name) {
  const regExp = new RegExp(`^import .*(( *, *${name})|(${name} *, *)|( *, *{ *${name} *})|({ *${name} *} *, *)).* from .+$`, 'm');
  return str.match(regExp);
}

function addImport(str, name, importLine) {

  // If the required import exist already, do not proceed
  if (str.indexOf(importLine) != -1) {
    return str;
  }

  // If there's a standalone import of "name", replace it
  else if (standaloneImport(str, name) != null) {
    str = str.replace(standaloneImport(str, name)[0], importLine);
  }

  // If there's a non-standalone import, remove "name" from there and add a standalone import
  else if (nonStandaloneImport(str, name) != null) {
    const match = nonStandaloneImport(str, name);
    const index = match.index + match[0].indexOf(match[1]);
    str = str.substring(0, index) + str.substring(index + match[1].length);

    const imports = str.match(/^import.*$/gm);
    str = str.replace(imports[imports.length - 1], imports[imports.length - 1] + EOL + importLine);
  }

  // Otherwise just add a standalone import
  else {
    const imports = str.match(/^import.*$/gm);
    str = str.replace(imports[imports.length - 1], imports[imports.length - 1] + EOL + importLine);
  }

  return str;
}

function checkVueRouter(api) {
  // Get path and file content
  const path = api.resolve(`./package.json`);
  let content;

  try {
    content = fs.readFileSync(path, {
      encoding: 'utf-8'
    });
  } catch (err) {
    return error('package.json not found');
  }

  // Check if Vue Router is installed
  if (content.match(/"dependencies":[^}]*"vue-router"[\s\S]*?}/g) !== null) {
    return true;
  } else {
    return false;
  }
}

function modifyFile(api) {
  // Determine extension
  const ext = api.hasPlugin('typescript') ? 'ts' : 'js';
  // Delete default file
  if (api.invoking) {
    api.postProcessFiles((files) => {
      Object.keys(files).forEach((name) => {
        delete files[`src/App.vue`]
      })
    })
  }
  // Get path and file content
  const path = api.resolve(`./src/main.${ext}`);
  let content;

  try {
    content = fs.readFileSync(path, {
      encoding: 'utf-8'
    });
  } catch (err) {
    return warn('Main file not found, make sure to import i18n manually!');
  }

  // Add import i18n import line
  content = addImport(content, 'i18n', `import { i18n } from 'vue-lang-meta-router'`);

  fs.writeFileSync(path, content, {
    encoding: 'utf-8'
  });
}

function replaceRouterLink(api) {
  // Get path and file content
  const path = api.resolve('./src/App.vue');
  let content;

  try {
    content = fs.readFileSync(path, {
      encoding: 'utf-8'
    });
  } catch (err) {
    return warn('App.vue not found, skipping <router-link> replacement.');
  }

  // Skip content: avoid replacing <router-link> inside <language-switcher>
  let skippedContent = content.match(/<language-switcher[\s\S]*?<\/language-switcher>/g);

  if (skippedContent !== null) {
    for (let i = 0, uniqueId; i < skippedContent.length; i++) {
      uniqueId = i + '-' + Date.now();
      content = content.replace(skippedContent[i], uniqueId);
      skippedContent[i] = {
        originalText: skippedContent[i],
        replacement: uniqueId
      };
    }
  }

  // Find the opening <router-link> tag and replace it
  content = content.replace(/<router-link/g, '<localized-link');

  // Find the closing </router-link> tag and replace it
  content = content.replace(/<\/router-link>/g, '<\/localized-link>');

  // Put the skipped content back
  if (skippedContent !== null) {
    for (i = 0; i < skippedContent.length; i++) {
      content = content.replace(skippedContent[i].replacement, skippedContent[i].originalText);
    }
  }

  // Replace file
  fs.writeFileSync(path, content, {
    encoding: 'utf-8'
  });
}

function addLanguageSwitcher(api) {
  // Get path and file content
  const path = api.resolve('./src/App.vue');
  let content;

  try {
    content = fs.readFileSync(path, {
      encoding: 'utf-8'
    });
  } catch (err) {
    return warn('App.vue not found, skipping <language-switcher> example.');
  }

  // The <language-switcher> template
  const languageSwitcher = `
      <p>
        <language-switcher v-slot="{ links }">
          <router-link :to="link.url" v-for="link in links" :key="link.langIndex">
            <span class="item">{{ link.langName }}</span>
          </router-link>
        </language-switcher>
      </p>`;

  // Insert right after the beginning of <div id="nav">
  if (content.search(/<div.*id="nav".*>/) != -1) {
    content = content.replace(/<div.*id="nav".*>/, '$&' + languageSwitcher);
  }
  // Or insert right after the beginning the first <div> tag
  else {
    content = content.replace(/<div.*>/, '$&' + languageSwitcher);
  }

  // Replace file
  fs.writeFileSync(path, content, {
    encoding: 'utf-8'
  });
}