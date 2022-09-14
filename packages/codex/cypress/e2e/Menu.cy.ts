describe( 'Menu', () => {
	it( 'Allows to limit the number of options shown', () => {
		cy.visit( 'http://localhost:5173#cdx-menu' );
		cy.get( '#cdx-menu-limit-items-input' ).type( '2' );
		cy.get( '#cdx-menu .cdx-text-input__input' ).click();
		cy.get( '#cdx-menu .cdx-menu-item' ).eq( 0 ).should( 'be.visible' );
		cy.get( '#cdx-menu .cdx-menu-item' ).eq( 1 ).should( 'be.visible' );
		cy.get( '#cdx-menu .cdx-menu-item' ).eq( 3 ).should( 'not.be.visible' );
	} );

	it( 'Scrolls as need when highlighting options with the keyboard', () => {
		cy.visit( 'http://localhost:5173#cdx-menu' );
		cy.get( '#cdx-menu-limit-items-input' ).type( '2' );
		cy.get( '#cdx-menu .cdx-text-input__input' ).click();

		cy.get( '#cdx-menu .cdx-text-input__input' ).type( '{downArrow}', { delay: 100 } );
		cy.get( '#cdx-menu .cdx-text-input__input' ).type( '{downArrow}', { delay: 100 } );
		cy.get( '#cdx-menu .cdx-text-input__input' ).type( '{downArrow}', { delay: 100 } );
		cy.get( '#cdx-menu .cdx-menu-item' ).eq( 0 ).should( 'not.be.visible' );
		cy.get( '#cdx-menu .cdx-menu-item' ).eq( 3 ).should( 'be.visible' );
	} );
} );
