setTimeout(() => {
  var script = document.createElement('script');
  script.src = 'https://thapi.aedi.ai/common/js/v1/aedi-ad-th.js';
  document.head.appendChild(script);
}, 1500);

var API_KEY;
var aedi;
const findScriptTag = () => {
  // 모든 <script> 태그를 가져옴
  const scripts = document.querySelectorAll('script');

  // 찾고자 하는 URL
  const targetSrc = 'https://thapi.aedi.ai/common/js/v1/aedi-ad-th.js';

  // <script> 태그 중에서 targetSrc와 일치하는 태그 찾기
  const targetScript = Array.from(scripts).find((script) => script.src === targetSrc);

  if (targetScript) {
    targetScript.remove();
  } else {
    var script = document.createElement('script');
    script.src = 'https://thapi.aedi.ai/common/js/v1/aedi-ad-th.js';
    document.head.appendChild(script);
  }
};
var interval = setInterval(() => {
  if (!aedi && typeof Aedi !== 'undefined') {
    aedi = new Aedi();
    findScriptTag();
  }
  if (aedi) {
    clearInterval(interval);

    if (navigator.userAgentData) {
      if (navigator.userAgentData.mobile) {
        API_KEY = 'e37b08dd3015330dcbb5d6663667b8b8';
      } else {
        API_KEY = '0f21f0349462cacdc5796990d37760ae';
      }
    } else {
      var filter = 'win16|win32|win64|mac';
      if (navigator.platform) {
        if (0 > filter.indexOf(navigator.platform.toLowerCase())) {
          API_KEY = 'e37b08dd3015330dcbb5d6663667b8b8';
        } else {
          API_KEY = '0f21f0349462cacdc5796990d37760ae';
        }
      }
    }

    var aediWritingTime = document.querySelector('meta[property="article:published_time"]').content;
    var imgSelector = document.querySelectorAll(
      '#card-image img,#paragraph picture img:not(.resolution-image img)'
    );
    var captionSelector = null;

    aedi.adOpen(API_KEY, imgSelector, aediWritingTime, captionSelector);
  }
}, 200);
var intv = setInterval(() => {
  if (
    document.querySelector('.visible-content .widget-btn') &&
    document.querySelector('.pxButton')
  ) {
    var widgetBtn = document.querySelector('.visible-content .widget-btn');
    if (widgetBtn) {
      clearInterval(intv);

      // 버튼 클릭 이벤트 리스너 추가
      widgetBtn.addEventListener('click', () => {
        var divs = document.querySelectorAll('.pxButton');
        divs.forEach(function (div, index) {
          var aediLink = div.closest('.aedi-link');
          if (aediLink) {
            aediLink.style.display = '';
          }
          div.style.display = '';
        });
      });

      // 처음에는 버튼을 감춰두는 코드 실행
      var divs = Array.from(document.querySelectorAll('.aedi-link')).reverse();
      divs.forEach(function (div, index) {
        if (index > 0) {
          // 두 번째 요소부터 적용
          div.style.display = 'none';
        }
      });
    }
  }
}, 500);
