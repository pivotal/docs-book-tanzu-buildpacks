describe("HasSubMenu", function() {
    var toggleDuration;

    beforeEach(function() {
        toggleDuration = CFDocs.toggleDuration;
        CFDocs.toggleDuration = 0;
    });

    afterEach(function() {
        CFDocs.toggleDuration = toggleDuration;
    });

    describe("when no links are active", function() {
        beforeEach(function() {
            this.parentElement = $(
                    '<li>' +
                    '   <span id="passed-element" class="hasSubMenuClosed"/>' +
                    '   <ul id="nav-container">' +
                    '       <li>' +
                    '           <span>Some topic</span>' +
                    '           <ul id="nav">' +
                    '               <li>' +
                    '                   <span class="hasSubMenuClosed">Menu title</span>' +
                    '                   <ul id="subnav">' +
                    '                   </ul>' +
                    '               </li>' +
                    '           </ul>' +
                    '       </li>' +
                    '   </ul>' +
                    '</li>');
            this.passedElement = this.parentElement.find("#passed-element");
            this.navContainer = this.parentElement.find("#nav-container");
            this.nav = this.parentElement.find("#nav");
            setFixtures(this.parentElement);
        });

        it("hides subnavs", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.navContainer).toBeHidden();
        });

        it("doesn't show disclosure as opened", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.passedElement).not.toHaveClass("hasSubMenuOpened");
        });

        describe("when disclosure is clicked", function() {
            it("shows subnavs", function() {
                CFDocs.HasSubMenu(this.passedElement.get(0));
                this.passedElement.click();
                expect(this.nav).toBeVisible();
            });

            it("opens the disclosure", function() {
                CFDocs.HasSubMenu(this.passedElement.get(0));
                this.passedElement.click();
                expect(this.passedElement).toHaveClass("hasSubMenuOpened");
            });

            it("contradictorily keeps its closed class", function() {
                CFDocs.HasSubMenu(this.passedElement.get(0));
                this.passedElement.click();
                expect(this.passedElement).toHaveClass("hasSubMenuClosed");
            });
        });
    });

    describe("when a nav link is active", function() {
        beforeEach(function() {
            var currentUrl = window.location.pathname;
            this.parentElement = $(
                    '<li>' +
                    '   <span id="passed-element" class="hasSubMenuClosed"/>' +
                    '   <ul>' +
                    '       <li>' +
                    '           <span id="sub-element" class="hasSubMenuClosed">' +
                    '               <a href="' + currentUrl + '">foo</a>' +
                    '           </span>' +
                    '           <ul id="nav">' +
                    '               <li>This text makes me visible sometimes</li>' +
                    '           </ul>' +
                    '       </li>' +
                    '   </ul>' +
                    '</li>');
            this.passedElement = this.parentElement.find("#passed-element");
            this.subElement = this.parentElement.find("#passed-element");
            this.nav = this.parentElement.find("#nav");
            setFixtures(this.parentElement);
        });

        it("opens the disclosure", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.subElement).toHaveClass("hasSubMenuOpened");
        });

        it("shows the nav", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.nav).toBeVisible();
        });

        describe("when disclosure is clicked", function() {
            it("closes the disclosure", function() {
                CFDocs.HasSubMenu(this.passedElement.get(0));
                this.subElement.click();
                expect(this.subElement).not.toHaveClass("hasSubMenuOpened");
            });

            it("hides the sibling nav", function() {
                CFDocs.HasSubMenu(this.passedElement.get(0));

                expect(this.nav).toBeVisible();
                this.subElement.click();
                expect(this.nav).toBeHidden();
            });
        });
    });

    describe("when a top-level link is active, with child topic link and subnav", function() {
        beforeEach(function() {
            var currentUrl = window.location.pathname;
            this.parentElement = $(
                    '<li>' +
                    '   <span id="passed-element" class="hasSubMenuClosed">' +
                    '       <a href="' + currentUrl + '"/>' +
                    '   </span>' +
                    '   <ul>' +
                    '       <li>' +
                    '           <span id="topic">' +
                    '               <a href="/some/place">some text</a>' +
                    '           </span>' +
                    '           <ul id="subnav">' +
                    '               <li>' +
                    '                   <span id="disclosure" class="hasSubMenuClosed"/>' +
                    '                   <ul id="deepnav">' +
                    '                       <li>some text</li>' +
                    '                   </ul>' +
                    '               </li>' +
                    '           </ul>' +
                    '       </li>' +
                    '   </ul>' +
                    '</li>');
            this.passedElement = this.parentElement.find("#passed-element");
            this.topicLink = this.parentElement.find("#topic");
            this.subNav = this.parentElement.find("#subnav");
            this.deepNav = this.parentElement.find("#deepnav");
            this.deepNavDisclosure = this.parentElement.find("#disclosure");
            setFixtures(this.parentElement);
        });

        it("shows the topic link and closed subnav", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.topicLink).toBeVisible();
            expect(this.subNav).toBeVisible();
            expect(this.deepNav).toBeHidden();
            expect(this.deepNavDisclosure).toBeVisible();
            expect(this.deepNavDisclosure).not.toHaveClass("hasSubMenuOpened");
        });
    });

    describe("when a topic link is active, parallel to a subnav", function() {
        beforeEach(function() {
            var currentUrl = window.location.pathname;
            this.parentElement = $(
                    '<li>' +
                    '   <span id="passed-element" class="hasSubMenuClosed">' +
                    '       <a href="/some/place">hello</a>' +
                    '   </span>' +
                    '   <ul>' +
                    '       <li>' +
                    '           <span id="topic">' +
                    '               <a href="' + currentUrl + '"/>' +
                    '           </span>' +
                    '           <ul>' +
                    '               <li>' +
                    '                   <span id="disclosure" class="hasSubMenuClosed"/>' +
                    '                   <ul id="nav">' +
                    '                       <li>some text</li>' +
                    '                   </ul>' +
                    '               </li>' +
                    '           </ul>' +
                    '       </li>' +
                    '   </ul>' +
                    '</li>');
            this.passedElement = this.parentElement.find("#passed-element");
            this.nav = this.parentElement.find("#nav");
            this.navDisclosure = this.parentElement.find("#disclosure");
            setFixtures(this.parentElement);
        });

        it("closes sibling navs, showing their disclosures in the closed state", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.nav).toBeHidden();
            expect(this.navDisclosure).not.toHaveClass("hasSubMenuOpened");
        });
    });

    describe("when a deeply nested topic link is active", function() {
        beforeEach(function() {
            var currentUrl = window.location.pathname;
            this.grandParentElement = $(
                    '<li>' +
                    '   <span id="passed-element" class="hasSubMenuClosed"/>' +
                    '   <ul>' +
                    '       <li>' +
                    '           <span id="family1-disclosure" class="hasSubMenuClosed"/>' +
                    '           <ul id="family1">' +
                    '               <li>' +
                    '                   <span id="family1-subdisclosure" class="hasSubMenuClosed"/>' +
                    '                   <ul id="active-grandchild">' +
                    '                       <li>' +
                    '                           <span><a href="' + currentUrl + '"/></span>' +
                    '                       </li>' +
                    '                   </ul>' +
                    '               </li>' +
                    '               <li>' +
                    '                   <span class="hasSubMenuClosed"/>' +
                    '                   <ul id="inactive-grandchild">' +
                    '                       <li>' +
                    '                           <span><a href="/just/a/deep/nest"/></span>' +
                    '                       </li>' +
                    '                   </ul>' +
                    '               </li>' +
                    '           </ul>' +
                    '       </li>' +
                    '       <li>' +
                    '           <span id="family2-disclosure" class="hasSubMenuClosed"/>' +
                    '           <ul id="family2">' +
                    '               <li>' +
                    '                   <span class="hasSubMenuClosed"/>' +
                    '                   <ul id="cousin-of-active">' +
                    '                       <li>' +
                    '                           <span><a href="/just/another/deep/nest"/></span>' +
                    '                       </li>' +
                    '                   </ul>' +
                    '               </li>' +
                    '           </ul>' +
                    '       </li>' +
                    '   </ul>' +
                    '</li>');
            this.passedElement = this.grandParentElement.find("#passed-element");
            this.activeGrandchild = this.grandParentElement.find("#active-grandchild");
            this.inactiveGrandchild = this.grandParentElement.find("#inactive-grandchild");
            this.family1Disclosure = this.grandParentElement.find("#family1-disclosure");
            this.family1SubDisclosure = this.grandParentElement.find("#family1-subdisclosure");
            this.cousinOfActive = this.grandParentElement.find("#cousin-of-active");
            setFixtures(this.grandParentElement);
        });

        it("opens the hierarchy of subnavs that contain the active link", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.activeGrandchild).toBeVisible();
            expect(this.inactiveGrandchild).toBeHidden();
            expect(this.cousinOfActive).toBeHidden();
        });

        it("opens all ancestral disclosures", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.passedElement).toHaveClass("hasSubMenuOpened");
            expect(this.family1Disclosure).toHaveClass("hasSubMenuOpened");
            expect(this.family1SubDisclosure).toHaveClass("hasSubMenuOpened");
        });

        it("allows clicking of disclosure to close the subnav", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            this.family1SubDisclosure.click();
            expect(this.family1SubDisclosure).not.toHaveClass("hasSubMenuOpened");
            expect(this.passedElement).toHaveClass("hasSubMenuOpened");
            expect(this.family1Disclosure).toHaveClass("hasSubMenuOpened");
        });
    });

    describe("when a deeply nested nav link is active", function() {
        beforeEach(function() {
            var currentUrl = window.location.pathname;
            this.parentElement = $(
                    '<li>' +
                    '   <span id="passed-element" class="hasSubMenuClosed"/>' +
                    '   <ul>' +
                    '       <li>' +
                    '           <span class="hasSubMenuClosed"/>' +
                    '           <ul>' +
                    '               <li>' +
                    '                   <span class="hasSubMenuClosed">' +
                    '                       <a href="' + currentUrl + '">Foo</a>' +
                    '                   </span>' +
                    '                   <ul id="active-menu">' +
                    '                       <li>' +
                    '                           <span><a href="/some/place"/></span>' +
                    '                       </li>' +
                    '                   </ul>' +
                    '               </li>' +
                    '           </ul>' +
                    '       </li>' +
                    '   </ul>' +
                    '</li>');
            this.passedElement = this.parentElement.find("#passed-element");
            this.activeMenu = this.parentElement.find("#active-menu");
            setFixtures(this.parentElement);
        });

        it("shows the active menu", function() {
            CFDocs.HasSubMenu(this.passedElement.get(0));
            expect(this.activeMenu).toBeVisible();
        });
    });
});
