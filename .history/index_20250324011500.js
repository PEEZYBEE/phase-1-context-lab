/* Your Code Here */
// Define the functions you need for the payroll system
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
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  function createTimeOutEvent(employeeRecord, dateTime) {
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
  
  // Now the test cases go here
  
  describe('The payroll system', function() {
    it('populates a record from an Array', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      assert.equal(employeeRecord.firstName, "Loki");
    });
  
    // Example test for creating multiple employee records
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
  
    // Example test for adding time in and time out events
    it('adds a timeIn event Object to an employee’s record', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      const updatedEmployeeRecord = createTimeInEvent(employeeRecord, "2025-03-24 0900");
      assert.equal(updatedEmployeeRecord.timeInEvents.length, 1);
      assert.equal(updatedEmployeeRecord.timeInEvents[0].date, "2025-03-24");
    });
  
    // Other test cases as per your previous structure...
  });
  
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

