
const reviews = [
  {
    text: "Seamless Integration: Connect all your sales channels in one place with real-time data synchronization across multiple platforms.",
    author: "Sarah Johnson",
    role: "E-commerce Manager",
    preview: "Seamless Integration: Connect all your sales channels in one place..."
  },
  {
    text: "Time Dashboard: Monitor sales, revenue, inventory performance live with a clean and intuitive interface.",
    author: "Emily Rodriguez",
    role: "Cloud Synchronization in Real Time",
    preview: "Time Dashboard: Monitor sales, revenue, inventory performance live..."
  },
  {
    text: "Advanced Analytics: Get detailed insights into customer behavior, sales trends, and inventory management with powerful reporting tools.",
    author: "Michael Chen",
    role: "Business Intelligence Specialist",
    preview: "Advanced Analytics: Get detailed insights into customer behavior..."
  }
];



function changeReview(index) {
   
  let currentIndex = index;
  
  
  const leftIndex = (index - 1 + reviews.length) % reviews.length;
  const rightIndex = (index + 1) % reviews.length;
  
  // Update center card 
  document.getElementById('activeReviewText').textContent = reviews[index].text;
  document.getElementById('activeReviewAuthor').textContent = reviews[index].author;
  document.getElementById('activeReviewRole').textContent = reviews[index].role;
  
  
  const leftCard = document.getElementById('leftCard');
  leftCard.innerHTML = `
    <div class="text-center">
      <div class="font-bold text-base sm:text-lg bg-gradient-to-r from-homeTitleBlue to-servicesTextCyan bg-clip-text text-transparent mb-2">
        ${reviews[leftIndex].author}
      </div>
      <p class="text-gray-600 text-xs sm:text-sm line-clamp-4">
        ${reviews[leftIndex].preview}
      </p>
    </div>
  `;
  leftCard.parentElement.setAttribute('onclick', `changeReview(${leftIndex})`);
  
  
  const rightCard = document.getElementById('rightCard');
  rightCard.innerHTML = `
    <div class="text-center">
      <div class="font-bold text-base sm:text-lg bg-gradient-to-r from-homeTitleBlue to-servicesTextCyan bg-clip-text text-transparent mb-2">
        ${reviews[rightIndex].author}
      </div>
      <p class="text-gray-600 text-xs sm:text-sm line-clamp-4">
        ${reviews[rightIndex].preview}
      </p>
    </div>
  `;
  rightCard.parentElement.setAttribute('onclick', `changeReview(${rightIndex})`);
  
  // dots
  const dots = document.querySelectorAll('.review-dot');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove('bg-gray-300');
      dot.classList.add('bg-blue-600');
    } else {
      dot.classList.remove('bg-blue-600');
      dot.classList.add('bg-gray-300');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  changeReview(1); 
});
