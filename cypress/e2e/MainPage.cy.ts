describe('template spec', () => {
	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.visit('http://localhost:3000');
	});

	it('перетаскивание ингредиента в конструктор', () => {
		cy.contains('Краторная булка N-200i').trigger('dragstart');
		cy.contains('Пожалуйста перетащите булку сюда')
			.trigger('dragenter')
			.trigger('dragover')
			.trigger('drop');
	});

	it('открытие модального окна с описанием ингредиента', () => {
		cy.contains('Краторная булка N-200i').click();
		cy.contains('Детали ингредиента');
	});

	it('отображение в модальном окне данных ингредиента', () => {
		cy.contains('Краторная булка N-200i').click();
		cy.contains('Детали ингредиента');
	});

	it('открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
		cy.contains('Краторная булка N-200i').trigger('dragstart');
		cy.contains('Пожалуйста перетащите булку сюда')
			.trigger('dragenter')
			.trigger('dragover')
			.trigger('drop');

		cy.contains('Соус Spicy-X').trigger('dragstart');
		cy.get('#BurgerConstructor')
			.trigger('dragenter')
			.trigger('dragover')
			.trigger('drop');

		cy.contains('Оформить заказ').click();

		cy.get('input').first().type('123@test.ru');
		cy.get('input').last().type('123@test.ru');

		cy.get('button').click();

		cy.contains('Оформить заказ').click();

		cy.contains('Ваш заказ начали готовить');
	});

	it('закрытие модальных окон при клике на кнопку закрытия', () => {
		cy.contains('Краторная булка N-200i').click();
		cy.get('#modals button').click();
		cy.contains('Детали ингредиента').should('not.exist');
	});
});
