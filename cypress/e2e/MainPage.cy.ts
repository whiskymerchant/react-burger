describe('template spec', () => {
	const testUrl = 'http://localhost:3000';
	const testBun = 'Краторная булка N-200i';
	const dropTarget = 'Пожалуйста перетащите булку сюда';
	const ingredientDetails = 'Детали ингредиента';

	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.visit(testUrl);
	});

	it('перетаскивание ингредиента в конструктор', () => {
		cy.contains(testBun).trigger('dragstart');
		cy.contains(dropTarget)
			.trigger('dragenter')
			.trigger('dragover')
			.trigger('drop');
	});

	it('открытие модального окна с описанием ингредиента', () => {
		cy.contains(testBun).click();
		cy.contains(ingredientDetails);
	});

	it('отображение в модальном окне данных ингредиента', () => {
		cy.contains(testBun).click();
		cy.contains(ingredientDetails);
	});

	it('открытие модального окна с данными о заказе при клике по кнопке «Оформить заказ»', () => {
		cy.contains(testBun).trigger('dragstart');
		cy.contains(dropTarget)
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

		cy.contains('Ваш заказ начали готовить').click();
	});

	it('закрытие модальных окон при клике на кнопку закрытия', () => {
		cy.contains(testBun).click();
		cy.get('#modals button').click();
		cy.contains(ingredientDetails).should('not.exist');
	});
});
