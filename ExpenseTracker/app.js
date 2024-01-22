document.addEventListener('DOMContentLoaded', function () {
    const expenseForm = document.getElementById('expenseForm');
    const expenseList = document.getElementById('expenseList');
  
    expenseForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const expenseName = document.getElementById('expenseName').value;
      const expenseCategory = document.getElementById('expenseCategory').value;
      const expenseAmount = document.getElementById('expenseAmount').value;
      const expenseDescription = document.getElementById('expenseDescription').value;
  
      if (expenseName && expenseCategory && expenseAmount) {
        // Create an object to represent the expense
        const expense = {
          name: expenseName,
          category: expenseCategory,
          amount: parseFloat(expenseAmount),
          description: expenseDescription,
        };
  
        // Save the expense to local storage
        saveExpense(expense);
  
        // Update the UI
        updateExpenseList();
  
        // Clear the form inputs
        expenseForm.reset();
      }
    });
  
    function saveExpense(expense) {
      let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
    }
  
    function deleteExpense(index) {
      let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
      expenses.splice(index, 1);
      localStorage.setItem('expenses', JSON.stringify(expenses));
      updateExpenseList();
    }
  
    function updateExpenseList() {
      expenseList.innerHTML = ''; // Clear the existing list
  
      const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
      expenses.forEach(function (expense, index) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerHTML = `
          <strong>${expense.name}</strong>
          <span class="badge badge-secondary ml-2">${expense.category}</span>
          <p>${expense.description}</p>
          <p class="mb-0">Amount: $${expense.amount.toFixed(2)}</p>
          <button type="button" class="btn btn-danger btn-sm mt-2" onclick="deleteExpense(${index})">Delete</button>
        `;
        expenseList.appendChild(li);
      });
    }
  
    // Initial update on page load
    updateExpenseList();
  });
  