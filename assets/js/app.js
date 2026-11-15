// AI Website Builder Landing Page Interactive Controller
document.addEventListener('DOMContentLoaded', () => {

  // Clean AI Website Builder Landing Page Controller Initialized

  console.log('Landing page initialized.');

  // 1. Activate Pricing "Choose plan" CTA buttons
  const cartUrls = {
    'hosting:premium_plan': '#pricing',
    'hosting:unlimited': '#pricing',
    'hosting:cloud_economy': '#pricing'
  };

  const pricingButtons = document.querySelectorAll('.h-pricing-card__add-to-cart');
  pricingButtons.forEach(btn => {
    btn.classList.remove('h-hyperlink-button--loading');
    btn.setAttribute('aria-disabled', 'false');
    btn.setAttribute('tabindex', '0');

    // Hide loader icon if present
    const loader = btn.querySelector('.h-hyperlink__loader');
    if (loader) {
      loader.style.display = 'none';
    }

    // Match product slug
    const qa = btn.getAttribute('data-qa') || '';
    let productKey = 'hosting:unlimited';
    if (qa.includes('premium')) productKey = 'hosting:premium_plan';
    else if (qa.includes('cloud_economy')) productKey = 'hosting:cloud_economy';
    else if (qa.includes('unlimited')) productKey = 'hosting:unlimited';

    btn.setAttribute('href', cartUrls[productKey] || '#pricing');
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');

    btn.addEventListener('click', (e) => {
      console.log('Selected plan:', productKey);
    });
  });

  // 2. Smooth Scrolling Helper with header offset
  const getHeaderHeight = () => {
    const banner = document.querySelector('.dg-top-banner');
    const nav1 = document.querySelector('.navigation-section');
    const nav2 = document.querySelector('.navigation-ai-builder');
    const badges = document.querySelector('.dg-sub-menu__badges');

    let total = 0;
    if (banner) total += banner.offsetHeight || 28;
    if (nav1) total += nav1.offsetHeight || (window.innerWidth < 1140 ? 58 : 72);
    if (nav2) total += nav2.offsetHeight || (window.innerWidth < 1140 ? 44 : 48);
    if (badges && window.getComputedStyle(badges).display !== 'none') {
      total += badges.offsetHeight || 0;
    }

    return total > 0 ? total : (window.innerWidth < 1140 ? 130 : 148);
  };

  const getSectionTarget = (targetId) => {
    if (targetId === '#pricing' || targetId === '#sub-menu-pricing') {
      return document.querySelector('.h-pricing-table') || document.querySelector('[data-view-id="hgr-ai_website_builder-pricing-table"]');
    }
    if (targetId === '#sub-menu-build-anything') {
      return document.querySelector('[data-view-id="hgr-ai_website_builder-mixed-cards-section"]') || document.querySelector('#sub-menu-build-anything');
    }
    if (targetId === '#sub-menu-reviews') {
      return document.querySelector('.website-builder-ai-page__reviews') || document.querySelector('#sub-menu-reviews');
    }
    if (targetId === '#sub-menu-how-it-works') {
      return document.querySelector('.dg-picture-card-section') || document.querySelector('#sub-menu-how-it-works');
    }
    if (targetId === '#sub-menu-faq') {
      return document.querySelector('.dg-faq-section') || document.querySelector('[data-view-id="hgr-ai_website_builder-faqs-section"]') || document.querySelector('#sub-menu-faq');
    }
    return document.querySelector(targetId);
  };

  const smoothScrollTo = (selector) => {
    const sec = getSectionTarget(selector);
    if (!sec) {
      const fallback = document.querySelector(selector);
      if (fallback) {
        const y = fallback.getBoundingClientRect().top + window.pageYOffset - getHeaderHeight();
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
      }
      return;
    }

    // Target the section's headline title if present, otherwise the section element itself
    const headline = sec.querySelector('.dg-headline__title') || sec.querySelector('h2') || sec.querySelector('h1') || sec;
    const headerH = getHeaderHeight();
    const titleTop = headline.getBoundingClientRect().top + window.pageYOffset;

    // Scroll so title sits comfortably 28px below the sticky header badges
    const targetY = Math.max(0, titleTop - headerH - 28);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // 3. Header CTA Button ("Start building")
  const headerCta = document.querySelector('[data-click-id="hgr-ai_website_builder-header-cta_button"]');
  if (headerCta) {
    headerCta.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#pricing');
    });
  }

  // 4. Sub-Menu Badges (Pricing, Build anything, Reviews, How it works, FAQ)
  const badgeMap = [
    { id: 'hgr-ai_website_builder-tab_badge_select-sub-menu-pricing', target: '#pricing' },
    { id: 'hgr-ai_website_builder-tab_badge_select-sub-menu-build-anything', target: '#sub-menu-build-anything' },
    { id: 'hgr-ai_website_builder-tab_badge_select-sub-menu-reviews', target: '#sub-menu-reviews' },
    { id: 'hgr-ai_website_builder-tab_badge_select-sub-menu-how-it-works', target: '#sub-menu-how-it-works' },
    { id: 'hgr-ai_website_builder-tab_badge_select-sub-menu-faq', target: '#sub-menu-faq' }
  ];

  const badgeButtons = [];
  badgeMap.forEach(item => {
    const btn = document.querySelector(`[data-click-id="${item.id}"]`);
    if (btn) {
      badgeButtons.push({ btn, targetId: item.target });
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        smoothScrollTo(item.target);
        setActiveBadge(btn);
      });
    }
  });

  const setActiveBadge = (activeBtn) => {
    badgeButtons.forEach(({ btn }) => {
      if (btn === activeBtn) {
        btn.classList.add('dg-badge-interactable--active');
        btn.style.setProperty('--dg-badge-interactable-color', 'var(--h-fg-neutral-inverse-default)');
        btn.style.setProperty('--dg-badge-interactable-color-hover', 'var(--h-fg-neutral-inverse-default)');
        btn.style.setProperty('--dg-badge-interactable-bg', 'var(--h-bg-neutral-inverse-default)');
        btn.style.setProperty('--dg-badge-interactable-bg-hover', 'var(--h-bg-neutral-inverse-default)');
      } else {
        btn.classList.remove('dg-badge-interactable--active');
        btn.style.setProperty('--dg-badge-interactable-color', 'var(--h-fg-neutral-default)');
        btn.style.setProperty('--dg-badge-interactable-color-hover', 'var(--h-fg-neutral-default)');
        btn.style.setProperty('--dg-badge-interactable-bg', 'var(--h-bg-neutral-elevated)');
        btn.style.setProperty('--dg-badge-interactable-bg-hover', 'var(--h-bg-neutral-secondary)');
      }
    });
  };

  // ScrollSpy for Sub-Menu Badges (if present)
  if (badgeButtons.length > 0) {
    window.addEventListener('scroll', () => {
      const headerH = getHeaderHeight();
      const scrollPos = window.scrollY + headerH + 60;

      for (let i = badgeMap.length - 1; i >= 0; i--) {
        const item = badgeMap[i];
        const sec = getSectionTarget(item.target);
        if (sec) {
          const headline = sec.querySelector('.dg-headline__title') || sec.querySelector('h2') || sec;
          const top = headline.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPos >= top) {
            const matched = badgeButtons.find(b => b.targetId === item.target);
            if (matched) setActiveBadge(matched.btn);
            break;
          }
        }
      }
    }, { passive: true });
  }

  // 5. Handle initial URL hash on page load
  if (window.location.hash) {
    const hash = window.location.hash;
    setTimeout(() => {
      smoothScrollTo(hash);
    }, 200);
  }

  // 6. Interactive FAQ Accordion
  const accordions = document.querySelectorAll('.dg-accordion');
  accordions.forEach(acc => {
    const header = acc.querySelector('.dg-accordion__header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = acc.classList.contains('dg-accordion--open');
        if (isOpen) {
          acc.classList.remove('dg-accordion--open');
          header.setAttribute('aria-expanded', 'false');
        } else {
          acc.classList.add('dg-accordion--open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
      header.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          header.click();
        }
      });
    }
  });

  // 7. Navigation Mega Menu
  const megaMenuPanel = document.getElementById('navigation-mega-menu-panel');
  const megaTriggers = document.querySelectorAll('[data-mega-menu-trigger]');
  let menuTimeout = null;

  const openMegaMenu = (trigger) => {
    if (!megaMenuPanel) return;
    clearTimeout(menuTimeout);
    megaTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
    trigger.setAttribute('aria-expanded', 'true');
    megaMenuPanel.classList.remove('navigation-menu-redesign__container--closing');
    megaMenuPanel.classList.add('navigation-menu-redesign__container--opening');
    const viewport = megaMenuPanel.querySelector('.navigation-menu-redesign__viewport');
    if (viewport) {
      viewport.style.height = 'auto';
      viewport.style.maxHeight = '600px';
    }
    const menu = megaMenuPanel.querySelector('.navigation-menu-redesign__menu');
    if (menu) {
      menu.classList.remove('navigation-menu-redesign__menu--hidden');
    }
    megaMenuPanel.style.display = 'block';
  };

  const closeMegaMenu = () => {
    if (!megaMenuPanel) return;
    menuTimeout = setTimeout(() => {
      megaTriggers.forEach(t => t.setAttribute('aria-expanded', 'false'));
      megaMenuPanel.classList.add('navigation-menu-redesign__container--closing');
      megaMenuPanel.classList.remove('navigation-menu-redesign__container--opening');
      const viewport = megaMenuPanel.querySelector('.navigation-menu-redesign__viewport');
      if (viewport) {
        viewport.style.height = '0px';
      }
    }, 200);
  };

  megaTriggers.forEach(trigger => {
    trigger.addEventListener('mouseenter', () => openMegaMenu(trigger));
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
      if (isExpanded) closeMegaMenu();
      else openMegaMenu(trigger);
    });
  });

  if (megaMenuPanel) {
    megaMenuPanel.addEventListener('mouseenter', () => clearTimeout(menuTimeout));
    megaMenuPanel.addEventListener('mouseleave', closeMegaMenu);
  }

  // Mega Menu Left-Hand Rail Buttons
  const railItems = document.querySelectorAll('.navigation-mega-menu__rail-item');
  railItems.forEach(rail => {
    rail.addEventListener('click', () => {
      railItems.forEach(r => {
        r.classList.remove('navigation-mega-menu__rail-item--active');
        r.setAttribute('aria-pressed', 'false');
      });
      rail.classList.add('navigation-mega-menu__rail-item--active');
      rail.setAttribute('aria-pressed', 'true');
    });
  });

  // 7b. Mobile Navigation Burger Menu
  const mobileBurgerBtn = document.querySelector('.navigation-section__mobile-menu-burger');
  const mobileMenuWrapper = document.getElementById('main-mobile-menu-wrapper');
  const burgerIcon = document.querySelector('.navigation-section__burger-icon');

  const closeMobileNav = () => {
    if (mobileBurgerBtn) mobileBurgerBtn.setAttribute('aria-expanded', 'false');
    if (burgerIcon) burgerIcon.classList.remove('navigation-section__burger-icon--open');
    if (mobileMenuWrapper) mobileMenuWrapper.style.display = 'none';
  };

  if (mobileBurgerBtn && mobileMenuWrapper) {
    mobileBurgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileBurgerBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeMobileNav();
      } else {
        closeAiDropdowns();
        closeMegaMenu();
        mobileBurgerBtn.setAttribute('aria-expanded', 'true');
        if (burgerIcon) burgerIcon.classList.add('navigation-section__burger-icon--open');
        mobileMenuWrapper.style.display = 'block';
      }
    });

    mobileMenuWrapper.addEventListener('click', (e) => {
      if (e.target === mobileMenuWrapper || e.target.closest('a')) {
        closeMobileNav();
      }
    });
  }

  // 8. AI Builder Subnav Dropdowns ("Product", "What you can build" - Desktop & Mobile)
  const aiNavPanel = document.querySelector('.navigation-ai-builder__panel');
  const productBtn = document.querySelector('[data-click-id="hgr-navigation-ai-builder-product"]');
  const whatBtn = document.querySelector('[data-click-id="hgr-navigation-ai-builder-what-you-can-build"]');
  const productPanel = document.getElementById('navigation-ai-builder-product');
  const whatPanel = document.getElementById('navigation-ai-builder-what-you-can-build');
  const aiBackdrop = aiNavPanel ? aiNavPanel.querySelector('.navigation-ai-builder__backdrop') : null;

  // Mobile specific elements
  const aiMobileToggle = document.querySelector('[data-click-id="hgr-navigation-ai-builder-mobile-toggle"]');
  const aiMobileMenus = document.querySelector('.navigation-ai-builder__mobile-menus');
  const mobileProductBtn = document.querySelector('[data-click-id="hgr-navigation-ai-builder-mobile-product"]');
  const mobileWhatBtn = document.querySelector('[data-click-id="hgr-navigation-ai-builder-mobile-what-you-can-build"]');
  const backButtons = document.querySelectorAll('.navigation-ai-builder__back');

  const closeAiDropdowns = () => {
    if (productBtn) productBtn.setAttribute('aria-expanded', 'false');
    if (whatBtn) whatBtn.setAttribute('aria-expanded', 'false');
    if (aiMobileToggle) aiMobileToggle.setAttribute('aria-expanded', 'false');
    if (productPanel) productPanel.style.display = 'none';
    if (whatPanel) whatPanel.style.display = 'none';
    if (aiMobileMenus) aiMobileMenus.style.display = window.innerWidth < 768 ? 'flex' : 'none';
    if (aiNavPanel) {
      aiNavPanel.style.display = 'none';
      aiNavPanel.classList.remove('active');
    }
  };

  const toggleAiDropdown = (btn, panelToOpen, otherBtn, otherPanel) => {
    if (!btn || !panelToOpen || !aiNavPanel) return;
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (isExpanded) {
      closeAiDropdowns();
    } else {
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      if (otherPanel) otherPanel.style.display = 'none';
      if (aiMobileMenus) aiMobileMenus.style.display = 'none';

      btn.setAttribute('aria-expanded', 'true');
      aiNavPanel.style.display = 'block';
      aiNavPanel.classList.add('active');
      panelToOpen.style.display = 'block';
    }
  };

  if (productBtn && productPanel) {
    productBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAiDropdown(productBtn, productPanel, whatBtn, whatPanel);
    });
  }

  if (whatBtn && whatPanel) {
    whatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleAiDropdown(whatBtn, whatPanel, productBtn, productPanel);
    });
  }

  // Mobile AI Builder Toggle
  if (aiMobileToggle && aiNavPanel) {
    aiMobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = aiMobileToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeAiDropdowns();
      } else {
        closeMobileNav();
        aiMobileToggle.setAttribute('aria-expanded', 'true');
        aiNavPanel.style.display = 'block';
        aiNavPanel.classList.add('active');
        if (aiMobileMenus) aiMobileMenus.style.display = 'flex';
        if (productPanel) productPanel.style.display = 'none';
        if (whatPanel) whatPanel.style.display = 'none';
      }
    });
  }

  // Mobile sub-item navigation
  if (mobileProductBtn && productPanel && aiMobileMenus) {
    mobileProductBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      aiMobileMenus.style.display = 'none';
      productPanel.style.display = 'block';
    });
  }

  if (mobileWhatBtn && whatPanel && aiMobileMenus) {
    mobileWhatBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      aiMobileMenus.style.display = 'none';
      whatPanel.style.display = 'block';
    });
  }

  backButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (productPanel) productPanel.style.display = 'none';
      if (whatPanel) whatPanel.style.display = 'none';
      if (aiMobileMenus) aiMobileMenus.style.display = 'flex';
    });
  });

  if (aiBackdrop) {
    aiBackdrop.addEventListener('click', (e) => {
      e.stopPropagation();
      closeAiDropdowns();
    });
  }

  if (aiNavPanel) {
    aiNavPanel.addEventListener('click', (e) => {
      if (!e.target.closest('.navigation-ai-builder__dropdown') &&
          !e.target.closest('.navigation-ai-builder__mobile-menus')) {
        closeAiDropdowns();
      }
    });
    aiNavPanel.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeAiDropdowns();
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navigation-ai-builder__dropdown') &&
        !e.target.closest('.navigation-ai-builder__trigger') &&
        !e.target.closest('.navigation-ai-builder__mobile-toggle')) {
      closeAiDropdowns();
    }
    if (!e.target.closest('.navigation-section')) {
      closeMobileNav();
    }
    closeMegaMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAiDropdowns();
      closeMobileNav();
      closeMegaMenu();
    }
  });

  // 9. Interactive Category Tabs & Background Images in "Your idea belongs online. Start here."
  const mixedCardsSection = document.querySelector('[data-view-id="hgr-ai_website_builder-mixed-cards-section"]');
  if (mixedCardsSection) {
    const desktopTabs = mixedCardsSection.querySelectorAll('.desktop.dg-tabs__tabs .h-tabs__tab');
    const mobileSelect = mixedCardsSection.querySelector('#dg-tabs-select-v-0-6');
    const mobileSelectedLabel = mixedCardsSection.querySelector('.h-select__selected');
    const mobileDropdown = mixedCardsSection.querySelector('#dg-tabs-select-v-0-6-dropdown');
    const cardWrappers = Array.from(mixedCardsSection.querySelectorAll('.h-mixed-cards__content > .h-mixed-cards__two-thirds, .h-mixed-cards__content > .h-mixed-cards__one-third'));

    // Group wrappers into 7 sets of 4 cards
    const cardGroups = [];
    for (let i = 0; i < cardWrappers.length; i += 4) {
      cardGroups.push(cardWrappers.slice(i, i + 4));
    }

    // Function to ensure background images are set and responsive
    const updateMixedCardBackgrounds = () => {
      const isDesktop = window.innerWidth >= 1025;
      const cards = mixedCardsSection.querySelectorAll('.h-mixed-two-third-card--bg-image-dynamic, .h-mixed-one-third-card--bg-image-dynamic, .h-mixed-large-card--bg-image-dynamic');
      cards.forEach(card => {
        let bgImg = '';
        if (card.classList.contains('h-mixed-two-third-card')) {
          bgImg = isDesktop ? './assets/images/3278136a-7cdd-4b4d-ea7f-a0c816fea300.png' : './assets/images/6aec9fe3-45ea-4ee2-8e89-4b9b1e118400.png';
        } else if (card.classList.contains('h-mixed-large-card')) {
          bgImg = isDesktop ? './assets/images/b13d3382-4a26-4439-92d5-d420bc440800.png' : './assets/images/24b003d5-28b1-4554-65c2-58ad25df4100.png';
        } else if (card.classList.contains('h-mixed-one-third-card')) {
          bgImg = isDesktop ? './assets/images/848db506-9c6f-4493-4e05-fe4987cff300.png' : './assets/images/9b9e5b3a-eded-42e4-692a-198643da5000.png';
        }
        if (bgImg) {
          card.style.setProperty('background-image', `url(${bgImg})`, 'important');
          card.style.backgroundSize = 'cover';
          card.style.backgroundPosition = 'center center';
          card.style.backgroundRepeat = 'no-repeat';
        }
      });
    };

    const activateTab = (index) => {
      // 1. Update desktop tab buttons
      desktopTabs.forEach((tab, i) => {
        const text = tab.querySelector('.h-typography');
        if (i === index) {
          tab.classList.add('h-tabs__tab--active');
          tab.setAttribute('aria-selected', 'true');
          if (text) text.style.color = 'var(--h-tabs-color-active)';
        } else {
          tab.classList.remove('h-tabs__tab--active');
          tab.setAttribute('aria-selected', 'false');
          if (text) text.style.color = 'var(--h-tabs-color)';
        }
      });

      // 2. Update mobile selected label
      if (desktopTabs[index] && mobileSelectedLabel) {
        const titleSpan = desktopTabs[index].querySelector('.h-typography');
        if (titleSpan) mobileSelectedLabel.textContent = titleSpan.textContent.trim();
      }

      // 3. Switch card groups (hide all, show selected group)
      cardGroups.forEach((group, i) => {
        group.forEach(wrapper => {
          wrapper.style.display = (i === index) ? '' : 'none';
        });
      });

      // 4. Update background images
      updateMixedCardBackgrounds();
    };

    // Attach click listeners to desktop tabs
    desktopTabs.forEach((tab, index) => {
      tab.style.cursor = 'pointer';
      tab.addEventListener('click', () => {
        activateTab(index);
      });
    });

    // Mobile select interaction
    if (mobileSelect && mobileDropdown) {
      mobileSelect.style.cursor = 'pointer';
      mobileSelect.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = mobileDropdown.style.display !== 'none';
        mobileDropdown.style.display = isOpen ? 'none' : 'block';
        mobileSelect.setAttribute('aria-expanded', String(!isOpen));
      });

      const options = mobileDropdown.querySelectorAll('.h-select-option');
      options.forEach(opt => {
        opt.addEventListener('click', (e) => {
          e.stopPropagation();
          const idx = parseInt(opt.getAttribute('data-index') || '0', 10);
          activateTab(idx);
          mobileDropdown.style.display = 'none';
          mobileSelect.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('click', () => {
        mobileDropdown.style.display = 'none';
        mobileSelect.setAttribute('aria-expanded', 'false');
      });
    }

    // Initialize backgrounds and resize listener
    updateMixedCardBackgrounds();
    window.addEventListener('resize', updateMixedCardBackgrounds, { passive: true });
  }

  // 10. Reviews Slider Controller (Autoplay, Drag & Pagination)
  const reviewsWrapper = document.querySelector('.h-reviews__cards-wrapper');
  const reviewsContainer = document.querySelector('.h-reviews__cards');
  const prevHandler = document.querySelector('[data-click-id="hgr-ai_website_builder-reviews-previous-click"]');
  const nextHandler = document.querySelector('[data-click-id="hgr-ai_website_builder-reviews-next-click"]');
  const reviewCards = document.querySelectorAll('.h-reviews-card');
  const reviewThumbs = document.querySelectorAll('.h-reviews__cards-scrollbar-thumb');

  // Equalize review card heights
  const equalizeReviewCardHeights = () => {
    if (!reviewCards.length) return;
    reviewCards.forEach(c => { c.style.height = ''; });
    let maxHeight = 0;
    reviewCards.forEach(c => {
      const h = c.offsetHeight;
      if (h > maxHeight) maxHeight = h;
    });
    if (maxHeight > 0) {
      reviewCards.forEach(c => { c.style.height = `${maxHeight}px`; });
    }
  };
  equalizeReviewCardHeights();
  window.addEventListener('resize', equalizeReviewCardHeights);

  let currentReviewIndex = 0;
  const totalReviews = reviewCards.length || 7;
  let reviewAutoplayTimer = null;
  let isDragging = false;
  let startX = 0;
  let scrollStart = 0;

  const getReviewStep = () => {
    if (!reviewsContainer) return 612;
    const card = reviewsContainer.querySelector('.h-reviews-card');
    return card ? (card.offsetWidth + 20) : 612;
  };

  const goToReview = (index, smooth = true) => {
    if (!reviewsContainer) return;
    currentReviewIndex = (index + totalReviews) % totalReviews;
    const step = getReviewStep();
    const targetScroll = currentReviewIndex * step;
    reviewsContainer.scrollTo({
      left: targetScroll,
      behavior: smooth ? 'smooth' : 'auto'
    });
    updateReviewThumbs(currentReviewIndex);
  };

  const updateReviewThumbs = (activeIdx) => {
    reviewThumbs.forEach((thumb, i) => {
      if (i === activeIdx) {
        thumb.classList.add('h-reviews__cards-scrollbar-thumb--active');
      } else {
        thumb.classList.remove('h-reviews__cards-scrollbar-thumb--active');
      }
    });
  };

  // Previous & Next navigation
  const slideNext = () => goToReview(currentReviewIndex + 1);
  const slidePrev = () => goToReview(currentReviewIndex - 1);

  if (nextHandler) nextHandler.addEventListener('click', (e) => { e.preventDefault(); slideNext(); });
  if (prevHandler) prevHandler.addEventListener('click', (e) => { e.preventDefault(); slidePrev(); });

  // Clickable pagination dots
  if (reviewThumbs.length) {
    reviewThumbs.forEach((thumb, index) => {
      thumb.addEventListener('click', () => {
        goToReview(index);
      });
    });
  }

  // Scroll listener to sync active dot with user scroll / touch swipe
  if (reviewsContainer) {
    let scrollTimeout;
    reviewsContainer.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const step = getReviewStep();
        const activeIdx = Math.min(
          totalReviews - 1,
          Math.max(0, Math.round(reviewsContainer.scrollLeft / step))
        );
        currentReviewIndex = activeIdx;
        updateReviewThumbs(activeIdx);
      }, 50);
    }, { passive: true });
  }

  // Autoplay functionality (advances every 4.5s, pauses on hover / touch)
  const startReviewAutoplay = () => {
    stopReviewAutoplay();
    reviewAutoplayTimer = setInterval(() => {
      slideNext();
    }, 4500);
  };

  const stopReviewAutoplay = () => {
    if (reviewAutoplayTimer) {
      clearInterval(reviewAutoplayTimer);
      reviewAutoplayTimer = null;
    }
  };

  if (reviewsWrapper) {
    reviewsWrapper.addEventListener('mouseenter', stopReviewAutoplay);
    reviewsWrapper.addEventListener('mouseleave', startReviewAutoplay);
    reviewsWrapper.addEventListener('touchstart', stopReviewAutoplay, { passive: true });
    reviewsWrapper.addEventListener('touchend', startReviewAutoplay, { passive: true });
  }

  // Mouse Drag to Scroll
  if (reviewsContainer) {
    reviewsContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      reviewsContainer.classList.add('is-dragging');
      startX = e.pageX - reviewsContainer.offsetLeft;
      scrollStart = reviewsContainer.scrollLeft;
      stopReviewAutoplay();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - reviewsContainer.offsetLeft;
      const walk = (x - startX) * 1.5;
      reviewsContainer.scrollLeft = scrollStart - walk;
    });

    window.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        reviewsContainer.classList.remove('is-dragging');
        // Snap to nearest card after drag release
        const step = getReviewStep();
        const nearestIndex = Math.min(
          totalReviews - 1,
          Math.max(0, Math.round(reviewsContainer.scrollLeft / step))
        );
        goToReview(nearestIndex);
        startReviewAutoplay();
      }
    });
  }

  // Start autoplay
  startReviewAutoplay();

  // 11. Ensure Video Plays
  const video = document.querySelector('video');
  if (video) {
    video.muted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented playback, keep poster visible
      });
    }
  }

  // 12. Connect other CTA buttons to #pricing
  const startBuildingBtn = document.querySelector('[data-click-id="hgr-ai_website_builder-start_building"]');
  if (startBuildingBtn) {
    startBuildingBtn.setAttribute('href', '#pricing');
    startBuildingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#pricing');
    });
  }

  const claimDealBtn = document.querySelector('[data-click-id="hgr-ai_website_builder-header-cta_button"]');
  if (claimDealBtn) {
    claimDealBtn.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#pricing');
    });
  }

  // All href='#pricing' clicks
  document.querySelectorAll('a[href="#pricing"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      smoothScrollTo('#pricing');
    });
  });

  // 13. Sticky Header Synchronization
  const bannerEl = document.querySelector('.dg-top-banner');
  const nav1El = document.querySelector('.navigation-section');
  const nav2El = document.querySelector('.navigation-ai-builder');

  const updateStickyHeaders = () => {
    const isScrolled = window.scrollY > 10;
    if (bannerEl) {
      bannerEl.classList.add('dg-top-banner--sticky');
    }
    if (nav1El) {
      nav1El.classList.add('navigation-section--sticky');
      nav1El.classList.add('navigation-section--under-banner');
    }
    if (nav2El) {
      nav2El.classList.add('navigation-ai-builder--under-banner');
      if (isScrolled) {
        nav2El.classList.add('navigation-ai-builder--sticky');
      } else {
        nav2El.classList.remove('navigation-ai-builder--sticky');
      }
    }
  };

  window.addEventListener('scroll', updateStickyHeaders, { passive: true });
  updateStickyHeaders();
});
