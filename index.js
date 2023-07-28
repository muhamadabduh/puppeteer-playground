/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const puppeteer = require('puppeteer');

(async () => {
  try {
    
    const [url, outputName] = process.argv.slice(2)
    const slow3G = puppeteer.PredefinedNetworkConditions['Fast 3G']
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulateNetworkConditions(slow3G)
  
    await page.goto(url, {
      waitUntil: 'load',
    })
    await page.waitForSelector('[data-cy="surat__kop-surat"]', { visible: true })

    const loader = await page.waitForSelector('#loader', { hidden: true })
    if(loader) {
      console.log('loader: ', loader)
      return
    } else {
      console.log(loader)
    }
   
    await page.pdf({ format: 'A4', margin: {
        top: '36px',
        bottom: '113px',
        left: '113px',
        right: '76px'
      },
      path: `${outputName}.pdf`
    })
  
    // await page.pdf({
    //   path: `${outputName}.pdf`,
    //   format: 'A4',
    // });
  
    await browser.close();
  } catch (error) {
    console.log(error)
  }
})();