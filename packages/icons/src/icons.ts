import {
	IconFlipForRtl,
	IconVariedByLang,
	IconVariedByDir
} from './types';

import svgAdd from './svgs/add.svg';
export const cdxIconAdd = svgAdd;

import svgAlert from './svgs/alert.svg';
export const cdxIconAlert = svgAlert;

import svgAlignCenter from './svgs/alignCenter.svg';
export const cdxIconAlignCenter = svgAlignCenter;

import svgAlignLeft from './svgs/alignLeft.svg';
export const cdxIconAlignLeft = svgAlignLeft;

import svgAlignRight from './svgs/alignRight.svg';
export const cdxIconAlignRight = svgAlignRight;

import svgArrowNext from './svgs/arrowNext.svg';
export const cdxIconArrowNext: IconFlipForRtl = {
	ltr: svgArrowNext,
	shouldFlip: true
};

import svgArrowPrevious from './svgs/arrowPrevious.svg';
export const cdxIconArrowPrevious: IconFlipForRtl = {
	ltr: svgArrowPrevious,
	shouldFlip: true
};

import svgArticle from './svgs/article.svg';
export const cdxIconArticle: IconFlipForRtl = {
	ltr: svgArticle,
	shouldFlip: true
};

import svgArticleAdd from './svgs/articleAdd.svg';
export const cdxIconArticleAdd = svgArticleAdd;

import svgArticleCheck from './svgs/articleCheck.svg';
export const cdxIconArticleCheck = svgArticleCheck;

import svgArticleDisambiguation from './svgs/articleDisambiguation.svg';
export const cdxIconArticleDisambiguation: IconFlipForRtl = {
	ltr: svgArticleDisambiguation,
	shouldFlip: true
};

import svgArticleNotFound from './svgs/articleNotFound.svg';
export const cdxIconArticleNotFound: IconFlipForRtl = {
	ltr: svgArticleNotFound,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

import svgArticleRedirect from './svgs/articleRedirect.svg';
export const cdxIconArticleRedirect: IconFlipForRtl = {
	ltr: svgArticleRedirect,
	shouldFlip: true
};

import svgArticles from './svgs/articles.svg';
export const cdxIconArticles: IconFlipForRtl = {
	ltr: svgArticles,
	shouldFlip: true
};

import svgArticleSearch from './svgs/articleSearch.svg';
export const cdxIconArticleSearch = svgArticleSearch;

import svgArticlesSearchLtr from './svgs/articlesSearch-ltr.svg';
import svgArticlesSearchRtl from './svgs/articlesSearch-rtl.svg';
export const cdxIconArticlesSearch: IconVariedByDir = {
	ltr: svgArticlesSearchLtr,
	rtl: svgArticlesSearchRtl
};

import svgAttachment from './svgs/attachment.svg';
export const cdxIconAttachment = svgAttachment;

import svgBell from './svgs/bell.svg';
export const cdxIconBell = svgBell;

import svgBellOutline from './svgs/bellOutline.svg';
export const cdxIconBellOutline = svgBellOutline;

import svgBigger from './svgs/bigger.svg';
export const cdxIconBigger = svgBigger;

import svgBlock from './svgs/block.svg';
export const cdxIconBlock = svgBlock;

import svgBoldA from './svgs/bold-a.svg';
import svgBoldArabAin from './svgs/bold-arab-ain.svg';
import svgBoldArabDad from './svgs/bold-arab-dad.svg';
import svgBoldArabJeem from './svgs/bold-arab-jeem.svg';
import svgBoldArmnTo from './svgs/bold-armn-to.svg';
import svgBoldB from './svgs/bold-b.svg';
import svgBoldCyrlBe from './svgs/bold-cyrl-be.svg';
import svgBoldCyrlPalochka from './svgs/bold-cyrl-palochka.svg';
import svgBoldCyrlTe from './svgs/bold-cyrl-te.svg';
import svgBoldCyrlZhe from './svgs/bold-cyrl-zhe.svg';
import svgBoldF from './svgs/bold-f.svg';
import svgBoldG from './svgs/bold-g.svg';
import svgBoldGeorMan from './svgs/bold-geor-man.svg';
import svgBoldL from './svgs/bold-l.svg';
import svgBoldN from './svgs/bold-n.svg';
import svgBoldV from './svgs/bold-v.svg';

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

import svgBook from './svgs/book.svg';
export const cdxIconBook: IconFlipForRtl = {
	ltr: svgBook,
	shouldFlip: true
};

import svgBookmark from './svgs/bookmark.svg';
export const cdxIconBookmark = svgBookmark;

import svgBookmarkOutline from './svgs/bookmarkOutline.svg';
export const cdxIconBookmarkOutline = svgBookmarkOutline;

import svgBright from './svgs/bright.svg';
export const cdxIconBright = svgBright;

import svgBrowser from './svgs/browser.svg';
export const cdxIconBrowser: IconFlipForRtl = {
	ltr: svgBrowser,
	shouldFlip: true
};

import svgCalendar from './svgs/calendar.svg';
export const cdxIconCalendar = svgCalendar;

import svgCamera from './svgs/camera.svg';
export const cdxIconCamera = svgCamera;

import svgCancel from './svgs/cancel.svg';
export const cdxIconCancel = svgCancel;

import svgChart from './svgs/chart.svg';
export const cdxIconChart = svgChart;

import svgCheck from './svgs/check.svg';
export const cdxIconCheck = svgCheck;

import svgCheckAll from './svgs/checkAll.svg';
export const cdxIconCheckAll = svgCheckAll;

import svgClear from './svgs/clear.svg';
export const cdxIconClear = svgClear;

import svgClock from './svgs/clock.svg';
export const cdxIconClock = svgClock;

import svgClose from './svgs/close.svg';
export const cdxIconClose = svgClose;

import svgCode from './svgs/code.svg';
export const cdxIconCode = svgCode;

import svgCollapse from './svgs/collapse.svg';
export const cdxIconCollapse = svgCollapse;

import svgDie from './svgs/die.svg';
export const cdxIconDie = svgDie;

import svgDoubleChevronEnd from './svgs/doubleChevronEnd.svg';
export const cdxIconDoubleChevronEnd: IconFlipForRtl = {
	ltr: svgDoubleChevronEnd,
	shouldFlip: true
};

import svgDoubleChevronStart from './svgs/doubleChevronStart.svg';
export const cdxIconDoubleChevronStart: IconFlipForRtl = {
	ltr: svgDoubleChevronStart,
	shouldFlip: true
};

import svgDownTriangle from './svgs/downTriangle.svg';
export const cdxIconDownTriangle = svgDownTriangle;

import svgDownload from './svgs/download.svg';
export const cdxIconDownload = svgDownload;

import svgDraggable from './svgs/draggable.svg';
export const cdxIconDraggable = svgDraggable;

import svgEdit from './svgs/edit.svg';
export const cdxIconEdit = svgEdit;

import svgEditLock from './svgs/editLock.svg';
export const cdxIconEditLock = svgEditLock;

import svgEditUndoLtr from './svgs/editUndo-ltr.svg';
import svgEditUndoRtl from './svgs/editUndo-rtl.svg';
export const cdxIconEditUndo: IconVariedByDir = {
	ltr: svgEditUndoLtr,
	rtl: svgEditUndoRtl
};

import svgEllipsis from './svgs/ellipsis.svg';
export const cdxIconEllipsis = svgEllipsis;

import svgError from './svgs/error.svg';
export const cdxIconError = svgError;

import svgExitFullscreen from './svgs/exitFullscreen.svg';
export const cdxIconExitFullscreen = svgExitFullscreen;

import svgExpand from './svgs/expand.svg';
export const cdxIconExpand = svgExpand;

import svgEye from './svgs/eye.svg';
export const cdxIconEye = svgEye;

import svgEyeClosed from './svgs/eyeClosed.svg';
export const cdxIconEyeClosed = svgEyeClosed;

import svgFeedback from './svgs/feedback.svg';
export const cdxIconFeedback: IconFlipForRtl = {
	ltr: svgFeedback,
	shouldFlip: true
};

import svgFlag from './svgs/flag.svg';
export const cdxIconFlag: IconFlipForRtl = {
	ltr: svgFlag,
	shouldFlip: true
};

import svgFolderPlaceholder from './svgs/folderPlaceholder.svg';
export const cdxIconFolderPlaceholder: IconFlipForRtl = {
	ltr: svgFolderPlaceholder,
	shouldFlip: true
};

import svgFullScreen from './svgs/fullScreen.svg';
export const cdxIconFullScreen = svgFullScreen;

import svgFunnel from './svgs/funnel.svg';
export const cdxIconFunnel: IconFlipForRtl = {
	ltr: svgFunnel,
	shouldFlip: true
};

import svgGlobe from './svgs/globe.svg';
export const cdxIconGlobe = svgGlobe;

import svgHalfBright from './svgs/halfBright.svg';
export const cdxIconHalfBright: IconFlipForRtl = {
	ltr: svgHalfBright,
	shouldFlip: true
};

import svgHalfStar from './svgs/halfStar.svg';
export const cdxIconHalfStar: IconFlipForRtl = {
	ltr: svgHalfStar,
	shouldFlip: true
};
import svgHeart from './svgs/heart.svg';
export const cdxIconHeart = svgHeart;

import svgHelp from './svgs/help.svg';
export const cdxIconHelp: IconFlipForRtl = {
	ltr: svgHelp,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

import svgHelpNotice from './svgs/helpNotice.svg';
export const cdxIconHelpNotice: IconFlipForRtl = {
	ltr: svgHelpNotice,
	shouldFlip: true,
	shouldFlipExceptions: [ 'he', 'yi' ]
};

import svgHieroglyph from './svgs/hieroglyph.svg';
export const cdxIconHieroglyph = svgHieroglyph;

import svgHighlight from './svgs/highlight.svg';
export const cdxIconHighlight = svgHighlight;

import svgHistory from './svgs/history.svg';
export const cdxIconHistory = svgHistory;

import svgHome from './svgs/home.svg';
export const cdxIconHome = svgHome;

import svgImage from './svgs/image.svg';
export const cdxIconImage = svgImage;

import svgImageAddLtr from './svgs/imageAdd-ltr.svg';
import svgImageAddRtl from './svgs/imageAdd-rtl.svg';
export const cdxIconImageAdd: IconVariedByDir = {
	ltr: svgImageAddLtr,
	rtl: svgImageAddRtl
};

import svgImageBroken from './svgs/imageBroken.svg';
export const cdxIconImageBroken = svgImageBroken;

import svgImageGallery from './svgs/imageGallery.svg';
export const cdxIconImageGallery = svgImageGallery;

import svgImageLayoutBasic from './svgs/imageLayoutBasic.svg';
export const cdxIconImageLayoutBasic = svgImageLayoutBasic;

import svgImageLayoutFrame from './svgs/imageLayoutFrame.svg';
export const cdxIconImageLayoutFrame = svgImageLayoutFrame;

import svgImageLayoutFrameless from './svgs/imageLayoutFrameless.svg';
export const cdxIconImageLayoutFrameless = svgImageLayoutFrameless;

import svgImageLayoutThumbnail from './svgs/imageLayoutThumbnail.svg';
export const cdxIconImageLayoutThumbnail = svgImageLayoutThumbnail;

import svgImageLockLtr from './svgs/imageLock-ltr.svg';
import svgImageLockRtl from './svgs/imageLock-rtl.svg';
export const cdxIconImageLock: IconVariedByDir = {
	ltr: svgImageLockLtr,
	rtl: svgImageLockRtl
};

import svgIndent from './svgs/indent.svg';
export const cdxIconIndent: IconFlipForRtl = {
	ltr: svgIndent,
	shouldFlip: true
};

import svgLightbulb from './svgs/lightbulb.svg';
import svgInfo from './svgs/info.svg';
import svgInfoFilled from './svgs/infoFilled.svg';
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

import svgItalicA from './svgs/italic-a.svg';
import svgItalicArabKehehJeem from './svgs/italic-arab-keheh-jeem.svg';
import svgItalicArabMeem from './svgs/italic-arab-meem.svg';
import svgItalicArabTeh from './svgs/italic-arab-teh.svg';
import svgItalicArmnSha from './svgs/italic-armn-sha.svg';
import svgItalicC from './svgs/italic-c.svg';
import svgItalicD from './svgs/italic-d.svg';
import svgItalicE from './svgs/italic-e.svg';
import svgItalicGeorKan from './svgs/italic-geor-kan.svg';
import svgItalicI from './svgs/italic-i.svg';
import svgItalicK from './svgs/italic-k.svg';
import svgItalicS from './svgs/italic-s.svg';
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

import svgJournal from './svgs/journal.svg';
export const cdxIconJournal: IconFlipForRtl = {
	ltr: svgJournal,
	shouldFlip: true
};

import svgKey from './svgs/key.svg';
export const cdxIconKey = svgKey;

import svgKeyboard from './svgs/keyboard.svg';
export const cdxIconKeyboard = svgKeyboard;

import svgLabFlask from './svgs/labFlask.svg';
export const cdxIconLabFlask = svgLabFlask;

import svgLanguage from './svgs/language.svg';
export const cdxIconLanguage = svgLanguage;

import svgLargerText from './svgs/largerText.svg';
export const cdxIconLargerText = svgLargerText;

import svgLayout from './svgs/layout.svg';
export const cdxIconLayout: IconFlipForRtl = {
	ltr: svgLayout,
	shouldFlip: true
};

import svgLink from './svgs/link.svg';
export const cdxIconLink = svgLink;

import svgLinkExternal from './svgs/linkExternal.svg';
export const cdxIconLinkExternal: IconFlipForRtl = {
	ltr: svgLinkExternal,
	shouldFlip: true
};

import svgLinkSecure from './svgs/linkSecure.svg';
export const cdxIconLinkSecure = svgLinkSecure;

import svgListBullet from './svgs/listBullet.svg';
export const cdxIconListBullet: IconFlipForRtl = {
	ltr: svgListBullet,
	shouldFlip: true
};

import svgListNumberedLtr from './svgs/listNumbered-ltr.svg';
import svgListNumberedRtl from './svgs/listNumbered-rtl.svg';
export const cdxIconListNumbered: IconVariedByDir = {
	ltr: svgListNumberedLtr,
	rtl: svgListNumberedRtl
};

import svgLock from './svgs/lock.svg';
export const cdxIconLock = svgLock;

import svgLogIn from './svgs/logIn.svg';
export const cdxIconLogIn: IconFlipForRtl = {
	ltr: svgLogIn,
	shouldFlip: true
};

import svgLogOut from './svgs/logOut.svg';
export const cdxIconLogOut: IconFlipForRtl = {
	ltr: svgLogOut,
	shouldFlip: true
};

import svgLogoCC from './svgs/logo-CC.svg';
export const cdxIconLogoCC = svgLogoCC;

import svgLogoWikidata from './svgs/logo-Wikidata.svg';
export const cdxIconLogoWikidata = svgLogoWikidata;

import svgLogoWikimediaCommons from './svgs/logo-Wikimedia-Commons.svg';
export const cdxIconLogoWikimediaCommons = svgLogoWikimediaCommons;

import svgLogoWikimediaDiscovery from './svgs/logo-Wikimedia-Discovery.svg';
export const cdxIconLogoWikimediaDiscovery = svgLogoWikimediaDiscovery;

import svgLogoWikimedia from './svgs/logo-Wikimedia.svg';
export const cdxIconLogoWikimedia = svgLogoWikimedia;

import svgLogoWikipedia from './svgs/logo-Wikipedia.svg';
export const cdxIconLogoWikipedia = svgLogoWikipedia;

import svgMap from './svgs/map.svg';
export const cdxIconMap: IconFlipForRtl = {
	ltr: svgMap,
	shouldFlip: true
};

import svgMapPin from './svgs/mapPin.svg';
export const cdxIconMapPin = svgMapPin;

import svgMapPinAdd from './svgs/mapPinAdd.svg';
export const cdxIconMapPinAdd = svgMapPinAdd;

import svgMapTrail from './svgs/mapTrail.svg';
export const cdxIconMapTrail = svgMapTrail;

import svgMarkup from './svgs/markup.svg';
export const cdxIconMarkup = svgMarkup;

import svgMathematics from './svgs/mathematics.svg';
export const cdxIconMathematics = svgMathematics;

import svgMathematicsDisplayBlock from './svgs/mathematicsDisplayBlock.svg';
export const cdxIconMathematicsDisplayBlock = svgMathematicsDisplayBlock;

import svgMathematicsDisplayDefault from './svgs/mathematicsDisplayDefault.svg';
export const cdxIconMathematicsDisplayDefault = svgMathematicsDisplayDefault;

import svgMathematicsDisplayInline from './svgs/mathematicsDisplayInline.svg';
export const cdxIconMathematicsDisplayInline = svgMathematicsDisplayInline;

import svgMenu from './svgs/menu.svg';
export const cdxIconMenu = svgMenu;

import svgMessage from './svgs/message.svg';
export const cdxIconMessage = svgMessage;

import svgMoon from './svgs/moon.svg';
export const cdxIconMoon = svgMoon;

import svgMove from './svgs/move.svg';
export const cdxIconMove = svgMove;

import svgMoveFirst from './svgs/moveFirst.svg';
export const cdxIconMoveFirst: IconFlipForRtl = {
	ltr: svgMoveFirst,
	shouldFlip: true
};

import svgMoveLast from './svgs/moveLast.svg';
export const cdxIconMoveLast: IconFlipForRtl = {
	ltr: svgMoveLast,
	shouldFlip: true
};

import svgMusicalScore from './svgs/musicalScore.svg';
export const cdxIconMusicalScore = svgMusicalScore;

import svgNewWindow from './svgs/newWindow.svg';
export const cdxIconNewWindow: IconFlipForRtl = {
	ltr: svgNewWindow,
	shouldFlip: true
};

import svgNewline from './svgs/newline.svg';
export const cdxIconNewline: IconFlipForRtl = {
	ltr: svgNewline,
	shouldFlip: true
};

import svgNewspaper from './svgs/newspaper.svg';
export const cdxIconNewspaper: IconFlipForRtl = {
	ltr: svgNewspaper,
	shouldFlip: true
};
import svgNext from './svgs/next.svg';
export const cdxIconNext: IconFlipForRtl = {
	ltr: svgNext,
	shouldFlip: true
};

import svgNoWikiText from './svgs/noWikiText.svg';
export const cdxIconNoWikiText = svgNoWikiText;

import svgNotBright from './svgs/notBright.svg';
export const cdxIconNotBright = svgNotBright;

import svgNotice from './svgs/notice.svg';
export const cdxIconNotice = svgNotice;

import svgOngoingConversation from './svgs/ongoingConversation.svg';
export const cdxIconOngoingConversation: IconFlipForRtl = {
	ltr: svgOngoingConversation,
	shouldFlip: true
};

import svgOutdent from './svgs/outdent.svg';
export const cdxIconOutdent: IconFlipForRtl = {
	ltr: svgOutdent,
	shouldFlip: true
};

import svgOutline from './svgs/outline.svg';
export const cdxIconOutline: IconFlipForRtl = {
	ltr: svgOutline,
	shouldFlip: true
};

import svgPageSettings from './svgs/pageSettings.svg';
export const cdxIconPageSettings = svgPageSettings;

import svgPause from './svgs/pause.svg';
export const cdxIconPause = svgPause;

import svgPlay from './svgs/play.svg';
export const cdxIconPlay = svgPlay;

import svgPrevious from './svgs/previous.svg';
export const cdxIconPrevious: IconFlipForRtl = {
	ltr: svgPrevious,
	shouldFlip: true
};

import svgPrinter from './svgs/printer.svg';
export const cdxIconPrinter = svgPrinter;

import svgPushPin from './svgs/pushPin.svg';
export const cdxIconPushPin = svgPushPin;

import svgPuzzle from './svgs/puzzle.svg';
export const cdxIconPuzzle: IconFlipForRtl = {
	ltr: svgPuzzle,
	shouldFlip: true
};

import svgQuotes from './svgs/quotes.svg';
export const cdxIconQuotes: IconFlipForRtl = {
	ltr: svgQuotes,
	shouldFlip: true
};

import svgRecentChangesLtr from './svgs/recentChanges-ltr.svg';
import svgRecentChangesRtl from './svgs/recentChanges-rtl.svg';
export const cdxIconRecentChanges: IconVariedByDir = {
	ltr: svgRecentChangesLtr,
	rtl: svgRecentChangesRtl
};

import svgRedo from './svgs/redo.svg';
export const cdxIconRedo: IconFlipForRtl = {
	ltr: svgRedo,
	shouldFlip: true
};

import svgReference from './svgs/reference.svg';
export const cdxIconReference = svgReference;

import svgReferenceExistingLtr from './svgs/referenceExisting-ltr.svg';
import svgReferenceExistingRtl from './svgs/referenceExisting-rtl.svg';
export const cdxIconReferenceExisting: IconVariedByDir = {
	ltr: svgReferenceExistingLtr,
	rtl: svgReferenceExistingRtl
};

import svgReferences from './svgs/references.svg';
export const cdxIconReferences: IconFlipForRtl = {
	ltr: svgReferences,
	shouldFlip: true
};

import svgReload from './svgs/reload.svg';
export const cdxIconReload = svgReload;

import svgRestore from './svgs/restore.svg';
export const cdxIconRestore = svgRestore;

import svgRobot from './svgs/robot.svg';
export const cdxIconRobot = svgRobot;

import svgSearch from './svgs/search.svg';
export const cdxIconSearch = svgSearch;

import svgSearchCaseSensitive from './svgs/searchCaseSensitive.svg';
export const cdxIconSearchCaseSensitive = svgSearchCaseSensitive;

import svgSearchDiacritics from './svgs/searchDiacritics.svg';
export const cdxIconSearchDiacritics = svgSearchDiacritics;

import svgSearchRegularExpression from './svgs/searchRegularExpression.svg';
export const cdxIconSearchRegularExpression = svgSearchRegularExpression;

import svgSettings from './svgs/settings.svg';
export const cdxIconSettings = svgSettings;

import svgShare from './svgs/share.svg';
export const cdxIconShare = svgShare;

import svgSignature from './svgs/signature.svg';
export const cdxIconSignature: IconFlipForRtl = {
	ltr: svgSignature,
	shouldFlip: true
};

import svgSmaller from './svgs/smaller.svg';
export const cdxIconSmaller = svgSmaller;

import svgSmallerText from './svgs/smallerText.svg';
export const cdxIconSmallerText = svgSmallerText;

import svgSpecialCharacter from './svgs/specialCharacter.svg';
export const cdxIconSpecialCharacter = svgSpecialCharacter;

import svgSpecialPages from './svgs/specialPages.svg';
export const cdxIconSpecialPages: IconFlipForRtl = {
	ltr: svgSpecialPages,
	shouldFlip: true
};

import svgSpeechBubble from './svgs/speechBubble.svg';
export const cdxIconSpeechBubble: IconFlipForRtl = {
	ltr: svgSpeechBubble,
	shouldFlip: true
};

import svgSpeechBubbleAdd from './svgs/speechBubbleAdd.svg';
export const cdxIconSpeechBubbleAdd: IconFlipForRtl = {
	ltr: svgSpeechBubbleAdd,
	shouldFlip: true
};

import svgSpeechBubbles from './svgs/speechBubbles.svg';
export const cdxIconSpeechBubbles: IconFlipForRtl = {
	ltr: svgSpeechBubbles,
	shouldFlip: true
};

import svgStar from './svgs/star.svg';
export const cdxIconStar = svgStar;

import svgStop from './svgs/stop.svg';
export const cdxIconStop = svgStop;

import svgStopHand from './svgs/stopHand.svg';
export const cdxIconStopHand = svgStopHand;

import svgStrikethroughA from './svgs/strikethrough-a.svg';
import svgStrikethroughS from './svgs/strikethrough-s.svg';
import svgStrikethroughY from './svgs/strikethrough-y.svg';
export const cdxIconStrikethrough: IconVariedByLang = {
	langCodeMap: {
		en: svgStrikethroughS,
		fi: svgStrikethroughY
	},
	default: svgStrikethroughA
};

import svgSubscript from './svgs/subscript.svg';
export const cdxIconSubscript: IconFlipForRtl = {
	ltr: svgSubscript,
	shouldFlip: true
};

import svgSubtract from './svgs/subtract.svg';
export const cdxIconSubtract = svgSubtract;

import svgSuperscript from './svgs/superscript.svg';
export const cdxIconSuperscript: IconFlipForRtl = {
	ltr: svgSuperscript,
	shouldFlip: true
};

import svgTable from './svgs/table.svg';
export const cdxIconTable = svgTable;

import svgTableAddColumnAfter from './svgs/tableAddColumnAfter.svg';
export const cdxIconTableAddColumnAfter: IconFlipForRtl = {
	ltr: svgTableAddColumnAfter,
	shouldFlip: true
};

import svgTableAddColumnBefore from './svgs/tableAddColumnBefore.svg';
export const cdxIconTableAddColumnBefore: IconFlipForRtl = {
	ltr: svgTableAddColumnBefore,
	shouldFlip: true
};

import svgTableAddRowAfter from './svgs/tableAddRowAfter.svg';
export const cdxIconTableAddRowAfter = svgTableAddRowAfter;

import svgTableAddRowBefore from './svgs/tableAddRowBefore.svg';
export const cdxIconTableAddRowBefore = svgTableAddRowBefore;

import svgTableCaption from './svgs/tableCaption.svg';
export const cdxIconTableCaption = svgTableCaption;

import svgTableMergeCells from './svgs/tableMergeCells.svg';
export const cdxIconTableMergeCells = svgTableMergeCells;

import svgTableMoveColumnAfter from './svgs/tableMoveColumnAfter.svg';
export const cdxIconTableMoveColumnAfter: IconFlipForRtl = {
	ltr: svgTableMoveColumnAfter,
	shouldFlip: true
};

import svgTableMoveColumnBefore from './svgs/tableMoveColumnBefore.svg';
export const cdxIconTableMoveColumnBefore: IconFlipForRtl = {
	ltr: svgTableMoveColumnBefore,
	shouldFlip: true
};
import svgTableMoveRowAfter from './svgs/tableMoveRowAfter.svg';
export const cdxIconTableMoveRowAfter = svgTableMoveRowAfter;

import svgTableMoveRowBefore from './svgs/tableMoveRowBefore.svg';
export const cdxIconTableMoveRowBefore = svgTableMoveRowBefore;

import svgTag from './svgs/tag.svg';
export const cdxIconTag: IconFlipForRtl = {
	ltr: svgTag,
	shouldFlip: true
};

import svgTemplateAdd from './svgs/templateAdd.svg';
export const cdxIconTemplateAdd: IconFlipForRtl = {
	ltr: svgTemplateAdd,
	shouldFlip: true
};

import svgTextDirLTR from './svgs/textDirLTR.svg';
export const cdxIconTextDirLTR = svgTextDirLTR;

import svgTextDirRTL from './svgs/textDirRTL.svg';
export const cdxIconTextDirRTL = svgTextDirRTL;

import svgTextFlow from './svgs/textFlow.svg';
export const cdxIconTextFlow: IconFlipForRtl = {
	ltr: svgTextFlow,
	shouldFlip: true
};

import svgTextStyle from './svgs/textStyle.svg';
export const cdxIconTextStyle = svgTextStyle;

import svgTextSummary from './svgs/textSummary.svg';
export const cdxIconTextSummary: IconFlipForRtl = {
	ltr: svgTextSummary,
	shouldFlip: true
};

import svgTrash from './svgs/trash.svg';
export const cdxIconTrash = svgTrash;

import svgTray from './svgs/tray.svg';
export const cdxIconTray = svgTray;

import svgUnBlock from './svgs/unBlock.svg';
export const cdxIconUnBlock = svgUnBlock;

import svgUnFlagLtr from './svgs/unFlag-ltr.svg';
import svgUnFlagRtl from './svgs/unFlag-rtl.svg';
export const cdxIconUnFlag: IconVariedByDir = {
	ltr: svgUnFlagLtr,
	rtl: svgUnFlagRtl
};

import svgUnLink from './svgs/unLink.svg';
export const cdxIconUnLink = svgUnLink;

import svgUnLock from './svgs/unLock.svg';
export const cdxIconUnLock = svgUnLock;

import svgUnStar from './svgs/unStar.svg';
export const cdxIconUnStar = svgUnStar;

import svgUnderlineA from './svgs/underline-a.svg';
import svgUnderlineU from './svgs/underline-u.svg';
export const cdxIconUnderline: IconVariedByLang = {
	langCodeMap: {
		en: svgUnderlineU,
		de: svgUnderlineU
	},
	default: svgUnderlineA
};

import svgUndo from './svgs/undo.svg';
export const cdxIconUndo: IconFlipForRtl = {
	ltr: svgUndo,
	shouldFlip: true
};

import svgUpTriangle from './svgs/upTriangle.svg';
export const cdxIconUpTriangle = svgUpTriangle;

import svgUpload from './svgs/upload.svg';
export const cdxIconUpload = svgUpload;

import svgUserActive from './svgs/userActive.svg';
export const cdxIconUserActive = svgUserActive;

import svgUserAdd from './svgs/userAdd.svg';
export const cdxIconUserAdd: IconFlipForRtl = {
	ltr: svgUserAdd,
	shouldFlip: true
};

import svgUserAnonymous from './svgs/userAnonymous.svg';
export const cdxIconUserAnonymous = svgUserAnonymous;

import svgUserAvatar from './svgs/userAvatar.svg';
export const cdxIconUserAvatar = svgUserAvatar;

import svgUserAvatarOutline from './svgs/userAvatarOutline.svg';
export const cdxIconUserAvatarOutline = svgUserAvatarOutline;

import svgUserContributions from './svgs/userContributions.svg';
export const cdxIconUserContributions: IconFlipForRtl = {
	ltr: svgUserContributions,
	shouldFlip: true
};

import svgUserGroup from './svgs/userGroup.svg';
export const cdxIconUserGroup: IconFlipForRtl = {
	ltr: svgUserGroup,
	shouldFlip: true
};

import svgUserTalk from './svgs/userTalk.svg';
export const cdxIconUserTalk: IconFlipForRtl = {
	ltr: svgUserTalk,
	shouldFlip: true
};

import svgViewCompact from './svgs/viewCompact.svg';
export const cdxIconViewCompact = svgViewCompact;

import svgViewDetails from './svgs/viewDetails.svg';
export const cdxIconViewDetails: IconFlipForRtl = {
	ltr: svgViewDetails,
	shouldFlip: true
};

import svgVisionSimulator from './svgs/visionSimulator.svg';
export const cdxIconVisionSimulator = svgVisionSimulator;

import svgWikiText from './svgs/wikiText.svg';
export const cdxIconWikiText = svgWikiText;

import svgWindow from './svgs/window.svg';
export const cdxIconWindow = svgWindow;

import svgZoomIn from './svgs/zoomIn.svg';
export const cdxIconZoomIn = svgZoomIn;

import svgZoomOut from './svgs/zoomOut.svg';
export const cdxIconZoomOut = svgZoomOut;
