/* Your Code Here */
// CREATE OBJECT WITH EMPLOYEE INFO FUNCTION
const createEmployeeRecord = (employeeRecordArray) => {
    return {
        firstName : employeeRecordArray[0],
        familyName : employeeRecordArray[1],
        title : employeeRecordArray[2],
        payPerHour : employeeRecordArray[3],
        timeInEvents : [],
        timeOutEvents : []
    }
}

// GO THROUGH EACH ARRAY AND CREATE AN OBJECT AND ADD TO ARRAY
const createEmployeeRecords = (arrayOfArrays) => {
    return arrayOfArrays.map(rec => createEmployeeRecord(rec))
}

// ADD EACH CLOCK-IN TO ARRAY IN EMPLOYEE OBJECT
const createTimeInEvent = function (dateStamp){
    // destructuring
    const [date, hour] = dateStamp.split(' ')
    // const dateArray = dateStamp.split(' ')
    // const date = dateArray[0]
    // const hour = dateArray[1]
    // console.log('hour: ', hour)
    // console.log('date: ', date)    
    const clockIn = {
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    }
    this.timeInEvents.push(clockIn)
    // console.log('this: ', this);
    
    return this
}

// ADD EACH CLOCK-OUT TO ARRAY IN EMPLOYEE OBJECT
const createTimeOutEvent = function (dateStamp){
    // destructuring
    const [date, hour] = dateStamp.split(' ')
    // const dateArray = dateStamp.split(' ')
    // const date = dateArray[0]
    // const hour = dateArray[1]
    // console.log('hour: ', hour)
    // console.log('date: ', date)    
    const clockOut = {
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    }
    this.timeOutEvents.push(clockOut)
    
    return this
}

const hoursWorkedOnDate = function(targetDate) {
    const inTime = this.timeInEvents.find(inTime => inTime.date === targetDate)
    const outTime = this.timeOutEvents.find(outTime => outTime.date === targetDate)

    return(outTime.hour - inTime.hour) / 100
}

const wagesEarnedOnDate = function(targetDate) {
    return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour 
}

const calculatePayroll = function (employeeRecordArray) {
    return employeeRecordArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}
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

const findEmployeeByFirstName = function (srcArray, firstName) {
    return srcArray.find(rec => rec.firstName === firstName)
}

