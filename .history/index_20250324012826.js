// Create employee record
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
  
  // Create multiple employee records
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(array => createEmployeeRecord(array));
  }
  
  // Create a TimeIn event
  function createTimeInEvent(employeeRecord, dateTime) {
    if (!dateTime || typeof dateTime !== 'string') {
      throw new Error('dateTime must be a string and cannot be empty');
    }
    
    // Split the date and hour correctly
    const [date, hour] = dateTime.split(' ');
  
    if (!date || !hour) {
      throw new Error('Invalid dateTime format. Expected "YYYY-MM-DD HHMM"');
    }
  
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10) // Ensure the hour is parsed as a number
    });
  
    return employeeRecord;
  }
  
  // Create a TimeOut event
  function createTimeOutEvent(employeeRecord, dateTime) {
    if (!dateTime || typeof dateTime !== 'string') {
      throw new Error('dateTime must be a string and cannot be empty');
    }
  
    // Split the date and hour correctly
    const [date, hour] = dateTime.split(' ');
  
    if (!date || !hour) {
      throw new Error('Invalid dateTime format. Expected "YYYY-MM-DD HHMM"');
    }
  
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10) // Ensure the hour is parsed as a number
    });
  
    return employeeRecord;
  }
  
  // Calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      throw new Error(`Missing timeIn or timeOut event for date: ${date}`);
    }
  
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
  }
  
  // Calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour;
  }
  
  // Calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    return employeeRecord.timeInEvents.reduce((totalWages, timeInEvent) => {
      const date = timeInEvent.date;
      return totalWages + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
  }
  
  // Find employee by first name
  function findEmployeeByFirstName(collection, firstNameString) {
    return collection.find(employee => employee.firstName === firstNameString);
  }
  
  // Calculate total payroll for all employees
  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }
  
  // Tests
  
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
  
    it('calculates hours worked on a specific date', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      createTimeInEvent(employeeRecord, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      const hoursWorked = hoursWorkedOnDate(employeeRecord, "2025-03-24");
      assert.equal(hoursWorked, 8);
    });
  
    it('calculates wages earned on a specific date', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      createTimeInEvent(employeeRecord, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      const wages = wagesEarnedOnDate(employeeRecord, "2025-03-24");
      assert.equal(wages, 320); // 8 hours * 40 per hour
    });
  
    it('calculates all wages for an employee', function() {
      const employeeData = ["Loki", "God", "God of Mischief", 40];
      const employeeRecord = createEmployeeRecord(employeeData);
      createTimeInEvent(employeeRecord, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord, "2025-03-24 1700");
      createTimeInEvent(employeeRecord, "2025-03-25 0900");
      createTimeOutEvent(employeeRecord, "2025-03-25 1700");
      const totalWages = allWagesFor(employeeRecord);
      assert.equal(totalWages, 640); // 2 days * 320 per day
    });
  
    it('calculates total payroll for multiple employees', function() {
      const employeeData1 = ["Loki", "God", "God of Mischief", 40];
      const employeeData2 = ["Thor", "Odinson", "God of Thunder", 50];
      const employeeRecord1 = createEmployeeRecord(employeeData1);
      const employeeRecord2 = createEmployeeRecord(employeeData2);
  
      createTimeInEvent(employeeRecord1, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord1, "2025-03-24 1700");
      createTimeInEvent(employeeRecord2, "2025-03-24 0900");
      createTimeOutEvent(employeeRecord2, "2025-03-24 1700");
  
      const employees = [employeeRecord1, employeeRecord2];
      const payroll = calculatePayroll(employees);
      assert.equal(payroll, 790); // 320 (Loki) + 470 (Thor)
    });
  });
  