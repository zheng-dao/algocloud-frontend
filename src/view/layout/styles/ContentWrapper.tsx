import styled from 'styled-components';

const ContentWrapper = styled.div`
  margin-top: 16px;
  padding: 1.25rem;
  background: #1e2d58; 
  background: var(--algocloud-card-bg-color); 
  box-shadow: 0 0 0 1px var(--card-border);
  width: 100%;
  border-radius: 5px;

  .chat-mobile-card card-hover {
    padding: 0;
  }

  .chat-mobile-card.card-hover:hover {
    background: #fff0;
    box-shadow: 0 0 0 1px rgb(9 9 9 / 0%) !important;
  }

  .chat-mobile-card {
    padding: 0;
    height: 100%;
  }

  .custom-chat {
    background: var(--algocloud-card-bg-color);
    height: 100%;
    box-shadow: 0 0 0 1px rgb(9 9 9 / 0%) !important;
  }

  .pool-custom-chat {
    background: var(--algocloud-card-bg-color);
    height: 100%;
    box-shadow: 0 0 0 1px rgb(9 9 9 / 0%) !important;
  }

  @media (max-width: 576px) {
    .custom-chat {
      height: 400px;
    }

    .pool-custom-chat {
      height: 400px;
    }
  }

  @media (min-width: 992px) {
    .custom-chat {
      // height: 650px;
    }

    .pool-custom-chat {
      // height: 600px;
    }
  }

  .channel-header {
      background: hsla(0,0%,100%,.9);
      box-shadow: 0 7px 9px rgb(0 0 0 / 3%), 0 1px 0 rgb(0 0 0 / 3%);
      -webkit-transform: matrix(1,0,0,1,0,0);
      transform: matrix(1,0,0,1,0,0);
      border-radius: 10px 10px 0 0;
      display: -webkit-flex;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: space-between;
      justify-content: space-between;
      min-height: 60px;
  }

  .str-chat__message-text-inner, .str-chat__message-simple-text-inner {
    position: relative;
    display: block;
    min-height: 32px;
    color: var(--algocloud-body-color);
    background: var(--accent-brand-a10);
    border: 0px;
    margin-left: 0;
}

  .str-chat__date-separator {
    display: none;
}

  .str-chat__date-separator-date {
    font-size: 14px;
    font-size: var(--md-font);
    font-weight: 700;
    font-weight: var(--font-weight-bold);
    color: #00000099;
    color: var(--algo-body);
    display:none
  }

  time.str-chat__message-simple-timestamp {
    color: black;
}

.chat-mobile-card {
  padding: 0px !important;
}

.str-chat__message-actions-list {
  background: var(--button-secondary-bg);
}

  .str-chat__message-simple {
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-family: var(--second-font);
    position: relative;
    display: flex;
    font-size: 14px;
    color: #0e1621;
    color: var(--text-high-emphasis);
    padding: 8px;
    background: #fff;
    background: var(--app-canvas);
    transition: background 0s;
}

  .custom-thread {
    background: var(--algocloud-card-bg-color);
    flex: 1 0 300px;
    min-width: 300px;
    max-width: 300px;
    overflow-y: hidden;
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
    font-family: var(--second-font);
    overflow: hidden;
    max-height: 100%;
    display: flex;
    flex-direction: column;
    padding-top: 0;
    margin: 6px;
    border-radius: 5px;
    box-shadow: 0 0 0 1px var(--card-border)
  }

  .chat-mobile-card {
    padding: 0px;
  }

  .d-flex.align-items-center.channel-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}

.str-chat__list .str-chat__reverse-infinite-scroll {
  padding-top: 0px;
}

.str-chat__message-simple--me .str-chat__message-text-inner {
  background: var(--accent-brand-lighter);
  color: var(--algocloud-100);
}

.str-chat__reverse-infinite-scroll {
  max-height: 360px;
}

button.str-chat__send-button {
  display: block;
}

.str-chat-channel.messaging .str-chat__main-panel {
  padding: 0px;
  padding: 0px;
}

  .str-chat__avatar--rounded {
    border-radius: calc(16px / 4);
    border-radius: var(--border-radius-sm);
    height: 40px;
    min-width: 40px;
    max-width: 40px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 20px;
    margin-left: 20px;
}


  .custom-message-list {
    overflow-x: hidden;
    overflow-y: auto
  }

  .str-chat__thread-header {
    background: var(--algocloud-card-bg-color); 
    box-shadow: 0 0 0 1px var(--card-border)
  }

  .str-chat__thread-start {
    background: var(--algocloud-card-bg-color);
  }

  .dark .str-chat__textarea textarea::placeholder {
    color: var(--base-70);
}

.str-chat__header-livestream {
  background: var(--header-bg);
}

  .str-chat__input-flat {
    padding: 0.75rem;
      background: var(--button-secondary-bg);
  }

  .str-chat__small-message-input textarea {
    background-color: var(--algocloud-input-bg);
  }

  .emoji-mart emoji-mart-light {
    padding: 0;
  }

  .str-chat__messaging-input {
    background: #ffffff;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.08);
    display: flex;
    align-items: center;
    padding: 8px;
    position: relative;
  }
  
  .str-chat.dark .str-chat__messaging-input {
    background: #2e3033;
    border-top: 1px solid rgba(0, 0, 0, 0.16);
  }
  
  .messaging-input__container {
    display: flex;
    align-items: center;
  }
  
  .messaging-input__input-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: 40px;
    height: fit-content;
    z-index: 100;
    border-radius: 20px;
    background: #ffffff;
    border: 2px solid rgba(0, 0, 0, 0.16);
    transition: border 0.2s ease-in-out;
    position: relative;
  }
  
  .str-chat.dark .messaging-input__input-wrapper {
    border: 2px solid rgba(0, 0, 0, 0.16);
    background: #323437;
  }
  
  .str-chat__messaging-input .messaging-input__input-wrapper:focus-within {
    border: 2px solid #005fff;
  }
  
  .str-chat__messaging-input > *:not(:first-of-type) {
    margin-left: 8px;
  }
  
  .str-chat__textarea {
    display: flex;
    align-items: center;
  }
  
  .str-chat__textarea textarea {
    background: #ffffff;
    font-size: 14px;
    line-height: 16px;
    min-height: 0;
    transition: box-shadow 0.2s ease-in-out;
    color: rgba(0, 0, 0, 0.9);
    border: none !important;
    outline: none !important;
    border-radius: 20px;
    padding: 11px;
  }
  
  .str-chat.dark .str-chat__messaging-input .str-chat__textarea textarea {
    background: #323437;
    border: 1px solid rgba(0, 0, 0, 0.16);
    color: rgba(255, 255, 255, 0.9);
  }
  
  .str-chat__textarea textarea:focus {
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }
  
  .messaging-input__button {
    opacity: 0.5;
    cursor: pointer;
    padding: 0 4px;
    transition: opacity 0.2s ease-in-out;
  }
  
  .messaging-input__button svg path {
    transition: fill 0.2s ease-in-out;
    fill: black;
  }
  
  .messaging-input__button:hover {
    opacity: 1;
  }
  
  .messaging-input__button:hover svg path {
    fill: #005fff !important;
  }
  
  .str-chat__input--emojipicker {
    z-index: 100;
    left: 36px;
  }
  
  .str-chat__thread .str-chat__input--emojipicker {
    position: fixed;
    top: 25% !important;
    right: 330px;
    left: auto;
  }
  
  .str-chat__messaging-input .emoji-mart-bar,
  .str-chat__messaging-input .emoji-mart-search input {
    border-color: rgba(0, 0, 0, 0.36);
  }
  
  .str-chat.dark .str-chat__messaging-input .messaging-input__button svg path {
    fill: white;
  }
  
  .giphy-icon__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 24px;
    width: 63px;
    background: #005fff;
    border-radius: 12px;
    margin-left: 8px;
  }
  
  .giphy-icon__text {
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 11px;
    line-height: 8px;
    color: #ffffff;
  }
  
  div.rfu-dropzone {
    width: 100%;
  }
  
  div.rfu-dropzone:focus {
    outline: none;
  }
  
  .rfu-image-previewer {
    flex: none;
    margin-left: 12px;
  }
  
  .rfu-image-previewer__image {
    margin-bottom: 0;
  }
  
  div.rta__autocomplete.str-chat__emojisearch {
    z-index: 10;
    position: absolute;
    width: 30%;
    background: #fafafa;
    margin: 4px 10px;
    border-radius: 16px !important;
  }
  
  .str-chat__thread div.rta__autocomplete.str-chat__emojisearch {
    width: 100%;
    left: -10px;
  }
  
  .str-chat__user-item {
    background: #ffffff;
    color: #000000;
  }
  
  .str-chat.dark .str-chat__user-item {
    background: rgba(46, 48, 51, 0.98);
    color: #ffffff;
  }
  
  .str-chat__user-item:hover {
    background: #005fff !important;
    color: #ffffff;
    cursor: pointer;
  }
  
  .rta__entity--selected {
    background: #005fff;
  }
  
  .str-chat__slash-command:hover {
    background: #005fff;
    cursor: pointer;
  }
  
  .rta__list-header {
    font-family: Helvetica Neue, sans-serif;
    font-size: 14px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.9);
    mix-blend-mode: normal;
  }
  
  @media screen and (max-width: 640px) {
    div.rta__autocomplete.str-chat__emojisearch {
      width: unset;
    }
  
    .str-chat__textarea textarea {
      font-size: 16px;
    }
  }

  .messaging__channel-header {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 7px 9px rgba(0, 0, 0, 0.03), 0px 1px 0px rgba(0, 0, 0, 0.03);
    transform: matrix(1, 0, 0, 1, 0, 0);
    border-radius: 10px 10px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    min-height: 60px;
  }
  
  .messaging__channel-header .channel-header__name {
    flex: 1;
    font-weight: bold;
    font-size: 15px;
    color: rgba(0, 0, 0, 0.9);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .str-chat.dark .messaging__channel-header {
    background: rgba(46, 48, 51, 0.98);
    box-shadow: 0px 7px 9px rgba(0, 0, 0, 0.03), 0px 1px 0px rgba(0, 0, 0, 0.03);
  }
  
  .str-chat.dark .messaging__channel-header .channel-header__name {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .messaging__channel-header__right {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  
  .messaging__channel-header__avatars {
    display: flex;
    align-items: center;
    height: 40px;
    min-width: 40px;
    max-width: 40px;
    border-radius: 20px;
    overflow: hidden;
    margin-right: 20px;
    margin-left: 20px;
  }
  
  .messaging__channel-header__avatars.two div:first-child {
    position: relative;
    right: 10px;
  }
  
  .messaging__channel-header__avatars.two div:nth-child(2) {
    position: relative;
    right: 14px;
  }
  
  .messaging__channel-header__avatars.two span {
    width: 20px;
    overflow: hidden;
  }
  
  .messaging__channel-header__avatars.three span {
    width: 20px;
    overflow: hidden;
  }
  
  .messaging__channel-header__avatars.four span:nth-child(2) {
    position: relative;
    right: 10px;
  }
  
  .channel-header__edit-input {
    width: 100%;
    font-family: Helvetica Neue, sans-serif;
    font-size: 17px;
    background: none;
    outline: none;
    border: none;
    padding: 0;
  }
  
  .channel-header__edit-input::placeholder {
    opacity: 50%;
  }
  
  .str-chat.dark .channel-header__edit-input::placeholder {
    color: #ffffff;
  }
  
  .str-chat.dark .channel-header__edit-input {
    color: #ffffff;
  }
  
  #mobile-nav-icon {
    display: none;
  }
  
  @media screen and (max-width: 640px) {
    #mobile-nav-icon {
      display: block;
      padding-left: 5px;
    }
  
    #mobile-nav-icon.light svg path {
      fill: darkslategrey;
      stroke: darkslategrey;
      fill-opacity: 60%;
    }
  
    .messaging__channel-header__avatars {
      margin-left: 10px;
    }
  }

  .messaging__typing-indicator {
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    color: rgba(0, 0, 0, 0.9);
    opacity: 0.5;
  }
  
  .messaging__typing-indicator .dots {
    position: relative;
    top: -2px;
    margin-right: 8px;
  }
  
  .messaging__typing-indicator .dots .dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 3px;
    background: black;
    animation: wave2 1.1s linear infinite;
  }
  
  .str-chat.dark .messaging__typing-indicator {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .str-chat.dark .messaging__typing-indicator .dots .dot {
    background: white;
  }
  
  .messaging__typing-indicator .dots .dot:nth-child(2) {
    animation-delay: -0.9s;
    opacity: 0.5;
  }
  
  .messaging__typing-indicator .dots .dot:nth-child(3) {
    animation-delay: -0.8s;
    opacity: 0.2;
  }
  
  @keyframes wave2 {
    0%,
    60%,
    100% {
      opacity: 1;
    }
    30% {
      opacity: 0.5;
    }
  }

  .messaging.str-chat .str-chat__thread {
    margin: 0;
  }
  
  .custom-thread-header {
    border: none;
    background: white;
    min-height: 60px;
    box-shadow: 0px 7px 9px rgba(0, 0, 0, 0.03), 0px 1px 0px rgba(0, 0, 0, 0.03);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .str-chat.dark .custom-thread-header {
    background: rgba(46, 48, 51, 0.98);
    box-shadow: 0px 7px 9px rgba(0, 0, 0, 0.03), 0px 1px 0px rgba(0, 0, 0, 0.03);
  }
  
  .custom-thread-header__left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  
  .custom-thread-header__left-title {
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 15px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.9);
    margin-right: 10px;
  }
  
  .str-chat.dark .custom-thread-header__left-title {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .custom-thread-header__left-count {
    font-family: Helvetica, sans-serif;
    font-size: 14px;
    mix-blend-mode: normal;
    opacity: 0.5;
  }
  
  .str-chat.dark .custom-thread-header__left-count {
    color: rgba(255, 255, 255, 0.9);
  }
  
  .messaging.str-chat .str-chat__thread {
    border-left: 1px solid #f1f1f1;
    border-radius: 0px 10px 0 0;
    background: #ffffff;
  }
  
  .messaging.str-chat.dark .str-chat__thread {
    border-left: 1px solid rgba(0, 0, 0, 0.09);
    background: #282a2d;
  }
  
  .str-chat__thread .str-chat__messaging-input {
    background: none !important;
  }
  
  .messaging.str-chat .str-chat__thread-list {
    height: unset;
    padding: 0;
    padding-top: 20px;
  }
  
  .messaging.str-chat .str-chat__thread-list .str-chat__message {
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 0px;
  }
  
  .str-chat__thread-list .str-chat__list.str-chat__list--thread {
    padding: 0 !important;
  }
  
  .str-chat__thread-list .str-chat__li.str-chat__li--top {
    margin-top: 0;
  }
  
  .str-chat__thread-list .str-chat__message:first-of-type {
    border-bottom: 1px solid #f1f1f1;
    padding-bottom: 20px;
  }
  
  .str-chat.dark .str-chat__thread-list .str-chat__message:first-of-type {
    border-bottom: 1px solid #212326;
  }
  
  .str-chat__thread-list li .str-chat__message:first-of-type {
    border-bottom: none !important;
    padding-bottom: 0px;
  }
  
  .str-chat__thread .str-chat__messaging-input {
    margin-top: 0px !important;
  }
  
  .str-chat__message-replies-count-button:focus {
    border: none;
    outline: none;
  }
  
  .str-chat__thread-start {
    display: none;
  }
  
  .messaging.str-chat .str-chat__thread-list .str-chat__reverse-infinite-scroll {
    padding-top: 20px;
  }
  
  .str-chat__thread .str-chat__messaging-input {
    margin-top: 10px;
    box-shadow: 0px -2px 2px rgba(0, 0, 0, 0.04);
  }
  
  .str-chat__thread .str-chat__input--emojipicker {
    top: 0%;
  }
  
  .str-chat__thread .emoji-mart {
    width: 300px !important;
  }
  
  @media screen and (max-width: 640px) {
    .str-chat__thread .str-chat__messaging-input .messaging-input__button.emoji-button {
      display: none;
    }
  }

  .window-controls__container {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .window-controls__button-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 30px;
    width: 180px;
    background: rgba(255, 255, 255, 0.799579);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.06);
    border-radius: 15px;
    padding: 0 2px;
  }
  
  .window-controls__button-wrapper.light {
    background: #303438;
  }
  
  .window-controls__button {
    height: 26px;
    width: 90px;
    background: none;
    box-shadow: none;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-family: Inter, sans-serif;
    font-weight: bold;
    font-size: 12px;
    line-height: 12px;
    letter-spacing: 0.8px;
    color: #000000;
    mix-blend-mode: normal;
    opacity: 0.2;
  }
  
  .window-controls__button.selected {
    background: #ffffff;
    box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.2);
    color: #0a0a0a;
    opacity: 1;
  }
  
  .window-controls__button.light {
    background: #303438;
    color: rgba(255, 255, 255, 0.4);
    opacity: 0.5;
  }
  
  .window-controls__button.selected.light {
    background: #3d4247;
    color: #ffffff;
    opacity: 1;
  }

  .channel-preview__container {
    height: 56px;
    margin-bottom: 8px;
    margin-left: 20px;
    margin-right: 20px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 8px;
  }
  
  .channel-preview__container:hover {
    background: #ffffff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.07);
    transition: background 0.1s ease-in-out;
  }
  
  .str-chat.dark .channel-preview__container:hover {
    background: #2c2c30;
  }
  
  .channel-preview__container.selected {
    background: #ffffff;
    box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.07);
    transition: background 0.1s ease-in-out;
  }
  
  .str-chat.dark .channel-preview__container.selected {
    background: #2c2c30;
  }
  
  .channel-preview__content-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 8px;
    margin-right: 8px;
    width: 100%;
  }
  
  .channel-preview__content-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    height: 18px;
    margin-bottom: 4px;
  }
  
  .channel-preview__content-name {
    font-family: Helvetica Neue, sans-serif;
    font-weight: 500;
    font-size: 15px;
    color: #000000;
    margin: 0;
    max-width: 158px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .str-chat.dark .channel-preview__content-name {
    color: #ffffff;
  }
  
  .channel-preview__content-time {
    font-family: Helvetica Neue, sans-serif;
    font-size: 11px;
    color: #858688;
    margin: 0;
  }
  
  .channel-preview__content-message {
    font-family: Helvetica Neue, sans-serif;
    font-size: 13px;
    line-height: 16px;
    margin: 0;
    color: #858688;
    height: 16px;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .channel-preview__container .str-chat__avatar {
    margin-right: 0;
  }
  
  .channel-preview__avatars {
    display: flex;
    align-items: center;
    height: 40px;
    min-width: 40px;
    max-width: 40px;
    border-radius: 20px;
    overflow: hidden;
  }
  
  .channel-preview__avatars.two div:first-child {
    position: relative;
    right: 10px;
  }
  
  .channel-preview__avatars.two div:nth-child(2) {
    position: relative;
    right: 30px;
  }
  
  .channel-preview__avatars.two span {
    width: 20px;
    overflow: hidden;
  }
  
  .channel-preview__avatars.three span {
    width: 20px;
    overflow: hidden;
  }

  .str-chat__message-actions-box {
    border-radius: 16px;
  }
  
  .str-chat__list--thread
    .str-chat__message-simple__actions__action--options
    .str-chat__message-actions-box {
    border-radius: 16px;
  }
  
  .str-chat__message
    .str-chat__message-simple__actions__action--options
    .str-chat__message-actions-box--mine {
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 16px;
  }
  
  .str-chat.dark
    .str-chat__message
    .str-chat__message-simple__actions__action--options
    .str-chat__message-actions-box {
      background: linear-gradient(-180deg,hsla(0,0%,100%,.02),rgba(0,0,0,.02)), #67686a;
      box-shadow: 0 0 2px 0 rgb(0 0 0 / 22%), 0 1px 0 0 rgb(0 0 0 / 8%), 0 1px 8px 0 rgb(0 0 0 / 5%);
      border-radius: 16px;
  }
  
  .str-chat.dark
    .str-chat__message
    .str-chat__message-simple__actions__action--options
    .str-chat__message-actions-box--mine {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%),
      rgba(0, 0, 0, 0.7);
    border-radius: 16px;
  }
  
  .str-chat.dark
    .str-chat__message-simple__actions__action.str-chat__message-simple__actions__action--reactions
    g {
    fill: #ffffff;
  }
  
  .str-chat__message-actions-list-item {
    font-weight: 500;
  }
  
  /* EDIT MESSAGE */
  
  .str-chat__modal.str-chat__modal--open {
    border: none !important;
    opacity: 1;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.5);
  }
  
  .str-chat.dark .str-chat__modal.str-chat__modal--open {
    background: rgba(0, 0, 0, 0.5);
  }
  
  .str-chat__modal__inner {
    height: 160px;
    width: 400px;
    border: none !important;
    background: #f1f1f1;
    box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.15);
  }
  
  .str-chat.dark .str-chat__modal__inner {
    background: #2e3033 !important;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.08);
  }
  
  .str-chat__edit-message-form {
    position: relative;
    top: 40px;
  }
  
  .str-chat__modal .str-chat__edit-message-form textarea {
    border: 2px solid rgba(0, 0, 0, 0.16) !important;
    height: 50px !important;
    max-height: 50px !important;
    font-size: 15px;
    border-radius: 20px !important;
    transition: border 0.2s ease-in-out;
    box-shadow: none;
  }
  
  .str-chat.dark .str-chat__modal .str-chat__edit-message-form textarea {
    background: rgba(46, 48, 51, 0.98) !important;
  }
  
  .str-chat__modal .str-chat__edit-message-form textarea:focus {
    border: 2px solid #006cff !important;
  }
  
  .str-chat__modal .str-chat__message-team-form-footer {
    margin-top: 12px;
  }
  
  .str-chat__modal .str-chat__message-team-form-footer button {
    cursor: pointer;
  }
  
  .str-chat__modal__close-button svg {
    top: 0px;
    margin-left: 8px;
  }
  
  .str-chat__modal__close-button {
    position: relative;
    top: -55px;
    left: 400px;
  }
  
  .str-chat.light .str-chat__modal__close-button svg {
    fill: #000000;
  }
  
  .str-chat.light .str-chat__modal__close-button {
    color: #000000;
  }
  
  .str-chat__modal__close-button:hover {
    color: #006cff !important;
    opacity: 1;
  }
  
  .str-chat__modal__close-button:hover svg {
    fill: #006cff !important;
  }
  
  .str-chat__modal .str-chat__message-team-form-footer svg:hover {
    fill: #006cff;
  }
  
  .str-chat__edit-message-form .rfu-file-upload-button {
    display: none;
  }
  
  .str-chat__edit-message-form .str-chat__message-team-form-footer button[type='submit'] {
    padding-right: 0;
  }
  
  .str-chat__edit-message-form .str-chat__message-team-form-footer button:focus {
    border: none;
    outline: none;
  }
  
  /* REACTIONS */
  
  .str-chat__reaction-selector {
    border-radius: 16px;
    height: 56px;
    background: #f1f1f1;
    box-shadow: 0px 10px 12px rgba(0, 0, 0, 0.15), 0px 2px 4px rgba(0, 0, 0, 0.15);
  }
  
  .str-chat.dark .str-chat__reaction-selector {
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%),
      rgba(0, 0, 0, 0.7);
  }
  
  .str-chat__reaction-selector li {
    font-size: 24px;
  }
  
  .str-chat__reaction-selector li span span {
    height: 24px !important;
    width: 24px !important;
  }
  
  span.react-images__footer__count.react-images__footer__count--isModal {
    font-family: Helvetica Neue, sans-serif;
  }
  
  .str-chat__message.str-chat__message--me.str-chat__message-simple.str-chat__message-simple--me.str-chat__message--regular
    .str-chat__avatar {
    display: none;
  }
  
  .str-chat__message.str-chat__message--me.str-chat__message-simple.str-chat__message-simple--me.str-chat__message--reply
    .str-chat__avatar {
    display: none;
  }
  
  .str-chat__message.str-chat__message--me.str-chat__message-simple.str-chat__message--deleted.deleted {
    margin: 0;
  }
  
  @media screen and (max-width: 640px) {
    /* REACTIONS */
  
    .str-chat__message--me .str-chat__message-inner > .str-chat__message-simple__actions,
    .str-chat__message-simple--me .str-chat__message-inner > .str-chat__message-simple__actions {
      margin-bottom: 6px;
    }
  
    .str-chat__message-inner > .str-chat__message-simple__actions,
    .str-chat__message-simple-inner > .str-chat__message-simple__actions {
      margin-bottom: 6px;
    }
  
    .str-chat__message--has-attachment .str-chat__message-simple__actions {
      position: unset;
      margin-bottom: 6px;
    }
  
    /* EDIT MESSAGE */
  
    .str-chat__modal.str-chat__modal--open {
      padding-top: 200px;
    }
  
    .str-chat__modal__inner {
      max-width: 80vw;
    }
  
    .str-chat__modal .str-chat__edit-message-form {
      max-width: 80vw;
      min-width: unset;
    }
  
    .str-chat__modal__close-button {
      left: 75vw;
    }
  }

  .str-chat.str-chat-channel.messaging {
    background: #fafafa;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.06), 0px 2px 30px rgba(0, 0, 0, 0.1);
  }
  
  .dark.str-chat.str-chat-channel.messaging {
    background: #212326;
    box-shadow: 0px 2px 30px rgba(0, 0, 0, 0.1);
  }
  
  .str-chat.str-chat-channel-list.messaging {
    background: #fafafa;
  }
  
  .dark.str-chat.str-chat-channel-list.messaging {
    background: #212326 !important;
  }
  
  .str-chat-channel.messaging .str-chat__main-panel {
    padding: 0 !important;
    min-width: 250px;
  }

  .str-chat__header-livestream {
    box-shadow: 0 1px 1px rgb(0 0 0 / 10%), 0 7px 9px rgb(0 0 0 / 3%), 0 1px 0 rgb(0 0 0 / 3%);
    border-bottom-width: 1px;
    border-bottom-color: rgba(255,255,255,.15);
    border-bottom-style: solid;
    border-top-left-radius: 5px !important;
    border-top-right-radius: 5px !important;
    padding-left: .5rem;
}

.str-chat__message-data, .str-chat__message-simple-data {
  color: var(--algocloud-1100);
}

.str-chat__input-flat {
  padding: 0.75rem;
  border-top-style: solid;
  border-width: 1px;
  border-top-color: rgba(255,255,255,.15);
  background-color: var(--header-bg);
}

button.str-chat__send-button svg > path {
  fill: var(--accent-brand);
}

.str-chat__input-flat {
  border-bottom-left-radius: 5px !important;
  border-bottom-right-radius: 5px !important;
}

.custom-chat {
  border-radius: 5px !important;
}

.str-chat__list {
  background-color: #f9f9f90d;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
}

.str-chat__input-flat .str-chat__textarea>textarea:focus {
  background-color: var(--form-bg-focus);
  border-color: var(--focus) !important;
  box-shadow: 0 0 0 1px var(--focus) !important;
  color: var(--body-color) !important;
}

.str-chat__input-flat .str-chat__textarea>textarea {
  min-height: 56px;
  background: var(--form-bg);
  border: 1px solid var(--form-border) !important;
}

.str-chat__input-flat {
  padding: 0.75rem;
  background-color: var(--header-bg);
  border-top-width: 1px;
  border-top-color: var(--card-border);
}

.str-chat__input-flat .str-chat__textarea>textarea {
  padding: 10px 59px;
}

.str-chat__input-flat .str-chat__textarea>textarea {
  min-height: 56px;
  background: var(--form-bg);
  border: 1px solid var(--form-border) !important;
  color: var(--algocloud-body-color);
}

.str-chat__input-flat .rfu-file-upload-button svg {
  fill: #000000;
  fill: var(--algocloud-body-color);
  opacity: .5;
}

.str-chat__textarea textarea {
  line-height: 1.8rem !important;
}

.str-chat__input-flat-emojiselect {
  position: absolute;
  top: calc(100% - 43px);
  left: 15px;
  border: none;
  cursor: pointer;
  padding: 0;
  background-color: transparent;
}

.str-chat__input-flat-emojiselect svg {
  fill: var(--accent-success);
  opacity: .5;
}

.str-chat__list::-webkit-scrollbar {
  border-bottom-right-radius: 0px;
}
  
  .messaging.str-chat .str-chat__list .str-chat__reverse-infinite-scroll {
    padding-top: 0;
  }

  .custom-thread {
    max-width: 100%;
  }

  .str-chat__list {
    background-color: #f9f9f90d;
}

  .str-chat__message-simple__actions__action svg {
    fill: var(--algocloud-body-color);
  }

  .str-chat__message-actions-list {
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05),0 0 0 1px var(--base-a10);
    margin: 0;
    color: var(--algocloud-dropdown-color);
    text-align: left;
    list-style: none;
    background-color: var(--algocloud-dropdown-bg) !important;
    background-clip: padding-box;
    border: 1px solid var(--algocloud-dropdown-border-color);
    -webkit-box-shadow: var(--algocloud-dropdown-box-shadow);
    box-shadow: 0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -2px rgba(0,0,0,.05),0 0 0 1px var(--base-a10);
    border-radius: 0.375rem!important;
    overflow: hidden;
}

.str-chat__message-actions-box {
  box-shadow: 0 0 2px 0 #00000014, 0 1px 0 0 #00000014, 0 1px 8px 0 #00000014 !important;
}

.str-chat__message-simple:focus-within .str-chat__message-simple__actions__action--options button {
  color: var(--algocloud-body-color);
}

.str-chat__small-message-input__wrapper {
  border-top-style: solid;
  border-width: 1px;
  border-color: var(--border-color);
}

.str-chat__message-replies-count-button {
  color: var(--accent-brand);
}

.str-chat__message-actions-list button:hover {
  color: #9896ff!important;
  background: var(--algocloud-menu-li-hover)!important;
}

  .str-chat__input-flat-emojiselect svg {
    fill: var(--algocloud-body-color);
    opacity: .5;
}

  time.str-chat__message-simple-timestamp {
    color: var(--algocloud-body-color);
}
  
  .messaging.str-chat.dark .str-chat__list {
    padding: 0 30px 0;
    background: #282a2d;
  }
  
  .str-chat-channel.messaging .str-chat__main-panel {
    padding: 30px 30px 0 0px;
  }
  
  .str-chat-channel.messaging .str-chat__main-panel:not(:last-child) {
    padding: 20px 0 0 0px;
  }
  
  .str-chat-channel.messaging .str-chat__main-panel:not(:last-child) .messaging__channel-header {
    border-radius: 10px 0px 0px 0px;
  }
  
  .str-chat__message-simple-status {
    display: none;
  }
  
  .messaging.str-chat.dark .str-chat__message--system__date {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .messaging.str-chat.dark .str-chat__message--system__text p {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .messaging.str-chat.dark .str-chat__message--system__line {
    background: rgba(255, 255, 255, 0.1);
  }
  
  .str-chat__message--system {
    padding: 20px;
  }
  
  /* Mobile View */
  @media screen and (max-width: 640px) {
    /*
     * This is to prevent the browser navigation bars from hiding the app
     * on some mobile browsers. The app-height variable is set dynamically
     * using javascript.
     */
    .str-chat-channel {
      height: var(--app-height);
    }
  
    .str-chat-channel-list.messaging {
      float: unset;
    }
  
    #mobile-channel-list {
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      transform: translate3d(-100vw, 0, 0);
      transition: transform 0.3s cubic-bezier(0, 0.52, 0, 1);
    }
  
    #mobile-channel-list.show {
      transform: translate3d(0vw, 0, 0);
      z-index: 1000;
    }
  }
  
  /* To fix inherited styles (as per Team and Customer Support apps */
  @media screen and (max-width: 960px) {
    .str-chat-channel-list.messaging {
      position: unset;
      left: unset;
      top: unset;
      z-index: unset;
      min-height: unset;
      overflow-y: unset;
      box-shadow: unset;
      transition: unset;
    }
  }
`;

export default ContentWrapper;
