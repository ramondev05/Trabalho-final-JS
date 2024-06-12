function calculatePlans() {
  const age = parseInt(document.getElementById('age').value);
  const weight = parseInt(document.getElementById('weight').value);
  const height = parseInt(document.getElementById('height').value);

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  const imc = (weight / ((height / 100) ** 2)).toFixed(2);

  const plansA = calculatePlansA(age, imc);

  const plansB = calculatePlansB(imc);

  const cheapestPlans = getCheapestPlans(plansA, plansB);

  displayResults(plansA, plansB, cheapestPlans);
}

function calculatePlansA(age, imc) {
  const basic = 100 + (age * 10 * (imc / 10));
  const standard = (150 + (age * 15)) * (imc / 10);
  const premium = (200 - (imc * 10) + (age * 20)) * (imc / 10);

  return { basic, standard, premium };
}

function calculatePlansB(imc) {
  let factor = 1;
  if (imc < 18.5) factor = 10;
  else if (imc >= 18.5 && imc <= 24.9) factor = 1;
  else if (imc >= 25 && imc <= 29.9) factor = 6;
  else if (imc >= 30 && imc <= 34.9) factor = 10;
  else if (imc >= 35 && imc <= 39.9) factor = 20;
  else if (imc >= 40) factor = 30;

  const basic = 100 + (factor * 10 * (imc / 10));
  const standard = (150 + (factor * 15)) * (imc / 10);
  const premium = (200 - (imc * 10) + (factor * 20)) * (imc / 10);

  return { basic, standard, premium };
}

function getCheapestPlans(plansA, plansB) {
  const allPlans = [
    { type: 'basic', price: plansA.basic, operator: 'Operadora A' },
    { type: 'basic', price: plansB.basic, operator: 'Operadora B' },
    { type: 'standard', price: plansA.standard, operator: 'Operadora A' },
    { type: 'standard', price: plansB.standard, operator: 'Operadora B' },
    { type: 'premium', price: plansA.premium, operator: 'Operadora A' },
    { type: 'premium', price: plansB.premium, operator: 'Operadora B' }
  ];

  allPlans.sort((a, b) => a.price - b.price);
  return allPlans[0];
}

function displayResults(plansA, plansB, cheapestPlan) {
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = `
      <h2>Resultados</h2>
      <table class="table table-bordered">
          <thead>
              <tr>
                  <th>Plano</th>
                  <th>Mais Saúde</th>
                  <th>Saúde e Vida</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Básico</td>
                  <td>R$ ${plansA.basic.toFixed(2)}</td>
                  <td>R$ ${plansB.basic.toFixed(2)}</td>
              </tr>
              <tr>
                  <td>Standard</td>
                  <td>R$ ${plansA.standard.toFixed(2)}</td>
                  <td>R$ ${plansB.standard.toFixed(2)}</td>
              </tr>
              <tr>
                  <td>Premium</td>
                  <td>R$ ${plansA.premium.toFixed(2)}</td>
                  <td>R$ ${plansB.premium.toFixed(2)}</td>
              </tr>
          </tbody>
      </table>
      <h3>Plano Mais Vantajoso</h3>
      <p>O plano mais vantajoso é o plano ${cheapestPlan.type} da ${cheapestPlan.operator} com o preço de R$ ${cheapestPlan.price.toFixed(2)}.</p>
  `;
}