import { $language, type Language } from "./stores.ts";
import type { ExperimentCategory, ExperimentId, ResolvedExperiment } from "./experiments.ts";

const EN = {
  "common.close": "Close",
  "common.reset": "Reset",
  "common.clear": "Clear",
  "common.copy": "Copy",
  "common.copied": "Copied",
  "common.copyFailed": "Couldn't copy",
  "common.update": "Update",
  "common.details": "Details",
  "common.tryAgain": "Try Again",
  "common.off": "Off",
  "common.on": "On",
  "common.default": "Default",

  "playbar.lyrics": "Spicy Lyrics",
  "playbar.fullscreen": "Enter Fullscreen",
  "playbar.popup": "Spicy Popup Lyrics",

  "controls.closePage": "Close Page",
  "controls.disableCompact": "Disable Compact Mode",
  "controls.enableCompact": "Enable Compact Mode",
  "controls.disableRomanization": "Disable Romanization",
  "controls.enableRomanization": "Enable Romanization",
  "controls.nowBar": "NowBar",
  "controls.fullscreen": "Fullscreen",
  "controls.cinemaView": "Cinema View",
  "controls.swapSide": "Swap NowBar Side",
  "controls.settings": "Spicy Lyrics Settings",
  "controls.lyricsManager": "Lyrics Manager",

  "scrollToActive.default": "Scroll to the current line",
  "scrollToActive.above": "Scroll up to the current line",
  "scrollToActive.below": "Scroll down to the current line",

  "npv.title": "Lyrics",
  "npv.hide": "Hide Lyrics",
  "npv.show": "Show Lyrics",
  "npv.exitExpanded": "Exit Expanded",
  "npv.expand": "Expand Lyrics",
  "npv.open": "Open Spicy Lyrics",

  "nextUp.label": "Up Next",

  "queue.title": "Up Next",
  "queue.inQueue": "In Queue",
  "queue.autoplay": "Autoplay",
  "queue.nextFrom": "Next from {context}",
  "queue.nextUp": "Next Up",
  "queue.moreSong": "{count} more song after these",
  "queue.moreSongs": "{count} more songs after these",
  "queue.clear": "Clear",
  "queue.clearConfirm": "Clear Queue?",
  "queue.emptyTitle": "Nothing up next",
  "queue.emptyBody": "Songs you add to the queue show up here.",
  "queue.errorTitle": "Couldn't load the queue",
  "queue.errorBody": "Spotify didn't answer. Try again in a moment.",
  "queue.playBy": "Play {name} by {artists}",
  "queue.play": "Play {name}",
  "queue.explicit": "Explicit",
  "queue.removeFromQueue": "Remove {name} from the queue",
  "queue.thisSong": "this song",
  "queue.removeLiked": "Remove {name} from Liked Songs",
  "queue.saveLiked": "Save {name} to Liked Songs",
  "queue.songFallback": "Song",
  "queue.movedTo": "{name} moved to {position} of {count}",
  "queue.switchLabel": "Show",
  "queue.switchLyrics": "Lyrics",
  "queue.switchQueue": "Queue",

  "skeleton.loading": "Loading Lyrics",

  "credits.writtenBy": "Written by",
  "credits.providedBy": "Provided by",
  "credits.unknown": "Unknown",
  "credits.via": "via ",
  "credits.communityNote": "These lyrics have been provided by our community",
  "credits.communityLead": "Community lyrics",
  "credits.viewProfile": "View TTML Profile",
  "credits.madeBy": "Made by",
  "credits.uploadedBy": "Uploaded by",

  "notice.lyricsNotFound.title": "No lyrics for this song yet",
  "notice.lyricsNotFound.body":
    "We couldn't find lyrics for this track in any of our sources. New lyrics are added all the time, so check back later. If you know this song has lyrics, copy the details and send them to us so we can look into it.",
  "notice.dj.title": "Lyrics aren't available with the DJ",
  "notice.dj.body":
    "The DJ mixes songs and voiceovers together, so there's nothing for us to line lyrics up with. Play a song directly to see its lyrics.",
  "notice.ad.title": "An ad is playing",
  "notice.ad.body": "Lyrics come back when a song is playing.",
  "notice.unknownTrack.title": "We couldn't read this track",
  "notice.unknownTrack.body":
    "Spotify didn't tell us what's playing, so we don't know which lyrics to look up. Skipping to the next song and back usually fixes this.",
  "notice.unknownError.title": "Something went wrong",
  "notice.unknownError.body":
    "An unexpected error stopped the lyrics from loading. Try again, and if it keeps happening, copy the details and send them to us on Discord.",
  "notice.offline.title": "You're offline",
  "notice.offline.body":
    "Lyrics need an internet connection the first time you play a song. Songs you've played recently still have theirs saved. Reconnect and try again.",
  "notice.serviceUnavailable.title": "Lyrics are temporarily unavailable",
  "notice.serviceUnavailable.body":
    "Our lyrics service isn't responding right now. Nothing is wrong on your end. Give it a minute and try again.",
  "notice.rateLimited.title": "Slow down a little",
  "notice.rateLimited.body":
    "Lots of songs were requested in a short time, so we're holding off for a moment. Wait a few seconds and try again.",
  "notice.statusNot200.title": "The lyrics server ran into a problem",
  "notice.statusNot200.body":
    "Our server returned an error for this song. Try again in a moment. If it keeps happening, copy the details and send them to us on Discord.",
  "notice.videoTrack.title": "Music video lyrics aren't supported yet",
  "notice.videoTrack.body":
    "Lyrics only work on regular audio tracks for now. Switch this song to its audio version to see them.",
  "notice.episodeTrack.title": "Podcast episodes don't have lyrics",
  "notice.episodeTrack.body": "Spicy Lyrics only shows lyrics for songs. Podcast episodes aren't supported.",
  "notice.mixedTrack.title": "Video podcasts don't have lyrics",
  "notice.mixedTrack.body": "Spicy Lyrics only shows lyrics for songs. Video podcast episodes aren't supported.",
  "notice.localTrack.title": "No lyrics for local files",
  "notice.localTrack.body":
    "This song is a file on your computer, so we can't look it up online. You can add your own lyrics for it as a TTML file from the Local Lyrics DB.",
  "notice.tryAgain": "Try again",
  "notice.copyDetails": "Copy details",
  "notice.getHelp": "Get help on Discord",
  "notice.code": "Code: {code}",

  "settings.menuItem": "Spicy Lyrics Settings",
  "settings.modalTitle": "Settings",
  "settings.title": "Settings",
  "settings.sectionsAria": "Settings sections",
  "settings.searchPlaceholder": "Search settings",
  "settings.searchAria": "Search all settings",
  "settings.clearSearch": "Clear search",
  "settings.results": "Results",
  "settings.oneSetting": "1 setting",
  "settings.manySettings": "{count} settings",
  "settings.searchResultsAria": "Search results",
  "settings.peekAria": "Peek at the lyrics",
  "settings.peekTitle": "Hold to see the lyrics behind the settings",
  "settings.closeAria": "Close settings",
  "settings.noResults": "No results for “{query}”",
  "settings.noResultsHint": "Check the spelling, or try a shorter word.",
  "settings.empty": "Nothing here yet.",
  "settings.reviewerOnAria": "TTML Reviewer is on",
  "settings.updateAvailableAria": "Update available",

  "settings.sections.lyrics": "Lyrics",
  "settings.sections.background": "Background",
  "settings.sections.playback": "Playback",
  "settings.sections.interface": "Interface",
  "settings.sections.appearance": "Appearance",
  "settings.sections.experiments": "Experiments",
  "settings.sections.advanced": "Advanced",
  "settings.sections.bug": "Got a Bug?",
  "settings.sections.reviewer": "TTML Reviewer",
  "settings.sections.about": "About",

  "settings.lyrics.group.text": "Text",
  "settings.lyrics.group.style": "Style",
  "settings.lyrics.group.lines": "Lines",
  "settings.lyrics.size.label": "Lyrics Size",
  "settings.lyrics.size.desc":
    "Makes the lyrics bigger or smaller in every view, including romanization and background vocals. 100% is each view's usual size.",
  "settings.lyrics.style.label": "Renderer Visual Style",
  "settings.lyrics.style.desc":
    "Visual design of rendered lyrics. \"Spring\" is the default Spicy Lyrics renderer you know.",
  "settings.lyrics.style.spring": "Spring (Default)",
  "settings.lyrics.style.bloom": "Bloom",
  "settings.lyrics.minimal.label": "Fade Away Previous Lines",
  "settings.lyrics.minimal.desc": "Hide lines that have already been sung in Fullscreen and Cinema View.",
  "settings.lyrics.merge.label": "Join Split Words",
  "settings.lyrics.merge.desc":
    "Show a word sung in syllables as one word. Steadily Sung keeps only words with no gap and an even pace between parts; Held Words only those long enough to light up letter by letter.",
  "settings.lyrics.merge.off": "Off",
  "settings.lyrics.merge.full": "All Words",
  "settings.lyrics.merge.steady": "Steadily Sung",
  "settings.lyrics.merge.held": "Held Words",
  "settings.lyrics.pace.label": "Keep Syllable Pace",
  "settings.lyrics.pace.desc":
    "A joined word that lights up letter by letter follows each syllable's timing, slow on a long syllable and quick on a short one.",
  "settings.lyrics.pace.disabled": "Pick a Join Split Words mode to change this.",
  "settings.lyrics.romanization.label": "Romanization",
  "settings.lyrics.romanization.desc":
    "With romanization on, show it in place of the original lyrics, or as a smaller row under each line.",
  "settings.lyrics.romanization.replace": "Replace the line",
  "settings.lyrics.romanization.underLine": "Under each line",
  "settings.lyrics.hover.label": "Highlight on Hover",
  "settings.lyrics.hover.desc": "Show a soft box behind a line when you point at it.",
  "settings.lyrics.duet.label": "Duet Line Padding",
  "settings.lyrics.duet.desc": "Indent each singer's lines toward their side, so duets read as two columns.",
  "settings.lyrics.creditsFollow.label": "Credits Follow the Last Singer",
  "settings.lyrics.creditsFollow.desc":
    "When a song ends on a duet line on the right, show the songwriter and provider lines on the right too.",
  "settings.lyrics.pinnedCredits.label": "Pinned Credits",
  "settings.lyrics.pinnedCredits.desc":
    "Keep the credits at the bottom of the lyrics while they scroll. No Writers pins the lyrics source and community line, Full pins the songwriters too.",
  "settings.lyrics.pinnedCredits.off": "Off",
  "settings.lyrics.pinnedCredits.noWriters": "No Writers",
  "settings.lyrics.pinnedCredits.full": "Full",

  "settings.background.group.lyricsView": "Lyrics View",
  "settings.background.group.npv": "Now Playing Sidebar",
  "settings.background.style.label": "Background",
  "settings.background.style.desc":
    "Dynamic (Kawarp) swirls the cover art in time with the music. Artist Image uses the artist's header photo, or the cover when there isn't one. None (Transparent) leaves the page see-through, so whatever is behind it shows.",
  "settings.background.style.dynamic": "Dynamic (Kawarp)",
  "settings.background.style.artist": "Artist Image",
  "settings.background.style.cover": "Cover Art",
  "settings.background.style.color": "Cover Colors",
  "settings.background.style.none": "None (Transparent)",
  "settings.background.style.note":
    "{canvasStage} only plays over Dynamic (Kawarp), so it won't show with {style}.",
  "settings.background.style.thisBg": "this background",
  "settings.background.blur.label": "Image Blur",
  "settings.background.blur.desc": "Softens the Artist Image and Cover Art backgrounds.",
  "settings.background.blur.disabled": "Only applies to Artist Image and Cover Art.",
  "settings.background.npv.label": "Animated Background",
  "settings.background.npv.desc": "Show the Dynamic (Kawarp) background behind the Now Playing sidebar.",

  "settings.playback.group.timing": "Timing",
  "settings.playback.group.scrolling": "Scrolling",
  "settings.playback.offset.label": "Playback Offset",
  "settings.playback.offset.desc":
    "Shift the lyrics in time. Negative shows them earlier, positive later. A song's own offset adds to the one for all songs.",
  "settings.playback.offset.forSongArtist": "For “{title}” by {artist}.",
  "settings.playback.offset.forSong": "For “{title}”.",
  "settings.playback.offset.songIgnored":
    "“{title}” has {offset} ms of its own, ignored while TTML Reviewer is on.",
  "settings.playback.offset.songOwn": "“{title}” also has {offset} ms of its own.",
  "settings.playback.offset.scopeLabel": "Offset applies to",
  "settings.playback.offset.allSongs": "All songs",
  "settings.playback.offset.thisSong": "This song",
  "settings.playback.offset.thisSongSuffix": "{label}, this song",
  "settings.playback.seekFade.label": "Seek Fade-in Compensation",
  "settings.playback.seekFade.desc":
    "Clicking a line starts 300 ms before it, so Spotify's fade-in doesn't clip the first word. Best for rap and fast songs.",
  "settings.playback.smoothScroll.label": "Smooth Scrolling",
  "settings.playback.smoothScroll.desc": "Glide from line to line instead of jumping.",
  "settings.playback.smoothScroll.disabled": "Bloom scrolls the lyrics its own way.",
  "settings.playback.earlyScroll.label": "Early Scroll",
  "settings.playback.earlyScroll.desc": "Start scrolling to the next line just before it's sung.",
  "settings.playback.earlyScroll.note":
    "With Bloom, Popup Lyrics and the Now Playing card always start the scroll early, by as long as the scroll takes.",
  "settings.playback.earlyScrollMs.label": "Early Scroll Time",
  "settings.playback.earlyScrollMs.desc": "How far ahead of the line the scroll starts.",
  "settings.playback.earlyScrollMs.disabled": "Turn on Early Scroll to change this.",
  "settings.playback.staticAutoScroll.label": "Auto-scroll Unsynced Lyrics",
  "settings.playback.staticAutoScroll.desc":
    "Scroll lyrics without timing through the song. Basic skips quiet parts. Advanced follows the singing, falling back to Basic for songs Spotify has no voice data for. Either can drift on some songs.",
  "settings.playback.staticAutoScroll.off": "Off",
  "settings.playback.staticAutoScroll.basic": "Basic",
  "settings.playback.staticAutoScroll.advanced": "Advanced",
  "settings.playback.scrollToActive.label": "Scroll to active button",
  "settings.playback.scrollToActive.desc":
    "Show an arrow when the line being sung is scrolled out of view. In Cinema View and fullscreen it joins the Lyrics / Queue switch.",

  "settings.interface.group.general": "General",
  "settings.interface.group.lyricsView": "Lyrics View",
  "settings.interface.group.artwork": "Album Artwork",
  "settings.interface.group.npv": "Now Playing Sidebar",
  "settings.interface.group.windows": "Windows and Buttons",
  "settings.interface.language.label": "Language",
  "settings.interface.language.desc": "Choose the language used throughout Spicy Lyrics.",
  "settings.interface.viewControls.label": "View Controls Position",
  "settings.interface.viewControls.desc": "Where the view controls (play, scroll and so on) sit.",
  "settings.interface.viewControls.disabled": "Only available with Spotify's new navigation layout.",
  "settings.interface.viewControls.top": "Top",
  "settings.interface.viewControls.bottom": "Bottom",
  "settings.interface.timeline.label": "Timeline Outside Media Box",
  "settings.interface.timeline.desc":
    "Show the playback timeline in the NowBar header instead of inside the media box. Compact Mode and PiP keep it inside.",
  "settings.interface.releaseYear.label": "Release Year",
  "settings.interface.releaseYear.desc": "Show the song's release year in the NowBar, before or after the artists.",
  "settings.interface.releaseYear.off": "Off",
  "settings.interface.releaseYear.left": "Left",
  "settings.interface.releaseYear.right": "Right",
  "settings.interface.lockedMediaBox.label": "Lock Media Box in Compact Mode",
  "settings.interface.lockedMediaBox.desc": "Keep the media box from resizing while Forced Compact Mode is on.",
  "settings.interface.noLyricsNotice.label": "No Lyrics Notice",
  "settings.interface.noLyricsNotice.desc":
    "Explain why a song has no lyrics. Off hides it in the lyrics page, Fullscreen and Popup Lyrics, leaving just the song info. Errors still show their notice.",
  "settings.interface.queueNoLyrics.label": "Show Queue When a Song Has No Lyrics",
  "settings.interface.queueNoLyrics.desc":
    "In Fullscreen and Cinema View, open the queue in place of the lyrics. It closes again on the next song with lyrics.",
  "settings.interface.volumeSlider.label": "Volume Slider",
  "settings.interface.volumeSlider.desc":
    "Show a volume control on the artwork in Fullscreen, Cinema View and Popup Lyrics.",
  "settings.interface.motionArtwork.label": "Motion Artwork",
  "settings.interface.motionArtwork.desc":
    "Play the album's animated cover over the still one in the NowBar, for albums that have one.",
  "settings.interface.motionPriority.label": "Motion Artwork or Canvas",
  "settings.interface.motionPriority.desc":
    "Which one plays when a song has both. Motion Artwork plays on the cover, or on the stage if it's allowed there below.",
  "settings.interface.motionPriority.motion": "Motion",
  "settings.interface.motionPriority.canvas": "Canvas",
  "settings.interface.motionOnStage.label": "Motion Artwork on Canvas Stage",
  "settings.interface.motionOnStage.desc":
    "Let motion artwork fill the Canvas Stage, cropped to fit since it's square. Off keeps it on the cover in the NowBar.",
  "settings.interface.stageDisabled.noMotion": "Turn on Motion Artwork to change this.",
  "settings.interface.stageDisabled.noStage": "Only applies with {stageLabel} on, in Experiments.",
  "settings.interface.npvCard.label": "Lyrics Card",
  "settings.interface.npvCard.desc": "Show lyrics in the Now Playing sidebar.",
  "settings.interface.hideNpvUnavailable.label": "Hide When a Song Has No Lyrics",
  "settings.interface.hideNpvUnavailable.desc":
    "Remove the card instead of showing a notice. It comes back on the next song with lyrics.",
  "settings.interface.hideNpvUnavailable.disabled": "Turn on Lyrics Card to change this.",
  "settings.interface.popupLyrics.label": "Popup Lyrics",
  "settings.interface.popupLyrics.desc": "Let lyrics open in a floating window.",
  "settings.interface.removeSpotifyBtn.label": "Hide Spotify's Lyrics Button",
  "settings.interface.removeSpotifyBtn.desc":
    "Remove Spotify's own lyrics button from the playback bar. The Spicy Lyrics button stays.",

  "settings.appearance.group.text": "Text",
  "settings.appearance.group.performance": "Performance",
  "settings.appearance.systemFont.label": "Use System Font",
  "settings.appearance.systemFont.desc": "Use your system font instead of the Spicy Lyrics font.",
  "settings.appearance.fpsCapEnabled.label": "Limit Frame Rate",
  "settings.appearance.fpsCapEnabled.desc":
    "Redraw the lyrics, background and scroll less often to save CPU, especially on high refresh rate displays.",
  "settings.appearance.fpsCap.label": "Frame Rate",
  "settings.appearance.fpsCap.desc": "Frames per second while the limit is on.",
  "settings.appearance.fpsCap.disabled": "Turn on Limit Frame Rate to change this.",

  "settings.experiments.intro":
    "Features still being shaped. Turn one off if you prefer how things worked before.",
  "settings.experiments.empty": "No experiments right now.",
  "settings.experiments.checking": "Checking for changes",
  "settings.experiments.forcedTitle": "Set by Spicy Lyrics, so it can't be changed here.",
  "settings.experiments.forcedOn": "Forced on",
  "settings.experiments.forcedOff": "Forced off",
  "settings.experiments.canvasConflict":
    "Not showing: Background is set to {style}. Switch it to Dynamic (Kawarp) to use this.",
  "settings.experiments.cat.lyrics": "Lyrics",
  "settings.experiments.cat.background": "Background",
  "settings.experiments.cat.player": "Player",

  "settings.advanced.group.cache": "Lyrics Cache",
  "settings.advanced.group.developer": "Developer",
  "settings.advanced.clearSong.label": "Clear This Song's Cache",
  "settings.advanced.clearSong.desc": "Remove everything cached for the song that's playing now.",
  "settings.advanced.clearAll.label": "Clear Stored Lyrics",
  "settings.advanced.clearAll.desc": "Delete all saved lyrics. They are normally kept for up to 3 days.",
  "settings.advanced.resetSong.label": "Reset This Song's Lyrics",
  "settings.advanced.resetSong.desc": "Drop the playing song's lyrics from memory only, so they load again.",
  "settings.advanced.devMode.label": "Developer Mode",
  "settings.advanced.devMode.desc": "Extra logging and debug tools.",

  "settings.bug.intro":
    "Copy your setup and post it in #extension-bugs on our Discord, with what went wrong. It tells us what we'd otherwise have to ask.",
  "settings.bug.outdated": "You're on {current}, and {latest} is out. Update first: it may already be fixed.",
  "settings.bug.copyAndOpen": "Copy & open Discord",
  "settings.bug.copyOnly": "Copy only",
  "settings.bug.privacy": "No account details, user IDs or tokens are included.",
  "settings.bug.notInServer": "Not in the server yet?",
  "settings.bug.joinHere": "Join here",
  "settings.bug.whatCopied": "What gets copied",
  "settings.bug.rowLabel": "Copy Bug Report",
  "settings.bug.rowDesc": "Copies your setup to paste in #extension-bugs on our Discord.",

  "settings.reviewer.modeLabel": "TTML Reviewer Mode",
  "settings.reviewer.modeDesc":
    "Saves your settings and strips Spicy Lyrics back to basics. Turn it off to get them back exactly as they were.",
  "settings.reviewer.intro":
    "Review a sync as it really is, without your setup getting in the way. Everyone in this mode gets the same timing and lyric effects.",
  "settings.reviewer.lockReason": "Locked while TTML Reviewer is on.",
  "settings.reviewer.otherExt":
    "{names} still {verb} your lyrics. Turn {pronoun} off to review.",
  "settings.reviewer.verbSingle": "changes",
  "settings.reviewer.verbPlural": "change",
  "settings.reviewer.pronounSingle": "it",
  "settings.reviewer.pronounPlural": "them",
  "settings.reviewer.whatSets": "What it sets",
  "settings.reviewer.perSongOffsets": "Per-song Offsets",
  "settings.reviewer.ignored": "Ignored",
  "settings.reviewer.otherExperiments": "Other experiments",
  "settings.reviewer.saveFailed": "Couldn't save your settings, so TTML Reviewer stayed off.",

  "settings.about.version": "Version {version}",
  "settings.about.upToDate": "Up to date",
  "settings.about.updateAvailable": "Update available",
  "settings.about.build": "Build",
  "settings.about.website": "Website",

  "cache.noSongId": "The current song id could not be retrieved",
  "cache.songCleared": "Lyrics for the current song have been removed from all available caches",
  "cache.songClearError":
    "Lyrics for the current song couldn't be removed from all available caches. Check the console for more info.",
  "cache.allCleared": "The Lyrics Cache has been destroyed successfully",
  "cache.allClearError": "The Lyrics cache couldn't be removed. Check the console for more info.",
  "cache.stateCleared": "Lyrics for the current song have been removed from the internal state successfully",
  "cache.stateClearError":
    "Lyrics for the current song couldn't be removed from the internal state. Check the console for more info.",

  "updates.stayingOn": "Staying on {version}",
  "updates.stayingGeneric": "Staying on this version",
  "updates.stayingDesc": "Some lyrics sources and features need the latest version. Updating reloads Spotify.",
  "updates.out": "Spicy Lyrics {version} is out",
  "updates.outGeneric": "A Spicy Lyrics update is out",
  "updates.onVersion": "You're on {version}.",
  "updates.modalTitle": "Version {version} is out",
  "updates.modalTitleGeneric": "An update is out",
  "updates.modalBody": "Updating reloads Spotify, which takes a few seconds.",
  "updates.seeChangedPrefix": "See what changed in the ",
  "updates.releaseNotes": "release notes",
  "updates.updateAndReload": "Update and reload",
  "updates.notNow": "Not now",

  "updatedDialog.title": "Updated to {version}",
  "updatedDialog.bodyPrefix": "You were on ",
  "updatedDialog.bodySuffix": ". The release notes list everything that changed.",
  "updatedDialog.brokenPrefix": "Something broke after the update? Tell us on ",
  "updatedDialog.readNotes": "Read release notes",

  "migration.requiredTitle": "Settings Migration Required",
  "migration.requiredDesc":
    "Spicy Lyrics has updated its storage format. Your existing settings need to be migrated before you can continue. This only happens once.",
  "migration.button": "Migrate Settings",
  "migration.completeTitle": "Migration Complete",
  "migration.completeDesc": "Your settings have been migrated successfully. Reloading Spotify...",

  "ldb.title": "Local Lyrics DB",
  "ldb.uploadTitle": "Upload TTML",
  "ldb.searchPlaceholder": "Search saved lyrics…",
  "ldb.searchFallback": "Search…",
  "ldb.clearSearch": "Clear search",
  "ldb.resetTtml": "Reset TTML",
  "ldb.resetTtmlTitle": "Clear loaded TTML for the currently playing song",
  "ldb.uploadTtml": "Upload TTML",
  "ldb.noMatches": "No matching entries",
  "ldb.empty": "No lyrics saved yet",
  "ldb.downloadError": "Could not retrieve TTML for this track.",
  "ldb.removed": "Removed from Local DB.",
  "ldb.removeError": "Failed to remove entry.",
  "ldb.noTrack": "No track is currently playing.",
  "ldb.resetDone": "TTML has been reset.",
  "ldb.applyError": "Error applying lyrics",
  "ldb.currentlyPlaying": "Currently playing",
  "ldb.play": "Play",
  "ldb.download": "Download TTML",
  "ldb.confirmDelete": "Confirm delete",
  "ldb.delete": "Delete",
  "ldb.confirm": "Confirm",

  "upload.save": "Save",
  "upload.saveHint": "Store in the local DB — survives restarts",
  "upload.justOnce": "Just once",
  "upload.justOnceHint": "Apply to the current song only, until refresh",
  "upload.unknownSong": "Unknown Song",
  "upload.onlyTtml": "Only .ttml files are supported.",
  "upload.readError": "Error reading TTML file.",
  "upload.saved": "TTML saved to Local DB!",
  "upload.parseError": "Failed to parse TTML.",
  "upload.applied": "Lyrics Parsed and Applied!",
  "upload.failed": "Upload failed.",
  "upload.backTitle": "Back to Local Lyrics DB",
  "upload.backAria": "Back",
  "upload.modeAria": "Upload mode",
  "upload.uploading": "Uploading…",
  "upload.dropToUpload": "Drop to upload",
  "upload.dropOrClick": "Drop a .ttml file or click to browse",
  "upload.savesFor": "Saves to Local DB for",
  "upload.appliesFor": "Applies once to",
} as const;

export type TranslationKey = keyof typeof EN;

const IT: Record<TranslationKey, string> = {
  "common.close": "Chiudi",
  "common.reset": "Ripristina",
  "common.clear": "Cancella",
  "common.copy": "Copia",
  "common.copied": "Copiato",
  "common.copyFailed": "Impossibile copiare",
  "common.update": "Aggiorna",
  "common.details": "Dettagli",
  "common.tryAgain": "Riprova",
  "common.off": "Disattivato",
  "common.on": "Attivo",
  "common.default": "Predefinito",

  "playbar.lyrics": "Spicy Lyrics",
  "playbar.fullscreen": "Schermo intero",
  "playbar.popup": "Testi in finestra",

  "controls.closePage": "Chiudi pagina",
  "controls.disableCompact": "Disattiva modalità compatta",
  "controls.enableCompact": "Attiva modalità compatta",
  "controls.disableRomanization": "Disattiva romanizzazione",
  "controls.enableRomanization": "Attiva romanizzazione",
  "controls.nowBar": "NowBar",
  "controls.fullscreen": "Schermo intero",
  "controls.cinemaView": "Vista Cinema",
  "controls.swapSide": "Scambia lato NowBar",
  "controls.settings": "Impostazioni Spicy Lyrics",
  "controls.lyricsManager": "Gestore testi",

  "scrollToActive.default": "Scorri alla riga attuale",
  "scrollToActive.above": "Scorri su alla riga attuale",
  "scrollToActive.below": "Scorri giù alla riga attuale",

  "npv.title": "Testi",
  "npv.hide": "Nascondi testi",
  "npv.show": "Mostra testi",
  "npv.exitExpanded": "Esci da espanso",
  "npv.expand": "Espandi testi",
  "npv.open": "Apri Spicy Lyrics",

  "nextUp.label": "Prossimo brano",

  "queue.title": "Prossimi brani",
  "queue.inQueue": "In coda",
  "queue.autoplay": "Riproduzione automatica",
  "queue.nextFrom": "Prossimi da {context}",
  "queue.nextUp": "Prossimi brani",
  "queue.moreSong": "Altro {count} brano dopo questi",
  "queue.moreSongs": "Altri {count} brani dopo questi",
  "queue.clear": "Svuota",
  "queue.clearConfirm": "Svuotare la coda?",
  "queue.emptyTitle": "Nessun brano in arrivo",
  "queue.emptyBody": "I brani che aggiungi alla coda appariranno qui.",
  "queue.errorTitle": "Impossibile caricare la coda",
  "queue.errorBody": "Spotify non ha risposto. Riprova tra un momento.",
  "queue.playBy": "Riproduci {name} di {artists}",
  "queue.play": "Riproduci {name}",
  "queue.explicit": "Esplicito",
  "queue.removeFromQueue": "Rimuovi {name} dalla coda",
  "queue.thisSong": "questo brano",
  "queue.removeLiked": "Rimuovi {name} dai brani che ti piacciono",
  "queue.saveLiked": "Salva {name} nei brani che ti piacciono",
  "queue.songFallback": "Brano",
  "queue.movedTo": "{name} spostato alla posizione {position} di {count}",
  "queue.switchLabel": "Mostra",
  "queue.switchLyrics": "Testi",
  "queue.switchQueue": "Coda",

  "skeleton.loading": "Caricamento testi",

  "credits.writtenBy": "Scritto da",
  "credits.providedBy": "Fornito da",
  "credits.unknown": "Sconosciuto",
  "credits.via": "via ",
  "credits.communityNote": "Questo testo è stato fornito dalla nostra community",
  "credits.communityLead": "Testi della community",
  "credits.viewProfile": "Visualizza profilo TTML",
  "credits.madeBy": "Creato da",
  "credits.uploadedBy": "Caricato da",

  "notice.lyricsNotFound.title": "Nessun testo disponibile per questo brano",
  "notice.lyricsNotFound.body":
    "Non siamo riusciti a trovare il testo di questo brano in nessuna delle nostre fonti. Nuovi testi vengono aggiunti continuamente, quindi riprova più tardi. Se sai che questo brano ha un testo, copia i dettagli e inviaceli così possiamo verificare.",
  "notice.dj.title": "I testi non sono disponibili con il DJ",
  "notice.dj.body":
    "Il DJ mescola brani e interventi vocali, quindi non è possibile sincronizzare i testi. Riproduci un brano direttamente per vederne il testo.",
  "notice.ad.title": "È in riproduzione un annuncio",
  "notice.ad.body": "I testi torneranno appena riprenderà un brano.",
  "notice.unknownTrack.title": "Impossibile leggere questo brano",
  "notice.unknownTrack.body":
    "Spotify non ha comunicato cosa è in riproduzione, quindi non sappiamo quale testo cercare. Passare al brano successivo e tornare indietro di solito risolve il problema.",
  "notice.unknownError.title": "Qualcosa è andato storto",
  "notice.unknownError.body":
    "Un errore imprevisto ha impedito il caricamento dei testi. Riprova e, se il problema persiste, copia i dettagli e inviaceli su Discord.",
  "notice.offline.title": "Sei offline",
  "notice.offline.body":
    "I testi richiedono una connessione Internet la prima volta che riproduci un brano. I brani ascoltati di recente hanno ancora il testo salvato. Riconnettiti e riprova.",
  "notice.serviceUnavailable.title": "Testi temporaneamente non disponibili",
  "notice.serviceUnavailable.body":
    "Il nostro servizio testi non risponde al momento. Non dipende da te. Attendi un minuto e riprova.",
  "notice.rateLimited.title": "Rallenta un po'",
  "notice.rateLimited.body":
    "Sono stati richiesti troppi brani in poco tempo, quindi stiamo attendendo un momento. Aspetta qualche secondo e riprova.",
  "notice.statusNot200.title": "Il server dei testi ha riscontrato un problema",
  "notice.statusNot200.body":
    "Il nostro server ha restituito un errore per questo brano. Riprova tra poco. Se continua, copia i dettagli e inviaceli su Discord.",
  "notice.videoTrack.title": "I testi dei video musicali non sono ancora supportati",
  "notice.videoTrack.body":
    "Per ora i testi funzionano solo con le tracce audio normali. Passa alla versione audio di questo brano per vederli.",
  "notice.episodeTrack.title": "Gli episodi podcast non hanno testi",
  "notice.episodeTrack.body": "Spicy Lyrics mostra solo i testi dei brani. Gli episodi podcast non sono supportati.",
  "notice.mixedTrack.title": "I video podcast non hanno testi",
  "notice.mixedTrack.body": "Spicy Lyrics mostra solo i testi dei brani. I video podcast non sono supportati.",
  "notice.localTrack.title": "Nessun testo per i file locali",
  "notice.localTrack.body":
    "Questo brano è un file sul tuo computer, quindi non possiamo cercarlo online. Puoi aggiungere il tuo testo come file TTML dal DB testi locali.",
  "notice.tryAgain": "Riprova",
  "notice.copyDetails": "Copia dettagli",
  "notice.getHelp": "Chiedi aiuto su Discord",
  "notice.code": "Codice: {code}",

  "settings.menuItem": "Impostazioni Spicy Lyrics",
  "settings.modalTitle": "Impostazioni",
  "settings.title": "Impostazioni",
  "settings.sectionsAria": "Sezioni delle impostazioni",
  "settings.searchPlaceholder": "Cerca impostazioni",
  "settings.searchAria": "Cerca in tutte le impostazioni",
  "settings.clearSearch": "Cancella ricerca",
  "settings.results": "Risultati",
  "settings.oneSetting": "1 impostazione",
  "settings.manySettings": "{count} impostazioni",
  "settings.searchResultsAria": "Risultati della ricerca",
  "settings.peekAria": "Dai un'occhiata ai testi",
  "settings.peekTitle": "Tieni premuto per vedere i testi dietro le impostazioni",
  "settings.closeAria": "Chiudi impostazioni",
  "settings.noResults": "Nessun risultato per “{query}”",
  "settings.noResultsHint": "Controlla l'ortografia o prova con una parola più corta.",
  "settings.empty": "Ancora nulla qui.",
  "settings.reviewerOnAria": "Modalità Revisore TTML attiva",
  "settings.updateAvailableAria": "Aggiornamento disponibile",

  "settings.sections.lyrics": "Testi",
  "settings.sections.background": "Sfondo",
  "settings.sections.playback": "Riproduzione",
  "settings.sections.interface": "Interfaccia",
  "settings.sections.appearance": "Aspetto",
  "settings.sections.experiments": "Sperimentali",
  "settings.sections.advanced": "Avanzate",
  "settings.sections.bug": "Hai trovato un bug?",
  "settings.sections.reviewer": "Revisore TTML",
  "settings.sections.about": "Info",

  "settings.lyrics.group.text": "Testo",
  "settings.lyrics.group.style": "Stile",
  "settings.lyrics.group.lines": "Righe",
  "settings.lyrics.size.label": "Dimensione testi",
  "settings.lyrics.size.desc":
    "Rende i testi più grandi o più piccoli in ogni vista, incluse romanizzazione e seconde voci. 100% è la dimensione predefinita di ciascuna vista.",
  "settings.lyrics.style.label": "Stile visivo del renderer",
  "settings.lyrics.style.desc":
    "Aspetto visivo dei testi renderizzati. \"Spring\" è il renderer predefinito di Spicy Lyrics.",
  "settings.lyrics.style.spring": "Spring (Predefinito)",
  "settings.lyrics.style.bloom": "Bloom",
  "settings.lyrics.minimal.label": "Dissolvi righe precedenti",
  "settings.lyrics.minimal.desc": "Nasconde le righe già cantate in Schermo intero e Vista Cinema.",
  "settings.lyrics.merge.label": "Unisci parole divise",
  "settings.lyrics.merge.desc":
    "Mostra come una sola parola quelle cantate a sillabe. Ritmo costante unisce solo le parole senza pause e con ritmo uniforme; Parole tenute solo quelle abbastanza lunghe da illuminarsi lettera per lettera.",
  "settings.lyrics.merge.off": "Disattivato",
  "settings.lyrics.merge.full": "Tutte le parole",
  "settings.lyrics.merge.steady": "Ritmo costante",
  "settings.lyrics.merge.held": "Parole tenute",
  "settings.lyrics.pace.label": "Mantieni ritmo delle sillabe",
  "settings.lyrics.pace.desc":
    "Una parola unita che si illumina lettera per lettera segue la durata di ciascuna sillaba, lenta su una sillaba lunga e rapida su una breve.",
  "settings.lyrics.pace.disabled": "Scegli una modalità di Unisci parole divise per modificare questa opzione.",
  "settings.lyrics.romanization.label": "Romanizzazione",
  "settings.lyrics.romanization.desc":
    "Con la romanizzazione attiva, mostrala al posto del testo originale oppure come riga più piccola sotto ciascuna riga.",
  "settings.lyrics.romanization.replace": "Sostituisci la riga",
  "settings.lyrics.romanization.underLine": "Sotto ogni riga",
  "settings.lyrics.hover.label": "Evidenzia al passaggio",
  "settings.lyrics.hover.desc": "Mostra un riquadro morbido dietro una riga quando ci passi sopra con il puntatore.",
  "settings.lyrics.duet.label": "Allineamento duetti",
  "settings.lyrics.duet.desc": "Rientra le righe di ciascun cantante verso il proprio lato, così i duetti si leggono come due colonne.",
  "settings.lyrics.creditsFollow.label": "I crediti seguono l'ultimo cantante",
  "settings.lyrics.creditsFollow.desc":
    "Quando un brano termina con una riga di duetto a destra, mostra a destra anche autori e fonte.",
  "settings.lyrics.pinnedCredits.label": "Crediti fissati",
  "settings.lyrics.pinnedCredits.desc":
    "Mantiene i crediti in fondo ai testi durante lo scorrimento. Senza autori fissa la fonte e la riga della community; Completo fissa anche gli autori.",
  "settings.lyrics.pinnedCredits.off": "Disattivato",
  "settings.lyrics.pinnedCredits.noWriters": "Senza autori",
  "settings.lyrics.pinnedCredits.full": "Completo",

  "settings.background.group.lyricsView": "Vista testi",
  "settings.background.group.npv": "Barra In riproduzione",
  "settings.background.style.label": "Sfondo",
  "settings.background.style.desc":
    "Dinamico (Kawarp) anima i colori della copertina a tempo con la musica. Immagine artista usa la foto intestazione dell'artista, o la copertina se assente. Nessuno (Trasparente) lascia la pagina trasparente mostrando ciò che c'è dietro.",
  "settings.background.style.dynamic": "Dinamico (Kawarp)",
  "settings.background.style.artist": "Immagine artista",
  "settings.background.style.cover": "Copertina album",
  "settings.background.style.color": "Colori copertina",
  "settings.background.style.none": "Nessuno (Trasparente)",
  "settings.background.style.note":
    "{canvasStage} funziona solo con Dinamico (Kawarp), quindi non apparirà con {style}.",
  "settings.background.style.thisBg": "questo sfondo",
  "settings.background.blur.label": "Sfocatura immagine",
  "settings.background.blur.desc": "Ammorbidisce gli sfondi Immagine artista e Copertina album.",
  "settings.background.blur.disabled": "Si applica solo a Immagine artista e Copertina album.",
  "settings.background.npv.label": "Sfondo animato",
  "settings.background.npv.desc": "Mostra lo sfondo Dinamico (Kawarp) dietro la barra laterale In riproduzione.",

  "settings.playback.group.timing": "Sincronizzazione",
  "settings.playback.group.scrolling": "Scorrimento",
  "settings.playback.offset.label": "Offset riproduzione",
  "settings.playback.offset.desc":
    "Anticipa o ritarda i testi. Valori negativi li mostrano prima, positivi dopo. L'offset di un singolo brano si somma a quello globale.",
  "settings.playback.offset.forSongArtist": "Per “{title}” di {artist}.",
  "settings.playback.offset.forSong": "Per “{title}”.",
  "settings.playback.offset.songIgnored":
    "“{title}” ha un offset proprio di {offset} ms, ignorato mentre Revisore TTML è attivo.",
  "settings.playback.offset.songOwn": "“{title}” ha anche un offset proprio di {offset} ms.",
  "settings.playback.offset.scopeLabel": "L'offset si applica a",
  "settings.playback.offset.allSongs": "Tutti i brani",
  "settings.playback.offset.thisSong": "Questo brano",
  "settings.playback.offset.thisSongSuffix": "{label}, questo brano",
  "settings.playback.seekFade.label": "Compensazione fade-in al salto",
  "settings.playback.seekFade.desc":
    "Cliccando su una riga parte 300 ms prima, così la dissolvenza iniziale di Spotify non taglia la prima parola. Ideale per rap e brani veloci.",
  "settings.playback.smoothScroll.label": "Scorrimento fluido",
  "settings.playback.smoothScroll.desc": "Scorre dolcemente da una riga all'altra invece di saltare.",
  "settings.playback.smoothScroll.disabled": "Bloom gestisce lo scorrimento dei testi in autonomia.",
  "settings.playback.earlyScroll.label": "Scorrimento anticipato",
  "settings.playback.earlyScroll.desc": "Inizia a scorrere verso la riga successiva appena prima che venga cantata.",
  "settings.playback.earlyScroll.note":
    "Con Bloom, Testi in finestra e la scheda In riproduzione anticipano sempre lo scorrimento della durata stessa dell'animazione.",
  "settings.playback.earlyScrollMs.label": "Anticipo scorrimento",
  "settings.playback.earlyScrollMs.desc": "Quanto prima della riga inizia lo scorrimento.",
  "settings.playback.earlyScrollMs.disabled": "Attiva Scorrimento anticipato per modificare questo valore.",
  "settings.playback.staticAutoScroll.label": "Scorrimento automatico testi non sincronizzati",
  "settings.playback.staticAutoScroll.desc":
    "Scorre i testi senza sincronizzazione durante il brano. Base salta le parti silenziose. Avanzato segue il canto, ripiegando su Base se Spotify non ha dati vocali. Entrambi possono disallinearsi su alcuni brani.",
  "settings.playback.staticAutoScroll.off": "Disattivato",
  "settings.playback.staticAutoScroll.basic": "Base",
  "settings.playback.staticAutoScroll.advanced": "Avanzato",
  "settings.playback.scrollToActive.label": "Pulsante torna alla riga attuale",
  "settings.playback.scrollToActive.desc":
    "Mostra una freccia quando la riga cantata è fuori dallo schermo. In Vista Cinema e Schermo intero si unisce al selettore Testi / Coda.",

  "settings.interface.group.general": "Generale",
  "settings.interface.group.lyricsView": "Vista testi",
  "settings.interface.group.artwork": "Copertina album",
  "settings.interface.group.npv": "Barra In riproduzione",
  "settings.interface.group.windows": "Finestre e pulsanti",
  "settings.interface.language.label": "Lingua",
  "settings.interface.language.desc": "Scegli la lingua dell'interfaccia di Spicy Lyrics.",
  "settings.interface.viewControls.label": "Posizione controlli vista",
  "settings.interface.viewControls.desc": "Dove appaiono i controlli della vista (riproduci, scorri, ecc.).",
  "settings.interface.viewControls.disabled": "Disponibile solo con il nuovo layout di navigazione di Spotify.",
  "settings.interface.viewControls.top": "In alto",
  "settings.interface.viewControls.bottom": "In basso",
  "settings.interface.timeline.label": "Barra avanzamento fuori dal riquadro",
  "settings.interface.timeline.desc":
    "Mostra la barra di avanzamento nell'intestazione della NowBar invece che dentro il riquadro multimediale. Modalità compatta e PiP la mantengono dentro.",
  "settings.interface.releaseYear.label": "Anno di uscita",
  "settings.interface.releaseYear.desc": "Mostra l'anno di uscita del brano nella NowBar, prima o dopo gli artisti.",
  "settings.interface.releaseYear.off": "Disattivato",
  "settings.interface.releaseYear.left": "A sinistra",
  "settings.interface.releaseYear.right": "A destra",
  "settings.interface.lockedMediaBox.label": "Blocca riquadro in modalità compatta",
  "settings.interface.lockedMediaBox.desc": "Impedisce al riquadro multimediale di ridimensionarsi mentre la modalità compatta forzata è attiva.",
  "settings.interface.noLyricsNotice.label": "Avviso assenza testi",
  "settings.interface.noLyricsNotice.desc":
    "Spiega perché un brano non ha testo. Disattivato lo nasconde nella pagina testi, in Schermo intero e in Testi in finestra, lasciando solo le info del brano. Gli errori restano visibili.",
  "settings.interface.queueNoLyrics.label": "Mostra coda quando mancano i testi",
  "settings.interface.queueNoLyrics.desc":
    "In Schermo intero e Vista Cinema apre la coda al posto dei testi, richiudendola al brano successivo con testo.",
  "settings.interface.volumeSlider.label": "Controllo volume",
  "settings.interface.volumeSlider.desc":
    "Mostra il cursore del volume sulla copertina in Schermo intero, Vista Cinema e Testi in finestra.",
  "settings.interface.motionArtwork.label": "Copertina animata",
  "settings.interface.motionArtwork.desc":
    "Riproduce la copertina animata dell'album sopra quella statica nella NowBar, per gli album supportati.",
  "settings.interface.motionPriority.label": "Copertina animata o Canvas",
  "settings.interface.motionPriority.desc":
    "Quale riprodurre quando un brano ha entrambi. La copertina animata appare sulla copertina o sul palco se abilitato qui sotto.",
  "settings.interface.motionPriority.motion": "Animata",
  "settings.interface.motionPriority.canvas": "Canvas",
  "settings.interface.motionOnStage.label": "Copertina animata su Palco Canvas",
  "settings.interface.motionOnStage.desc":
    "Permette alla copertina animata di riempire il Palco Canvas, ritagliata poiché è quadrata. Disattivato la mantiene sulla copertina nella NowBar.",
  "settings.interface.stageDisabled.noMotion": "Attiva Copertina animata per modificare questa opzione.",
  "settings.interface.stageDisabled.noStage": "Si applica solo con {stageLabel} attivo in Sperimentali.",
  "settings.interface.npvCard.label": "Scheda testi",
  "settings.interface.npvCard.desc": "Mostra i testi nella barra laterale In riproduzione.",
  "settings.interface.hideNpvUnavailable.label": "Nascondi se il brano non ha testi",
  "settings.interface.hideNpvUnavailable.desc":
    "Rimuove la scheda invece di mostrare un avviso. Riappare al brano successivo con testo.",
  "settings.interface.hideNpvUnavailable.disabled": "Attiva Scheda testi per modificare questa opzione.",
  "settings.interface.popupLyrics.label": "Testi in finestra",
  "settings.interface.popupLyrics.desc": "Permette di aprire i testi in una finestra mobile.",
  "settings.interface.removeSpotifyBtn.label": "Nascondi pulsante testi di Spotify",
  "settings.interface.removeSpotifyBtn.desc":
    "Rimuove il pulsante testi nativo di Spotify dalla barra di riproduzione. Il pulsante di Spicy Lyrics rimane.",

  "settings.appearance.group.text": "Testo",
  "settings.appearance.group.performance": "Prestazioni",
  "settings.appearance.systemFont.label": "Usa carattere di sistema",
  "settings.appearance.systemFont.desc": "Usa il carattere di sistema invece del carattere di Spicy Lyrics.",
  "settings.appearance.fpsCapEnabled.label": "Limita frame rate",
  "settings.appearance.fpsCapEnabled.desc":
    "Ridisegna testi, sfondo e scorrimento meno spesso per risparmiare CPU, soprattutto su schermi ad alta frequenza.",
  "settings.appearance.fpsCap.label": "Frame rate",
  "settings.appearance.fpsCap.desc": "Fotogrammi al secondo mentre il limite è attivo.",
  "settings.appearance.fpsCap.disabled": "Attiva Limita frame rate per modificare questo valore.",

  "settings.experiments.intro":
    "Funzioni ancora in fase di rifinitura. Disattiva quelle per cui preferisci il comportamento precedente.",
  "settings.experiments.empty": "Nessuna funzione sperimentale al momento.",
  "settings.experiments.checking": "Verifica aggiornamenti",
  "settings.experiments.forcedTitle": "Impostato da Spicy Lyrics, non modificabile qui.",
  "settings.experiments.forcedOn": "Forzato attivo",
  "settings.experiments.forcedOff": "Forzato disattivo",
  "settings.experiments.canvasConflict":
    "Non visibile: lo sfondo è impostato su {style}. Passa a Dinamico (Kawarp) per usare questa funzione.",
  "settings.experiments.cat.lyrics": "Testi",
  "settings.experiments.cat.background": "Sfondo",
  "settings.experiments.cat.player": "Lettore",

  "settings.advanced.group.cache": "Cache testi",
  "settings.advanced.group.developer": "Sviluppatore",
  "settings.advanced.clearSong.label": "Svuota cache di questo brano",
  "settings.advanced.clearSong.desc": "Rimuove tutti i dati in cache per il brano attualmente in riproduzione.",
  "settings.advanced.clearAll.label": "Cancella testi salvati",
  "settings.advanced.clearAll.desc": "Elimina tutti i testi salvati. Di norma vengono conservati fino a 3 giorni.",
  "settings.advanced.resetSong.label": "Reimposta testi di questo brano",
  "settings.advanced.resetSong.desc": "Rimuove dalla memoria il testo del brano attuale per ricaricarlo.",
  "settings.advanced.devMode.label": "Modalità sviluppatore",
  "settings.advanced.devMode.desc": "Log aggiuntivi e strumenti di debug.",

  "settings.bug.intro":
    "Copia la tua configurazione e pubblicala in #extension-bugs sul nostro Discord descrivendo il problema. Ci fornisce subito le informazioni necessarie.",
  "settings.bug.outdated": "Stai usando la {current}, ma è uscita la {latest}. Aggiorna prima: il problema potrebbe essere già risolto.",
  "settings.bug.copyAndOpen": "Copia e apri Discord",
  "settings.bug.copyOnly": "Copia soltanto",
  "settings.bug.privacy": "Non vengono inclusi dettagli dell'account, ID utente o token.",
  "settings.bug.notInServer": "Non sei ancora nel server?",
  "settings.bug.joinHere": "Unisciti qui",
  "settings.bug.whatCopied": "Cosa viene copiato",
  "settings.bug.rowLabel": "Copia segnalazione bug",
  "settings.bug.rowDesc": "Copia la configurazione da incollare in #extension-bugs su Discord.",

  "settings.reviewer.modeLabel": "Modalità Revisore TTML",
  "settings.reviewer.modeDesc":
    "Salva le tue impostazioni e riporta Spicy Lyrics alle basi. Disattivala per ripristinare tutto esattamente com'era.",
  "settings.reviewer.intro":
    "Valuta una sincronizzazione com'è realmente, senza che le tue impostazioni interferiscano. In questa modalità tutti vedono le stesse tempistiche e gli stessi effetti.",
  "settings.reviewer.lockReason": "Bloccato mentre Revisore TTML è attivo.",
  "settings.reviewer.otherExt":
    "{names} {verb} ancora i tuoi testi. Disattiva{pronoun} per effettuare la revisione.",
  "settings.reviewer.verbSingle": "modifica",
  "settings.reviewer.verbPlural": "modificano",
  "settings.reviewer.pronounSingle": "lo",
  "settings.reviewer.pronounPlural": "li",
  "settings.reviewer.whatSets": "Cosa imposta",
  "settings.reviewer.perSongOffsets": "Offset per singolo brano",
  "settings.reviewer.ignored": "Ignorato",
  "settings.reviewer.otherExperiments": "Altri esperimenti",
  "settings.reviewer.saveFailed": "Impossibile salvare le impostazioni, quindi Revisore TTML è rimasto disattivo.",

  "settings.about.version": "Versione {version}",
  "settings.about.upToDate": "Aggiornato",
  "settings.about.updateAvailable": "Aggiornamento disponibile",
  "settings.about.build": "Build",
  "settings.about.website": "Sito web",

  "cache.noSongId": "Impossibile recuperare l'ID del brano attuale",
  "cache.songCleared": "I testi del brano attuale sono stati rimossi da tutte le cache disponibili",
  "cache.songClearError":
    "Impossibile rimuovere i testi del brano attuale dalle cache. Controlla la console per maggiori informazioni.",
  "cache.allCleared": "Cache dei testi eliminata con successo",
  "cache.allClearError": "Impossibile rimuovere la cache dei testi. Controlla la console per maggiori informazioni.",
  "cache.stateCleared": "I testi del brano attuale sono stati rimossi dallo stato interno con successo",
  "cache.stateClearError":
    "Impossibile rimuovere i testi del brano attuale dallo stato interno. Controlla la console per maggiori informazioni.",

  "updates.stayingOn": "Rimani su {version}",
  "updates.stayingGeneric": "Rimani su questa versione",
  "updates.stayingDesc": "Alcune fonti e funzioni richiedono l'ultima versione. L'aggiornamento riavvia Spotify.",
  "updates.out": "È uscito Spicy Lyrics {version}",
  "updates.outGeneric": "È disponibile un aggiornamento di Spicy Lyrics",
  "updates.onVersion": "Stai usando la {version}.",
  "updates.modalTitle": "È uscita la versione {version}",
  "updates.modalTitleGeneric": "È disponibile un aggiornamento",
  "updates.modalBody": "L'aggiornamento riavvierà Spotify e richiederà pochi secondi.",
  "updates.seeChangedPrefix": "Scopri cosa è cambiato nelle ",
  "updates.releaseNotes": "note di rilascio",
  "updates.updateAndReload": "Aggiorna e riavvia",
  "updates.notNow": "Non ora",

  "updatedDialog.title": "Aggiornato alla {version}",
  "updatedDialog.bodyPrefix": "Eri sulla ",
  "updatedDialog.bodySuffix": ". Le note di rilascio elencano tutte le novità.",
  "updatedDialog.brokenPrefix": "Qualcosa non funziona dopo l'aggiornamento? Segnalalo su ",
  "updatedDialog.readNotes": "Leggi note di rilascio",

  "migration.requiredTitle": "Migrazione impostazioni richiesta",
  "migration.requiredDesc":
    "Spicy Lyrics ha aggiornato il formato di salvataggio. Le tue impostazioni esistenti devono essere migrate prima di continuare. Avviene una sola volta.",
  "migration.button": "Migra impostazioni",
  "migration.completeTitle": "Migrazione completata",
  "migration.completeDesc": "Le impostazioni sono state migrate con successo. Riavvio di Spotify...",

  "ldb.title": "DB testi locali",
  "ldb.uploadTitle": "Carica TTML",
  "ldb.searchPlaceholder": "Cerca testi salvati…",
  "ldb.searchFallback": "Cerca…",
  "ldb.clearSearch": "Cancella ricerca",
  "ldb.resetTtml": "Ripristina TTML",
  "ldb.resetTtmlTitle": "Cancella il TTML caricato per il brano in riproduzione",
  "ldb.uploadTtml": "Carica TTML",
  "ldb.noMatches": "Nessuna corrispondenza",
  "ldb.empty": "Nessun testo salvato",
  "ldb.downloadError": "Impossibile recuperare il TTML per questo brano.",
  "ldb.removed": "Rimosso dal DB locale.",
  "ldb.removeError": "Impossibile rimuovere la voce.",
  "ldb.noTrack": "Nessun brano in riproduzione al momento.",
  "ldb.resetDone": "Il TTML è stato ripristinato.",
  "ldb.applyError": "Errore nell'applicazione dei testi",
  "ldb.currentlyPlaying": "In riproduzione",
  "ldb.play": "Riproduci",
  "ldb.download": "Scarica TTML",
  "ldb.confirmDelete": "Conferma eliminazione",
  "ldb.delete": "Elimina",
  "ldb.confirm": "Conferma",

  "upload.save": "Salva",
  "upload.saveHint": "Salva nel DB locale — resta dopo i riavvii",
  "upload.justOnce": "Solo questa volta",
  "upload.justOnceHint": "Applica solo al brano attuale, fino al riavvio",
  "upload.unknownSong": "Brano sconosciuto",
  "upload.onlyTtml": "Sono supportati solo i file .ttml.",
  "upload.readError": "Errore durante la lettura del file TTML.",
  "upload.saved": "TTML salvato nel DB locale!",
  "upload.parseError": "Analisi del TTML non riuscita.",
  "upload.applied": "Testo analizzato e applicato!",
  "upload.failed": "Caricamento non riuscito.",
  "upload.backTitle": "Torna al DB testi locali",
  "upload.backAria": "Indietro",
  "upload.modeAria": "Modalità di caricamento",
  "upload.uploading": "Caricamento…",
  "upload.dropToUpload": "Rilascia per caricare",
  "upload.dropOrClick": "Trascina un file .ttml o clicca per sfogliare",
  "upload.savesFor": "Salva nel DB locale per",
  "upload.appliesFor": "Applica una volta a",
};

const EXPERIMENT_IT: Record<ExperimentId, { label: string; description: string }> = {
  newProgressBarStyling: {
    label: "Nuovo stile barra di avanzamento",
    description: "Nuovo stile effetto vetro per la barra di avanzamento. Disattiva per tornare a quello originale.",
  },
  lyricsSkeleton: {
    label: "Scheletro di caricamento testi",
    description:
      "Mostra righe segnaposto e l'etichetta \"Caricamento testi\" mentre i testi vengono scaricati e preparati, invece dell'indicatore sfocato. Disattiva per ripristinare l'indicatore.",
  },
  canvasImmersive: {
    label: "Palco Canvas",
    description:
      "Quando un brano ha uno Spotify Canvas, riempie il lato NowBar al posto della copertina e i suoi colori guidano lo sfondo della pagina. Vale solo con lo sfondo dinamico. Disattiva per mantenere la copertina.",
  },
  npvCanvasBackground: {
    label: "Sfondo Canvas nella barra In riproduzione",
    description:
      "Quando un brano ha uno Spotify Canvas, lo sfondo dinamico della barra In riproduzione viene disegnato fotogramma per fotogramma dal video Canvas invece che dalla copertina. Disattiva per mantenere la copertina.",
  },
  popupDock: {
    label: "Lettore ancorato nella finestra mobile",
    description:
      "I testi in finestra riempiono tutto lo spazio, con il lettore ancorato in basso come nel Palco Canvas: titolo e artista a riposo, barra e controlli che appaiono al movimento del mouse. Disattiva per tornare al vecchio layout.",
  },
  refinedBackground: {
    label: "Sfondo rifinito",
    description:
      "I cambi di sfondo si dissolvono sul posto e i Colori copertina usano toni più profondi cambiando insieme al brano. Gli sfondi immagine mantengono i bordi senza ritagli. Disattiva per tornare alle transizioni precedenti.",
  },
  musicReactiveBackground: {
    label: "Sfondo reattivo alla musica",
    description:
      "Lo sfondo Dinamico (Kawarp) segue il brano mentre suona: scorre più veloce e si espande nelle parti intense, rallenta in quelle calme. Nella pagina testi, Vista Cinema e Schermo intero è anche meno sfocato. Disattiva per il flusso più uniforme.",
  },
  largerCinemaLyrics: {
    label: "Testi più grandi in Vista Cinema (solo Bloom)",
    description:
      "In Vista Cinema e Schermo intero, i testi Bloom crescono con lo schermo invece di fermarsi alla dimensione normale, restando leggibili da lontano. Finestre piccole, popup e modalità compatta mantengono la dimensione normale.",
  },
  springLineSpacing: {
    label: "Spaziatura righe aumentata (solo Spring)",
    description:
      "Con lo stile Spring, le righe dei testi sono più distanziate in base alla dimensione del testo come in Bloom (un po' più strette) invece che per una frazione della finestra. Disattiva per la spaziatura più compatta.",
  },
  refinedCredits: {
    label: "Crediti rifiniti",
    description:
      "I crediti sotto i testi diventano testo discreto subito sotto l'ultima riga, senza riquadri: prima gli autori, poi la fonte dei testi. Nei testi sincronizzati restano attenuati finché l'ultima riga non è stata cantata. Disattiva per i crediti precedenti.",
  },
  scrubPreview: {
    label: "Anteprima ricerca e volume",
    description:
      "Passando o trascinando sulla barra di avanzamento mostra il minutaggio corrispondente, e sulla barra del volume mostra il livello. Disattiva per nascondere le anteprime.",
  },
  backgroundLinePop: {
    label: "Comparsa dinamica seconde voci",
    description:
      "Le righe delle seconde voci restano nascoste sotto la riga principale finché non vengono cantate, poi scorrono fuori facendo spazio alle righe sotto. Vale solo con lo stile Bloom. Disattiva per tenerle sempre visibili.",
  },
  keepOverlappingLines: {
    label: "Mantieni righe sovrapposte",
    description:
      "Con Dissolvi righe precedenti attivo, una riga che termina mentre una sopra sta ancora suonando resta visibile, attenuata, invece di sparire subito. Disattiva per dissolvere ogni riga appena termina.",
  },
  portraitFullscreen: {
    label: "Layout verticale a schermo intero",
    description:
      "In modalità compatta a schermo intero su finestre più alte che larghe, i testi usano quasi tutta la larghezza e titolo e artista affiancano la copertina. Disattiva per il layout compatto standard.",
  },
  romajiAsWritten: {
    label: "Romaji come scritto",
    description:
      "Il romaji giapponese segue la grafia standard dei testi romanizzati (kyou, toukyou, particelle wa/e/wo, spazi tra le parole e iniziale maiuscola). Disattiva per la trascrizione precedente.",
  },
  nextUpCard: {
    label: "Prossimo brano",
    description:
      "In Schermo intero e Vista Cinema, negli ultimi 30 secondi di un brano mostra il prossimo in coda (copertina, titolo e artista) in fondo ai testi. Disattiva per non mostrarlo mai.",
  },
  playerBelowCover: {
    label: "Lettore sotto la copertina",
    description:
      "In Vista Cinema, quando non c'è un Canvas, la copertina si sposta di lato e il lettore resta sempre visibile sotto di essa con titolo, artista, barra e controlli. Disattiva per mantenere i controlli sopra la copertina.",
  },
  groupedViewControls: {
    label: "Controlli vista raggruppati",
    description:
      "I pulsanti della vista condividono una sola capsula satinata invece di averne una ciascuno. I pulsanti attivi si riempiono di bianco e il pulsante per tornare alla riga attuale diventa un cerchio coordinato. Disattiva per i pulsanti separati.",
  },
  titleLyricsGlow: {
    label: "Evidenziazione e bagliore titolo brano",
    description:
      "Mette in risalto e applica il bagliore del plugin a qualsiasi parte del testo che contiene il titolo del brano in riproduzione, sia in modalità Bloom che Spring. Disattiva per mostrare quelle parole come testo normale.",
  },
  titleLyricsGlowInPreview: {
    label: "Bagliore titolo brano in anteprima",
    description:
      "Illumina il titolo del brano anche sulle righe future in anteprima prima che vengano cantate. Disattiva (predefinito) per illuminarlo solo quando ci passi sopra (righe attive o già cantate).",
  },
};

export const LANGUAGE_LABELS: Record<Language, string> = {
  it: "Italiano",
  en: "English",
};

const DICTIONARIES: Record<Language, Record<TranslationKey, string>> = {
  en: EN,
  it: IT,
};

export function t(key: TranslationKey, vars?: Record<string, string | number>): string {
  const lang = $language.get();
  let template = DICTIONARIES[lang]?.[key] ?? EN[key];
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      template = template.replaceAll(`{${name}}`, String(value));
    }
  }
  return template;
}

export function getLocalizedExperiment(experiment: ResolvedExperiment): ResolvedExperiment {
  if ($language.get() !== "it") return experiment;
  const localized = EXPERIMENT_IT[experiment.id];
  if (!localized) return experiment;
  return {
    ...experiment,
    label: localized.label,
    description: localized.description,
  };
}

export function getLocalizedExperimentCategory(category: ExperimentCategory, fallback: string): string {
  if ($language.get() !== "it") return fallback;
  return t(`settings.experiments.cat.${category}`);
}
