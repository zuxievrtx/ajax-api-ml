$(document).ready(function () {
  // Function to fetch and display heroes based on selected class and search input
  function displayHeroes(selectedClass, searchText) {
    $.getJSON("heroes.json", function (data) {
      var heroData = data.data;

      // Filter heroes based on the selected class and search input
      var filteredHeroes = heroData.filter(function (hero) {
        return (
          (!selectedClass || hero.class === selectedClass) &&
          (!searchText ||
            hero.hero_name.toLowerCase().includes(searchText.toLowerCase()))
        );
      });

      // Clear previous heroes
      $("#heroesContainer").empty();

      // Loop through filtered heroes and create a card for each hero
      filteredHeroes.forEach(function (hero) {
        var heroCard = `<div class="col-md-3 mb-4">
                      <div class="card">
                          <img src="${hero.portrait}" class="card-img-top" alt="${hero.hero_name}">
                          <div class="card-body">
                              <h5 class="card-title">${hero.hero_name}</h5>
                              <p class="card-text"><strong>Class:</strong> ${hero.class}</p>
                              <p class="card-text"><strong>Release Year:</strong> ${hero.release_year}</p>
                              <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${hero.uid}Modal">
                                  View Details
                              </button>
                          </div>
                      </div>
                  </div>`;

        // Append the hero card to the container
        $("#heroesContainer").append(heroCard);

        // Create a modal for each hero with detailed information
        var heroModal = `<div class="modal fade" id="${hero.uid}Modal" tabindex="-1" aria-labelledby="${hero.uid}ModalLabel" aria-hidden="true">
                      <div class="modal-dialog">
                          <div class="modal-content">
                              <div class="modal-header">
                                  <h5 class="modal-title" id="${hero.uid}ModalLabel">${hero.hero_name} Details</h5>
                                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                              </div>
                              <div class="modal-body">
                                  <img src="${hero.portrait}" class="img-fluid mb-3" alt="${hero.hero_name}">
                                  <p><strong>Class:</strong> ${hero.class}</p>
                                  <p><strong>Release Year:</strong> ${hero.release_year}</p>
                                  <h6 class="mt-3">Skills:</h6>
                                  <ul>`;

        // Loop through skills and add them to the modal
        hero.skills.forEach(function (skill) {
          heroModal += `<li><strong>${skill.skill_name}:</strong> ${skill.description}</li>`;
        });

        heroModal += `</ul>
                              </div>
                              <div class="modal-footer">
                                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                              </div>
                          </div>
                      </div>
                  </div>`;

        // Append the modal to the body
        $("body").append(heroModal);
      });
    }).fail(function () {
      console.log("Error fetching data from the online API");
    });
  }

  // Call the function to display all heroes on page load
  displayHeroes("", "");

  // Handle change event on class select
  $("#classSelect").change(function () {
    var selectedClass = $(this).val();
    var searchText = $("#heroSearchInput").val();
    displayHeroes(selectedClass, searchText);
  });

  // Handle keyup event on hero search input
  $("#heroSearchInput").keyup(function () {
    var selectedClass = $("#classSelect").val();
    var searchText = $(this).val();
    displayHeroes(selectedClass, searchText);
  });
});
