'use strict';

/* Controllers */
  // 42 http://mightynest.com/mightynest/user/json
mightynestApp
  .constant('config', {
    URLS: {
      //https://api.github.com/repos/westbroadway/northmpls_content/contents/business.json
      HEADER_CONTENT: 'https://api.github.com/repos/MightyNest/mightyschool_content/contents/fundraiser_header.yml'
    },
    GITHUB_HEADERS: {headers: {"Accept": "application/vnd.github.raw"}},
    JSON_API_DOMAIN: 'http://mightynest.com/',
    FAQ_URL: 'http://github.webscript.io/dir_content?repo=mightynest/mightyschool_content&dir=faq'
  });