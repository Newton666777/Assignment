


const mealContainer = document.getElementById("mealContainer");
const searchInput = document.getElementById("searchInput");

 const API_BASE = "https://www.themealdb.com/api/json/v1/1/";

/* Load default meals on page load */

 window.addEventListener("load", () => {
  fetchMeals("");
});

mealContainer.innerHTML = "🔄 ⏳ Loading ....."; 


/* 
   Fetch Meals by Search
 */
async function fetchMeals(query) {
  try {
    const response = await fetch(`${API_BASE}/search.php?s=${query}`);
    const data = await response.json();
    displayMeals(data.meals);
  } catch (error) {
    mealContainer.innerHTML = "<h2>Error loading meals</h2>";
    console.error(error);
  }
}


/* =========================
   Display Meals
========================= */
function displayMeals(meals) {
  mealContainer.innerHTML = "";

  if (!meals) {
    mealContainer.innerHTML = "<h2>No meals found</h2>";
    return;
  }

  meals.forEach(meal => {
    mealContainer.appendChild(createMealCard(meal));
  });
}

/* =========================
   Create Meal Card
========================= */
function createMealCard(meal) {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    <div class="card-body">
      <h3>${meal.strMeal}</h3>
      <button class="btn-details" onclick="mealDetails('${meal.idMeal}')">
        View Details
      </button>
    </div>
  `;

  return card;
}

/* 
   Search Button Handler
 */
function searchMeal() {
  const foodName = searchInput.value.trim();
  fetchMeals(foodName);
}

/*
   Meal Details
 */

async function mealDetails(id) {
  try {
    
    const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
    const data = await response.json();
    const meal = data.meals[0];

    showMealDetails(meal);
  } catch (error) {
    alert("Failed to load meal details");
    console.error(error);
  }
}

 /* 
   Show Meal Details
 */

function showMealDetails(meal) {
  document.getElementById("modalImg").src = meal.strMealThumb;
  document.getElementById("modalTitle").innerText = meal.strMeal;
  document.getElementById("modalCategory").innerText = meal.strCategory;
  document.getElementById("modalArea").innerText = meal.strArea;
  document.getElementById("modalInstructions").innerText = meal.strInstructions;

  document.getElementById("mealModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("mealModal").style.display = "none";
}


const btn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
});

function scrollUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}
