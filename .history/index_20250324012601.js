// Create Employee Record
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
  
  // Create an Array of Employee Records
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
  }
  
  // Create TimeIn Event
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  // Create TimeOut Event
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    });
    return employeeRecord;
  }
  
  // Calculate Hours Worked on a Specific Date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Calculate Wages Earned on a Specific Date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Calculate All Wages for an Employee
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // Find Employee by First Name
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  // Calculate Payroll for All Employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  
  // TESTS
  describe('The payroll system', function() {
  
    it('populates a record from an Array', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      assert.equal(employeeRecord.firstName, "Loki");
    });
  
    it('processes an Array of Arrays into an Array of employee records', function() {
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
  
    it('adds a timeOut event Object to an employee’s record', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      const updatedEmployeeRecord = createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      assert.equal(updatedEmployeeRecord.timeOutEvents.length, 1);
      assert.equal(updatedEmployeeRecord.timeOutEvents[0].date, "2025-03-24");
    });
  
    it('calculates the hours worked on a given date', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      createTimeInEvent(employeeRecord, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      const hoursWorked = hoursWorkedOnDate(employeeRecord, "2025-03-24");
      assert.equal(hoursWorked, 8);
    });
  
    it('calculates the wages earned on a given date', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      createTimeInEvent(employeeRecord, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      const wagesEarned = wagesEarnedOnDate(employeeRecord, "2025-03-24");
      assert.equal(wagesEarned, 320); // 8 hours * 40 pay per hour
    });
  
    it('calculates the total wages for an employee', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      createTimeInEvent(employeeRecord, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      createTimeInEvent(employeeRecord, "2025-03-25 0900");
      createTimeOutEvent(employeeRecord, "2025-03-25 1700");
      const totalWages = allWagesFor(employeeRecord);
      assert.equal(totalWages, 640); // 2 days * 320 each day
    });
  
    it('calculates payroll for multiple employees', function() {
      const employeesData = [
        ["Loki", "God", "God of Mischief", 40],
        ["Thor", "Odinson", "God of Thunder", 50]
      ];
      const employeeRecords = createEmployeeRecords(employeesData);
      createTimeInEvent(employeeRecords[0], "2025-03-24 0900");
      createTimeOutEvent(employeeRecords[0], "2025-03-24 1700");
      createTimeInEvent(employeeRecords[1], "2025-03-24 0900");
      createTimeOutEvent(employeeRecords[1], "2025-03-24 1700");
  
      const payroll = calculatePayroll(employeeRecords);
      assert.equal(payroll, 770); // 320 + 450 (Thor's wage)
    });
  
  });
  