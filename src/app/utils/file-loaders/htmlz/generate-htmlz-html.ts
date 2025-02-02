/**
 * @license BSD-3-Clause
 * Copyright (c) 2021, ッツ Reader Authors
 * All rights reserved.
 */

import buildDummyBookImage from '../utils/build-dummy-book-image';
import clearAllBadImageRef from '../utils/clear-all-bad-image-ref';
import fixXHtmlHref from '../utils/fix-xhtml-href';
import { HtmlzContent } from './types';

export function getFormattedElementHtmlz(
  data: HtmlzContent,
  document: Document
) {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const regexResult = /.*<body[^>]*>((.|\s)+)<\/body>.*/.exec(
    data['index.html']
  )!;
  let html = regexResult[1];
  for (const [key, value] of Object.entries(data)) {
    if (value instanceof Blob) {
      html = html.replaceAll(key, buildDummyBookImage(key));
    }
  }
  const result = document.createElement('div');
  result.innerHTML = html;

  clearAllBadImageRef(result);
  fixXHtmlHref(result);

  return result;
}
