function addCategory() {
    const container = document.getElementById('categoryContainer');
    const group = document.createElement('div');
    group.className = 'category-group';
    group.innerHTML = `
      <input type="text" placeholder="Category" class="category">
      <input type="number" placeholder="Amount" class="amount">
    `;
    container.appendChild(group);
  }

  function goToChart() {
    const categories = document.querySelectorAll('.category');
    const amounts = document.querySelectorAll('.amount');

    let expenses = {};
    for (let i = 0; i < categories.length; i++) {
      const cat = categories[i].value.trim();
      const amt = parseFloat(amounts[i].value);
      if (cat && !isNaN(amt)) {
        expenses[cat] = amt;
      }
    }

    const encodedData = encodeURIComponent(JSON.stringify(expenses));
    window.location.href = `main4.html?data=${encodedData}`;
  }