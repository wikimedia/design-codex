// This file is a stand-alone entry point used to generate a JSON list
// of all message keys currently used in Codex. It is not part of the
// main build of the library (and is thus ignored by Vite & tsconfig).

import { I18nMessageKeys } from './constants';
import { writeFileSync } from 'fs';
const json = JSON.stringify( I18nMessageKeys, null, '\t' );
writeFileSync( 'dist/messageKeys.json', json );
