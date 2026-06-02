(function() {
  if (window.__bccDocsMarkdownActionsLoaded) return;
  window.__bccDocsMarkdownActionsLoaded = true;

  var BCC_DOCS_MARKDOWN_ACTIONS_ID = 'bcc-docs-markdown-actions';
  var BCC_DOCS_GITHUB_BLOB_BASE = 'https://github.com/bcc-code/bcc-design/blob/main/component-library/';
  var BCC_DOCS_GITHUB_FALLBACK = 'https://github.com/bcc-code/bcc-design/tree/main/component-library/';

  function showDocsCopyToast(text) {
    var toast = document.getElementById('copy-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'copy-toast';
      toast.className = 'copy-toast';
      document.body.appendChild(toast);
    }

    toast.textContent = 'Copied ' + text;
    toast.classList.add('show');
    clearTimeout(window.__bccCopyToastTimeout);
    window.__bccCopyToastTimeout = setTimeout(function() {
      toast.classList.remove('show');
    }, 1200);
  }

  function getCurrentDocsMarkdownUrl() {
    var params = new URLSearchParams(window.location.search);
    var storyId = params.get('id');
    if (!storyId || !storyId.endsWith('--docs')) return null;
    return new URL('/docs/' + storyId + '.md', window.location.origin).toString();
  }

  function getCurrentStoryId() {
    var params = new URLSearchParams(window.location.search);
    var storyId = params.get('id');
    if (!storyId || !storyId.endsWith('--docs')) return null;
    return storyId;
  }

  function getDocsIndex() {
    if (!window.__bccDocsIndexPromise) {
      window.__bccDocsIndexPromise = fetch('/index.json', { credentials: 'same-origin' })
        .then(function(response) {
          if (!response.ok) throw new Error('Failed to fetch Storybook index');
          return response.json();
        })
        .catch(function() {
          return null;
        });
    }

    return window.__bccDocsIndexPromise;
  }

  function getGitHubLinkForCurrentDoc() {
    var storyId = getCurrentStoryId();
    if (!storyId) return Promise.resolve(BCC_DOCS_GITHUB_FALLBACK);

    return getDocsIndex().then(function(index) {
      if (!index || typeof index !== 'object') return BCC_DOCS_GITHUB_FALLBACK;

      var entries = index.entries || index.stories || index;
      var storyEntry = entries && entries[storyId];
      var importPath = storyEntry && storyEntry.importPath;
      if (typeof importPath !== 'string' || importPath.length === 0) return BCC_DOCS_GITHUB_FALLBACK;

      var normalizedPath = importPath.replace(/^\.\//, '');
      if (!normalizedPath) return BCC_DOCS_GITHUB_FALLBACK;

      return BCC_DOCS_GITHUB_BLOB_BASE + normalizedPath;
    });
  }

  function getChatGPTLink(markdownUrl) {
    var prompt = 'Read ' + markdownUrl + ', I want to ask questions about it.';
    return 'https://chatgpt.com/?hints=search&q=' + encodeURIComponent(prompt);
  }

  function getClaudeLink(markdownUrl) {
    var prompt = 'Read ' + markdownUrl + ', I want to ask questions about it.';
    return 'https://claude.ai/new?q=' + encodeURIComponent(prompt);
  }

  function openInNewTab(url) {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function copyTextToClipboard(value) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function(resolve, reject) {
      try {
        var fallbackInput = document.createElement('textarea');
        fallbackInput.value = value;
        fallbackInput.setAttribute('readonly', '');
        fallbackInput.style.position = 'absolute';
        fallbackInput.style.left = '-9999px';
        document.body.appendChild(fallbackInput);
        fallbackInput.select();
        document.execCommand('copy');
        document.body.removeChild(fallbackInput);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function closeDocsMarkdownMenu(root) {
    if (!root) return;
    var menu = root.querySelector('.bcc-docs-markdown-actions-menu');
    var trigger = root.querySelector('.bcc-docs-markdown-trigger');
    if (menu) menu.hidden = true;
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  }

  function ensureDocsMarkdownActions() {
    var markdownUrl = getCurrentDocsMarkdownUrl();
    var docsContent = document.querySelector('.sbdocs.sbdocs-content');
    var heading = docsContent && docsContent.querySelector('h1');

    if (!markdownUrl || !docsContent || !heading) {
      var orphan = document.getElementById(BCC_DOCS_MARKDOWN_ACTIONS_ID);
      if (orphan && orphan.parentElement) orphan.parentElement.removeChild(orphan);
      return;
    }

    var row = heading.parentElement;
    if (!row || !row.classList.contains('bcc-docs-header-row')) {
      row = document.createElement('div');
      row.className = 'bcc-docs-header-row';
      heading.parentElement.insertBefore(row, heading);
      row.appendChild(heading);
    }

    var root = document.getElementById(BCC_DOCS_MARKDOWN_ACTIONS_ID);
    if (!root) {
      root = document.createElement('div');
      root.id = BCC_DOCS_MARKDOWN_ACTIONS_ID;
      root.className = 'bcc-docs-markdown-actions';
      root.innerHTML = '' +
        '<button class="bcc-docs-markdown-trigger" type="button" aria-haspopup="menu" aria-expanded="false" aria-label="Markdown actions">' +
          '<span class="bcc-docs-ms-icon bcc-docs-markdown-trigger-icon" aria-hidden="true">description</span>' +
          '<span class="bcc-docs-markdown-trigger-label">Markdown</span>' +
          '<span class="bcc-docs-ms-icon bcc-docs-markdown-trigger-caret" aria-hidden="true">expand_more</span>' +
        '</button>' +
        '<ul class="bcc-docs-markdown-actions-menu" role="menu" hidden>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="copy-markdown">' +
              '<span class="bcc-docs-ms-icon bcc-docs-markdown-actions-item-icon" aria-hidden="true">content_copy</span>' +
              '<span>Copy Markdown</span>' +
              '<span class="bcc-docs-markdown-actions-item-copy-value">Text</span>' +
            '</button>' +
          '</li>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="copy-link">' +
              '<span class="bcc-docs-ms-icon bcc-docs-markdown-actions-item-icon" aria-hidden="true">link</span>' +
              '<span>Copy Markdown</span>' +
              '<span class="bcc-docs-markdown-actions-item-copy-value">URL</span>' +
            '</button>' +
          '</li>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="open-github">' +
              '<span class="bcc-docs-ms-icon bcc-docs-markdown-actions-item-icon" aria-hidden="true">code</span>' +
              '<span>Open in GitHub</span>' +
            '</button>' +
          '</li>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="open-chatgpt">' +
              '<span class="bcc-docs-ms-icon bcc-docs-markdown-actions-item-icon" aria-hidden="true">chat</span>' +
              '<span>Open in ChatGPT</span>' +
            '</button>' +
          '</li>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="open-claude">' +
              '<span class="bcc-docs-ms-icon bcc-docs-markdown-actions-item-icon" aria-hidden="true">smart_toy</span>' +
              '<span>Open in Claude</span>' +
            '</button>' +
          '</li>' +
        '</ul>';
    }

    root.setAttribute('data-markdown-url', markdownUrl);
    if (root.parentElement !== row) {
      row.appendChild(root);
    }

    var triggerButton = root.querySelector('.bcc-docs-markdown-trigger');
    var menu = root.querySelector('.bcc-docs-markdown-actions-menu');
    var copyMarkdownButton = root.querySelector('[data-action="copy-markdown"]');
    var linkButton = root.querySelector('[data-action="copy-link"]');
    var githubButton = root.querySelector('[data-action="open-github"]');
    var chatGPTButton = root.querySelector('[data-action="open-chatgpt"]');
    var claudeButton = root.querySelector('[data-action="open-claude"]');

    if (!root.__bccBound) {
      root.__bccBound = true;

      var copyMarkdown = function() {
        var currentUrl = root.getAttribute('data-markdown-url');
        if (!currentUrl) return;

        fetch(currentUrl, { credentials: 'same-origin' })
          .then(function(response) {
            if (!response.ok) throw new Error('Failed to fetch markdown');
            return response.text();
          })
          .then(function(markdown) {
            return copyTextToClipboard(markdown);
          })
          .then(function() {
            showDocsCopyToast(new URL(currentUrl).pathname);
          })
          .catch(function() {
            showDocsCopyToast('Markdown unavailable');
          });
      };

      triggerButton.addEventListener('click', function(event) {
        event.stopPropagation();
        var nextState = menu.hidden;
        menu.hidden = !nextState;
        triggerButton.setAttribute('aria-expanded', nextState ? 'true' : 'false');
      });

      copyMarkdownButton.addEventListener('click', function() {
        copyMarkdown();
        closeDocsMarkdownMenu(root);
      });

      linkButton.addEventListener('click', function() {
        var currentUrl = root.getAttribute('data-markdown-url');
        if (!currentUrl) return;
        copyTextToClipboard(currentUrl)
          .then(function() {
            showDocsCopyToast(new URL(currentUrl).pathname);
          })
          .catch(function() {
            showDocsCopyToast('Markdown link unavailable');
          });
        closeDocsMarkdownMenu(root);
      });

      githubButton.addEventListener('click', function() {
        getGitHubLinkForCurrentDoc().then(function(url) {
          openInNewTab(url);
        });
        closeDocsMarkdownMenu(root);
      });

      chatGPTButton.addEventListener('click', function() {
        var currentUrl = root.getAttribute('data-markdown-url');
        if (!currentUrl) return;
        openInNewTab(getChatGPTLink(currentUrl));
        closeDocsMarkdownMenu(root);
      });

      claudeButton.addEventListener('click', function() {
        var currentUrl = root.getAttribute('data-markdown-url');
        if (!currentUrl) return;
        openInNewTab(getClaudeLink(currentUrl));
        closeDocsMarkdownMenu(root);
      });
    }
  }

  function initDocsMarkdownActions() {
    if (window.__bccDocsMarkdownActionsObserverAttached || !document.body) return;
    window.__bccDocsMarkdownActionsObserverAttached = true;

    var scheduleDocsMarkdownActions = function() {
      if (window.__bccDocsMarkdownActionsQueued) return;
      window.__bccDocsMarkdownActionsQueued = true;
      requestAnimationFrame(function() {
        window.__bccDocsMarkdownActionsQueued = false;
        ensureDocsMarkdownActions();
      });
    };

    document.addEventListener('click', function(event) {
      var target = event.target;
      if (!(target instanceof Element)) return;
      var inside = target.closest('#' + BCC_DOCS_MARKDOWN_ACTIONS_ID);
      if (!inside) closeDocsMarkdownMenu(document.getElementById(BCC_DOCS_MARKDOWN_ACTIONS_ID));
    });

    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') closeDocsMarkdownMenu(document.getElementById(BCC_DOCS_MARKDOWN_ACTIONS_ID));
    });

    new MutationObserver(scheduleDocsMarkdownActions).observe(document.body, { childList: true, subtree: true });
    window.addEventListener('load', scheduleDocsMarkdownActions);
    window.addEventListener('popstate', scheduleDocsMarkdownActions);
    window.addEventListener('hashchange', scheduleDocsMarkdownActions);
    scheduleDocsMarkdownActions();
    [100, 300, 1000].forEach(function(delay) {
      window.setTimeout(scheduleDocsMarkdownActions, delay);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDocsMarkdownActions);
  } else {
    initDocsMarkdownActions();
  }
})();
