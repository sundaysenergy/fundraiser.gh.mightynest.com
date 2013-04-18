'use strict';

describe('Controller: FaqCtrl', function () {

  var faqMock = [
    {"content": "---\ntitle: Who is MightyNest?\ngroup: faq\norder: 1\n\n---\n\nMightyNest.com makes it easy to research and buy a wide selection of natural, organic and non-toxic products all in one place. All of the products we sell are free from known toxic ingredients such as: BPA, PVC, Phthalates, Lead, Melamine, Formaldehyde, Flame retardants, Parabens and more. And we test products with our own families to make sure they are durable and well-designed. Our mission is to help families live a Mighty Life: a healthy, active and mindful life.", "name": "1-who-is-mightynest.md"},
    {"content": "---\ntitle: How does the Mighty Schools program work?\ngroup: faq\norder: 2\n\n---\n\nMightyNest gives families the opportunity to donate 15% of their purchases to their schools. The school does not need to worry about carrying product or filling orders--MightyNest will take care of everything. The school simply promotes the program to the school community (via email, post information to the school web site, or sending home a flyer or catalog). The program is headache-free for the school. It is popular with parents as well because the kids will not asked to be salespeople and only high-quality products are sold.", "name": "2-how-the-program-works.md"},
    {"content": "---\ntitle: What do you mean by &quot;mighty&quot;?\ngroup: faq\nweight: 3\n\n---\n\nWe mean healthy, active, and mindful. It's about a certain attitude towards life. Empowered and engaged, positive and alive. Not taking things for granted. Seeking information and making decisions that are positive for self, family, community and planet.", "name": "3-what-is-mighty.md"},
    {"content": "---\ntitle: How does this program make my school &quot;mighty&quot;?\ngroup: faq\nweight: 4\n\n---\n\nIt allows you to raise funds that can be used to support healthy, active and mindful programs and provide information that helps parents and schools live healthy, active and mindful lives. Our goal is to engage the school community, making it easier for the school, PTA or green committee to achieve their program goals--not just fundraising goals.", "name": "4-how-this-makes-my-school-mighty.md"},
    {"content": "---\ntitle: What kinds of schools can participate?\ngroup: faq\nweight: 5\n\n---\n\nWe are currently enrolling pre/K through elementary schools in the United States. Use the form above to find and select your school. Email us at schools@mightynest.com if your school does not appear on the list.", "name": "5-what-kinds-of-schools-participate.md"},
    {"content": "---\ntitle: Why isn't my school in the list?\ngroup: faq\nweight: 6\n\n---\n\nTo find your school, enter the school's zip code and begin typing the first few letters of the school name in the school field. Only US schools with pre/K through elementary grades are currently being enrolled. If your school fits those criteria but is not on the list, please send us details to schools@mightynest.com. If your school is a middle or high school and you would like us to contact you should the program be expanded, send your information to schools@mightynest.com.", "name": "6-why-school-not-listed.md"},
    {"content": "---\ntitle: How does the program get marketed to my school?\ngroup: faq\nweight: 7\n\n---\n\nMightyNest creates custom marketing materials for your school. Most of these materials are electronic, and can be sent to parents over email. We will send your school the exact email message, so all you have to do is hit &quot;send.&quot; We create an individual fundraising web page for your school and also communicate with parents through an opt-in newsletter containing helpful articles and tips for healthy living.", "name": "7-how-this-markets-my-school.md"},
    {"content": "---\ntitle: Is anything required of my school to participate?\ngroup: faq\nweight: 8\n\n---\n\nThere is nothing required to create an account and start accruing a donation balance. Sign-up your school above to get started. To achieve meaningful fundraising results will require some word of mouth and school or PTA involvement. Get the ball rolling by sharing your school's fundraising page with other school families.", "name": "8-school-requirements.md"},
    {"content": "---\ntitle: I still have questions.\ngroup: faq\nweight: 9\n\n---\n\nWe'd be happy to answer them. Contact us at schools@mightynest.com.", "name": "9-more-questions.md"}
  ];

  // load the controller's module
  beforeEach(module('mightynestApp'));

  var controller, scope, httpBackend, _config;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope, _$httpBackend_, config) {
    httpBackend = _$httpBackend_;
    _config = config;

    scope = $rootScope.$new();

    controller = $controller('FaqCtrl', {
      $scope: scope
    });
  }));

  beforeEach(function () {
    console.log(_config.FAQ_URL);
  });

  describe('parseFaqItems', function () {
    it('should return array of the same length as passed', function () {
      expect(scope.parseFaqItems(faqMock)).toHaveLength(faqMock.length);
    });
  });
});