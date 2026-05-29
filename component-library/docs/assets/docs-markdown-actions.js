(function() {
  if (window.__bccDocsMarkdownActionsLoaded) return;
  window.__bccDocsMarkdownActionsLoaded = true;

  var BCC_DOCS_MARKDOWN_ACTIONS_ID = 'bcc-docs-markdown-actions';

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
          '<svg class="bcc-docs-markdown-trigger-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.5 2.5h6.586L12.5 4.914V13.5h-9z" stroke="currentColor" stroke-width="1.25" stroke-linejoin="round"></path><path d="M9.75 2.75V5.25H12.25" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5 8h6M5 10.5h4" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"></path></svg>' +
          '<span class="bcc-docs-markdown-trigger-label">Markdown</span>' +
          '<svg class="bcc-docs-markdown-trigger-caret" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4.25 6.5L8 10.25L11.75 6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>' +
        '</button>' +
        '<ul class="bcc-docs-markdown-actions-menu" role="menu" hidden>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="copy-markdown">' +
              '<svg class="bcc-docs-markdown-actions-item-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M5.5 2.5h6v9h-6z" stroke="currentColor" stroke-width="1.25" rx="1"></path><path d="M3 5V12.5C3 13.0523 3.44772 13.5 4 13.5H9.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"></path></svg>' +
              '<span>Copy Markdown</span>' +
              '<span class="bcc-docs-markdown-actions-item-copy-value">Text</span>' +
            '</button>' +
          '</li>' +
          '<li role="none">' +
            '<button class="bcc-docs-markdown-actions-item" type="button" role="menuitem" data-action="copy-link">' +
              '<svg class="bcc-docs-markdown-actions-item-icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M6.25 9.75L9.75 6.25M6.5 5H5.25C4.00736 5 3 6.00736 3 7.25V10.75C3 11.9926 4.00736 13 5.25 13H8.75C9.99264 13 11 11.9926 11 10.75V9.5M9.5 3H10.75C11.9926 3 13 4.00736 13 5.25V8.75C13 9.99264 11.9926 11 10.75 11H9.5" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round"></path></svg>' +
              '<span>Copy Markdown Link</span>' +
              '<span class="bcc-docs-markdown-actions-item-copy-value">URL</span>' +
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
