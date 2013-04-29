'use strict';

/* Controllers */
  // 42 http://mightynest.com/mightynest/user/json
mightynestApp
  .constant('config', {
    URLS: {
      JSON_API_ROOT: 'http://mightynest.com/',
      HEADER_CONTENT: 'https://api.github.com/repos/MightyNest/mightyschool_content/contents/fundraiser_header.yml',
      FAQ: 'http://github.webscript.io/dir_content?repo=mightynest/mightyschool_content&dir=faq'
    },
    GITHUB_HEADERS: {headers: {"Accept": "application/vnd.github.raw"}},
  });