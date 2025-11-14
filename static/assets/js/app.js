document.addEventListener("DOMContentLoaded", function () {
  // Search Functionality
  const openSearchBtn = document.getElementById("open-search");
  const closeSearchBtn = document.getElementById("close-search");
  const searchOverlay = document.getElementById("search-overlay");
  const searchInput = document.getElementById("search-input");
  const productGrid = document.getElementById("product-grid");
  const productCards = productGrid.querySelectorAll(".product-card");
  const noResultsMsg = document.getElementById("no-results");

  function openSearch() {
    searchOverlay.classList.remove("hidden");
    setTimeout(() => {
      searchOverlay.classList.remove("opacity-0");
      searchInput.focus();
    }, 10);
  }

  function closeSearch() {
    searchOverlay.classList.add("opacity-0");
    setTimeout(() => {
      searchOverlay.classList.add("hidden");
    }, 300);
  }

  function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let visibleProducts = 0;

    productCards.forEach((card) => {
      const searchTerms = card.dataset.searchTerms.toLowerCase();
      if (searchTerms.includes(searchTerm)) {
        card.style.display = "block";
        visibleProducts++;
      } else {
        card.style.display = "none";
      }
    });

    noResultsMsg.style.display = visibleProducts === 0 ? "block" : "none";
  }

  if (openSearchBtn) openSearchBtn.addEventListener("click", openSearch);
  if (closeSearchBtn) closeSearchBtn.addEventListener("click", closeSearch);
  if (searchInput) searchInput.addEventListener("input", filterProducts);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !searchOverlay.classList.contains("hidden")) {
      closeSearch();
    }
  });

  if (searchInput)
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault(); // Prevent form submission if it's in a form
        closeSearch();
      }
    });

  // Carousel Functionality
  const carousel = document.getElementById("carousel");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const indicatorsContainer = document.getElementById("indicators");

  if (carousel) {
    const items = carousel.querySelectorAll(".carousel-item");
    const totalItems = items.length;
    let currentIndex = 0;
    let autoSlideInterval;

    // Create indicators
    for (let i = 0; i < totalItems; i++) {
      const button = document.createElement("button");
      button.classList.add(
        "w-2",
        "h-2",
        "rounded-full",
        "transition-colors",
        "duration-300"
      );
      button.dataset.index = i;
      indicatorsContainer.appendChild(button);
    }
    const indicators = indicatorsContainer.querySelectorAll("button");

    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle("bg-gray-800", index === currentIndex);
        indicator.classList.toggle("bg-gray-400", index !== currentIndex);
      });
    }

    function goToNext() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }

    function goToPrev() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }

    function startAutoSlide() {
      stopAutoSlide(); // Ensure no multiple intervals are running
      autoSlideInterval = setInterval(goToNext, 2000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener("click", () => {
      goToNext();
      startAutoSlide(); // Reset timer on manual navigation
    });

    prevBtn.addEventListener("click", () => {
      goToPrev();
      startAutoSlide(); // Reset timer on manual navigation
    });

    indicators.forEach((indicator) => {
      indicator.addEventListener("click", (e) => {
        currentIndex = parseInt(e.target.dataset.index);
        updateCarousel();
        startAutoSlide(); // Reset timer on manual navigation
      });
    });

    // Pause on hover
    carousel.parentElement.addEventListener("mouseenter", stopAutoSlide);
    carousel.parentElement.addEventListener("mouseleave", startAutoSlide);

    // Initialize
    updateCarousel();
    startAutoSlide();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".thumbnail-image");

  thumbnails.forEach((thumb) => {
    thumb.addEventListener("click", function () {
      const newSrc = this.dataset.largeSrc;
      const newAlt = this.alt;

      // If the clicked image is already displayed, do nothing
      if (newSrc === mainImage.src) {
        return;
      }

      // Fade out the current image
      mainImage.classList.add("opacity-0");

      // Wait for the fade-out transition to finish
      mainImage.addEventListener(
        "transitionend",
        function changeImage() {
          // Change the image source
          mainImage.src = newSrc;
          mainImage.alt = newAlt;

          // Fade the new image back in
          mainImage.classList.remove("opacity-0");

          // Remove this event listener so it only runs once per click
          mainImage.removeEventListener("transitionend", changeImage);
        },
        { once: true }
      ); // { once: true } is a shorthand for the above line

      // Update the active state border on thumbnails immediately
      thumbnails.forEach((t) => t.classList.remove("ring-2", "ring-gray-900"));
      this.classList.add("ring-2", "ring-gray-900");
    });
  });
});

// --- VISUAL ONLY: CATEGORY BUTTON ACTIVE STATE ---
const filterButtons = document.querySelectorAll(".category-filter button");

if (filterButtons.length > 0) {
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // First, reset all buttons to the inactive (light) style
      filterButtons.forEach((btn) => {
        btn.classList.remove("bg-gray-900", "text-white", "border-gray-900");
        btn.classList.add(
          "bg-white",
          "text-gray-700",
          "border-gray-300",
          "hover:bg-gray-100",
          "hover:border-gray-400"
        );
      });

      // Then, apply the active (dark) style ONLY to the clicked button
      this.classList.add("bg-gray-900", "text-white", "border-gray-900");
      this.classList.remove(
        "bg-white",
        "text-gray-700",
        "border-gray-300",
        "hover:bg-gray-100",
        "hover:border-gray-400"
      );
    });
  });
}
