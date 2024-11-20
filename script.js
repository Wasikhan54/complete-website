// Toggle Navigation Menu


document.addEventListener('DOMContentLoaded', () => {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const menu = document.getElementById('menu');
  const menuLinks = document.querySelectorAll('#menu a'); // Select all links inside the menu

  // Toggle menu visibility when hamburger is clicked
  hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerMenu.classList.remove('active');
      menu.classList.remove('active');
    });
  });
});

function toggleNav() {
  document.getElementById("topNav").classList.toggle("active");
  document.querySelector(".nav-btn").classList.toggle("active");
}
function showContent(contentId) {
  // Hide all content sections
  document.querySelectorAll('.content').forEach(section => {
      section.style.display = 'none';
  });

  // Show the selected content section
  document.querySelector(`.content.${contentId}`).style.display = 'block';

  // Remove active class from all buttons
  document.querySelectorAll('.list button').forEach(button => {
      button.classList.remove('active');
  });

  // Add active class to the clicked button
  document.querySelector(`button[onclick="showContent('${contentId}')"]`).classList.add('active');
}

// Show the default section on page load (optional)
document.addEventListener("DOMContentLoaded", () => {
  showContent('logo-div');
});



// Tabbing


// JavaScript function to show the selected tab and hide others
function showTab(tabClass) {
  // Hide all tab contents
  document.querySelectorAll('.tab-content > div').forEach((tab) => {
      tab.style.display = 'none';
  });
  // Display the selected tab
  document.querySelector(`.${tabClass}`).style.display = 'block';
}

// Optional: Show the default tab on page load
document.addEventListener("DOMContentLoaded", () => {
  showTab('tab-logo'); // Default tab to show
});

function showPricing(tabId) {
    // Hide all tab contents
    const tabs = document.querySelectorAll('.tabprice-content');
    tabs.forEach(tab => {
      tab.style.display = 'none';
    });

    // Show the selected tab content
    const activeTab = document.getElementById(tabId);
    if (activeTab) {
      activeTab.style.display = 'block';
    }
  }

  // Array to hold titles and descriptions for each step
const stepData = [
  {
    img:"./assets/images/process-01.png",
      title: "Research",
      description: "Once your order is confirmed, our project management team gets started on research to evaluate the industry and competitors of your brand. This allows them to wireframe something that is not only befitting for your business model but also effectively communicates with your audience."
  },
  {
      img:"./assets/images/process-02.png",
      title: "Ideation",
      description: "Once our research is completed, our experts draft out the basic design ideas. These concepts are simply blueprints or mockups which are a first step towards creating exceptional web experiences that will communicate and connect the web visitors with your brand."
  },
  {
      img:"./assets/images/process-03.png",
      title: "Design",
      description: "Once the basic version has been created, the head designers will work on converting your blueprints into finished design layouts. In case you are unable to provide us with specific content, we will use dummy content to finish the layout and our content team will work on creating content for your website"
  },
  {
      img:"./assets/images/process-04.png",
      title: "Revisions",
      description: "You might come with different ideas or not agree with the overall experience that we craft: hence we will give you the freedom to get your website customized just according to your preference. Your feedback will not only be valued but also implemented."
  },
  {
      img:"./assets/images/process-05.png",
      title: "Development",
      description: "You might come with different ideas or not agree with the overall experience that we craft: hence we will give you the freedom to get your website customized just according to your preference. Your feedback will not only be valued but also implemented."
  },
  {
      img:"./assets/images/process-06.png",
      title: "Finalization",
      description: "Once you are 100% satisfied with your design, content, functionalities and imagery of the website, we will finalize your website. Our team of experts will go ahead with the final launch of your website and handover the project to you after the official closure."
  }
];

// Function to activate a specific step
function activateStep(index) {
  // Update the active step styling
  document.querySelectorAll('.step').forEach((step, i) => {
    if (i === index) {
      step.classList.add('active');
    } else {
      step.classList.remove('active');
    }
  });

  // Update the content based on the selected step
  document.getElementById("step-title").innerText = stepData[index].title;
  document.getElementById("step-description").innerText = stepData[index].description;
  document.getElementById("step-img").src = stepData[index].img; // Updated ID here
}

// Initialize the first step as active on page load
document.addEventListener("DOMContentLoaded", () => {
  activateStep(0);
});



// Testimonial


const slider = document.querySelector(".testimonial-slider");
const testimonials = document.querySelectorAll(".testimonial");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const dotsContainer = document.querySelector(".dots-container");

let currentIndex = 0;
let touchStartX = 0;
let touchEndX = 0;
let autoSlideInterval;

//* event listeners

function initApp() {
  slider.addEventListener("touchstart", handleTouchStart);
  slider.addEventListener("touchend", handleTouchEnd);
  slider.addEventListener("mouseover", stopAutoSlide);
  slider.addEventListener("mouseleave", startAutoSlide);
  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);
}

//* auto slide

function startAutoSlide() {
  autoSlideInterval = setInterval(nextTestimonial, 5000); // 5s
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

//* touch navigation

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
  touchEndX = event.changedTouches[0].clientX;

  handleTouchSwipe();
}

function handleTouchSwipe() {
  const swipeThreshold = 50; // swipe sensitivity

  if (touchStartX - touchEndX > swipeThreshold) {
    nextTestimonial(); // swipe left
  } else if (touchEndX - touchStartX > swipeThreshold) {
    prevTestimonial(); // swipe right
  }
}

//* dot navigation

function renderDotButtons() {
  for (let i = 0; i < testimonials.length; i++) {
    const button = document.createElement("button");
    button.classList.add("dot");
    button.classList.toggle("active", i === currentIndex);
    button.ariaLabel = `Jump to Testimonial ${i + 1}`;
    button.addEventListener("click", () => showTestimonial(i));
    dotsContainer.appendChild(button);
  }
}

//* slide functions

function showTestimonial(index) {
  currentIndex = index;

  // update slide position
  testimonials.forEach((testimonial) => {
    testimonial.style.transform = `translateX(${-index * 100}%)`;
  });

  // update active dot
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

function nextTestimonial() {
  const nextIndex = (currentIndex + 1) % testimonials.length;
  showTestimonial(nextIndex);
}

function prevTestimonial() {
  const prevIndex =
    (currentIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(prevIndex);
}

//* initialize

document.addEventListener("DOMContentLoaded", function () {
  renderDotButtons();
  startAutoSlide();
  initApp();
});

function expandBox() {
  const box1 = document.querySelector('.box1');
  box1.classList.toggle('expanded');  // Toggle the expanded class on click
}



  // Function to animate numbers
  function animateCounter(element, start, end, duration) {
  let range = end - start;
  let current = start;
  let increment = end > start ? 1 : -1;
  let stepTime = Math.abs(Math.floor(duration / range));
  
  let counterInterval = setInterval(() => {
    current += increment;
    element.innerText = current;
    
    if (current === end) {
      clearInterval(counterInterval);
    }
  }, stepTime);
}

// Trigger animation on page load
window.onload = function() {
  let counters = document.querySelectorAll('.counter-sec h3');
  
  counters.forEach(counter => {
    let targetNumber = parseInt(counter.getAttribute('data-target'));
    let startNumber = parseInt(counter.innerText); // Start from the current number in the HTML
    let duration = 1000; // Duration of the animation in ms (1 second)
    
    animateCounter(counter, startNumber, targetNumber, duration);
  });
};



//  animation
  document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
      duration: 1200, // Animation duration in milliseconds
      once: true,     // Whether the animation should happen only once
      offset: 200     // Distance from the bottom of the screen to start the animation
    });
  });
