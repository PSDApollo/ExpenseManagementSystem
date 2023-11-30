import jsonData from './mockdata.json';

export function generateExpenseMockData() {
  const yExpenseDataset = jsonData;
  return yExpenseDataset;
}

async function fetchExpensesFromAPI() {
  const expenses = [];
  console.log('Fetching expenses...');

  const key = localStorage.getItem('myKey');

  if (key) {
    try {
      const response = await fetch('http://localhost:9111/expenses/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': key, // Use the key as the Authorization header
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Data received:', data);
      return data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
      throw error;
    }
  } else {
    console.error('Key not found in local storage');
    throw new Error('Key not found in local storage');
  }
}

export async function getExpenseArrayFromAPI() {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  let expensesArray = Array.from({ length: daysInMonth }, () => 0);

  try {
    const jsonData = await fetchExpensesFromAPI();
    jsonData.forEach(obj => {
      const [key, value] = Object.entries(obj)[0];
      const index = parseInt(key, 10) - 1;
      expensesArray[index] = value;
    });

    console.log("In controller: ", expensesArray);
    return expensesArray;
  } catch (error) {
    console.error('Error getting expense array from API:', error);
    throw error;
  }
}
