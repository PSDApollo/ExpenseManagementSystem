import jsonData from './mockdata.json';
export function generateExpenseMockData(){
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const yExpenseDataset = jsonData
  return yExpenseDataset
}

export function fetchExpensesFromAPI(){
  const expenses = [];
  console.log('Fetching expenses...');
    const key = localStorage.getItem('myKey'); 
 
    if (key) {
      fetch('https://15af-2600-6c40-75f0-ffc0-dc90-95b4-5282-a6e0.ngrok-free.app//expenses/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': key, // Use the key as the Authorization header
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        console.log('Data received:', data);
        expenses(data);
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
    } else {
      console.error('Key not found in local storage');
    }
    return expenses
}

// export function extractExpensesFromAPI() {
//     const expenseValues = [];
//     const expenses = fetchExpensesFromAPI()
//     for (let i = 0; i < expenses.length; i++) {
     
//       if ('amount' in expenses[i]) {
//         expenseValues.push(expenses[i]['amount']);
//       }
//     }
//     return expenseValues;
// }

export function getExpenseGraphData(){
    const expenses = fetchExpensesFromAPI()
    const expenseArray = []
    expenses.array.forEach(element => {
        expenseArray.push(element.amount)
    });
    return expenseArray;
}
