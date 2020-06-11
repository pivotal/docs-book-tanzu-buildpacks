describe("Collapsible", function() {
    beforeEach(function() {
        this.nav = $(
                '<span>' +
                '    <span id="item" class="js-menu-item">' +
                '        <span id="title" class="js-menu-title"/>' +
                '        <span id="content1" class="js-menu-content">foo</span>' +
                '        <span id="content2" class="js-menu-content">bar</span>' +
                '    </span>' +
                '</span>'
                );
        this.item = this.nav.find("#item");
        this.content1 = this.nav.find("#content1");
        this.content2 = this.nav.find("#content2");
        this.title = this.nav.find("#title");
    });

    it("toggles height of content elements when title is clicked", function() {
        expect(this.content1.height()).toEqual(0);
        expect(this.content2.height()).toEqual(0);
        CFDocs.Collapsible(this.nav.get(0));
        this.title.click();
        expect(this.content1.height()).toEqual(1);
        expect(this.content2.height()).toEqual(1);
    });

    it("adds the is-clicked class to the menu item", function() {
        expect(this.item).not.toHaveClass("is-clicked");
        CFDocs.Collapsible(this.nav.get(0));
        this.title.click();
        expect(this.item).toHaveClass("is-clicked");
    });
});
