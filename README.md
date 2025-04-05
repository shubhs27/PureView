# PureView Ad Blocker

<p align="center">
  <img src="icons/icon128.png" width="100" alt="Pureview Logo" />
</p>

<h1 align="center">Pureview - Adblocker Chrome Extension</h1>

<p align="center">
  <img src="https://img.shields.io/badge/version-1.0.1-blue" alt="Version">
  <img src="https://img.shields.io/badge/manifest-v3-green" alt="Manifest V3">
</p>

## 🌟 Overview

**Pureview** is a lightweight Chrome extension designed to give users a cleaner and distraction-free web browsing experience by blocking intrusive advertisements. Whether you're working, studying, or just casually browsing, Pureview helps you stay focused and efficient. Inspired by uBlock Origin which is no longer available on chrome web store.

## Features

- **Effective Ad Blocking**: Blocks ads using both declarative network rules and DOM filtering
- **Low Resource Usage**: Built with Chrome's Manifest V3 for optimal performance
- **Simple Interface**: Easy-to-use toggle and live statistics
- **Privacy Focused**: No data collection or tracking

## How It Works

PureView uses a dual-approach strategy to block advertisements:

1. **Network-Level Blocking**: Prevents ad requests from ever being made using Chrome's `declarativeNetRequest` API
2. **DOM-Level Filtering**: Removes ad elements that may appear in the page content

## Installation

### From Chrome Web Store

Install PureView directly from the [Chrome Web Store](https://chrome.google.com/webstore/detail/dnndbeelpmgipmibcbocajpimolmoica)

### Manual Installation

1. Download and extract the latest release
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the extracted extension folder
5. PureView is now installed and active!

## Usage

- **Toggle On/Off**: Click the extension icon to open the popup, then use the toggle switch to enable or disable ad blocking
- **View Statistics**: The popup displays both per-page and total ads blocked since installation
- **No Configuration Needed**: Works immediately after installation with no setup required

## Technical Details

PureView is built with:

- Manifest V3 API
- Chrome's `declarativeNetRequest` for network filtering
- MutationObserver for dynamic DOM content filtering
- Local storage for maintaining statistics and settings

## Privacy Policy

Please refer to our [Privacy Policy](https://shubhs27.github.io/PureView/privacy-policy) for information about data collection and privacy practices.

## Contributing

If you have ideas to improve this extension or have found a bug, please open an issue to discuss your ideas or report the problem. Pull requests are also welcome.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

Chrome Extension documentation and tutorials at [developer.chrome.com](https://developer.chrome.com/docs/extensions) were invaluable resources during development - their clear explanations and examples make extension development accessible and straightforward.
