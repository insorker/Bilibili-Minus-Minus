// ==UserScript==
// @name         Bilibili-Minus-Minus
// @namespace    http://tampermonkey.net/
// @version      0.3.2
// @description  简化网页版B站视频界面
// @author       insorker
// @match        https://www.bilibili.com/video/*
// @match        https://t.bilibili.com/*
// @note         2022.08-30-V0.3.2 “右侧显示”修复
// @note         2022.06-16-V0.3.1 “右侧显示”按钮属性变动。如再次发生如上情况，可考虑重写按钮样式。
// @note         2022.06-16-V0.3.0 可选择在视频界面是否移除右边栏
// @note         2022.06-16-V0.2.0 分集视频不移除右边栏，单集视频移除右边栏
// @note         2022.06-16-V0.1.0 移除视频界面右侧广告和推荐；移除动态界面右侧广告和话题
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

    if (location.host.includes("t.bilibili.com")) {
        const appContainer = document.getElementById('app');

        const appCallback = function(mutationsList, observer) {
            // leftEntry
            function hideLeftEntry() {
                let leftEntry = document.querySelector('.left-entry');
                setSearch(1);

                hideElement(leftEntry);
            }
            function setSearch(flag) {
                let search = document.querySelector('.center-search__bar');

                if (search) {
                    // right
                    if (flag == 1) {
                        search.style.margin = '0 0 0 auto';
                    }
                    // center
                    else if (flag == 2) {
                        search.style.margin = '0 auto';
                    }
                }
            }
            // search placeholder
            function hideSearchPlaceHolder() {
                let placeHolder = document.querySelector('.nav-search-input');

                placeHolder.setAttribute('placeholder', '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili');
            }
            // advertisement
            function hideAdvertisement() {
                let ads = document.querySelector('.bili-dyn-ads');

                hideElement(ads);
            }
            // topic
            function hideTopic() {
                let topic = document.querySelector('.right .sticky');

                hideElement(topic);
            }
            // announcement
            function hideAnnouncement() {
                let announcement = document.querySelector('.bili-dyn-banner');

                hideElement(announcement);
            }
            // right
            function hideRight() {
                let right = document.querySelector('.right');

                hideElement(right);
            }

            for (let mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    hideLeftEntry();
                    hideSearchPlaceHolder();
                    hideAdvertisement();
                    hideTopic();
                    hideAnnouncement();
                    hideRight();
                }
            }
        };

        const observer = new MutationObserver(appCallback);
        observer.observe(appContainer, { childList: true, subtree: true });
    }
    else {
        (function() {
            let body = document.querySelector('body');
            let switchyBar = document.createElement('div');
            switchyBar.className = 'fixed-nav';
            switchyBar.setAttribute('data-v-680343a4', '');
            switchyBar.setAttribute('data-v-25a749f0', '');
            switchyBar.style.position = 'fixed';
            switchyBar.style.right = '6px';
            switchyBar.style.bottom = '50px';
            switchyBar.innerHTML = "<div class='nav-menu' data-v-680343a4><div title='右侧显示' class='item switchy' style='padding:8px 4px 4px;line-height:14px;' data-v-680343a4>右侧显示</div></div>";

            switchyBar.firstChild.firstChild.onclick = function() {
                let rightContainer = document.querySelector('.right-container.is-in-large-ab');

                if (rightContainer) {
                    observer.disconnect();
                    if (rightContainer.style.display == 'none') {
                        hideRight(rightContainer, false);
                    }
                    else {
                        hideRight(rightContainer, true);
                    }
                }
            };
            body.appendChild(switchyBar);
        })();

        function hideRight(rightContainer, enable) {
            if (enable) {
                rightContainer.style.display = 'none';
                moveSearch(1);
            }
            else {
                rightContainer.style.display = '';
                moveSearch(2);
            }
        }

        const appContainer = document.getElementById('app');

        const appCallback = function(mutationsList, observer) {
            //=====top
            // leftEntry
            function hideLeftEntry() {
                let leftEntry = document.querySelector('.left-entry');

                hideElement(leftEntry);
            }
            // search placeholder
            function hideSearchPlaceHolder() {
                let placeHolder = document.querySelector('.nav-search-input');

                placeHolder.setAttribute('placeholder', '哔哩哔哩 (゜-゜)つロ 干杯~-bilibili');
            }

            //=====right
            // advertisement
            function hideAdvertisement() {
                let ad_report_top = document.querySelector('a.ad-report.video-card-ad-small');
                let ad_report_bottom = document.getElementById('right-bottom-banner');
                let slide_ad = document.getElementById('slide_ad');
                let bannerAd = document.getElementById('bannerAd');

                hideElement(ad_report_top);
                hideElement(ad_report_bottom);
                hideElement(slide_ad);
                hideElement(bannerAd);
            }
            // recommend list
            function hideRecommendList() {
                let recommendList = document.getElementById('reco_list');

                hideElement(recommendList);
            }
            // live
            function hideLive() {
                let live = document.getElementById('live_recommand_report');

                hideElement(live);
            }
            // activity
            function hideActivity() {
                let activity = document.getElementById('activity_vote');

                hideElement(activity);
            }
            // right
            function hideRightContainer() {
                let rightContainer = document.querySelector('.right-container.small-mode.is-in-large-ab');

                if (rightContainer) {
                    let multiPage = document.getElementById('multi_page');

                    if (multiPage) {
                        // do nothing
                        hideRight(rightContainer, false);
                    }
                    else {
                        hideRight(rightContainer, true);
                    }
                }
            }

            for (let mutation of mutationsList) {
                if (mutation.type == 'childList') {
                    hideLeftEntry();
                    hideSearchPlaceHolder();
                    hideAdvertisement();
                    hideRecommendList();
                    hideLive();
                    hideActivity();
                    hideRightContainer();
                }
            }
        };

        const observer = new MutationObserver(appCallback);
        observer.observe(appContainer, { childList: true, subtree: true });
    }

    // ===== hide utils
    // hide element
    function hideElement(ele) {
        if (ele) {
            ele.style.display = 'none';
        }
    }
    // move search bar
    function moveSearch(flag) {
        let search = document.querySelector('.center-search__bar');

        if (search) {
            // right
            if (flag == 1) {
                search.style.margin = '0 0 0 auto';
            }
            // center
            else if (flag == 2) {
                search.style.margin = '0 auto';
            }
        }
    }
    // hide utils =====
})();