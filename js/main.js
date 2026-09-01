import { initTheme } from './theme.js';
import { initMobileMenu } from './mobileMenu.js';
import { initScrollAnimations } from './scrollAnimations.js';
import { initNavigation } from './navigation.js';
import { initGallery } from './gallery.js';

initTheme();
const mobileMenu = initMobileMenu();
initScrollAnimations();
initNavigation(mobileMenu);
initGallery();
