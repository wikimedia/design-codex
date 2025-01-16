/**
 * Icon definitions.
 *
 * Icons are listed in alphabetical order. See types.ts or the "Adding new icons" documentation at
 * https://doc.wikimedia.org/codex/latest/icons/adding-new.html#adding-the-icon-definition
 */

import {
	IconFlipForRtl,
	IconVariedByLang,
	IconVariedByDir
} from './types';

import svgAdd from './images/add.svg';
export const cdxIconAdd = svgAdd;

import svgAlert from './images/alert.svg';
export const cdxIconAlert = svgAlert;

import svgAlignCenter from './images/alignCenter.svg';
export const cdxIconAlignCenter = svgAlignCenter;

import svgAlignLeft from './images/alignLeft.svg';
export const cdxIconAlignLeft = svgAlignLeft;

import svgAlignRight from './images/alignRight.svg';
export const cdxIconAlignRight = svgAlignRight;

import svgAppearance from './images/appearance.svg';
export const cdxIconAppearance = svgAppearance;

import svgArrowDown from './images/arrowDown.svg';
export const cdxIconArrowDown = svgArrowDown;

import svgArrowNext from './images/arrowNext.svg';
export const cdxIconArrowNext: IconFlipForRtl = {
	ltr: svgArrowNext,
	shouldFlip: true
};

import svgArrowPrevious from './images/arrowPrevious.svg';
export const cdxIconArrowPrevious: IconFlipForRtl = {
	ltr: svgArrowPrevious,
	shouldFlip: true
};

import svgArrowUp from './images/arrowUp.svg';
export const cdxIconArrowUp = svgArrowUp;

import svgArticle from './images/article.svg';
export const cdxIconArticle: IconFlipForRtl = {
	ltr: svgArticle,
	shouldFlip: true
};

import svgArticleAdd from './images/articleAdd.svg';
export const cdxIconArticleAdd = svgArticleAdd;

import svgArticleCheck from './images/articleCheck.svg';
export const cdxIconArticleCheck = svgArticleCheck;

import svgArticleDisambiguation from './images/articleDisambiguation.svg';
export const cdxIconArticleDisambiguation: IconFlipForRtl = {
	ltr: svgArticleDisambiguation,
	shouldFlip: true
};

import svgArticleNotFound from './images/articleNotFound.svg';
export const cdxIconArticleNotFound: IconFlipForRtl = {
	ltr: svgArticleNotFound,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

import svgArticleRedirect from './images/articleRedirect.svg';
export const cdxIconArticleRedirect: IconFlipForRtl = {
	ltr: svgArticleRedirect,
	shouldFlip: true
};

import svgArticles from './images/articles.svg';
export const cdxIconArticles: IconFlipForRtl = {
	ltr: svgArticles,
	shouldFlip: true
};

import svgArticleSearch from './images/articleSearch.svg';
export const cdxIconArticleSearch = svgArticleSearch;

import svgArticlesSearchLtr from './images/articlesSearch-ltr.svg';
import svgArticlesSearchRtl from './images/articlesSearch-rtl.svg';
export const cdxIconArticlesSearch: IconVariedByDir = {
	ltr: svgArticlesSearchLtr,
	rtl: svgArticlesSearchRtl
};

import svgAttachment from './images/attachment.svg';
export const cdxIconAttachment = svgAttachment;

import svgBell from './images/bell.svg';
export const cdxIconBell = svgBell;

import svgBellOutline from './images/bellOutline.svg';
export const cdxIconBellOutline = svgBellOutline;

import svgBigger from './images/bigger.svg';
export const cdxIconBigger = svgBigger;

import svgBlock from './images/block.svg';
export const cdxIconBlock = svgBlock;

import svgBoldA from './images/bold-a.svg';
import svgBoldArabAin from './images/bold-arab-ain.svg';
import svgBoldArabDad from './images/bold-arab-dad.svg';
import svgBoldArabJeem from './images/bold-arab-jeem.svg';
import svgBoldArmnTo from './images/bold-armn-to.svg';
import svgBoldB from './images/bold-b.svg';
import svgBoldCyrlBe from './images/bold-cyrl-be.svg';
import svgBoldCyrlPalochka from './images/bold-cyrl-palochka.svg';
import svgBoldCyrlTe from './images/bold-cyrl-te.svg';
import svgBoldCyrlZhe from './images/bold-cyrl-zhe.svg';
import svgBoldF from './images/bold-f.svg';
import svgBoldG from './images/bold-g.svg';
import svgBoldGeorMan from './images/bold-geor-man.svg';
import svgBoldL from './images/bold-l.svg';
import svgBoldN from './images/bold-n.svg';
import svgBoldV from './images/bold-v.svg';

export const cdxIconBold: IconVariedByLang = {
	langCodeMap: {
		ar: svgBoldArabAin,
		be: svgBoldCyrlTe,
		ce: svgBoldCyrlPalochka,
		cs: svgBoldB,
		en: svgBoldB,
		he: svgBoldB,
		ml: svgBoldB,
		pl: svgBoldB,
		sco: svgBoldB,
		da: svgBoldF,
		de: svgBoldF,
		hu: svgBoldF,
		ksh: svgBoldF,
		nn: svgBoldF,
		no: svgBoldF,
		sv: svgBoldF,
		es: svgBoldN,
		gl: svgBoldN,
		pt: svgBoldN,
		eu: svgBoldL,
		fi: svgBoldL,
		fa: svgBoldArabDad,
		fr: svgBoldG,
		it: svgBoldG,
		hy: svgBoldArmnTo,
		ka: svgBoldGeorMan,
		ky: svgBoldCyrlZhe,
		ru: svgBoldCyrlZhe,
		uk: svgBoldCyrlZhe,
		nl: svgBoldV,
		os: svgBoldCyrlBe,
		ur: svgBoldArabJeem
	},
	default: svgBoldA
};

import svgBook from './images/book.svg';
export const cdxIconBook: IconFlipForRtl = {
	ltr: svgBook,
	shouldFlip: true
};

import svgBookmark from './images/bookmark.svg';
export const cdxIconBookmark = svgBookmark;

import svgBookmarkOutline from './images/bookmarkOutline.svg';
export const cdxIconBookmarkOutline = svgBookmarkOutline;

import svgBright from './images/bright.svg';
export const cdxIconBright = svgBright;

import svgBrowser from './images/browser.svg';
export const cdxIconBrowser: IconFlipForRtl = {
	ltr: svgBrowser,
	shouldFlip: true
};

import svgCalendar from './images/calendar.svg';
export const cdxIconCalendar = svgCalendar;

import svgCamera from './images/camera.svg';
export const cdxIconCamera = svgCamera;

import svgCancel from './images/cancel.svg';
export const cdxIconCancel = svgCancel;

import svgChart from './images/chart.svg';
export const cdxIconChart = svgChart;

import svgCheck from './images/check.svg';
export const cdxIconCheck = svgCheck;

import svgCheckAll from './images/checkAll.svg';
export const cdxIconCheckAll = svgCheckAll;

import svgClear from './images/clear.svg';
export const cdxIconClear = svgClear;

import svgClock from './images/clock.svg';
export const cdxIconClock = svgClock;

import svgClose from './images/close.svg';
export const cdxIconClose = svgClose;

import svgCode from './images/code.svg';
export const cdxIconCode = svgCode;

import svgCollapse from './images/collapse.svg';
export const cdxIconCollapse = svgCollapse;

import svgCopy from './images/copy.svg';
export const cdxIconCopy: IconFlipForRtl = {
	ltr: svgCopy,
	shouldFlip: true
};

import svgCut from './images/cut.svg';
export const cdxIconCut: IconFlipForRtl = {
	ltr: svgCut,
	shouldFlip: true
};

import svgDatabase from './images/database.svg';
export const cdxIconDatabase = svgDatabase;

import svgDie from './images/die.svg';
export const cdxIconDie = svgDie;

import svgDoubleChevronEnd from './images/doubleChevronEnd.svg';
export const cdxIconDoubleChevronEnd: IconFlipForRtl = {
	ltr: svgDoubleChevronEnd,
	shouldFlip: true
};

import svgDoubleChevronStart from './images/doubleChevronStart.svg';
export const cdxIconDoubleChevronStart: IconFlipForRtl = {
	ltr: svgDoubleChevronStart,
	shouldFlip: true
};

import svgDownTriangle from './images/downTriangle.svg';
export const cdxIconDownTriangle = svgDownTriangle;

import svgDownload from './images/download.svg';
export const cdxIconDownload = svgDownload;

import svgDraggable from './images/draggable.svg';
export const cdxIconDraggable = svgDraggable;

import svgEdit from './images/edit.svg';
export const cdxIconEdit = svgEdit;

import svgEditLock from './images/editLock.svg';
export const cdxIconEditLock = svgEditLock;

import svgEditUndoLtr from './images/editUndo-ltr.svg';
import svgEditUndoRtl from './images/editUndo-rtl.svg';
export const cdxIconEditUndo: IconVariedByDir = {
	ltr: svgEditUndoLtr,
	rtl: svgEditUndoRtl
};

import svgEllipsis from './images/ellipsis.svg';
export const cdxIconEllipsis = svgEllipsis;

import svgError from './images/error.svg';
export const cdxIconError = svgError;

import svgExitFullscreen from './images/exitFullscreen.svg';
export const cdxIconExitFullscreen = svgExitFullscreen;

import svgExpand from './images/expand.svg';
export const cdxIconExpand = svgExpand;

import svgEye from './images/eye.svg';
export const cdxIconEye = svgEye;

import svgEyeClosed from './images/eyeClosed.svg';
export const cdxIconEyeClosed = svgEyeClosed;

import svgFeedback from './images/feedback.svg';
export const cdxIconFeedback: IconFlipForRtl = {
	ltr: svgFeedback,
	shouldFlip: true
};

import svgFlag from './images/flag.svg';
export const cdxIconFlag: IconFlipForRtl = {
	ltr: svgFlag,
	shouldFlip: true
};

import svgFolderPlaceholder from './images/folderPlaceholder.svg';
export const cdxIconFolderPlaceholder: IconFlipForRtl = {
	ltr: svgFolderPlaceholder,
	shouldFlip: true
};

import svgFunction from './images/function.svg';
export const cdxIconFunction = svgFunction;

import svgFunctionArgument from './images/functionArgument.svg';
export const cdxIconFunctionArgument: IconFlipForRtl = {
	ltr: svgFunctionArgument,
	shouldFlip: true
};

import svgFullscreen from './images/fullscreen.svg';
export const cdxIconFullscreen = svgFullscreen;
// DEPRECATED
export const cdxIconFullScreen = svgFullscreen;

import svgFunnel from './images/funnel.svg';
export const cdxIconFunnel: IconFlipForRtl = {
	ltr: svgFunnel,
	shouldFlip: true
};

import svgGlobe from './images/globe.svg';
export const cdxIconGlobe = svgGlobe;

import svgHalfBright from './images/halfBright.svg';
export const cdxIconHalfBright: IconFlipForRtl = {
	ltr: svgHalfBright,
	shouldFlip: true
};

import svgHalfStar from './images/halfStar.svg';
export const cdxIconHalfStar: IconFlipForRtl = {
	ltr: svgHalfStar,
	shouldFlip: true
};

import svgHand from './images/hand.svg';
export const cdxIconHand = svgHand;

import svgHeart from './images/heart.svg';
export const cdxIconHeart = svgHeart;

import svgHelp from './images/help.svg';
export const cdxIconHelp: IconFlipForRtl = {
	ltr: svgHelp,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

import svgHelpNotice from './images/helpNotice.svg';
export const cdxIconHelpNotice: IconFlipForRtl = {
	ltr: svgHelpNotice,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

import svgHieroglyph from './images/hieroglyph.svg';
export const cdxIconHieroglyph = svgHieroglyph;

import svgHighlight from './images/highlight.svg';
export const cdxIconHighlight = svgHighlight;

import svgHistory from './images/history.svg';
export const cdxIconHistory = svgHistory;

import svgHome from './images/home.svg';
export const cdxIconHome = svgHome;

import svgImage from './images/image.svg';
export const cdxIconImage = svgImage;

import svgImageAddLtr from './images/imageAdd-ltr.svg';
import svgImageAddRtl from './images/imageAdd-rtl.svg';
export const cdxIconImageAdd: IconVariedByDir = {
	ltr: svgImageAddLtr,
	rtl: svgImageAddRtl
};

import svgImageBroken from './images/imageBroken.svg';
export const cdxIconImageBroken = svgImageBroken;

import svgImageGallery from './images/imageGallery.svg';
export const cdxIconImageGallery = svgImageGallery;

import svgImageLayoutBasic from './images/imageLayoutBasic.svg';
export const cdxIconImageLayoutBasic = svgImageLayoutBasic;

import svgImageLayoutFrame from './images/imageLayoutFrame.svg';
export const cdxIconImageLayoutFrame = svgImageLayoutFrame;

import svgImageLayoutFrameless from './images/imageLayoutFrameless.svg';
export const cdxIconImageLayoutFrameless = svgImageLayoutFrameless;

import svgImageLayoutThumbnail from './images/imageLayoutThumbnail.svg';
export const cdxIconImageLayoutThumbnail = svgImageLayoutThumbnail;

import svgImageLockLtr from './images/imageLock-ltr.svg';
import svgImageLockRtl from './images/imageLock-rtl.svg';
export const cdxIconImageLock: IconVariedByDir = {
	ltr: svgImageLockLtr,
	rtl: svgImageLockRtl
};

import svgIndent from './images/indent.svg';
export const cdxIconIndent: IconFlipForRtl = {
	ltr: svgIndent,
	shouldFlip: true
};

import svgInstance from './images/instance.svg';
export const cdxIconInstance: IconFlipForRtl = {
	ltr: svgInstance,
	shouldFlip: true
};

import svgLightbulb from './images/lightbulb.svg';
export const cdxIconLightbulb = svgLightbulb;

import svgLiteral from './images/literal.svg';
export const cdxIconLiteral: IconFlipForRtl = {
	ltr: svgLiteral,
	shouldFlip: true
};

import svgInfo from './images/info.svg';
import svgInfoFilled from './images/infoFilled.svg';
export const cdxIconInfo: IconVariedByLang = {
	langCodeMap: {
		ar: svgLightbulb
	},
	default: svgInfo
};
export const cdxIconInfoFilled: IconVariedByLang = {
	langCodeMap: {
		ar: svgLightbulb
	},
	default: svgInfoFilled
};

import svgItalicA from './images/italic-a.svg';
import svgItalicArabKehehJeem from './images/italic-arab-keheh-jeem.svg';
import svgItalicArabMeem from './images/italic-arab-meem.svg';
import svgItalicArabTeh from './images/italic-arab-teh.svg';
import svgItalicArmnSha from './images/italic-armn-sha.svg';
import svgItalicC from './images/italic-c.svg';
import svgItalicD from './images/italic-d.svg';
import svgItalicE from './images/italic-e.svg';
import svgItalicGeorKan from './images/italic-geor-kan.svg';
import svgItalicI from './images/italic-i.svg';
import svgItalicK from './images/italic-k.svg';
import svgItalicS from './images/italic-s.svg';
export const cdxIconItalic: IconVariedByLang = {
	langCodeMap: {
		ar: svgItalicArabMeem,
		cs: svgItalicI,
		en: svgItalicI,
		fr: svgItalicI,
		he: svgItalicI,
		ml: svgItalicI,
		pl: svgItalicI,
		pt: svgItalicI,
		sco: svgItalicI,
		be: svgItalicK,
		ce: svgItalicK,
		da: svgItalicK,
		de: svgItalicK,
		fi: svgItalicK,
		ky: svgItalicK,
		nn: svgItalicK,
		no: svgItalicK,
		os: svgItalicK,
		sv: svgItalicK,
		ru: svgItalicK,
		uk: svgItalicK,
		es: svgItalicC,
		gl: svgItalicC,
		it: svgItalicC,
		nl: svgItalicC,
		eu: svgItalicE,
		fa: svgItalicArabKehehJeem,
		hu: svgItalicD,
		hy: svgItalicArmnSha,
		ksh: svgItalicS,
		ka: svgItalicGeorKan,
		ur: svgItalicArabTeh
	},
	default: svgItalicA
};

import svgJournal from './images/journal.svg';
export const cdxIconJournal: IconFlipForRtl = {
	ltr: svgJournal,
	shouldFlip: true
};

import svgKey from './images/key.svg';
export const cdxIconKey = svgKey;

import svgKeyboard from './images/keyboard.svg';
export const cdxIconKeyboard = svgKeyboard;

import svgLabFlask from './images/labFlask.svg';
export const cdxIconLabFlask = svgLabFlask;

import svgLanguage from './images/language.svg';
export const cdxIconLanguage = svgLanguage;

import svgLargerText from './images/largerText.svg';
export const cdxIconLargerText = svgLargerText;

import svgLayout from './images/layout.svg';
export const cdxIconLayout: IconFlipForRtl = {
	ltr: svgLayout,
	shouldFlip: true
};

import svgLink from './images/link.svg';
export const cdxIconLink = svgLink;

import svgLinkExternal from './images/linkExternal.svg';
export const cdxIconLinkExternal: IconFlipForRtl = {
	ltr: svgLinkExternal,
	shouldFlip: true
};

import svgLinkSecure from './images/linkSecure.svg';
export const cdxIconLinkSecure = svgLinkSecure;

import svgListBullet from './images/listBullet.svg';
export const cdxIconListBullet: IconFlipForRtl = {
	ltr: svgListBullet,
	shouldFlip: true
};

import svgListNumberedLtr from './images/listNumbered-ltr.svg';
import svgListNumberedRtl from './images/listNumbered-rtl.svg';
export const cdxIconListNumbered: IconVariedByDir = {
	ltr: svgListNumberedLtr,
	rtl: svgListNumberedRtl
};

import svgLock from './images/lock.svg';
export const cdxIconLock = svgLock;

import svgLogIn from './images/logIn.svg';
export const cdxIconLogIn: IconFlipForRtl = {
	ltr: svgLogIn,
	shouldFlip: true
};

import svgLogOut from './images/logOut.svg';
export const cdxIconLogOut: IconFlipForRtl = {
	ltr: svgLogOut,
	shouldFlip: true
};

import svgLogoCC from './images/logo-CC.svg';
export const cdxIconLogoCC = svgLogoCC;

import svgLogoMediaWiki from './images/logo-MediaWiki.svg';
export const cdxIconLogoMediaWiki = svgLogoMediaWiki;

import svgLogoMetaWiki from './images/logo-MetaWiki.svg';
export const cdxIconLogoMetaWiki = svgLogoMetaWiki;

import svgLogoWikibooks from './images/logo-Wikibooks.svg';
export const cdxIconLogoWikibooks = svgLogoWikibooks;

import svgLogoWikidata from './images/logo-Wikidata.svg';
export const cdxIconLogoWikidata = svgLogoWikidata;

import svgLogoWikifunctions from './images/logo-Wikifunctions.svg';
export const cdxIconLogoWikifunctions = svgLogoWikifunctions;

import svgLogoWikimedia from './images/logo-Wikimedia.svg';
export const cdxIconLogoWikimedia = svgLogoWikimedia;

import svgLogoWikimediaCommons from './images/logo-Wikimedia-Commons.svg';
export const cdxIconLogoWikimediaCommons = svgLogoWikimediaCommons;

import svgLogoWikimediaDiscovery from './images/logo-Wikimedia-Discovery.svg';
export const cdxIconLogoWikimediaDiscovery = svgLogoWikimediaDiscovery;

import svgLogoWikinews from './images/logo-Wikinews.svg';
export const cdxIconLogoWikinews = svgLogoWikinews;

import svgLogoWikipedia from './images/logo-Wikipedia.svg';
export const cdxIconLogoWikipedia = svgLogoWikipedia;

import svgLogoWikiquote from './images/logo-Wikiquote.svg';
export const cdxIconLogoWikiquote = svgLogoWikiquote;

import svgLogoWikisource from './images/logo-Wikisource.svg';
export const cdxIconLogoWikisource = svgLogoWikisource;

import svgLogoWikispecies from './images/logo-Wikispecies.svg';
export const cdxIconLogoWikispecies = svgLogoWikispecies;

import svgLogoWikiversity from './images/logo-Wikiversity.svg';
export const cdxIconLogoWikiversity = svgLogoWikiversity;

import svgLogoWikivoyage from './images/logo-Wikivoyage.svg';
export const cdxIconLogoWikivoyage = svgLogoWikivoyage;

import svgLogoWiktionary from './images/logo-Wiktionary.svg';
export const cdxIconLogoWiktionary = svgLogoWiktionary;

import svgMap from './images/map.svg';
export const cdxIconMap: IconFlipForRtl = {
	ltr: svgMap,
	shouldFlip: true
};

import svgMapPin from './images/mapPin.svg';
export const cdxIconMapPin = svgMapPin;

import svgMapPinAdd from './images/mapPinAdd.svg';
export const cdxIconMapPinAdd = svgMapPinAdd;

import svgMapTrail from './images/mapTrail.svg';
export const cdxIconMapTrail = svgMapTrail;

import svgMarkup from './images/markup.svg';
export const cdxIconMarkup = svgMarkup;

import svgMathematics from './images/mathematics.svg';
export const cdxIconMathematics = svgMathematics;

import svgMathematicsDisplayBlock from './images/mathematicsDisplayBlock.svg';
export const cdxIconMathematicsDisplayBlock = svgMathematicsDisplayBlock;

import svgMathematicsDisplayDefault from './images/mathematicsDisplayDefault.svg';
export const cdxIconMathematicsDisplayDefault = svgMathematicsDisplayDefault;

import svgMathematicsDisplayInline from './images/mathematicsDisplayInline.svg';
export const cdxIconMathematicsDisplayInline = svgMathematicsDisplayInline;

import svgMenu from './images/menu.svg';
export const cdxIconMenu = svgMenu;

import svgMessage from './images/message.svg';
export const cdxIconMessage = svgMessage;

import svgMoon from './images/moon.svg';
export const cdxIconMoon = svgMoon;

import svgMove from './images/move.svg';
export const cdxIconMove = svgMove;

import svgMoveFirst from './images/moveFirst.svg';
export const cdxIconMoveFirst: IconFlipForRtl = {
	ltr: svgMoveFirst,
	shouldFlip: true
};

import svgMoveLast from './images/moveLast.svg';
export const cdxIconMoveLast: IconFlipForRtl = {
	ltr: svgMoveLast,
	shouldFlip: true
};

import svgMusicalScore from './images/musicalScore.svg';
export const cdxIconMusicalScore = svgMusicalScore;

import svgNetwork from './images/network.svg';
export const cdxIconNetwork = svgNetwork;

import svgNetworkOff from './images/networkOff.svg';
export const cdxIconNetworkOff = svgNetworkOff;

import svgNewWindow from './images/newWindow.svg';
export const cdxIconNewWindow: IconFlipForRtl = {
	ltr: svgNewWindow,
	shouldFlip: true
};

import svgNewline from './images/newline.svg';
export const cdxIconNewline: IconFlipForRtl = {
	ltr: svgNewline,
	shouldFlip: true
};

import svgNewspaper from './images/newspaper.svg';
export const cdxIconNewspaper: IconFlipForRtl = {
	ltr: svgNewspaper,
	shouldFlip: true
};
import svgNext from './images/next.svg';
export const cdxIconNext: IconFlipForRtl = {
	ltr: svgNext,
	shouldFlip: true
};

import svgNoWikitext from './images/noWikitext.svg';
export const cdxIconNoWikitext = svgNoWikitext;
// DEPRECATED
export const cdxIconNoWikiText = svgNoWikitext;

import svgNotBright from './images/notBright.svg';
export const cdxIconNotBright = svgNotBright;

import svgNotice from './images/notice.svg';
export const cdxIconNotice = svgNotice;

import svgOngoingConversation from './images/ongoingConversation.svg';
export const cdxIconOngoingConversation: IconFlipForRtl = {
	ltr: svgOngoingConversation,
	shouldFlip: true
};

import svgOutdent from './images/outdent.svg';
export const cdxIconOutdent: IconFlipForRtl = {
	ltr: svgOutdent,
	shouldFlip: true
};

import svgOutline from './images/outline.svg';
export const cdxIconOutline: IconFlipForRtl = {
	ltr: svgOutline,
	shouldFlip: true
};

import svgPageSettings from './images/pageSettings.svg';
export const cdxIconPageSettings = svgPageSettings;

import svgPalette from './images/palette.svg';
export const cdxIconPalette: IconFlipForRtl = {
	ltr: svgPalette,
	shouldFlip: true
};

import svgPaste from './images/paste.svg';
export const cdxIconPaste: IconFlipForRtl = {
	ltr: svgPaste,
	shouldFlip: true
};

import svgPause from './images/pause.svg';
export const cdxIconPause = svgPause;

import svgPlay from './images/play.svg';
export const cdxIconPlay = svgPlay;

import svgPrevious from './images/previous.svg';
export const cdxIconPrevious: IconFlipForRtl = {
	ltr: svgPrevious,
	shouldFlip: true
};

import svgPower from './images/power.svg';
export const cdxIconPower = svgPower;

import svgPrinter from './images/printer.svg';
export const cdxIconPrinter = svgPrinter;

import svgPushPin from './images/pushPin.svg';
export const cdxIconPushPin = svgPushPin;

import svgPuzzle from './images/puzzle.svg';
export const cdxIconPuzzle: IconFlipForRtl = {
	ltr: svgPuzzle,
	shouldFlip: true
};

import svgQuotes from './images/quotes.svg';
export const cdxIconQuotes: IconFlipForRtl = {
	ltr: svgQuotes,
	shouldFlip: true
};

import svgQrCode from './images/qrCode.svg';
export const cdxIconQrCode = svgQrCode;

import svgRecentChangesLtr from './images/recentChanges-ltr.svg';
import svgRecentChangesRtl from './images/recentChanges-rtl.svg';
export const cdxIconRecentChanges: IconVariedByDir = {
	ltr: svgRecentChangesLtr,
	rtl: svgRecentChangesRtl
};

import svgRedo from './images/redo.svg';
export const cdxIconRedo: IconFlipForRtl = {
	ltr: svgRedo,
	shouldFlip: true
};

import svgReference from './images/reference.svg';
export const cdxIconReference = svgReference;

import svgReferenceExistingLtr from './images/referenceExisting-ltr.svg';
import svgReferenceExistingRtl from './images/referenceExisting-rtl.svg';
export const cdxIconReferenceExisting: IconVariedByDir = {
	ltr: svgReferenceExistingLtr,
	rtl: svgReferenceExistingRtl
};

import svgReferences from './images/references.svg';
export const cdxIconReferences: IconFlipForRtl = {
	ltr: svgReferences,
	shouldFlip: true
};

import svgReload from './images/reload.svg';
export const cdxIconReload = svgReload;

import svgRestore from './images/restore.svg';
export const cdxIconRestore = svgRestore;

import svgRobot from './images/robot.svg';
export const cdxIconRobot = svgRobot;

import svgSandbox from './images/sandbox.svg';
export const cdxIconSandbox = svgSandbox;

import svgSearch from './images/search.svg';
export const cdxIconSearch = svgSearch;

import svgSearchCaseSensitive from './images/searchCaseSensitive.svg';
export const cdxIconSearchCaseSensitive = svgSearchCaseSensitive;

import svgSearchDiacritics from './images/searchDiacritics.svg';
export const cdxIconSearchDiacritics = svgSearchDiacritics;

import svgSearchRegularExpression from './images/searchRegularExpression.svg';
export const cdxIconSearchRegularExpression = svgSearchRegularExpression;

import svgSettings from './images/settings.svg';
export const cdxIconSettings = svgSettings;

import svgShare from './images/share.svg';
export const cdxIconShare = svgShare;

import svgSignature from './images/signature.svg';
export const cdxIconSignature: IconFlipForRtl = {
	ltr: svgSignature,
	shouldFlip: true
};

import svgSmaller from './images/smaller.svg';
export const cdxIconSmaller = svgSmaller;

import svgSmallerText from './images/smallerText.svg';
export const cdxIconSmallerText = svgSmallerText;

import svgSortVertical from './images/sortVertical.svg';
export const cdxIconSortVertical = svgSortVertical;

import svgSpecialCharacter from './images/specialCharacter.svg';
export const cdxIconSpecialCharacter = svgSpecialCharacter;

import svgSpecialPages from './images/specialPages.svg';
export const cdxIconSpecialPages: IconFlipForRtl = {
	ltr: svgSpecialPages,
	shouldFlip: true
};

import svgSpeechBubble from './images/speechBubble.svg';
export const cdxIconSpeechBubble: IconFlipForRtl = {
	ltr: svgSpeechBubble,
	shouldFlip: true
};

import svgSpeechBubbleAdd from './images/speechBubbleAdd.svg';
export const cdxIconSpeechBubbleAdd: IconFlipForRtl = {
	ltr: svgSpeechBubbleAdd,
	shouldFlip: true
};

import svgSpeechBubbles from './images/speechBubbles.svg';
export const cdxIconSpeechBubbles: IconFlipForRtl = {
	ltr: svgSpeechBubbles,
	shouldFlip: true
};

import svgStar from './images/star.svg';
export const cdxIconStar = svgStar;

import svgStop from './images/stop.svg';
export const cdxIconStop = svgStop;

import svgStrikethroughA from './images/strikethrough-a.svg';
import svgStrikethroughS from './images/strikethrough-s.svg';
import svgStrikethroughY from './images/strikethrough-y.svg';
export const cdxIconStrikethrough: IconVariedByLang = {
	langCodeMap: {
		en: svgStrikethroughS,
		fi: svgStrikethroughY
	},
	default: svgStrikethroughA
};

import svgSubscript from './images/subscript.svg';
export const cdxIconSubscript: IconFlipForRtl = {
	ltr: svgSubscript,
	shouldFlip: true
};

import svgSubtract from './images/subtract.svg';
export const cdxIconSubtract = svgSubtract;

import svgSuccess from './images/success.svg';
export const cdxIconSuccess = svgSuccess;

import svgSuperscript from './images/superscript.svg';
export const cdxIconSuperscript: IconFlipForRtl = {
	ltr: svgSuperscript,
	shouldFlip: true
};

import svgTable from './images/table.svg';
export const cdxIconTable = svgTable;

import svgTableAddColumnAfter from './images/tableAddColumnAfter.svg';
export const cdxIconTableAddColumnAfter: IconFlipForRtl = {
	ltr: svgTableAddColumnAfter,
	shouldFlip: true
};

import svgTableAddColumnBefore from './images/tableAddColumnBefore.svg';
export const cdxIconTableAddColumnBefore: IconFlipForRtl = {
	ltr: svgTableAddColumnBefore,
	shouldFlip: true
};

import svgTableAddRowAfter from './images/tableAddRowAfter.svg';
export const cdxIconTableAddRowAfter = svgTableAddRowAfter;

import svgTableAddRowBefore from './images/tableAddRowBefore.svg';
export const cdxIconTableAddRowBefore = svgTableAddRowBefore;

import svgTableCaption from './images/tableCaption.svg';
export const cdxIconTableCaption = svgTableCaption;

import svgTableMergeCells from './images/tableMergeCells.svg';
export const cdxIconTableMergeCells = svgTableMergeCells;

import svgTableMoveColumnAfter from './images/tableMoveColumnAfter.svg';
export const cdxIconTableMoveColumnAfter: IconFlipForRtl = {
	ltr: svgTableMoveColumnAfter,
	shouldFlip: true
};

import svgTableMoveColumnBefore from './images/tableMoveColumnBefore.svg';
export const cdxIconTableMoveColumnBefore: IconFlipForRtl = {
	ltr: svgTableMoveColumnBefore,
	shouldFlip: true
};
import svgTableMoveRowAfter from './images/tableMoveRowAfter.svg';
export const cdxIconTableMoveRowAfter = svgTableMoveRowAfter;

import svgTableMoveRowBefore from './images/tableMoveRowBefore.svg';
export const cdxIconTableMoveRowBefore = svgTableMoveRowBefore;

import svgTag from './images/tag.svg';
export const cdxIconTag: IconFlipForRtl = {
	ltr: svgTag,
	shouldFlip: true
};

import svgTemplateAdd from './images/templateAdd.svg';
export const cdxIconTemplateAdd: IconFlipForRtl = {
	ltr: svgTemplateAdd,
	shouldFlip: true
};

import svgTextDirLTR from './images/textDirLTR.svg';
export const cdxIconTextDirLTR = svgTextDirLTR;

import svgTextDirRTL from './images/textDirRTL.svg';
export const cdxIconTextDirRTL = svgTextDirRTL;

import svgTextFlow from './images/textFlow.svg';
export const cdxIconTextFlow: IconFlipForRtl = {
	ltr: svgTextFlow,
	shouldFlip: true
};

import svgTextStyle from './images/textStyle.svg';
export const cdxIconTextStyle = svgTextStyle;

import svgTextSummary from './images/textSummary.svg';
export const cdxIconTextSummary: IconFlipForRtl = {
	ltr: svgTextSummary,
	shouldFlip: true
};

import svgTrash from './images/trash.svg';
export const cdxIconTrash = svgTrash;

import svgTray from './images/tray.svg';
export const cdxIconTray = svgTray;

import svgUnBlock from './images/unBlock.svg';
export const cdxIconUnBlock = svgUnBlock;

import svgUnFlagLtr from './images/unFlag-ltr.svg';
import svgUnFlagRtl from './images/unFlag-rtl.svg';
export const cdxIconUnFlag: IconVariedByDir = {
	ltr: svgUnFlagLtr,
	rtl: svgUnFlagRtl
};

import svgUnLink from './images/unLink.svg';
export const cdxIconUnLink = svgUnLink;

import svgUnLock from './images/unLock.svg';
export const cdxIconUnLock = svgUnLock;

import svgUnStar from './images/unStar.svg';
export const cdxIconUnStar = svgUnStar;

import svgUnderlineA from './images/underline-a.svg';
import svgUnderlineU from './images/underline-u.svg';
export const cdxIconUnderline: IconVariedByLang = {
	langCodeMap: {
		en: svgUnderlineU,
		de: svgUnderlineU
	},
	default: svgUnderlineA
};

import svgUndo from './images/undo.svg';
export const cdxIconUndo: IconFlipForRtl = {
	ltr: svgUndo,
	shouldFlip: true
};

import svgUpTriangle from './images/upTriangle.svg';
export const cdxIconUpTriangle = svgUpTriangle;

import svgUpload from './images/upload.svg';
export const cdxIconUpload = svgUpload;

import svgUserActive from './images/userActive.svg';
export const cdxIconUserActive = svgUserActive;

import svgUserAdd from './images/userAdd.svg';
export const cdxIconUserAdd: IconFlipForRtl = {
	ltr: svgUserAdd,
	shouldFlip: true
};

import svgUserAnonymous from './images/userAnonymous.svg';
export const cdxIconUserAnonymous = svgUserAnonymous;

import svgUserAvatar from './images/userAvatar.svg';
export const cdxIconUserAvatar = svgUserAvatar;

import svgUserAvatarOutline from './images/userAvatarOutline.svg';
export const cdxIconUserAvatarOutline = svgUserAvatarOutline;

import svgUserContributions from './images/userContributions.svg';
export const cdxIconUserContributions: IconFlipForRtl = {
	ltr: svgUserContributions,
	shouldFlip: true
};

import svgUserGroup from './images/userGroup.svg';
export const cdxIconUserGroup: IconFlipForRtl = {
	ltr: svgUserGroup,
	shouldFlip: true
};

import svgUserRights from './images/userRights.svg';
export const cdxIconUserRights: IconFlipForRtl = {
	ltr: svgUserRights,
	shouldFlip: true
};

import svgUserTalk from './images/userTalk.svg';
export const cdxIconUserTalk: IconFlipForRtl = {
	ltr: svgUserTalk,
	shouldFlip: true
};

import svgUserTemporary from './images/userTemporary.svg';
export const cdxIconUserTemporary: IconFlipForRtl = {
	ltr: svgUserTemporary,
	shouldFlip: true
};

import svgVolumeDown from './images/volumeDown.svg';
export const cdxIconVolumeDown: IconFlipForRtl = {
	ltr: svgVolumeDown,
	shouldFlip: true
};

import svgVolumeOffLtr from './images/volumeOff-ltr.svg';
import svgVolumeOffRtl from './images/volumeOff-rtl.svg';
export const cdxIconVolumeOff: IconVariedByDir = {
	ltr: svgVolumeOffLtr,
	rtl: svgVolumeOffRtl
};

import svgVolumeUp from './images/volumeUp.svg';
export const cdxIconVolumeUp: IconFlipForRtl = {
	ltr: svgVolumeUp,
	shouldFlip: true
};

import svgViewCompact from './images/viewCompact.svg';
export const cdxIconViewCompact = svgViewCompact;

import svgViewDetails from './images/viewDetails.svg';
export const cdxIconViewDetails: IconFlipForRtl = {
	ltr: svgViewDetails,
	shouldFlip: true
};

import svgVisionSimulator from './images/visionSimulator.svg';
export const cdxIconVisionSimulator = svgVisionSimulator;

import svgWatchlist from './images/watchlist.svg';
export const cdxIconWatchlist: IconFlipForRtl = {
	ltr: svgWatchlist,
	shouldFlip: true
};

import svgWikitext from './images/wikitext.svg';
export const cdxIconWikitext = svgWikitext;
// DEPRECATED
export const cdxIconWikiText = svgWikitext;

import svgWindow from './images/window.svg';
export const cdxIconWindow = svgWindow;

import svgZoomIn from './images/zoomIn.svg';
export const cdxIconZoomIn = svgZoomIn;

import svgZoomOut from './images/zoomOut.svg';
export const cdxIconZoomOut = svgZoomOut;
