import recipes from '../../data/recipes.js';
import domElements from '../domElements.js';
import { hideElement, showElement } from '../tools/element.js';
import isInputMainAndTagsIncludesInRecipe from './tools.js';

export const updateRecipes = () => {
  const input = domElements.inputMain.value;
  const allDomRecipes = document.querySelectorAll('.recipe');
  let isRecipe = false;

  // console.time('for');

  for (let index = 0; index < recipes.length; index += 1) {
    const thisDomRecipe = Array.from(allDomRecipes).find(
      (domRecipe) => Number(domRecipe.dataset.id) === Number(recipes[index].id)
    );

    if (isInputMainAndTagsIncludesInRecipe(recipes[index], input)) {
      showElement(thisDomRecipe);
      isRecipe = true;
    } else {
      hideElement(thisDomRecipe);
    }
  }

  // console.timeEnd('for');

  if (!isRecipe) {
    hideElement(domElements.allRecipes);
    showElement(domElements.noRecipe);
    return;
  }

  showElement(domElements.allRecipes);
  hideElement(domElements.noRecipe);
};

export const updateRecipesWithoutInputMain = () => {
  showElement(domElements.allRecipes);
  hideElement(domElements.noRecipe);

  domElements.allRecipes.childNodes.forEach((domRecipe) => {
    const thisRecipe = recipes.find(
      (recipe) => recipe.id === Number(domRecipe.dataset.id)
    );

    if (isInputMainAndTagsIncludesInRecipe(thisRecipe, '')) {
      showElement(domRecipe);
      return;
    }
    hideElement(domRecipe);
  });
};
