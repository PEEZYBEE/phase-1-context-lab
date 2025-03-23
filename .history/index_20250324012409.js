/* Your Code Here */
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
  }
  
  function createTimeInEvent(employeeRecord, dateTime) {
    console.log("createTimeInEvent dateTime: ", dateTime); // Add a log to inspect the dateTime value
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTime) {
    console.log("createTimeOutEvent dateTime: ", dateTime); // Add a log to inspect the dateTime value
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  
// Now write your tests
describe('The payroll system', function() {
    it('populates a record from an Array', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      assert.equal(employeeRecord.firstName, "Loki");
    });
  
    it('process an Array of Arrays into an Array of employee records', function() {
      const employeesData = [
        ["Loki", "God", "God of Mischief", 40],
        ["Natalia", "Romanoff", "Black Widow", 50]
      ];
      const employeeRecords = createEmployeeRecords(employeesData);
      assert.equal(employeeRecords.length, 2);
      assert.equal(employeeRecords[0].firstName, "Loki");
      assert.equal(employeeRecords[1].firstName, "Natalia");
    });
  
    it('adds a timeIn event Object to an employee’s record', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      const updatedEmployeeRecord = createTimeInEvent(employeeRecord, "2025-03-24 0900");
      assert.equal(updatedEmployeeRecord.timeInEvents.length, 1);
      assert.equal(updatedEmployeeRecord.timeInEvents[0].date, "2025-03-24");
    });

    // Add further tests for other methods
});
