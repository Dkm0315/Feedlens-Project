// Function to fetch data from the mock API
async function fetchData() {
  const response = await fetch('http://localhost:3000/reviews');
  const data = await response.json();
  return data;
}

// Function to populate the filters
function populateFilters() {
  // Simulated data for filters
  const filtersData = {
    dates: ['All', '2023-07-20', '2023-07-21', '2023-07-22'],
    appVersions: ['All', '1.0', '1.1', '1.2', '1.3'],
    ratings: ['All', 1, 2, 3, 4, 5],
  };

  const dateSelect = document.getElementById('date');
  filtersData.dates.forEach(date => {
    const option = document.createElement('option');
    option.value = date;
    option.textContent = date;
    dateSelect.appendChild(option);
  });

  const appVersionSelect = document.getElementById('app-version');
  filtersData.appVersions.forEach(version => {
    const option = document.createElement('option');
    option.value = version;
    option.textContent = version;
    appVersionSelect.appendChild(option);
  });

  const ratingSelect = document.getElementById('rating');
  filtersData.ratings.forEach(rating => {
    const option = document.createElement('option');
    option.value = rating;
    option.textContent = rating === 'All' ? rating : `${rating} Stars`;
    ratingSelect.appendChild(option);
  });
}

// Function to create a new review card
function createReviewCard(reviewData) {
  // Create a new div element for the review card
  const reviewCard = document.createElement('div');
  reviewCard.classList.add('review-card');

  // Create stars based on the rating
  const ratingStars = '\u2605'.repeat(reviewData.rating) + '\u2606'.repeat(5 - reviewData.rating);

  // Add the review data to the review card
  reviewCard.innerHTML = `
    <div class="rating">${ratingStars}</div>
    <div class="reviewer">${reviewData.reviewer}</div>
    <div class="review-type">${reviewData.reviewType}</div>
    <div class="review-date">${reviewData.date}</div>
    <div class="review-text">${reviewData.reviewText}</div>
    <div class="likes"><i class="fas fa-thumbs-up"></i> ${reviewData.likes}</div>
  `;

  // Append the review card to the reviews section
  const reviewCards = document.getElementById('reviewCards');
  reviewCards.appendChild(reviewCard);
}

// Function to filter reviews based on the selected filters
function filterReviews() {
  // Get selected filter values
  const selectedDate = document.getElementById('date').value;
  const selectedAppVersion = document.getElementById('app-version').value;
  const selectedRating = document.getElementById('rating').value;

  // Clear the existing reviews
  const reviewCards = document.getElementById('reviewCards');
  reviewCards.innerHTML = '';

  // Fetch data from the mock API
  fetchData().then(data => {
    // Filter reviews based on selected filters
    const filteredReviews = data.filter(review => {
      const dateMatch = selectedDate === 'All' || review.date === selectedDate;
      const appVersionMatch = selectedAppVersion === 'All' || review.appVersion === selectedAppVersion;
      const ratingMatch = selectedRating === 'All' || review.rating === parseInt(selectedRating);

      return dateMatch && appVersionMatch && ratingMatch;
    });

    // Create review cards for the filtered reviews
    filteredReviews.forEach(review => {
      createReviewCard(review);
    });
  });
}

// Add event listener for the Apply button to apply filters
document.getElementById('applyFilters').addEventListener('click', filterReviews);

// Add event listener for the Reset button to clear filters and display all reviews
document.getElementById('resetFilters').addEventListener('click', () => {
  document.getElementById('date').value = 'All';
  document.getElementById('app-version').value = 'All';
  document.getElementById('rating').value = 'All';
  filterReviews();
});

// Populate the filters on page load
populateFilters();

// Fetch data from the mock API and create review cards for each review
fetchData().then(data => {
  data.forEach(review => {
    createReviewCard(review);
  });
});
