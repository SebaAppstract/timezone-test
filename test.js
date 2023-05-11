"use strict";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Los_Angeles");

// potential functions
function convertToUtc(date) {
  return dayjs(date).utc();
}

function convertToUtcKeepingHurs(date) {
  return dayjs(date).utc(true)
}

function getUtcDate() {
  return dayjs.utc();
}

function getLocalDate() {
  return dayjs().tz();
}

function convertToLocalDate(date) {
  return dayjs(date).tz();
}


function showOnFEDateWhichHoursMatter() {
  const dateFromBackend = "2023-05-11T18:36:30.000Z";
  const dateObjectToUseInFE = convertToLocalDate(dateFromBackend);
  console.log('Should be: "2023-05-11T11:36:30-07:00Z"')
  console.log('Is:        ', dateObjectToUseInFE.format("YYYY-MM-DDTHH:mm:ssZ[Z]"))
}

function showOnFEDateWhichHoursMatterAndSendItToBEInUTC() {
  const dateFromBackend = "2023-05-11T18:36:30.000Z";
  const dateObjectToUseInFE = convertToLocalDate(dateFromBackend);
  const dateObjectToSendToBE = convertToUtc(dateObjectToUseInFE)
  console.log('Should be: "2023-05-11T18:36:30-07:00Z"')
  console.log('Is:        ', dateObjectToSendToBE.format("YYYY-MM-DDTHH:mm:ssZ[Z]"))
}

function showOnFEDateWhichHoursDontMatter() {
  const date = '2023-05-11'
  const dateObjectToUseInBe = convertToUtcKeepingHurs(date)
  console.log('Should be: "2023-05-11T00:00:00:00:00Z')
  console.log('Is:        ', dateObjectToUseInBe.format("YYYY-MM-DDTHH:mm:ssZ[Z]"))
}

function matchUtcDate() {
  const utcDate = getUtcDate()
  console.log('Should be:', new Date().toISOString())
  console.log('Is       :', utcDate.toISOString())
}

function matchLocalDate() {
  const localDate = getLocalDate()
  console.log('Should be: ', new Date().toLocaleString('en-US', {
    timeZone: 'America/Los_Angeles'
  }))
  console.log('Is:        ', localDate.format("YYYY-MM-DDTHH:mm:ssZ[Z]"))
}

console.log('\n')
console.log('****** Receive a date on UTC, parse it to local timezone ******')
console.log(showOnFEDateWhichHoursMatter())
console.log('\n')
console.log('****** Receive a date on UTC, parse it to local timezone, and then parse it again to send to BE ******')
console.log(showOnFEDateWhichHoursMatterAndSendItToBEInUTC())
console.log('\n')
console.log('****** Get a date from a datepicker which hours dont matter (nor appear) and set it with zeroes ******')
console.log(showOnFEDateWhichHoursDontMatter())
console.log('\n')
console.log('****** Creates a UTC date ******')
console.log(matchUtcDate())
console.log('\n')
console.log('****** Creates a local timezone date ******')
console.log(matchLocalDate())