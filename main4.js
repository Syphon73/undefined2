const params = new URLSearchParams(window.location.search);
    const dataParam = params.get('data');

    if (!dataParam) {
      document.getElementById('results').innerText = 'No data received.';
    } 
    else {
      const expenses = JSON.parse(decodeURIComponent(dataParam));
      const keys = Object.keys(expenses);
      const values = keys.map(k => expenses[k]);

      const total = values.reduce((a, b) => a + b, 0);
      const average = total / keys.length;
      let maxCat = keys[0];
      keys.forEach(cat => {
        if (expenses[cat] > expenses[maxCat]) maxCat = cat;
      });

      function generateTip(category) {
        const tips = {
        //   rent: "Consider downsizing, negotiating rent, or finding roommates.",
          electricity: "Reduce your power consumption. Dont keep appliances running",
          entertainment: "Look for cheaper or free entertainment options.",
          Takeouts: "Plan your meals and avoid impulsive grocery runs.",
          transportation: "Use public transport, walk more, or carpool.",
          default: "Review and reduce expenses if possible in this category."
        };
        return tips[category.toLowerCase()] || tips.default;
      }

      let resultHTML = `
        <strong>Total Spent:</strong> Rs${total}<br>
        <strong>Average per Category:</strong> Rs${average.toFixed(2)}<br>
        <strong>Highest Spending:</strong> ${maxCat} (Rs${expenses[maxCat]})<br><br>
        <strong>Suggestions:</strong><br>
      `;

      keys.forEach(cat => {
        if (expenses[cat] > average) {
          const over = (((expenses[cat] - average) / average) * 100).toFixed(1);
          resultHTML += `- ${cat}: Spending is ${over}% over average. ${generateTip(cat)}<br>`;
        }
      });

      document.getElementById('results').innerHTML = resultHTML;

      const ctx = document.getElementById('expenseChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: keys,
          datasets: [{
            data: values,
            backgroundColor: [
              '#ff6384', '#36a2eb', '#ffcd56',
              '#4bc0c0', '#9966ff', '#f67019',
              '#00a950', '#c2185b'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom'
            },
            title: {
              display: true,
              text: 'Expense Distribution'
            }
          }
        }
      });
    }