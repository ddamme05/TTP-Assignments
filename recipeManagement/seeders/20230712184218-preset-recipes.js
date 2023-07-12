'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('recipes', [
      {
        id: 1,
        title: 'Classic Chocolate Chip Cookies',
        description: 'Delicious homemade chocolate chip cookies',
        ingredients: '1 cup unsalted butter, 1 cup granulated sugar, 1 cup brown sugar, 2 eggs, 1 teaspoon vanilla extract, 3 cups all-purpose flour, 1 teaspoon baking soda, 1/2 teaspoon salt, 2 cups chocolate chips',
        instructions: '1. Preheat oven to 375°F (190°C). 2. In a large bowl, cream together the butter, granulated sugar, and brown sugar. 3. Beat in the eggs and vanilla extract. 4. In a separate bowl, whisk together the flour, baking soda, and salt. 5. Gradually add the dry ingredients to the wet ingredients, mixing until just combined. 6. Stir in the chocolate chips. 7. Drop rounded spoonfuls of dough onto baking sheets. 8. Bake for 9-11 minutes or until golden brown. 9. Allow cookies to cool on the baking sheets for a few minutes, then transfer to wire racks to cool completely.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        title: 'Caprese Salad',
        description: 'A refreshing salad with tomatoes, mozzarella, and basil',
        ingredients: '2 large tomatoes, 8 ounces fresh mozzarella cheese, fresh basil leaves, extra virgin olive oil, balsamic glaze, salt, black pepper',
        instructions: '1. Slice the tomatoes and mozzarella cheese into thick slices. 2. Arrange the tomato and mozzarella slices on a serving plate, alternating them. 3. Tuck fresh basil leaves between the tomato and mozzarella slices. 4. Drizzle with extra virgin olive oil and balsamic glaze. 5. Season with salt and black pepper to taste. 6. Serve immediately.',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recipes', null, {});
  }
};
