import jsonData from './mockdata.json';
export function generateExpenseMockData(){
    const yExpenseDataset = jsonData
  return yExpenseDataset
}

function fetchExpensesFromAPI(){
  const expenses = [];
  console.log('Fetching expenses...');
    const key = localStorage.getItem('myKey'); 
 
    if (key) {
      fetch('http://localhost:9111/dashboard', {
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
        return data;
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
    } else {
      console.error('Key not found in local storage');
    }
    console.log(expenses)
    return expenses
}

export function getExpenseArrayFromAPI(){
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  let expensesArray = Array.from({ length: daysInMonth }, () => 0);
  jsonData = fetchExpensesFromAPI()
    jsonData.forEach(item => {
      const [dayIndex, value] = Object.entries(item)[0];
      expensesArray[parseInt(dayIndex, 10) - 1] = value;
    });

    console.log(expensesArray);
    return expensesArray
}
