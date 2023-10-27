
export function generateExpenseMockData(){
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
    const yExpenseDataset = Array.from({ length: daysInMonth }, () =>
    Math.floor(Math.random() * 100) + 1
  );
  return yExpenseDataset
}

function ExpenseList() {
//   const [expenses, setExpenses] = useState([]);
    console.log('Fetching expenses...');
    fetch('https://099b-2600-6c40-7500-11f5-3c2f-7679-1906-59fb.ngrok-free.app/expenses')
      .then((response) => {
        if (response.ok) {
          console.log('Successfully fetched expenses.');
          return response.json();
        } else {
          throw new Error('Failed to fetch expenses.');
        }
      })
      .then((data) => {
        console.log('Data received:', data);
        return data;
      })
      .catch((error) => {
        console.error('Error fetching expenses:', error);
      });
}

export function getExpenseGraphData(){
    const expenses = ExpenseList()
    const expenseArray = []
    expenses.array.forEach(element => {
        expenseArray.push(element.amount)
    });
    return expenseArray;
}
