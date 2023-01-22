/// <reference types="cypress" />

context('Casos de Prueba e2e iniciar sesión', () => {

    beforeEach(() => {

        cy.visit('http://localhost:3000/');
    });

    it('Iniciar sesión con nick', () => {

        // Existe un input con ese placeholder
        cy.get('input').should('have.attr', 'placeholder', 'Introduce tu nick (max 6 letras)');

        // Existe un botón de iniciar sesión
        cy.get('#btnAU').should('have.text', 'Iniciar sesión').should('exist');

        // Escribe el nick el nick e inicia sesión
        cy.get('input').type('pepe');
        cy.wait(1000);
        
        // Pulsa iniciar sesión
        cy.get('#btnAU').click();
        cy.wait(1000);

        // Salimos para borrar la cookie
        cy.get('#btnS').click();
        cy.wait(1000);
    });

    it('Iniciar sesión con google', () => {

        // Existe un botón de acceder con google
        cy.get('a').should('have.text', 'Accede con Google').should('exist');
        cy.get('a').click();
        cy.origin('https://accounts.google.com', () => {
            cy.get('input[type="email"]').type('yasincna@gmail.com');
            cy.get('button').click({ multiple: true, force: true });            
        });
    });


});

context('Casos de Prueba e2e Partidas', () => {

    beforeEach(() => {

        cy.visit('http://localhost:3000/');

        // Existe un input con ese placeholder
        cy.get('input').should('have.attr', 'placeholder', 'Introduce tu nick (max 6 letras)');

        // Existe un botón de iniciar sesión
        cy.get('#btnAU').should('have.text', 'Iniciar sesión').should('exist');

        // Escribe el nick el nick e inicia sesión
        cy.get('input').type('pepe');
        cy.get('#btnAU').click();
    });

    it('Crear partida', () => {

        // Hacemos click en crear partida
        cy.get('#btnCP').click();

        // Salimos para borrar la cookie
        cy.get('#btnS').click();

        // Se cierra el modal
        cy.contains('Cerrar').click();
    });

    it('Unirse partida', () => {

        // Hacemos click en la lista para unirnos a una partida
        cy.get('a').click();

        // Salimos para borrar la cookie
        cy.get('#btnS').click();

        // Se cierra el modal
        cy.contains('Cerrar').click();
    });


});

context('Casos de Prueba e2e Barcos y Jugar', () => {

    beforeEach(() => {

        cy.visit('http://localhost:3000/');

        // Existe un input con ese placeholder
        cy.get('input').should('have.attr', 'placeholder', 'Introduce tu nick (max 6 letras)');

        // Existe un botón de iniciar sesión
        cy.get('#btnAU').should('have.text', 'Iniciar sesión').should('exist');

        // Escribe el nick el nick e inicia sesión
        cy.get('input').type('pepe');
        cy.get('#btnAU').click();

        // Hacemos click en la lista para unirnos a una partida
        cy.get('a').click();
    });

    it('Colocar barcos y jugar', () => {

        // Hacemos click en crear partida
        cy.get('#b1').click();

        // Hacemos click en la casilla (0,0) para colocar el barco b1
        cy.get('.grid.human-player').find('.grid-cell.grid-cell-0-0').click();

        // Se cierra el modal
        cy.contains('Cerrar').click();


        // Hacemos click en crear partida
        cy.get('#b2').click();

        // Hacemos click en la casilla (0,1) para colocar el barco b2
        cy.get('.grid.human-player').find('.grid-cell.grid-cell-0-1').click();

        // Se cierra el modal
        cy.contains('Cerrar').click();


        // Hacemos click en crear partida
        cy.get('#b3').click();

        // Hacemos click en la casilla (0,2) para colocar el barco b3
        cy.get('.grid.human-player').find('.grid-cell.grid-cell-0-2').click();

        // Se cierra el modal
        cy.contains('Cerrar').click();


        // Hacemos click en crear partida
        cy.get('#b4').click();

        // Hacemos click en la casilla (0,1) para colocar el barco
        cy.get('.grid.human-player').find('.grid-cell.grid-cell-0-3').click();

        // Se cierra el modal
        cy.contains('Cerrar').click();

        // Esperamos 15 segundos para que el rival coloque los barcos
        cy.wait(15000);

        // Se cierra el modal de empezar a jugar
        cy.contains('Cerrar').click();

        // Esperamos 10 segundos para que el rival juegue y se equivoque
        cy.wait(10000);

        // Hacemos click en la casilla (0,0) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-0-0').click();
        cy.wait(1000);

        // Hacemos click en la casilla (0,1) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-0-1').click();
        cy.wait(1000);

        // Hacemos click en la casilla (0,1) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-1-1').click();
        cy.wait(1000);

        // Hacemos click en la casilla (0,2) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-0-2').click();
        cy.wait(1000);

        // Hacemos click en la casilla (1,2) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-1-2').click();
        cy.wait(1000);

        // Hacemos click en la casilla (2,2) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-2-2').click();
        cy.wait(1000);

        // Hacemos click en la casilla (0,3) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-0-3').click();
        cy.wait(1000);

        // Hacemos click en la casilla (1,3) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-1-3').click();
        cy.wait(1000);

        // Hacemos click en la casilla (2,3) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-2-3').click();

        // Hacemos click en la casilla (3,3) para disparar al barco rival
        cy.get('.grid.computer-player').find('.grid-cell.grid-cell-3-3').click();
        
        // Cerramos el modal
        cy.contains('Cerrar').click();

        // Cerramos sesión        
        cy.get('#btnS').click();
        cy.reload();
    });
});