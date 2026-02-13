(function () {
  const byId = (id) => document.getElementById(id);

  const generatePlanBtn = byId('generatePlanBtn');
  if (generatePlanBtn) {
    generatePlanBtn.addEventListener('click', () => {
      const destination = byId('destination').value;
      const days = Number(byId('days').value);
      const travelers = Number(byId('travelers').value);
      const style = byId('style').value;

      const ideas = {
        relax: ['sunset beach walk', 'spa time', 'cafe hopping'],
        adventure: ['hiking trail', 'boat ride', 'local food challenge'],
        nature: ['forest tour', 'bird watching', 'sunrise photography'],
        family: ['kid-friendly park', 'easy sightseeing', 'group dinner']
      };

      const selected = ideas[style] || ideas.relax;
      byId('planOutput').innerHTML = `
        <strong>${days}-Day ${destination} Plan for ${travelers} traveler(s)</strong><br>
        Day 1: ${selected[0]}<br>
        Day 2: ${selected[1] || selected[0]}<br>
        Day ${days}: ${selected[2] || 'free exploration'}
      `;
    });
  }

  const calculateBtn = byId('calculateBtn');
  if (calculateBtn) {
    calculateBtn.addEventListener('click', () => {
      const days = Number(byId('days').value) || 1;
      const travelers = Number(byId('travelers').value) || 1;
      const transport = Number(byId('transport').value) || 0;
      const hotelNight = Number(byId('hotel').value) || 0;
      const meals = Number(byId('meals').value) || 0;
      const activities = Number(byId('activities').value) || 0;

      const hotelTotal = hotelNight * days;
      const mealsTotal = meals * days * travelers;
      const grandTotal = transport + hotelTotal + mealsTotal + activities;

      byId('budgetOutput').innerHTML = `
        Transport: ৳${transport.toLocaleString()}<br>
        Hotel: ৳${hotelTotal.toLocaleString()}<br>
        Meals: ৳${mealsTotal.toLocaleString()}<br>
        Activities: ৳${activities.toLocaleString()}<hr>
        <strong>Total Estimated Cost: ৳${grandTotal.toLocaleString()}</strong>
      `;
    });
  }

  const aiBtn = byId('aiBtn');
  if (aiBtn) {
    aiBtn.addEventListener('click', () => {
      const prompt = (byId('aiPrompt').value || '').toLowerCase();
      let suggestion = "Try Cox's Bazar for a balanced mix of beach, food, and comfort.";

      if (prompt.includes('adventure') || prompt.includes('trek')) {
        suggestion = 'AI Suggestion: Go to Sajek Valley. Plan hiking, sunrise viewpoints, and local tribal cuisine.';
      } else if (prompt.includes('nature') || prompt.includes('forest')) {
        suggestion = 'AI Suggestion: Choose Sundarbans. Add mangrove safari, wildlife spotting, and eco-lodge stay.';
      } else if (prompt.includes('romantic') || prompt.includes('beach')) {
        suggestion = "AI Suggestion: Cox's Bazar is ideal. Book a sea-view hotel and add sunset + candlelight dinner.";
      } else if (prompt.includes('family')) {
        suggestion = 'AI Suggestion: Sylhet is family-friendly with tea gardens, waterfalls, and gentle day tours.';
      }

      byId('aiOutput').textContent = suggestion;
    });
  }

  const bookButtons = document.querySelectorAll('.book-btn');
  if (bookButtons.length > 0) {
    let selectedRate = 0;

    bookButtons.forEach((button) => {
      button.addEventListener('click', () => {
        byId('selectedHotel').value = button.dataset.hotel;
        selectedRate = Number(button.dataset.rate || 0);
      });
    });

    const confirmBookingBtn = byId('confirmBookingBtn');
    confirmBookingBtn.addEventListener('click', () => {
      const name = byId('guestName').value.trim();
      const hotel = byId('selectedHotel').value.trim();
      const nights = Number(byId('nights').value || 0);
      const checkin = byId('checkin').value;

      if (!name || !hotel || !nights || !checkin) {
        byId('bookingOutput').textContent = 'Please complete all booking fields.';
        return;
      }

      const total = selectedRate * nights;
      byId('bookingOutput').innerHTML = `<strong>Booking Confirmed!</strong><br>${name}, your stay at ${hotel} from ${checkin} for ${nights} night(s) is requested.<br>Estimated hotel cost: ৳${total.toLocaleString()}.`;
    });
  }
})();
