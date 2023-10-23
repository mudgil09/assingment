const fetchJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const populateDropdown = (dropdown, data, valueKey, textKey) => {
  dropdown.innerHTML = `<option value="">Select ${textKey}</option>`;
  data.forEach(item => {
    const option = document.createElement('option');
    option.value = item[valueKey];
    option.text = item[textKey];
    dropdown.appendChild(option);
  });
};

const onCountryChange = async () => {
  const countryCode = document.getElementById('country').value;
  const stateDropdown = document.getElementById('state');
  const cityDropdown = document.getElementById('city');

  stateDropdown.innerHTML = '<option value="">Select State</option>';
  cityDropdown.innerHTML = '<option value="">Select City</option>';

  if (countryCode) {
    try {
      const states = await fetchJson(`https://d32sbion19muhj.cloudfront.net/pub/interview/states?country=${countryCode}`);
      populateDropdown(stateDropdown, states, 'state_code', 'state_name');
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  }
};

const onStateChange = async () => {
  const stateCode = document.getElementById('state').value;
  const cityDropdown = document.getElementById('city');

  cityDropdown.innerHTML = '<option value="">Select City</option>';

  if (stateCode) {
    try {
      const cities = await fetchJson(`https://d32sbion19muhj.cloudfront.net/pub/interview/cities?state=${stateCode}`);
      populateDropdown(cityDropdown, cities, 'city_code', 'city_name');
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  }
};

// Attach event listeners
document.getElementById('country').addEventListener('change', onCountryChange);
document.getElementById('state').addEventListener('change', onStateChange);

// Initial population of the country dropdown
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const countries = await fetchJson('https://d32sbion19muhj.cloudfront.net/pub/interview/countries');
    populateDropdown(document.getElementById('country'), countries, 'alpha2Code', 'name');
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
});
