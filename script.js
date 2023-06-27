// Fetch countries from the API
fetch('https://d32sbion19muhj.cloudfront.net/pub/interview/countries')
  .then(response => response.json())
  .then(data => {
    const countries = Array.from(data, country => ({
      code: country.alpha2Code,
      name: country.name
    }));

    const countryDropdown = document.getElementById('country');
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.code;
      option.text = country.name;
      countryDropdown.appendChild(option);
    });
  })
  .catch(error => {
    console.error('Error fetching countries:', error);
  });

// Attach an event listener to the country dropdown
document.getElementById('country').addEventListener('change', function() {
  const countryCode = this.value;

  // Clear state and city dropdowns
  document.getElementById('state').innerHTML = '<option value="">Select State</option>';
  document.getElementById('city').innerHTML = '<option value="">Select City</option>';

  if (countryCode) {
    // Fetch states based on the selected country
    fetch(`https://d32sbion19muhj.cloudfront.net/pub/interview/states?country=${countryCode}`)
      .then(response => response.json())
      .then(data => {
        const states = Array.from(data, state => ({
          code: state.state_code,
          name: state.state_name
        }));

        const stateDropdown = document.getElementById('state');
        states.forEach(state => {
          const option = document.createElement('option');
          option.value = state.code;
          option.text = state.name;
          stateDropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching states:', error);
      });
  }
});

// Attach an event listener to the state dropdown
document.getElementById('state').addEventListener('change', function() {
  const stateCode = this.value;

  // Clear city dropdown
  document.getElementById('city').innerHTML = '<option value="">Select City</option>';

  if (stateCode) {
    // Fetch cities based on the selected state
    fetch(`https://d32sbion19muhj.cloudfront.net/pub/interview/cities?state=${stateCode}`)
      .then(response => response.json())
      .then(data => {
        const cities = Array.from(data, city => ({
          code: city.city_code,
          name: city.city_name
        }));

        const cityDropdown = document.getElementById('city');
        cities.forEach(city => {
          const option = document.createElement('option');
          option.value = city.code;
          option.text = city.name;
          cityDropdown.appendChild(option);
        });
      })
      .catch(error => {
        console.error('Error fetching cities:', error);
      });
  }
});
